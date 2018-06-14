import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../polymerfire/firebase-query.js';
import '../../../polymerfire/firebase-document.js';
import '../../../@polymer/paper-fab/paper-fab.js';
import '../../../@polymer/paper-tooltip/paper-tooltip.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../../@polymer/paper-listbox/paper-listbox.js';
import '../../../@polymer/paper-item/paper-item.js';
import '../../../@polymer/neon-animation/web-animations.js';
import '../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../../@polymer/paper-card/paper-card.js';
import '../../../@polymer/paper-spinner/paper-spinner.js';
import '../app-elements/app-actions.js';
import '../app-elements/shared-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class StatisticsPage extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
        background: var(--secondary-background-color);
        height: 100vh;
        @apply --default-font;
      }
      app-header {
        color: var(--default-primary-color);
        background: var(--default-primary-color);
        --app-form-header-background: var(--accent-color);
        --app-form-header-color: var(--default-primary-color);
        @apply --default-font-medium;
      }

      h1[main-title] { margin-left: 20px; }

      app-drawer {
        --app-drawer-content-container_-_background-color: var(--default-primary-color);
        --app-drawer-content-container_-_background: var(--default-primary-color);
      }

      app-drawer .content {
        text-align: left;
        padding: 0 10px;
      }

      app-drawer .header { text-align: center; }

      .scrollable {
        overflow-x: scroll;
        overflow-y: hidden;
        margin-bottom: 30px;
      }

      .scroll-content {
        width: auto;
        white-space: nowrap;
      }


      paper-dropdown-menu
      {
        width: 60%;
        font-size: 0.5rem;
        margin-top: -20px;
        margin-left: 10px;
      }

      paper-icon-button { color: var(--secondary-text-color); }

      .content {
        width: 90%;
        margin-top: 20px;
        margin-left: auto;
        margin-right: auto;
      } 

      .content paper-card { width: 100%; }

      #ranking-title { color: var(--secondary-text-color); }

      .card-content paper-item { padding: 0; }

      .ranking-item { margin-bottom: 15px; }
      .ranking-item .name, .ranking-item .score {
        margin-left: 10px;
        margin-top: 8px;
      }

      .ranking-item .name {flex-grow: 2; }

      .ranking-item iron-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      .ranking-item {
        display: flex;
      }

      #inboxLoading {
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%);
      }


      paper-spinner {
        width: 40px;
        height: 40px;
        padding: 5px;
        background-color: var(--default-primary-color);
        border-radius: 50%;
      }
    </style>

    <div id="inboxLoading">
      <paper-spinner active=""></paper-spinner>
    </div>

    <firebase-query id="query" path="/campaigns" data="{{campaigns}}">
    </firebase-query>

    <firebase-document id="photoDoc" log="true">
    </firebase-document>

    <firebase-document id="firebase">
    </firebase-document>


    <app-header-layout has-scrolling-region="">
      <app-header slot="header" fixed="" condenses="" effects="waterfall">
        <app-toolbar>
          <paper-icon-button icon="app:arrow-back" on-tap="_returnToInbox"></paper-icon-button>
          <paper-dropdown-menu on-value-changed="_loadRanking">
            <paper-listbox slot="dropdown-content" selected="1">
              <template is="dom-repeat" items="{{userCampaigns}}">
                <paper-item>{{item.name}}</paper-item>
              </template>
            </paper-listbox>
          </paper-dropdown-menu>
        </app-toolbar>
      </app-header>
      <div class="content">
        <paper-card>
      <app-header>
        <app-toolbar>
          <h4 condensed-title="" id="ranking-title">Ranking</h4>
          <paper-icon-button icon="app:more-vert"></paper-icon-button>
        </app-toolbar>
      </app-header>
          <div class="card-content">
        <paper-listbox>
          <template is="dom-repeat" items="{{rankingData}}" filter="setUserPhoto" notify-dom-change="true" on-dom-change="hideLoading">
            <div class="ranking-item">
              <iron-image id="ID-{{item.uid}}" sizing="cover"></iron-image>
              <span class="name">{{item.followerName}}</span>
              <span class="score">{{item.followerScore}}/{{item.total}}</span>
            </div>
          </template>
        </paper-listbox>
          </div>
        </paper-card>
      </div>
    </app-header-layout>
