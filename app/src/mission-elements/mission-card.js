import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-image/iron-image.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import '../mission-elements/accept-mission-modal.js';
import '../mission-elements/finish-mission-modal.js';
import {MissionDurationMixin} from '../mixin-elements/mission-duration-mixin.js';
import './mission-player.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

/**
 * @polymer
 * @MissionCard
 * @appliesMixin MissionDurationMixin
 */
class MissionCard extends MissionDurationMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
      }


      .mission-card {
        display: block;
        padding: 0px;
        line-height: 0.7;
        position: relative;
        max-width: 500px;
        margin: 20px auto;
      }

      .mission-card iron-image {
        width: 100%;
        height: 300px;
        background-color: var(--dark-primary-color);
      }

      .mission-card mission-player {
        position: relative;
        top: -200px;
        color: white;
      }

      .card-header {
        position: relative;
        margin-bottom: 10px;
      }
      .card-header span {
        font-size: 1.1em;
        position: absolute;
        bottom: 35px;
        left: 75px;
      }

      .card-header paper-icon-button {
        padding: 0px;
        color: var(--accent-color);
      }


      .mission-card iron-image.campaign {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin: 10px;
      }

      .card-content {
        flex: 1;
        margin: 0 20px;
        display: flex;
        flex-direction: column;
      }
      .card-content h1 {
        margin: 0;
        color:#312783;
        font-family: Folio;
        font-weight: bold;
        text-transform: uppercase;
      }

      .author { color: #343434; }

      .card-content p {
        font-size: 1.5em;
        flex-grow: 1;
        max-height: 6em;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        font-family: Folio;
        margin: 15px 0 15px 0;
      }

      .timing, .card-content p { color: var(--light-text-color); }

      .card-header .timing {
        font-size: 1.3em;
        position: absolute;
        bottom: 0;
        left: 75px;
        top: 25px;
        font-family: Folio;
      }

      .timing iron-icon {
        width: 15px;
        height: 15px;
        margin-top: -3px;
      }

      .go {
        position: absolute;
        bottom: 15px;
        right: 10px;
      }

      .card-footer .stats {
        padding: 25px 40px;
        font-size: 1.2rem;
        font-family: Folio;
      }
      .card-footer .stats .stats-number {
        color: var(--accent-color);
        font-weight: bold;
      }
      .card-footer .stats paper-button {
        border: none;
        text-transform: none;
        float: right;
        padding: 0px;
        margin-top: -24px;
      }
      .card-footer .actions iron-icon {
        margin-right: 5px;
      }
      .message {
        color: var(--accent-color);
        font-weight: bold;
        line-height: 1.5;
        height: 6em;
        margin-top: 20px;
      }

      .card-action {
        width: 75%;
        max-width: 400px;
        height: 80px;
        bottom: 0;
        top: 250px;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 999;
        position: absolute;
        text-align: center;
      }

      .card-action span {
       font-family: Folio;
       text-transform: uppercase;
       font-size: 2em;
       color: white;
       position: absolute;
       width: 250px;
       top: 28px;
       left: 0;
       right: 0;
       bottom: 0;
       margin: auto;
       letter-spacing: 3px;
      }

    </style>

    <app-dialog id="acceptedDialog">
      <accept-mission-modal></accept-mission-modal>
    </app-dialog>

    <app-scrollable-dialog id="finishedDialog" modal>
      <finish-mission-modal user="[[user]]" mission-id="{{mission.id}}"></finish-mission-modal>
    </app-scrollable-dialog>

    <app-besouro-api id="api"></app-besouro-api>
    <div class="card mission-card">
      <div class="card-header">
          <iron-image sizing="cover" class="campaign" src="{{candidatePhoto}}"></iron-image>
          <span class="author">{{missionOwner()}}</span>
          <p class="timing"> <iron-icon icon="app:watch-later"></iron-icon> {{remainingTime}} </p>
        </a>
        <paper-icon-button class="go" on-tap="_goToMission" icon="app:arrow-forward"></paper-icon-button>
      </div>
      <div class="card-content">
        <h1> {{mission.title}} </h1>
        <p> {{mission.description}} </p>
      </div>

      <iron-image sizing="cover" preload="" fade="" src="{{missionImage}}"></iron-image>
        <div class="card-action">
          <a href="#" id="btnLink"><span id="btnText">{{btnAction}}</span></a>
        </div>

      <div class="card-footer">
        <div class="stats">
          <span><span class="stats-number">{{accepted}}</span> aceitaram</span>
          <span id="statsSeparator">&nbsp|&nbsp</span>
          <span><span class="stats-number">{{concluded}}</span> concluiram</span>
          <span id="statsSeparator">&nbsp|&nbsp</span>
          <span><span class="stats-number">{{pending}}</span> pendentes</span>
          <paper-button on-tap="_goToMission">
            <iron-icon icon="app:chat-bubble-outline"></iron-icon>
          </paper-button>
        </div>
      </div>
      <mission-player id="player" mission-image="{{missionImage}}" mission="{{mission}}" mission-key="{{key}}">
      </mission-player>
    </div>
`;
  }

  static get is() { return 'mission-card'; }

  static get properties() {
    return {
      mission: {
        type: Object,
        observer: 'setMissionData'
      },
      gsUri: String,
      missionImage: {
        type: String
      },
      key: String,
      fileArray: {
        type: Array,
        value: []
      },
      candidatePhoto: String,
      remainingTime: {
        type: String,
        value: "xx dias restantes"
      },
      currentMissionStats: String,
      btnAction: String,
      finishMissionFunc: Function,
      acceptMissionFunc: Function,
      user: Object
    }
  }

  constructor() {
    super();
  }

  _goToMission() {
    this.dispatchEvent(new CustomEvent('show-mission', { detail: { mission: this.mission.id } }))
  }

  _reloadInbox() {
    this.dispatchEvent(new CustomEvent('reload-inbox', { detail: {} }))
  }

  setMissionData(mission) {
    this._setMissionStats();
    this.set("missionImage", `${this.$.api.baseUrl}${mission.image}`)
    this.$.api.method = "GET";
    this.$.api.path = `missions/${mission.id}/statistics`;
    this.$.api.request().then(function(ajax) {
      this.set("accepted", ajax.response.accepted);
      this.set("concluded", ajax.response.realized);
      this.set("pending", ajax.response.pending);
    }.bind(this));
  }

  _setMissionStats() {
    this.$.api.method = "GET";
    this.$.api.path = `missions/${this.mission.id}/user-status/${this.user.uid}`;
    this.$.api.request().then(function(ajax) {
      this.set("currentMissionStats", ajax.response.status);
      this._setActionBtn();
    }.bind(this));
  }

  _setActionBtn() {
    const cardAction = this.shadowRoot.querySelector(".card-action");
    const link = this.$.btnLink;
    link.removeEventListener("tap", this.acceptMissionFunc, false);
    link.removeEventListener("tap", this.finishMissionFunc, false);

    if (this.currentMissionStats == "realized") {
      this.set('btnAction', 'Missão concluida');
      cardAction.setAttribute("style", "background-color: rgba(173, 174, 178, 0.8);");
      this.$.btnText.setAttribute("style", "width: 300px;");
    }

    if (this.currentMissionStats == "new") {
      this.set('btnAction', 'Aceitar missão');
      link.addEventListener('tap', this.acceptMissionFunc);
      cardAction.setAttribute("style", "background-color: rgba(216, 28, 136, 0.8);");
    }

    if (this.currentMissionStats == "started") {
      this.set('btnAction', 'Concluir missão');
      link.addEventListener('tap', this.finishMissionFunc);
      cardAction.setAttribute("style", "background-color: rgba(31, 163, 208, 0.8);");
    }

    if (this.currentMissionStats == "pending") {
      this.set("btnAction", "Avaliação pendente");
      cardAction.setAttribute("style", "background-color: rgba(173, 174, 178, 0.8);");
      this.$.btnText.setAttribute("style", "width: 300px;");
    }

    if (this.currentMissionStats == "rejected") {
      this.set("btnAction", "Avaliação rejeitada");
      cardAction.setAttribute("style", "background-color: rgba(173, 174, 178, 0.8);");
      this.$.btnText.setAttribute("style", "width: 300px;");
    }
  }

  missionOwner() {
    if (!this.mission.owner) return;
    return this.mission.owner.display_name.split(".")[1];
  }

  _acceptMission() {
    this.$.api.method = "POST";
    this.$.api.path = `missions/accept`;
    this.$.api.body = {"id": this.mission.id, "user_id": this.user.uid };
    this.$.api.user = this.user;
    this.$.api.request().then(function(ajax) {
      this._reloadInbox();
    }.bind(this));
   this.$.acceptedDialog.present();
  }

  _finishMission(e) {
    this.$.finishedDialog.present();
    this._setMissionStats();
    this._setActionBtn();
  }

  ready() {
    super.ready();
    this.shadowRoot.querySelector('finish-mission-modal').shadowRoot.querySelector('finish-confirmation-modal').addEventListener('close-modal', this._dismissFinishModal.bind(this));
    this.acceptMissionFunc = this._acceptMission.bind(this);
    this.finishMissionFunc = this._finishMission.bind(this);
  }

  _dismissFinishModal() {
    this.set('currentMissionStats', 'new');
    document.querySelector('#finishConfirmation').dismiss();
    this._setMissionStats();
    this._setActionBtn();
    this.$.finishedDialog.dismiss();
  }
}
customElements.define(MissionCard.is, MissionCard);
