import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-spinner/paper-spinner.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

import '../app-elements/app-actions.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import '../mission-elements/mission-card.js';
import '../mission-elements/welcome-card.js';
import '../mission-elements/empty-card.js';
import '../mission-elements/unauthorized-modal.js';
import '../app-elements/app-besouro-api.js';
class InboxPage extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
    </style>
    <style>
      :host {
        display: block;
        height: 100vh;
      }

      app-toolbar { font-size: 35px; }
      .tabs-text {
        font-size: 18px;
        font-family: Folio;
        text-transform: uppercase;
      }

      .header-icon {
        padding: 7px;
        margin-top: 4px;
      }

      [main-title] {
        color: var(--accent-color);
        margin-left: 15px;
        text-transform: uppercase;
        font-family: Folio;
        font-size: 32px;
      }

      .inbox {
        padding-bottom: 80px;
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
  }
  }
    </style>

    <app-besouro-api id="api"></app-besouro-api>
    <app-actions on-go-to-inbox="_returnToInbox"></app-actions>
    <app-dialog id="unauthorizedDialog">
      <unauthorized-modal on-close-modal="_dismissUnauthorizedModal" on-go-to-register="_goToLogin"></unauthorized-modal>
    </app-dialog>

    <app-header-layout has-scrolling-region="">

      <app-header slot="header" condenses="" reveals="" fixed="" effects="waterfall">
        <app-toolbar>
          <paper-icon-button class="header-icon" icon="app:menu" drawer-toggle="" on-tap="openDrawer"></paper-icon-button>
          <div main-title="">{{pageTitle}}</div>
          <!-- <paper-icon-button class="header-icon" icon="app:search"></paper-icon-button> -->
        </app-toolbar>
        <app-toolbar sticky="">
          <paper-tabs selected="{{inboxtab}}" fallback-selection="0">
            <paper-tab><span class="tabs-text">missões públicas</span></paper-tab>
            <paper-tab><span class="tabs-text">minhas missões</span></paper-tab>
          </paper-tabs>
        </app-toolbar>
      </app-header>
      <iron-pages selected="{{inboxtab}}">
        <div class="inbox">
          <welcome-card></welcome-card>
          <template id="missionsList" is="dom-repeat" items="{{inboxMissions}}" as="mission" notify-dom-change="true" on-dom-change="hideLoading">
            <mission-card user="{{user}}" mission="{{mission}}" on-show-mission="_goToMission"  on-modal-show-mission="_goToMission" on-reload-inbox="_reloadInbox" on-open-restrict-modal="_openRestrictModal"></mission-card>
          </template>
        </div>
        <div class="inbox">
          <empty-card id="emptyMessage" on-select-inbox="_selectInbox"></empty-card>
          <template is="dom-repeat" items="{{userAcceptedMissions}}" as="acceptedMissions">
            <mission-card user="{{user}}" mission="{{acceptedMissions}}" on-show-mission="_goToMission">
            </mission-card>
          </template>
        </div>
      </iron-pages>
      <div id="inboxLoading">
        <paper-spinner active=""></paper-spinner>
      </div>

    </app-header-layout>
`;
  }

  static get is() { return 'inbox-page'; }
  static get properties() {
    return {
      inboxAction: {
        type: String,
        value: ''
      },
      route: {
        type: Object,
        notify: true
      },
      selected: {
        observer: '_selectedChanged'
      },
      pageTitle: {
        type: String,
        value: 'MISSÕES'
      },
      inboxMissions: {
        type: Array
      },
      domChangeEventCount: {
        type: Number,
        value: 0
      },
      user: {
        type: Object
      },
      userMissions: {
        type: Array,
        value: []
      },
      allMissions: {
        type: Array,
        value: [],
        observer: "_onAllMissionsChanged"
      },
      userAcceptedMissions: {
        type: Array,
        value: []
      },
      inboxtab: {
        type: Number,
        observer: "_tabChanged"
    }
  }
  }

  _selectedChanged(selected) {
    if(!selected) return;
    this._getInboxMissions();
    this._getAcceptedMissions();
  }

  openDrawer() { this.dispatchEvent(new CustomEvent('open-drawer')); }

  _openMissionForm() { this.set('route.path', '/mission'); }

  _goToMission(e) {
    let mission = e.detail.mission;
    this.set('route.path', `/show-mission/${mission}`);
  }

  hideLoading(force=false) {
    // the load is complete.
    if (force) this.shadowRoot.querySelector('#inboxLoading').setAttribute('style', 'display:none');
    if (this.domChangeEventCount == 1) {
      this.shadowRoot.querySelector('#inboxLoading').setAttribute('style', 'display:none');
    }
    this.domChangeEventCount += 1;
  }

  _reloadInbox() {
    this._getInboxMissions();
    this._getAcceptedMissions();
  }

  _getInboxMissions() {
    this.$.api.path = `missions/`;
    this.$.api.request().then(function(ajax) {
      this.set("inboxMissions", ajax.response);
    }.bind(this));
  }

  _getAcceptedMissions() {
    if (!this.user || Object.keys(this.user).length == 0) return;
    this.$.api.method = "GET";
    this.$.api.path = `missions/accepted/${this.user.uid}`;
    this.$.api.request().then(function(ajax) {
      this.set("userAcceptedMissions", ajax.response);
      if (this.userAcceptedMissions.length > 0)
        this.$.emptyMessage.setAttribute("style", "display: none");
      else
        this.$.emptyMessage.setAttribute("style", "display: block");
    }.bind(this));
  }

  _returnToInbox() { this.set("route.path", "/"); }
  _selectInbox() { this.set("inboxtab", 0); }
  _openRestrictModal() { this.$.unauthorizedDialog.present(); }
  _goToLogin() {
    this.$.unauthorizedDialog.dismiss();
    this.set("route.path", "/login");
  }

  _dismissUnauthorizedModal() {this.$.unauthorizedDialog.dismiss();}

    _tabChanged() {
      if (this.inboxtab == 1) {
        if (!this.user || Object.keys(this.user).length == 0){
          this.$.emptyMessage.setAttribute("style", "display: none");
          this.$.unauthorizedDialog.present();
        }
      }
    }
}
window.customElements.define(InboxPage.is, InboxPage);