`;
  }

  static get is() { return 'statistics-page'; }
  static get properties() {
    return {
      userCampaigns: {
        type: Array,
        value: []
      },
      campaigns: {
        type: Array,
        observer: "_getUserCampaigns"
      },
      user: {
        type: Object
      },
      campaignFollowers: {
        type: Array,
        value: []
      },
      campaignMissions: {
        type: Array,
        value: []
      },
      rankingData: {
        type: Array,
        value: []
      },
      domChangeEventCount: {
        type: Number,
        value: 0
      }
    }
  }

  static get observers() {
    return [
      'routePathChanged(route.path)'
    ]
  }

  _getUserCampaigns() {
    if (this.user === null) return;
    this.set("userCampaigns", []);
    if (Object.keys(this.campaigns).length == 0) return;
    this.campaigns.forEach(function(campaign, index) {
      if (!(campaign.content.usersFollow == undefined) && campaign.content.usersFollow.includes(this.user.uid)){
        let _campaign = {};
        _campaign["key"] = campaign.$key;
        _campaign["name"] = campaign.content.name;
        _campaign["followers"] = campaign.content.usersFollow;
        this.push("userCampaigns", _campaign);
      }
    }.bind(this));
  }


  _returnToInbox() {
    this.set('route.path', '/');
  }

  _setCampaignFollwers(campaign) {
    let followersPromises = [];
    campaign.followers.forEach(function(followerId) {
      let follower = {};

      var promise = new Promise(function(resolve, reject) {
      this.$.firebase.db.ref(`/users/${followerId}`)
        .once("value", function(snapshot) {
          if(snapshot.val().content != undefined){
            follower["id"] = followerId;
            follower["name"] = snapshot.val().content.displayName;
            resolve(this.push("campaignFollowers", follower));
          }
        }.bind(this));
    }.bind(this));
      followersPromises.push(promise);
    }.bind(this));
    return followersPromises;
  }

  _setCampaignMissions(campaign) {
    var promise = new Promise(function(resolve, reject) {
      this.$.firebase.db.ref("/missions")
       .orderByChild("content/cid")
       .equalTo(campaign.key).once("value", function(snapshot){
       if (snapshot.val() != null) {
          resolve(this.set("campaignMissions", Object.values(snapshot.val())));
       }
     }.bind(this));
    }.bind(this));
    return promise;
  }

  _getCampaignByName(name) {
    let campaign = {};
    this.userCampaigns.forEach(function(value) {
      let campaignName = value.name.replace(/\s*$/,"");
      campaignName = campaignName.replace(/\s*^/,"");
      if (campaignName == name)
        campaign = value;
    });
    return campaign;
  }


  _loadRanking(e) {
    this.set("rankingData", []);
    this.set("campaignFollowers", []);
    this.set("campaignMissions", []);
    if (e.detail.value) {
      const selectedCampaign = this._getCampaignByName(e.detail.value);
      console.log("hdsjkhdjskahsjkhakj");
      console.log(selectedCampaign);
      Promise.all(this._setCampaignFollwers(selectedCampaign)).then(function(res){
        const followers = this.campaignFollowers;
        this._setCampaignMissions(selectedCampaign).then(function(res){
          const missions = this.campaignMissions;
          let totalMissions = this.campaignMissions.length;
          let rankingData = [];
          followers.forEach(function(follower) {
            let missionsDoneByFollower = 0;
            missions.forEach(function(mission) {
              const receipts = mission.content.receipts;
              if (receipts != undefined) {
                receipts.forEach(function(receipt) {
                  if (receipt.uid == follower.id && receipt.status == "realized")
                    missionsDoneByFollower += 1;
                });
              }
            });
            let data = {};
            data["followerScore"] = missionsDoneByFollower;
            data["followerName"] = follower.name;
            data["uid"] = follower.id;
            data["total"] = totalMissions;
            this.push("rankingData", data);
          }.bind(this));
          this._sortRanking();
        }.bind(this));
      }.bind(this));
    }
  }

  _sortRanking() {
    const ordered = this.rankingData.sort(function(followerA, followerB) {
      if (followerA.followerScore < followerB.followerScore)
        return 1;
      if (followerA.followerScore > followerB.followerScore)
        return -1;
      return 0;
    })
    this.set("rankingData", ordered);
  }

  setUserPhoto(_item) {
    setTimeout(function() {
      this.$.photoDoc.getStoredValue(`/users/${_item.uid}/content`).then(function(res) {
        this.shadowRoot.querySelector(`#ID-${_item.uid}`).setAttribute("src", res.photoURL);
      }.bind(this));
    }.bind(this), 10);
    return true;
  }

  routePathChanged(page) {
    if (page == "/statistics")
      this._getUserCampaigns();
  }

  hideLoading() {
    console.log(this.domChangeEventCount);
    if (this.domChangeEventCount == 2) {
      this.shadowRoot.querySelector('#inboxLoading').setAttribute('style', 'display:none');
    }
    else if (this.domChangeEventCount != 0 && this.domChangeEventCount % 2 == 0){
      this.shadowRoot.querySelector('#inboxLoading').setAttribute('style', 'display:none');
    }

    else if (this.domChangeEventCount > 1 && this.domChangeEventCount % 2 == 1){
      this.shadowRoot.querySelector('#inboxLoading').setAttribute('style', 'display:block');
    }

    this.domChangeEventCount += 1;
  }
}

window.customElements.define(StatisticsPage.is, StatisticsPage);
