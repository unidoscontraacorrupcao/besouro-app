import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-image/iron-image.js';

import '../app-elements/shared-styles.js';
import '../app-elements/app-dialog.js';
import '../app-elements/app-scrollable-dialog.js';
import '../mission-elements/accept-mission-modal.js';
import '../trophy-elements/blocked-mission-modal.js';
import '../mission-elements/finish-mission-modal.js';
import {CommonBehaviorsMixin} from '../mixin-elements/common-behaviors-mixin.js';
import './mission-player.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

/**
 * @polymer
 * @MissionCard
 * @appliesMixin CommonBehaviorsMixin
 */
class MissionCard extends CommonBehaviorsMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
      }

      .mission-card {
        padding: 0px;
        line-height: 0.7;
        position: relative;
        max-width: 500px;
        margin: 10px auto 0px auto;
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
        padding: 5px;
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
        text-overflow: unset;
        white-space: unset;
        overflow: unset;
      }

      .author {
        color: #343434;
        font-family: Folio;
      }

      .card-content p  > p { display: none; }
      .card-content p:nth-child(1) {
        font-size: 1.2em;
        flex-grow: 1;
        max-height: 6em;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        font-family: Folio;
        margin: 15px 0 0 0;
        line-height: 1;
      }

      .timing, .card-content p { color: var(--light-text-color); }

      .timing span {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 21px;
        right: 0;
        width: 160px;
        font-size: 1.1rem;
      }

      .card-header .timing {
        font-size: 1.3em;
        position: absolute;
        bottom: 0;
        left: 75px;
        top: 25px;
        font-family: Folio;
      }

      .go {
        position: absolute;
        bottom: 15px;
        right: 10px;
      }

      #card-image { margin-top: 10px; }
      .card-footer { height: 60px; }

      .card-footer .stats {
        font-family: Folio;
        padding-top: 22px;
        display: flex;
        width: 90%;
        margin: 0px auto 0px auto;
        color: var(--light-text-color);
        font-size: 1.2rem;
      }
      .card-footer .stats .stats-number {
        color: var(--accent-color);
        font-weight: bold;
      }
      .card-footer .stats paper-button {
        border: none;
        text-transform: none;
        margin-top: -11px;
      }

      .card-footer .stats div {
        margin: 0;
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

      .card-action a { text-decoration: none; }
      .card-action span {
        font-family: Folio;
        text-transform: uppercase;
        font-size: 2em;
        color: white;
        position: relative;
        width: 250px;
        top: 28px;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        letter-spacing: 3px;
      }

    .card-action-bg {
      width: 300px !important;
      font-size: 1.5rem !important;
    }

      .mission-started {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 35%;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 90%;
        text-align: center;
        line-height: 1.2;
        height: 300px;
      }

      .mission-started span {
        position: absolute;
        top: 100px;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        font-family: folio;
        font-size: 32px;
        color: white;
        letter-spacing: 2px;
        text-transform: uppercase;
      }

    .card-blocked {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 35%;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 90%;
      text-align: center;
      line-height: 1.2;
      height: 300px;
    }

    .card-blocked > * {
      margin-bottom: 20px;
      font-family: Folio;
    }

    #blockedText {
      font-size: 32px;
      text-transform: uppercase;
      color: var(--light-text-color);
      letter-spacing: 5px;
    }

    #blockedDetail {
      color: var(--accent-color);
      font-size: 24px;
    }

    .card-blocked paper-icon-button {
      width: 105px;
      height: 105px;
    }

    @media only screen and (max-width: 460px) {
      .card-footer .stats {
      font-size: 1.0rem;
      }
    }

    @media only screen and (max-width: 390px) {
      .card-footer .stats {
      width: 95%;
      font-size: 0.9rem;
      }

      .card-action-bg {
        width: 230px !important;
        font-size: 1.2rem !important;
      }
    }

    @media only screen and (max-width: 330px) {
      .stats { font-size: 1rem;}
      .card-footer .stats { width: 98%; }
      .card-action span { font-size: 1.5em };

    }
    </style>

    <app-dialog id="acceptedDialog">
      <accept-mission-modal
        on-modal-show-mission="_modalGoToMission"
        trophy="{{mission.id}}"
        on-close-modal="_closeModal">
      </accept-mission-modal>
    </app-dialog>

    <app-dialog id="blockedDialog">
      <blocked-mission-modal
        trophy-id="{{mission.trophy}}"
        on-close-modal="_closeBlockedModal">
      </blocked-mission-modal>
    </app-dialog>

    <app-scrollable-dialog id="finishedDialog">
      <finish-mission-modal
        user="[[user]]"
        mission-id="{{mission.id}}">
      </finish-mission-modal>
    </app-scrollable-dialog>

    <app-besouro-api id="api"></app-besouro-api>

    <div class="card mission-card">

      <div class="card-header" on-tap="_goToMission">
        <iron-image
        sizing="cover"
        class="campaign"
        src="{{candidatePhoto}}">
        </iron-image>
          <span class="author">{{missionOwner()}}</span>
          <p class="timing">
            <iron-icon icon="app:mission-timing-card"></iron-icon>
            <span id="remaining-time">{{mission.remainig_days}}</span>
          </p>
          <paper-icon-button
          class="go"
          on-tap="_goToMission"
          icon="app:arrow-forward">
        </paper-icon-button>
      </div>

      <div class="card-content" on-tap="_goToMission">
        <h1> {{mission.title}} </h1>
        <!-- description field is inserted by the insertDescriptionHtml method -->
        <p></p>
      </div>

      <div id="card-image">

        <iron-image
          sizing="cover"
          preload="" fade=""
          src="{{missionImage}}">
        </iron-image>

      <div class="card-blocked">
        <div>
          <paper-icon-button icon="app:mission-blocked"></paper-icon-button>
        </div>
        <span id="blockedText"> {{btnAction}} </span>
        <a id="btnLink" on-tap="_openBlockedMissionModal"><span id="blockedDetail">detalhes</span></a>
      </div>

      <div class="mission-started">
        <span> {{btnAction}} </span>
      </div>

      </div>

      <div class="card-action">
        <a href="#" id="btnLink"><span id="btnText">{{btnAction}}</span></a>
      </div>

      <div class="card-footer">
        <div class="stats">
          <div>
           <span>
              <span class="stats-number">{{accepted}} </span>
              aceitaram <span class="space">&nbsp;&verbar;&nbsp;</span>
            </span>
          </div>

          <div>
            <span>
              <span class="stats-number">{{concluded}}</span>
              concluiram <span class="space">&nbsp;&verbar;&nbsp;</span>
            </span>
          </div>

          <div>
           <span><span class="stats-number">{{pending}}</span> pendentes</span>
          </div>

          <paper-button on-tap="_goToMission">
            <iron-icon icon="app:mission-comments"></iron-icon>
            <span>&nbsp;{{mission.comments_count}}</span>
          </paper-button>

        </div>
      </div>

      <mission-player
        id="player"
        mission-image="{{missionImage}}"
        mission="{{mission}}"
        mission-key="{{key}}">
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
      currentMissionStats: String,
      btnAction: String,
      finishMissionFunc: Function,
      acceptMissionFunc: Function,
      decriptionAsHtml: {
        type: String,
        value: ''
      },
      user: Object
    }
  }

  constructor() { super(); }

  _goToMission(e) {
    if (!(this.currentMissionStats == "blocked"))
      this.dispatchEvent(new CustomEvent('show-mission',
        { detail: { mission: this.mission.id } }));
  }

  _modalGoToMission() {
    this.dispatchEvent(new CustomEvent('modal-show-mission',
      { detail: { mission: this.mission.id } }));
    this.$.acceptedDialog.dismiss();
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
    this._setOwnerPhoto();
    this.insertDescriptionHtml(".card-content p");
  }

  _setOwnerPhoto() {
    const ownerId = this.mission.owner.id;
    this.$.api.method = "GET";
    this.$.api.path = `profiles/${ownerId}/`;
    this.$.api.request().then(function (ajax) {
      if(ajax.response.image) {
        this.set('candidatePhoto', ajax.response.image);
      } else {
        this.set('candidatePhoto', '/images/generic/avatar_default-thumb.png');
      }
    }.bind(this));
  }

  _setMissionStats() {
    if (!this.user || Object.keys(this.user).length == 0) {
      this.set("currentMissionStats", "new");
      setTimeout(this._setActionBtn.bind(this), 100);
    }
    else {
      if (this.mission.blocked) {
        this.set("currentMissionStats", "blocked");
        setTimeout(this._setActionBtn.bind(this), 100);
      }
      else{
        this.$.api.method = "GET";
        this.$.api.path = `missions/${this.mission.id}/user-status/${this.user.uid}`;
        this.$.api.request().then(function(ajax) {
          this.set("currentMissionStats", ajax.response.status);
          this._setActionBtn();
        }.bind(this));
      }
    }
  }

  _setActionBtn() {
    const cardAction = this.shadowRoot.querySelector(".card-action");
    const link = this.$.btnLink;
    this.set('btnAction', '');
    this._unsetCardImageGradient();
    link.removeEventListener("tap", this.acceptMissionFunc, false);
    link.removeEventListener("tap", this.finishMissionFunc, false);

    if (this.currentMissionStats == "blocked") {
      const cardBlocked = this.shadowRoot.querySelector(".card-blocked");
      this._setCardImageGradient("rgba(49,39,131,0.85)", "rgba(49,39,131,0.85)", cardBlocked);
      this.set('btnAction', 'missão bloqueada');
    }

    if (this.currentMissionStats == "realized") {
      const card = this.shadowRoot.querySelector(".mission-started");
      this._setCardImageGradient("rgba(173, 174, 178, 0.8)", "rgba(173, 174, 178, 0.8)", card);
      this.$.btnText.setAttribute("id", "card-action-bg");
      this.set('btnAction', 'missão concluida');
    }

    if (this.currentMissionStats == "new") {
      link.addEventListener('tap', this.acceptMissionFunc);
      cardAction.setAttribute("style", "background-color: rgba(216, 28, 136, 0.8);");
      this.set('btnAction', 'aceitar');
    }

    if (this.currentMissionStats == "started") {
      this.set('btnAction', 'missão aceita');
      const card = this.shadowRoot.querySelector(".mission-started");
      this._setCardImageGradient("rgba(216, 28, 136, 0.8)", "rgba(216, 28, 136, 0.8)", card);
      link.addEventListener('tap', this.finishMissionFunc);
    }

    if (this.currentMissionStats == "pending") {
      const card = this.shadowRoot.querySelector(".mission-started");
      this._setCardImageGradient("rgba(173, 174, 178, 0.8)", "rgba(173, 174, 178, 0.8)", card);
      this.$.btnText.setAttribute("class", "card-action-bg");
      this.set("btnAction", "avaliação pendente");
    }

    if (this.currentMissionStats == "rejected") {
      this.set("btnAction", "rejeitada");
      cardAction.setAttribute("style", "background-color: rgba(173, 174, 178, 0.8);");
      this.$.btnText.setAttribute("class", "card-action-bg");
    }
  }

  _setCardImageGradient(firstColor, secondColor, card) {
      const cardAction = this.shadowRoot.querySelector(".card-action");
      cardAction.setAttribute("style", "display: none;");
      card.setAttribute("style", "display: flex;");
      var image = this.shadowRoot.querySelector("#card-image iron-image");
      var sizedImgDiv = image.shadowRoot.querySelector("#sizedImgDiv")
      var backgroundImage = sizedImgDiv.style.backgroundImage;
      var imageAsArray = backgroundImage.split(",");
      if (imageAsArray.length == 0)
        sizedImgDiv.style.backgroundImage = `linear-gradient(to right,${firstColor}, ${secondColor}), ${imageAsArray[0]}`;
    else {
        var imageArrayUrl = imageAsArray[imageAsArray.length - 1]
        sizedImgDiv.style.backgroundImage = `linear-gradient(to right,${firstColor}, ${secondColor}), ${imageArrayUrl}`;
    }
  }

  _unsetCardImageGradient() {
      this.shadowRoot.querySelector(".card-blocked").style.display = "none";
      this.shadowRoot.querySelector(".mission-started").style.display = "none";
      var image = this.shadowRoot.querySelector("#card-image iron-image");
      var sizedImgDiv = image.shadowRoot.querySelector("#sizedImgDiv")
      var backgroundImage = sizedImgDiv.style.backgroundImage;
      var imageAsArray = backgroundImage.split(",");
      if (imageAsArray.length == 0)
        sizedImgDiv.style.backgroundImage = `${imageAsArray[0]}`;
    else {
        var imageArrayUrl = imageAsArray[imageAsArray.length - 1]
        sizedImgDiv.style.backgroundImage = `${imageArrayUrl}`;
    }
  }


  missionOwner() {
    if (!this.mission.owner) return;
    var name = this.mission.owner.display_name.split(".")[1];
    if (name != undefined)
      return this.mission.owner.display_name.split(".")[1];
    else
      return this.mission.owner.name;
  }

  _acceptMission() {
    if (!this.user || Object.keys(this.user).length == 0) {
      this.dispatchEvent(new CustomEvent('open-restrict-modal', {}))
      return;
    }
    this.$.api.method = "POST";
    this.$.api.path = `missions/accept`;
    this.$.api.body = {"id": this.mission.id, "user_id": this.user.uid };
    this.$.api.user = this.user;
    this.$.api.request().then(function(ajax) {
      this._addUserOnMissionChanel();
      this.currentMissionStats = "started";
      this._setActionBtn();
      this.$.acceptedDialog.present();
    }.bind(this));
  }

  _addUserOnMissionChanel() {
    this.$.api.method = "PUT";
    this.$.api.path = "channels/add-to-group-channel";
    this.$.api.body = {"user_id": this.user.uid, "sort": `conversation-${this.mission.id}`};
    this.$.api.user = this.user;
    return this.$.api.request().then(() => {});
  }

  _finishMission(e) {
    this.$.finishedDialog.present();
    this._setMissionStats();
    this._setActionBtn();
  }


  _dismissFinishModal() {
    this.set('currentMissionStats', 'new');
    this._setMissionStats();
    this._setActionBtn();
    this.$.finishedDialog.dismiss();
    this.dispatchEvent(new CustomEvent('check-user-trophies'));
  }

  _closeModal() { this.$.acceptedDialog.dismiss(); }
  _closeBlockedModal() { this.$.blockedDialog.dismiss(); }
  _openBlockedMissionModal() { this.$.blockedDialog.present(); }

  ready() {
    super.ready();
    this.shadowRoot.querySelector('finish-mission-modal').addEventListener('close-modal', this._dismissFinishModal.bind(this));
    this.acceptMissionFunc = this._acceptMission.bind(this);
    this.finishMissionFunc = this._finishMission.bind(this);
  }
}
customElements.define(MissionCard.is, MissionCard);
