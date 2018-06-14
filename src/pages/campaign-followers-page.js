import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/iron-form/iron-form.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../polymerfire/firebase-query.js';
import '../../../polymerfire/firebase-storage-multiupload.js';
import '../../../@polymer/app-media/app-media.js';
import '../../../@polymer/app-media/app-media-recorder.js';
import '../../../@polymer/app-layout/app-header-layout/app-header-layout.js';
import '../../../@polymer/paper-spinner/paper-spinner.js';
import '../app-elements/app-form-header.js';
import '../app-elements/app-scrollable-dialog.js';
import '../mission-elements/mission-receipt.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class CampaignFollowersPage extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
        --app-form-header-background: #fff;
        --app-form-header-color: #000;
        background: var(--secondary-background-color);
        height: 100vh;
      }

      .receipt-item {
        display: flex;
      }

      .supporter-name {
        margin-top: 15px;
        margin-left: 12px;
        flex-grow: 2;
      }

      #modal-header span,
      .accepted-stats {
        color: var(--accent-color);
      }

      .accepted-stats {
        width: 35px;
        height: 35px;
        margin-top: 5px;
      }

      paper-button {
        float: right;
        margin-bottom: 10px;
        margin-top: 20px;
      }

      .receipts {
        width: 90%;
        margin: auto;
        margin-top: 20px;
      }

      app-form-header {
        color: var(--default-primary-color);
        background: var(--accent-color);
        --app-form-header-background: var(--accent-color);
        --app-form-header-color: var(--default-primary-color);
        @apply --default-font-medium;
      }

      .avaliation-stats paper-icon-button {
        width: 50px;
        height: 50px;
      }

      paper-spinner {
        width: 40px;
        height: 40px;
        padding: 5px;
        background-color: var(--default-primary-color);
        border-radius: 50%;
      }

      #inboxLoading {
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%);
      }

      .supporter-img iron-image {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    </style>

    <app-route route="{{route}}" pattern="/campaign-followers/:key" data="{{routeData}}">
    </app-route>

    <firebase-query id="query" path="/campaigns/{{routeData.key}}/content/usersFollow" data="{{followers}}">
    </firebase-query>

    <firebase-document id="user" path="/users">
    </firebase-document>


    <app-header-layout has-scrolling-region="">
      <app-form-header shadow="" slot="header">
        <paper-icon-button slot="arrow-back" icon="app:arrow-back" on-tap="_returnToInbox"></paper-icon-button>
        <span slot="main-title">Apoiadores</span>
        <paper-icon-button slot="more-vert" icon="app:more-vert"></paper-icon-button>
      </app-form-header>

      <template is="dom-if" if="{{followers}}">
        <div class="receipts">
          <template is="dom-repeat" items="{{users}}" as="user">
            <div class="receipt-item">
              <div class="supporter-img">
                <iron-image src="{{user.photoURL}}" sizing="cover"></iron-image>
              </div>
              <div class="supporter-name">
                <span>{{user.displayName}}</span>
              </div>
            </div>
          </template>
        </div>
        </template>
      </app-header-layout>
`;
  }

  static get is() { return 'campaign-followers-page'; }

  static get properties() {
    return {
      followers: {
        type: Array,
        observer: '_fetchUser'
      },
      users: {
        type: Array
      },
      selected: {
        observer: '_selectedChanged'
      },
      routeData: Object
    }
  }

  constructor() {
    super();
  }

  _selectedChanged(selected) {
   if (!selected) {
   }
 }

  _returnToInbox() {
    this.set('route.path', `/show-campaign/${this.routeData.key}`);
  }

  _fetchUser(followers) {
    if(!followers) return;
    const promises  = followers.map(function(item) {
      return this.$.user.ref.child(item.$val).once("value").then(function(result) {
        return result.val().content;
      }.bind(this));
    }.bind(this));
    Promise.all(promises).then(result => this.users = result);
    return true;
  }
}
customElements.define(CampaignFollowersPage.is, CampaignFollowersPage);
