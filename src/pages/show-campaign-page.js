import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../polymerfire/firebase-document.js';
import '../../../polymerfire/firebase-storage-ref.js';
import '../../../polymerfire/firebase-query.js';
import '../../../@polymer/paper-toggle-button/paper-toggle-button.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/paper-spinner/paper-spinner.js';
import '../../../@polymer/paper-progress/paper-progress.js';
import '../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../@polymer/paper-menu-button/paper-menu-button.js';
import '../../../@polymer/paper-item/paper-item.js';
import '../../../@polymer/paper-listbox/paper-listbox.js';
import '../../../@polymer/neon-animation/web-animations.js';
import '../campaign-elements/proposal-card.js';
import '../campaign-elements/campaign-player.js';
import '../app-elements/shared-styles.js';
import '../app-elements/app-form-header.js';
import '../app-elements/app-scrollable-dialog.js';
import '../campaign-elements/proposal-detail-dialog.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class ShowCampaignPage extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
        background: var(--primary-background-color);
        height: 100vh;
        --layer-image: '';
        @apply --default-font;
      }
      app-header {
        height: 222px;
        color: var(--light-text-color);
        /* https://bugs.chromium.org/p/chromium/issues/detail?id=637072 */
        --app-header-background-front-layer: {
          background-image: var(--layer-image);
          background-position: center;
          background-size: 125%;
          background-color: grey;
          filter: contrast(.7) brightness(.6);
        };
      }
      campaign-player {
        margin: auto;
      }
      app-header[shadow] {
        color: black;
      }
      app-header[shadow] .tall {
        background: unset;
        width: 100px;
      }
      app-header[shadow] .tall .actions {
        display: none;
      }
      .tall {
        height: 158px;
      }
      .tall .actions {
        position: absolute;
        bottom: 5px;
        right: 5px;
      }
      h1.title[main-title] {
        margin: 5px 20px;
      }
      .fill {
        padding: 0 20px;
        color: var(--secondary-text-color);
      }
      .row:nth-child(5) {
        margin: 10px 0;
      }
      .row span {
        display: block;
      }
      .candidate-info  {
        display: flex;
        align-items: center;
        font-size: 14px;
      }
      .row .col span:first-child {
        font-weight: bold;
        color: var(--dark-primary-color);
      }
      .row .col span:not(:first-child) {
        font-size: 14px;
        color: var(--dark-primary-color);
        font-weight: bold;
      }
      h6 {
        margin: 0;
      }
      h4 {
        color: var(--dark-primary-color);
      }
      .main {
        text-align: center;
        margin-bottom: 20px;
      }
      .details {
        flex: 1;
        line-height: 1;
        margin: 10px 0;
      }
      .details span {
        display: block;
      }
      .support {
        display: inherit;
      }
      .support span {
        margin-right: 15px;
      }
      .support paper-toggle-button {
        transform: scale(1.5);
      }
      .row {
        display: flex;
        margin: 20px 0;
      }
      .row .col {
        flex: 1;
        text-align: center;
        line-height: 1;
        margin-right: 5px;
      }
      .col span:first-child {
        font-size: 28px;
      }
      .description {
        margin-bottom: 20px;
      }
      .social,
      .calendar,
      .ratings,
      .attachments,
      .administrators {
        margin-bottom: 5px;
        background-color: var(--secondary-background-color);
        padding: 20px;
        color: var(--secondary-text-color);
      }
      .social paper-button {
        border-radius: 25px;
        text-transform: none;
        font-size: 14px;
        margin-top: -40px;
      }
      .social .row .col span:not(:first-child) {
        color: var(--secondary-text-color);
      }
      .social {
        padding: 20px 20px 10px 20px;
      }
      .calendar,
      .ratings,
      .attachments,
      .administrators,
      .proposal {
        padding: 0 20px;
      }
      .share-campaign {
        position: relative; 
      }
      .share-campaign span,
      .share-campaign p {
        display: block;
        font-size: 14px;
        font-weight: bold;
        color: var(--accent-color);
        width: calc(100% - 50px);
      }
      .share-campaign span {
        font-size: 1.5rem;
        line-height: 1;
      }
      .share-campaign paper-icon-button {
        color: var(--accent-color);
        width: 50px;
        height: 50px;
        position: absolute;
        right: 10px;
        top: 10px;
      }
      .proposal {
        margin-bottom: 40px;
      }
      .attachments {
        margin-bottom: 0px;
        padding: 10px 20px 20px 20px;
      }
      .proposal h4,
      .attachments h4 {
        margin: 0 0 5px 0;
      }
      .attachments a {
        text-decoration: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      .attachments .link {
        display: flex;
        padding: 5px 0;
        position: relative;
        border-bottom: 1px solid var(--divider-color);
      }
      .attachments .space {
        flex: 1;
      }
      .attachments .border {
        padding: 5px 10px;
        background: var(--primary-background-color);
      }
      .attachments iron-icon {
        --iron-icon-width: 16px;
        --iron-icon-height: 16px;
      }
      .progress {
        position: absolute;
        top: 0; bottom: 0;
        left: 0; right: 0;
        background-color: var(--secondary-background-color);
      }
      .progress paper-progress {
        width: 100%; 
      }
      .progress .spinner {
        height: 125px;
        text-align: center;
        padding-top: 97px;
        background-color: #4a4a4a;
      }
      paper-menu-button {
        padding: 0;
      }
    </style>

    <app-route route="{{route}}" query-params="{{params}}" pattern="/:page/:key" data="{{data}}">
    </app-route>

    <firebase-document id="document" path="/campaigns/{{data.key}}" data="{{campaign}}">
    </firebase-document>

    <firebase-storage-ref download-url="{{coverImage}}" id="storage">
    </firebase-storage-ref>

    <firebase-storage-ref id="attachmentsStorage">
    </firebase-storage-ref>

    <firebase-query id="follow" path="/users/{{user.uid}}/campaigns/{{data.key}}" data="{{follow}}">
    </firebase-query>

    <firebase-query id="proposals" path="/proposals/{{data.key}}" data="{{proposals}}">
    </firebase-query>

    <firebase-query id="missions" path="/missions" data="{{missions}}">
    </firebase-query>

    <app-scrollable-dialog id="detail" modal="">
      <app-form-header slot="header" shadow="">
        <paper-icon-button slot="arrow-back" icon="app:close" on-tap="closeProposalDialog"></paper-icon-button>
        <span slot="main-title">{{proposal.content.title}}</span>
      </app-form-header>
      <proposal-detail-dialog proposal="{{lastProposal}}" data="{{data}}" on-close-dialog="_dismiss"></proposal-detail-dialog>
    </app-scrollable-dialog>

    <app-header-layout has-scrolling-region="">
      <app-header slot="header" fixed="" condenses="" effects="waterfall resize-title blend-background parallax-background">
        <app-toolbar>
          <paper-icon-button icon="app:arrow-back" on-tap="_returnToCampaigns"></paper-icon-button>
          <h1 condensed-title="" class="dark title">{{campaign.content.name}}</h1>
          <template is="dom-if" if="{{isAdmin}}">
            <paper-menu-button horizontal-align="right">
              <paper-icon-button icon="app:more-vert" slot="dropdown-trigger"></paper-icon-button>
              <paper-listbox slot="dropdown-content">
                <paper-item on-tap="_goToEdit">Editar campanha</paper-item>
              </paper-listbox>
            </paper-menu-button>
          </template>
        </app-toolbar>
        <app-toolbar class="tall">
          <h1 bottom-item="" main-title="" class="title">
            {{campaign.content.name}}
          </h1>
          <campaign-player id="player" campaign-image="{{campaignImage}}" campaign="{{campaign.content}}" campaign-key="{{data.key}}">
          </campaign-player>
        </app-toolbar>
      </app-header>
      <div class="fill">
        <div class="candidate-info">
          <div class="details">
            <span>Brasília/DF</span>
            <span>Começou em: {{campaignDate}}</span>
            <span>Partido: {{campaign.content.party}}</span>
          </div>
          <div class="support">
            <span>Apoiando</span>
            <paper-toggle-button on-change="_followCampaign"></paper-toggle-button>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col" on-tap="_redirectToFollowers">
            <span>{{campaign.content.usersFollow.length}}</span>
            <span>total de apoiadores</span>
          </div>
          <div class="col">
            <span>{{campaign.content.usersFollow.length}}</span>
            <span>novos membros</span>
          </div>
          <div class="col">
            <span>{{activeMembers}}</span>
            <span>membros ativos</span>
          </div>
          <div class="col">
            <span>{{missionTotal}}</span>
            <span>missões lançadas</span>
          </div>
        </div>
        <hr>
        <div class="share-campaign">
          <p>Convide seus amigos para a campanha de
            <span>{{campaign.content.candidateName}}!</span>
          </p>
          <paper-icon-button icon="app:share" on-tap="shareCampaign"></paper-icon-button>
        </div>
        <hr>
        <div class="description">
          <p>{{campaign.content.description}}</p>
        </div>
        <hr>
      </div>
      <div class="proposal">
        <h4>Propostas</h4>
        <dom-if if="{{lastProposal}}">
          <template>
            <proposal-card proposal="{{lastProposal}}" key="{{lastProposal.key}}" on-open-detail="openProposalDetail"></proposal-card>
          </template>
        </dom-if>
      </div>
      <div class="social">
          <paper-button class="accent block" on-tap="_redirectToProposals">Veja mais propostas</paper-button>
        <div class="row">
          <dom-if if="{{campaign.content.facebook}}">
            <template>
              <div class="col">
                <a href="{{campaign.content.facebook}}" tabindex="-1" target="_blank">
                  <paper-icon-button icon="app:facebook" class="facebook"></paper-icon-button>
                </a>
                <span>facebook</span>
              </div>
            </template>
          </dom-if>
          <dom-if if="{{campaign.content.twitter}}">
            <template>
          <div class="col">
            <a href="{{campaign.content.twitter}}" tabindex="-1" target="_blank">
              <paper-icon-button icon="app:twitter" class="twitter"></paper-icon-button>
            </a>
            <span>twitter</span>
          </div>
            </template>
          </dom-if>
          <dom-if if="{{campaign.content.instagram}}">
            <template>
              <div class="col">
                <a href="{{campaign.content.instagram}}" tabindex="-1" target="_blank">
                  <paper-icon-button icon="app:instagram" class="instagram"></paper-icon-button>
                </a>
                <span>instagram</span>
              </div>
            </template>
          </dom-if>
          <dom-if if="{{campaign.content.website}}">
            <template>
              <div class="col">
                <a href="{{campaign.content.website}}" tabindex="-1" target="_blank">
                  <paper-icon-button icon="app:language"></paper-icon-button>
                </a>
                <span>website</span>
              </div>
            </template>
          </dom-if>
        </div>
      </div>
      <template is="dom-if" if="{{campaign.content.attachments}}">
        <div class="attachments">
          <h4>Anexos</h4>
          <template is="dom-repeat" items="{{attachments}}" as="attachment">
            <div class="border">
              <div class="link">
                <a href="{{attachment.path}}" target="_blank">{{attachment.filename}}</a>
                <div class="space"></div>
                <iron-icon icon="app:arrow-downward"></iron-icon>
              </div>
            </div></template>
          </div>
        
      </template>
      <!-- <div class="calendar">
        <h4>Próximos Eventos</h4>
      </div>
      <div class="ratings">
        <h4>Avaliações</h4>
      </div>
      <div class="administrators">
        <h4>Administradores</h4>
      </div> -->
    </app-header-layout>

    <dom-if if="{{!campaign.content}}">
      <template>
        <div class="progress">
          <div class="spinner">
            <paper-spinner active=""></paper-spinner>
          </div>
          <paper-progress indeterminate=""></paper-progress>
        </div>
      </template>
    </dom-if>
`;
  }

  static get is() { return 'show-campaign-page'; }
  static get properties() {
    return {
      selected: {
        observer: '_selectedChanged'
      },
      data: Object,
      campaign: {
        type: Object,
        observer: '_setCampaign'
      },
      follow: {
        type: Array
      },
      campaignImage: {
        type: String,
        observer: '_setLayerImage'
      },
      proposals: {
        type: Array,
        observer: 'setProposal'
      },
      lastProposal: {
        type: Object
      },
      isAdmin: {
        type: Boolean,
        value: false
      },
      missions: {
        type: Array
      },
      missionTotal: {
        type: Number
      },
      activeMembers: {
        type: Number
      }
    };
  }
  static get observers() {
    return ['computeStats(data.page)'];
  }

  _selectedChanged(selected) {
    // this._checkToggle();
     if (!selected) {
      this.$.player.stop();
      this.updateStyles({ '--layer-image': 'linear-gradient(to top, grey, grey)' });
    } else {
      this._setLayerImage(this.campaignImage);
    }
  }

  _returnToCampaigns() {
    this.set('route.path', '/campaigns');
  }

  _redirectToFollowers() {
    this.set('route.path', `/campaign-followers/${this.data.key}`)
  }

  _redirectToProposals() {
    this.set('route.path', `/proposals/${this.data.key}`);
  }

  _goToEdit() {
    this.set('route.path', `/new-campaign/${this.data.key}`);
  }

  _setCampaign(campaign) {
    //recover cover image just when exists
    if(!campaign || !campaign.content || !campaign.content.usersFollow) return;
    if(campaign.content.coverImage) {
      this.$.storage.path = `campaigns/${this.data.key}/${campaign.content.coverImage}`
    }
    this._setStatistics();
    this._setCampaignDate(campaign);
    this._setAttachments(campaign);
    this._setAdmin(campaign);
    //set toggle if user is following the campaign
    this._checkToggle();
  }

  _setAttachments(campaign) {
    this.attachments = [];
    if (campaign.content.attachments) {
      campaign.content.attachments.forEach(filename => {
        this.$.attachmentsStorage.getDownloadURL(`/campaigns/${this.data.key}/attachments/${filename}`).then(function (path) {
          this.push('attachments', { filename, path });
        }.bind(this));
      });
    }
  }

  _setCampaignDate(campaign) {
    const currentDate = new Date(campaign.content.createdAt);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    this.campaignDate = `${day}/${month}/${year}`;
  }

  _setAdmin(campaign) {
    if(!this.user) return;
    if(campaign.content.uid === this.user.uid) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  _setStatistics() {
    this.$.missions.ref.orderByChild(`content/cid`).equalTo(this.data.key).once("value").then(function (finished) {
      if(!finished.val()) {
        this.missionTotal = 0;
        this.activeMembers = 0;
        return;
      }
      //set total off missions created
      let missionTotal = Object.values(finished.val()).length;
      this.missionTotal = missionTotal;
      //set active followers
      let unique = [];
      Object.values(finished.val()).forEach(function(mission) {
        if(mission.content.receipts) {
          mission.content.receipts.forEach(function(user) {
            if(user.status === 'realized') {
              unique.push(user.uid);
            } else {
              this.activeMembers = 0;
            }
          }.bind(this));
        }
      }.bind(this));
      const active = new Set(unique).size;
      this.set('activeMembers', active);

    }.bind(this));
  }

  _checkToggle() {
    const toggle = this.shadowRoot.querySelector('app-header-layout').querySelector('paper-toggle-button');
    if(!this.campaign.content) return;
    if(!this.user) {
      toggle.disabled = true;
      return;
    }
    if(this.campaign.content.usersFollow && this.campaign.content.usersFollow.includes(this.user.uid)) {
      toggle.checked = true;
    } else {
      toggle.checked = false;
    }
  }

  openDrawer() {
    this.dispatchEvent(new CustomEvent('open-drawer'));
  }

  _followCampaign(e) {
    // get toogle state
    const follow = e.target.checked;
    if(follow) {
      const campaign = JSON.parse(JSON.stringify(this.campaign));
      delete campaign.content.usersFollow;
      this.$.follow.ref.set(campaign);
      const usersFollow = new Set(this.campaign.content.usersFollow);
      usersFollow.add(this.user.uid);
      this.campaign.content.usersFollow = Array.from(usersFollow);
      this.$.document.ref.set(this.campaign);
    } else {
      this._unfollowCampaign();
    }
  }

  _unfollowCampaign(e) {
    this.$.follow.ref.remove();
    const usersFollow = new Set(this.campaign.content.usersFollow);
    usersFollow.delete(this.user.uid);
    this.campaign.content.usersFollow = Array.from(usersFollow);
    this.$.document.ref.set(this.campaign);
  }

  _setLayerImage(campaignImage) {
    if (campaignImage && this.campaign.content) {
      this.updateStyles({ '--layer-image': `url(${campaignImage})` });
    }
  }

  shareCampaign(e) {
    this.set('route.path', `/campaign-share/${this.data.key}`);
  }

  computeStats(page) {
    if(page === 'c') {
      //compute statistics here
      // user id provided by url
      console.log('user', this.params.u);
      // service used to share: telegram, whatsapp, facebook, twitter or clipboard
      console.log('service', this.params.s);
      this.set('route.path', `/show-campaign/${this.data.key}`);
      this.set('params', {});
    }
  }

  setProposal(proposals) {
    this.lastProposal = proposals[0];
  }

  openProposalDetail(e) {
    this.$.detail.present();
  }

  closeProposalDialog() {
    this.$.detail.close();
  }
}

window.customElements.define(ShowCampaignPage.is, ShowCampaignPage);
