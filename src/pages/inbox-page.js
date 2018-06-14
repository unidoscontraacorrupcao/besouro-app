import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '../app-elements/app-actions.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import '../mission-elements/mission-card.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
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

      [main-title] {
        color: var(--accent-color);
        margin-left: 10px;
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
    </style>




    <app-header-layout has-scrolling-region="">

      <app-header slot="header" condenses="" reveals="" fixed="" effects="waterfall">
        <app-toolbar>
          <paper-icon-button icon="app:menu" drawer-toggle="" on-tap="openDrawer"></paper-icon-button>
          <div main-title="">{{pageTitle}}</div>
          <paper-icon-button on-tap="_openStatatisticsPage" icon="app:timeline"></paper-icon-button>
        </app-toolbar>
        <app-toolbar sticky="">
          <paper-tabs selected="{{inboxtab}}" fallback-selection="0">
            <paper-tab>CAIXA DE ENTRADA</paper-tab>
            <paper-tab>MINHAS MISSÕES</paper-tab>
          </paper-tabs>
        </app-toolbar>
      </app-header>
      <iron-pages selected="{{inboxtab}}">
        <div class="inbox">
          <template id="missionsList" is="dom-repeat" items="{{inboxMissions}}" as="mission" notify-dom-change="true" on-dom-change="hideLoading">
            <mission-card mission="{{mission.content}}" key="{{mission.\$key}}" on-show-mission="_goToMission"></mission-card>
          </template>
        </div>
        <div class="inbox">
          <template is="dom-repeat" items="{{userAcceptedMissions}}" as="acceptedMissions">
            <mission-card mission="{{acceptedMissions.content}}" key="{{acceptedMissions.\$key}}" on-show-mission="_goToMission" uid="{{user.uid}}">
            </mission-card>
          </template>
        </div>
      </iron-pages>
      <div id="inboxLoading">
        <paper-spinner active=""></paper-spinner>
      </div>
      <app-actions id="actions" selected="{{selected}}" icon="app:add">
        <paper-fab slot="actions" mini="" icon="app:add" id="newMission" on-tap="_openMissionForm" name="edit"></paper-fab>
        <paper-tooltip slot="actions" for="newMission">Sugerir Missão</paper-tooltip>
        <paper-fab slot="actions" mini="" icon="app:assessment" id="survey" name="edit"></paper-fab>
        <paper-tooltip slot="actions" for="survey">Enquete</paper-tooltip>
        <paper-fab slot="actions" mini="" icon="app:create" id="post" name="edit"></paper-fab>
        <paper-tooltip slot="actions" for="post">Postagem</paper-tooltip>
      </app-actions>
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
        value: 'Painel inicial'
      },
      acceptedMissions: {
        type: Array,
        value: []
      },
      inboxMissions: {
        type: Array
      },
      domChangeEventCount: {
        type: Number,
        value: 0
      },
      user: {
        type: Object,
        observer: '_onUserChanged'
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
      }
    }
  }

  _selectedChanged(selected) {
    if(!selected) return;
    this._getMissionsByCampaigns();
  }

  openDrawer() {
    this.dispatchEvent(new CustomEvent('open-drawer'));
  }

  _openMissionForm() {
    this.set('route.path', '/mission');
  }

  _goToMission(e) {
    let mission = e.detail.mission;
    this.set('route.path', `/show-mission/${mission}`);
  }

  _filterMissions() {
    const keys = [].concat.apply([], [this.acceptedMissions.map((m) => m.$key)]);
    this.inboxMissions = this.userMissions.filter((m) => !keys.includes(m.$key));
    this.set("userAcceptedMissions",  this.userMissions.filter((m) => keys.includes(m.$key)));
    this.hideLoading();
  }

  hideLoading(force=false) {
    // the load is complete.
    if (force) this.shadowRoot.querySelector('#inboxLoading').setAttribute('style', 'display:none');
    if (this.domChangeEventCount == 1) {
      this.shadowRoot.querySelector('#inboxLoading').setAttribute('style', 'display:none');
    }
    this.domChangeEventCount += 1;
  }

  _getMissionsByCampaigns() {
  }

  _onAllMissionsChanged() {
    this._getMissionsByCampaigns();
  }

  _onUserChanged() {
    this._getMissionsByCampaigns();
  }

  _openStatatisticsPage() {
    this.set("route.path", "/statistics");
  }
}
window.customElements.define(InboxPage.is, InboxPage);
