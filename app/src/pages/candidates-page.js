import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-spinner/paper-spinner.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

import '../mission-elements/unauthorized-modal.js';
import '../app-elements/app-actions.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import '../app-elements/styles/modal-shared-styles.js';
import '../mission-elements/welcome-card.js';
import '../mission-elements/empty-card.js';
import '../candidates-elements/candidate-card.js';
import '../app-elements/app-besouro-api.js';
import {CommonBehaviorsMixin} from '../mixin-elements/common-behaviors-mixin.js';
class CandidatesPage extends CommonBehaviorsMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style include="modal-shared-styles"></style>
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
    </style>

    <div id="loading">
      <paper-spinner active=""></paper-spinner>
    </div>

    <app-besouro-api id="api"></app-besouro-api>
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
            <paper-tab><span class="tabs-text">TODOS</span></paper-tab>
            <paper-tab><span class="tabs-text">SELECIONADOS</span></paper-tab>
          </paper-tabs>
        </app-toolbar>
      </app-header>
      <iron-pages selected="{{inboxtab}}">
        <div class="inbox">
          <welcome-card></welcome-card>
        <template is="dom-repeat" items="{{allCandidates}}">
        <candidate-card
          candidate="[[item]]"
          on-selected-candidate="_userCandidatesChanged">
        </candidate-card>
        </template>
        </div>
        <div class="inbox">
          <template is="dom-repeat" items="{{selectedCandidates}}">
            <candidate-card
              candidate="[[item]]">
            </candidate-card>
          </template>
        </div>
      </iron-pages>
    </app-header-layout>
`;
  }

  static get is() {
    return "candidates-page";
  }
  static get properties() {
    return {
      inboxAction: {
        type: String,
        value: ""
      },
      route: {
        type: Object,
        notify: true
      },
      selected: {
        observer: "_selectedChanged"
      },
      pageTitle: {
        type: String,
        value: "CANDIDATOS"
      },
      allCandidates: {
        type: Array,
        value: []
      },
      selectedCandidates: {
        type: Array,
        value: []
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
      },
      trophyData: {
        type: Object,
        value: {}
      }
    };
  }

  static get observers() {
    return [
      'routePathChanged(route.path)'
    ]
  }

  routePathChanged(path) {
    this.set("user", this.getUser());
    if (path == "/candidates") {
      this._getAllCandidates();
      this._getSelectedCandidates();
    }
  }

  openDrawer() { this.dispatchEvent(new CustomEvent("open-drawer")); }

  _goToCandidate(e) { }

  _getAllCandidates() {
    this.showLoading();
    this.$.api.path = `users/${this.getUser().uid}/candidates`;
    this.$.api.method = "GET";
    this.$.api.request().then((ajax) => {
      this.set("allCandidates", ajax.response);
      this.hideLoading();
    });
  }

  _getSelectedCandidates() {
    this.showLoading();
    this.$.api.path = `users/${this.getUser().uid}/selected_candidates`;
    this.$.api.method = "GET";
    this.$.api.request().then((ajax) => {
      this.set("selectedCandidates", ajax.response);
      this.hideLoading();
    });
  }

  _userCandidatesChanged() {
    this._getAllCandidates();
    this._getSelectedCandidates();
  }


  _selectInbox() { this.set("inboxtab", 0); }
  _openRestrictModal() { this.$.unauthorizedDialog.present(); }

  _goToLogin() {
    this.$.unauthorizedDialog.dismiss();
    this.set("route.path", "/login");
  }

  _dismissUnauthorizedModal() { this.$.unauthorizedDialog.dismiss(); }

  _tabChanged() {
    if (this.inboxtab == 1) {
      if (!this.user || Object.keys(this.user).length == 0) {
        this.$.emptyMessage.setAttribute("style", "display: none");
        this.$.unauthorizedDialog.present();
      }
    }
  }
}
window.customElements.define(CandidatesPage.is, CandidatesPage);
