import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/paper-card/paper-card.js';
import '../../../@polymer/paper-toggle-button/paper-toggle-button.js';
import '../../../polymerfire/firebase-document.js';
import '../../../polymerfire/firebase-storage-ref.js';
import '../../../polymerfire/firebase-query.js';
import '../app-elements/app-form-header.js';
import '../app-elements/shared-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class CampaigCard extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        width: 85%;
        max-width: 300px;
        display: inline-block;
        background: var(--secondary-background-color);
        @apply --default-font;
      }
      .card {
        margin: 0 10px 0 0;
        border-radius: unset;
        box-shadow: unset;
      }
      .campaign-card paper-icon-button {
        position: absolute;
        right: 0;
        top: -10px;
      }
      .campaign-card {
        padding: 0px;
      }
      .campaign-card h1 {
        margin: 0;
        height: 26px;
        color: var(--primary-text-color);
      }
      .campaign-card paper-icon-button {
        width: 35px;
        height: 35px;
        color: var(--secondary-text-color);
      }
      .campaign-card p {
        white-space: normal;
        margin: 0;
        line-height: 1.1;
        height: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .campaign-card iron-image {
        width: 100%;
        height: 150px;
        background-color: var(--dark-primary-color);
      }
      .card-content {
        flex: 1;
        padding: 0 10px;
        position: relative;
      }
      .card-content a {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
      }
      .card-content .secondary-title {
        line-height: 0.7;
        margin-bottom: 10px;
      }
      .secondary-title span:first-child,
      .supporters span:first-child {
        color: var(--accent-color);
        font-weight: bold;
      }
      .secondary-title span:not(:first-child) {
        font-size: 14px;
      }
      .card-footer {
        background-color: #F2F1F3;
        display: flex;
        margin-top: 5px;
        padding: 10px;
        font-size: 14px;
      }
      .card-footer .supporters {
        flex: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .support-status {
        margin-right: 5px;
      }
      
    </style>

    <firebase-storage-ref metadata="{{metadata}}" storage-uri="{{gsUri}}" download-url="{{downloadUrl}}" log="true" id="storage">
    </firebase-storage-ref>

    <firebase-query id="follow" path="/users/{{user.uid}}/campaigns/{{key}}" data="{{follow}}">
    </firebase-query>

    <firebase-document id="document" path="/campaigns/{{key}}">
    </firebase-document>

    <div class="card campaign-card">
      <iron-image sizing="cover" preload="" fade="" src="{{downloadUrl}}"></iron-image>
      <div class="card-content">
        <h1>
          {{campaign.name}}
          <paper-icon-button icon="app:arrow-forward"></paper-icon-button>
        </h1>
        <a on-tap="_goToCampaign"></a>
        <div class="secondary-title">
          <span>18</span>
          <span>{{campaign.role}}</span>
        </div>
        <p>{{campaign.description}}</p>
      </div>
      <div class="card-footer">
        <div class="supporters">
          <span>{{campaign.usersFollow.length}}</span>
          <span>apoiadores | {{campaign.state}}</span>
        </div>
          <span class="support-status">Apoiando</span>
          <paper-toggle-button on-change="_followCampaign"></paper-toggle-button>
      </div>
    </div>
`;
  }

  static get is() { return 'campaign-card'; }
  static get properties() {
    return {
      campaign: {
        type: Object,
        observer: '_setCampaign'
      },
      gsUri: String,
      downloadUrl: {
        type: String
      },
      key: String,
      path: String,
      user: Object
    };
  }

  _setCampaign() {
    if(this.campaign.coverImage) {
      this.$.storage.path = `campaigns/${this.key}/${this.campaign.coverImage}`;
    }
    //set toogle
    this._checkToggle();
  }

  _checkToggle() {
    const toggle = this.shadowRoot.querySelector('paper-toggle-button');
    if(!this.campaign) return;
    if(!this.user) {
      toggle.disabled = true;
      return;
    }
    if(this.campaign.usersFollow && this.campaign.usersFollow.includes(this.user.uid)) {
      toggle.checked = true;
    } else {
      toggle.checked = false;
    }
  }

  _followCampaign(e) {
    // get toogle state
    const follow = e.target.checked;
    if(follow) {
      const campaign = JSON.parse(JSON.stringify(this.campaign));
      delete campaign.usersFollow;
      this.$.follow.ref.set({content: campaign});
      const usersFollow = new Set(this.campaign.usersFollow);
      usersFollow.add(this.user.uid);
      this.campaign.usersFollow = Array.from(usersFollow);
      this.$.document.ref.set({content: this.campaign});
    } else {
      this._unfollowCampaign();
    }
  }

  _unfollowCampaign(e) {
    this.$.follow.ref.remove();
    const usersFollow = new Set(this.campaign.usersFollow);
    usersFollow.delete(this.user.uid);
    this.campaign.usersFollow = Array.from(usersFollow);
    this.$.document.ref.set({content: this.campaign});
  }

  _goToCampaign() {
    this.dispatchEvent(new CustomEvent('show-campaign', { detail: { campaignKey: this.key } }))
  }
}

window.customElements.define(CampaigCard.is, CampaigCard);
