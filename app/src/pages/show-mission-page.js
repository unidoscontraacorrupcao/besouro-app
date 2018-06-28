import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-progress/paper-progress.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-listbox/paper-listbox.js';

import '../app-elements/app-scrollable-dialog.js';
import '../app-elements/app-form-header.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import '../mission-elements/mission-comment.js';
import '../mission-elements/mission-player.js';
import '../mission-elements/accept-mission-modal.js';
import '../mission-elements/reject-mission-modal.js';
import '../mission-elements/finish-mission-modal.js';
import '../mission-elements/mission-receipt.js';
import '../app-elements/app-besouro-api.js';
import {MissionDurationMixin} from '../mixin-elements/mission-duration-mixin.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class ShowMissionPage extends MissionDurationMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>

      :host {
        display: block;
        background: white;
        @apply --default-font;
        height: 100vh;
        --layer-image: '';
      }

      .content h2 {
        font-size: 1.3em;
        font-family: Folio;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }

      .content p {
        font-size: 1.1em;
        color: rgba(51,51,51,1);
        font-family: helvetica-light;
      }

      mission-player { margin: auto; }

      app-header {
        height: 320px;
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

      app-header[shadow] { color: black; }

      app-header[shadow] .tall {
        background: unset;
        width: 100px;
      }

      app-header[shadow] .tall .actions { display: none; }

      app-toolbar {
        width: 93%;
        margin: auto;
      }
      .tall { height: 245px; }

      .tall .actions {
        position: absolute;
        bottom: 5px;
        right: 5px;
      }

      paper-icon-button {
        padding: 0;
        color: white;
      }

      h1.title[main-title] {
        color: white;
        text-transform: uppercase;
        font-family: Folio;
        font-size: 2em;
        padding-top: 10px;
      }

      h3 {
        color: var(--dark-primary-color);
        margin: 5px 0;
      }

      .dark { color: black; }

      .timing {
        font-size: 0.6em;
        margin-top: 25px;
        text-transform: none;
      }

      .timing iron-icon { height: 15px; }

      .progress {
        position: absolute;
        top: 0; bottom: 0;
        left: 0; right: 0;
      }

      .progress paper-progress { width: 100%; }

      .progress .spinner {
        height: 125px;
        text-align: center;
        padding-top: 97px;
      }

      .content { padding: 20px 20px; }

      .content p,
      .content h2 { margin: 10px 0; }

      .comment .message { display: flex; }

      .comment .message paper-textarea { flex: 1; }

      .comment .message paper-button { margin: auto 5px 5px; }

      .hide[disabled] { opacity: 0.4; }

      .mission-author {
        display: flex;
        background-color: var(--primary-background-color);
        height: 70px;
        padding: 5px 0 5px 10px;
      }

      .author-photo { margin-top: 5px; }

      .author-photo iron-image {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        background-color: var(--dark-primary-color);
      }

      .author-name {
        margin-left: 10px;
        margin-top: 16px;
        flex-grow: 1;
        font-family: Folio;
        font-size: 1.3em;
      }

      #author {
        display: block;
        margin-top: -10px;
      }

      .share-mission, .stats {
        background-color: #f1f1f1;
      }

      .share-mission { height: 50px; }

      .share-mission .share-mission-content {
        width: 90%;
        margin: auto;
        font-size: 1em;
        display: flex;
      }

      .share-mission .share-mission-content h3 {
        display: inline-block;
        margin: 0;
        flex-grow: 2;
        padding-top: 8px;
      }

      #share-btn { margin: 10px 25px 0 0; }
      #share-btn paper-icon-button { color: var(--dark-primary-color); }

      .stats {
        color: var(--light-text-color);
      }

      .stats .stats-number {
        color: var(--accent-color);
        font-weight: bold;
      }


      .stats-content {
        width: 80%;
        padding: 10px;
        margin: auto;
        text-align: center;
        font-size: 1.2rem;
        font-family: Folio;
        display: flex;
      }

      .stats-content div {
        margin-right: 5px;
        display: inline;
        flex-grow: 1;
      }

      #action {
        text-align: center;
        margin-top: 10px;
        margin-bottom: 10px;
      }

      #action paper-button {
        border-top-left-radius: 27px;
        border-bottom-left-radius: 27px;
        border-top-right-radius: 27px;
        border-bottom-right-radius: 27px;
      }

      .btn-realized-mission { background-color: #C1C6CA; }

      .btn-started-mission { background: linear-gradient(to left, #79BE38, #92D242); }

      .btn-new-mission { background: linear-gradient(to left, var(--light-accent-color), var(--accent-color)); }

      .btn-text-mission {
        color: #ffffff;
        text-transform: initial;
        font-size: 0.8em;
      }

      #action iron-icon {
        color: #ffffff;
        margin-right: 5px;
      }

      paper-item {
        margin-right: 30px;
        margin-left: 10px;
      }

      .comments {
        background-color: var(--primary-background-color);
        padding: 10px 0px 60px 0px;
      }
      .comments h2 { margin-bottom: 20px; }

      .card-action {
        width: 75%;
        max-width: 400px;
        height: 80px;
        margin: auto;
        text-align: center;
        margin-top: 70px;
        margin-bottom: 70px;
      }

      .card-action a { text-decoration: none; }
      .card-action span {
       font-family: Folio;
       text-transform: uppercase;
       font-size: 2em;
       color: white;
       margin: auto;
       letter-spacing: 3px;
      }

      .card-action div { padding-top: 15px; }

      #app-actions {
        position: fixed;
        bottom: 0;
        background: white;
        width: 85%;
        border-top-style: solid;
        border-top-color: #E7E7E7;
        z-index: 1000;
      }

      #app-actions span {
        text-transform: uppercase;
        color: var(--light-text-color);
        font-family: Folio;
      }

      #app-actions #actions-content {
        width: 80%;
        display: flex;
        text-align: center;
        padding-bottom: 5px;
        padding-top: 5px;
      }

      #app-actions #actions-content > * {flex-grow: 1;}

      .icon-container {
        display: flex;
        flex-direction: column;
      }

      .icon-container span { margin-top: -6px; }

      .icon-container > * {
        margin: auto;
      }

      #new-mission-btn {
        margin-top: 20px;
        width: 40px;
        height: 40px;
        background-color: var(--accent-color);
        border-radius: 50%;
        margin: 8px auto;
      }

      #new-mission-btn paper-icon-button {
        width: 40px;
        color: white;
      }

      #app-actions #new-mission-btn paper-icon-button { display: block; }
      #app-actions #missions-btn paper-icon-button {
        display: block;
        padding: 0px;
      }
      #app-actions #notifications-btn paper-icon-button {
        display: block;
        padding: 0px;
      }

   @media only screen and (max-width: 640px) {
      #app-actions { width: 100%; }
      #actions-content {
        width: 90%;
        margin: auto;
    }
  }
    @media only screen and (max-width: 460px) {
      .stats-content { font-size: 1.0rem; }
    }

    @media only screen and (max-width: 390px) {
      .stats-content {
        font-size: 0.9rem;
      }
      .card-action { height: 65px;}
    }
    dhsajkdhjahska

    @media only screen and (max-width: 330px) {
      .card-action span { font-size: 1.5em };
    }
    </style>

    <app-besouro-api id="api"></app-besouro-api>

    <app-route route="{{route}}" pattern="/show-mission/:key" data="{{data}}">
    </app-route>



    <app-scrollable-dialog id="finishedDialog" opened="{{finishedModal}}" modal="">
      <finish-mission-modal user="[[user]]" mission-id="{{data.key}}"></finish-mission-modal>
    </app-scrollable-dialog>

    <app-dialog id="acceptedDialog">
      <accept-mission-modal></accept-mission-modal>
    </app-dialog>

    <app-dialog id="rejectedDialog" opened="{{rejectedModal}}">
      <reject-mission-modal></reject-mission-modal>
    </app-dialog>

    <app-scrollable-dialog id="receiptsDialog">
      <mission-receipts-modal mission-id="{{data.key}}" receipts="{{mission.receipts}}"></mission-receipts-modal>
    </app-scrollable-dialog>

    <app-header-layout has-scrolling-region="">
      <app-header slot="header" fixed="" condenses="" effects="waterfall resize-title blend-background parallax-background">
        <app-toolbar>
          <paper-icon-button icon="app:arrow-back" on-tap="_returnToInbox"></paper-icon-button>
          <h1 condensed-title="" class="main-title">{{mission.title}}</h1>
          <paper-icon-button icon="app:mission-edit"></paper-icon-button>
        </app-toolbar>

        <app-toolbar class="tall">
          <h1 bottom-item="" main-title="" class="title">
            {{mission.title}}
            <div class="timing">
              <iron-icon icon="app:watch-later"></iron-icon>
              <span>{{mission.remainig_days}}</span>
            </div>
          </h1>
          <mission-player id="player" mission-image="{{missionImage}}" mission="{{mission}}" mission-key="{{data.key}}">
          </mission-player>
          <div class="actions">
            {{comments.length}}<paper-icon-button icon="app:chat-bubble-outline"></paper-icon-button>
          </div>
        </app-toolbar>
      </app-header>
      <div class="mission-author">
        <div class="author-photo">
          <iron-image sizing="contain"></iron-image>
        </div>
        <div class="author-name">
          <span>{{ownerName}}</span>
        </div>
        <div id="share-btn">
          <paper-icon-button on-tap="_shareMission" icon="app:share"></paper-icon-button>
        </div>
      </div>

        <div class="stats">
          <div class="stats-content">
            <div>
             <span><span class="stats-number">{{acceptedMissionCount}} </span>aceitaram <span class="space">&nbsp;&verbar;&nbsp;</span></span>
            </div>

            <div>
             <span><span class="stats-number">{{concludedMissionCount}}</span> concluiram <span class="space">&nbsp;&verbar;&nbsp;</span></span>
            </div>

            <div>
             <span><span class="stats-number">{{pendingMissionCount}}</span> pendentes</span>
            </div>
          </div>
        </div>

      <div class="card-action">
        <div>
          <a href="#" id="btnLink"><span id="btnText">{{btnAction}}</span></a>
        </div>
      </div>

      <template is="dom-if" if="{{mission}}">
        <div class="content">
          <h2>Entenda a missão</h2>
          <p>{{mission.description}}</p>

          <h2>recompensa</h2>
          <p>Recompensa da missão</p>

            <div class="comments">
              <h2>Comentários</h2>
              <template is="dom-repeat" items="{{mission.comment_set}}" as="comment">
                  <mission-comment comment="{{comment}}">
                  </mission-comment>
              </template>
              <div class="comment">
                <template is="dom-if" if="{{user}}">
                    <div class="message">
                      <paper-textarea id="commentInput" label="Escreva um comentário" required="" error-message="O campo não pode ser vazio.">
                      </paper-textarea>
                      <paper-button on-tap="addComment" class="plain">Enviar</paper-button>
                    </div>
                  </template>
              </div>
            </div>
        </div>

        </template>

      <div id="app-actions">
        <div id="actions-content">
          <div id="missions-btn">
            <div class="icon-container">
              <paper-icon-button icon="app:navMissions"></paper-icon-button>
              <span>missões</span>
            </div>
          </div>
          <div>
            <div id="new-mission-btn" style="display: none">
              <paper-icon-button on-tap="_openMissionForm" icon="app:add"></paper-icon-button>
            </div>
          </div>
          <div id="notifications-btn">
            <div class="icon-container">
              <paper-icon-button icon="app:navNotifications"></paper-icon-button>
              <span>notificações</span>
            </div>
          </div>
        </div>
        </div>
    </app-header-layout>

    <dom-if if="{{!mission}}">
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

  static get is() { return 'show-mission-page'; }

  static get observers() {
    return [
      'routePathChanged(route.path)'
    ]
  }

  static get properties() {
    return {
      missionAction: {
        type: String,
        value: ''
      },
      selected: {
        observer: '_selectedChanged'
      },
      route: {
        type: Object,
        notify: true
      },
      finishedModal: {
        type: Boolean,
        observer: '_observeFinishedModal'
      },
      rejectedModal: {
        type: Boolean,
        observer: '_observeRejectedModal'
      },
      mission: {
        type: Object
      },
      campaign: {
        type: Object,
        observer: '_campaignChanged'
      },
      userPhoto: {
        type: String
      },
      missionImage: {
        type: String,
        observer: '_setLayerImage'
      },
      data: Object,
      routeData: {
        type: Object,
        notify: true
      },
      receipts: {
        type: Array,
      },
      acceptedMissionCount: {
        type: Number,
        value: 0
      },
      concludedMissionCount: {
        type: Number,
        value: 0
      },
      pendingMissionCount: {
        type: Number,
        value: 0
      },
      currentMissionStats: {
        type: String,
        value: 'new'
      },
      btnAction: String,
      actionIcon: {
        type: String,
        value: "app:check"
      },
      acceptMissionFunc: Function,
      finishMissionFunc: Function,
      address: {
        type: String,
        value: function() {return window.location.origin.concat('/show-mission')}
      },
      sharedMission: {
        type: Object,
        value: function() {}
      },
      ownerName: {
        type: String,
        value: ""
      }
    };
  }

  _selectedChanged(selected) {
    if(!selected) {
      this.$.player.stop();
      this.updateStyles({ '--layer-image': 'linear-gradient(to top, grey, grey)' });
    } else {
      this._setLayerImage(this.missionImage);
    }
  }

  _returnToInbox() {
    this.set('currentMissionStats', 'new');
    this.set('acceptedMissionStats', 0);
    this.set('mission.content.usersFinished', []);
    this.set('mission.content.usersPending', []);
    this.set('route.path', '/');
  }

  _editMission() {
    this.set("route.data", {missionID: this.data.key});
    this.set("route.path", "/mission");
  }
  _observeFinishedModal() {
    if (!this.finishedModal)
      this._returnToInbox();
  }

  _observeRejectedModal() {
    if (!this.rejectedModal)
      this._returnToInbox();
  }

  addComment(e) {
    const input = this.shadowRoot.querySelector('#commentInput');
    if(!input.value) {
      input.invalid = true;
      return;
    } else {
      input.invalid = false;
    }

    const content = {
      user_id: this.user.uid,
      comment: input.value
    };
    this.$.api.method = "POST";
    this.$.api.path = `missions/${this.data.key}/comment/`;
    this.$.api.user = this.user;
    this.$.api.body = content;
    this.$.api.request().then(function(ajax) {
      this._missionChanged();
    }.bind(this));
    input.value = "";
  }

  _acceptMission(e) {
    this.$.api.method = "POST";
    this.$.api.path = `missions/accept`;
    this.$.api.body = {"id": this.data.key, "user_id": this.user.uid };
    this.$.api.request().then(function(ajax) {
      this._missionChanged();
    }.bind(this));
   this.$.acceptedDialog.present();
  }

  _rejectMission(e) {
    this.$.accepted.ref.remove();
    const usersAccepted = new Set(this.mission.content.usersAccepted);
    usersAccepted.delete(this.user.uid);
    this.mission.content.usersAccepted = Array.from(usersAccepted);
    this.$.document.ref.set(this.mission);
    this.$.rejectedDialog.present();
  }

  _setLayerImage(missionImage) {
    if(missionImage && this.mission) {
      this.updateStyles({ '--layer-image': `url(${missionImage})` });
    }
  }

  _finishMission(e) {
    this.$.finishedDialog.present();
    this._calcMissionStats();
    this._setActionBtn();
  }

  _openMissionReceipts() {
    this.set('route.path', `/mission-receipts/${this.data.key}`);
  }

  _openFinishedMissionList() {
    if (this.mission.content.usersFinished &&
      this.mission.content.usersFinished.length > 0) {
      this.set('route.path', `/mission-finished/${this.data.key}`);
    }
  }

  _openAcceptedMissionList() {
    if (this.acceptedMissionStats > 0) {
      this.set('route.path', `/mission-accepted/${this.data.key}`);
    }
  }

  ready() {
    super.ready();
    this.shadowRoot.querySelector('mission-receipts-modal').addEventListener('close-modal', this._dismissReceiptsModal.bind(this));
    this.shadowRoot.querySelector('finish-mission-modal').shadowRoot.querySelector('finish-confirmation-modal').addEventListener('close-modal', this._dismissFinishModal.bind(this));
    this.acceptMissionFunc = this._acceptMission.bind(this);
    this.finishMissionFunc = this._finishMission.bind(this);
  }

  _dismissReceiptsModal() {
    this.set('currentMissionStats', 'new');
    this.$.receiptsDialog.dismiss();
  }

  _dismissFinishModal() {
    this.set('currentMissionStats', 'new');
    document.querySelector('#finishConfirmation').dismiss();
    this.$.finishedDialog.dismiss();
  }

  _calcMissionStats() {
    if (!this.data) return;
    this.$.api.method = "GET";
    this.$.api.path = `missions/${this.data.key}/user-status/${this.user.uid}`;
    this.$.api.request().then(function(ajax) {
      this.set("currentMissionStats", ajax.response.status);
      this._setActionBtn();
    }.bind(this));
    this.$.api.method = "GET";
    this.$.api.path = `missions/${this.data.key}/statistics`;
    this.$.api.request().then(function(ajax) {
      this.set("acceptedMissionCount", ajax.response.accepted);
      this.set("concludedMissionCount", ajax.response.realized);
      this.set("pendingMissionCount", ajax.response.pending);
      this._setActionBtn();
    }.bind(this));
    this._setMissionOwnerName();
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
  /* every time that route is show-mission, we reload the mission */
  routePathChanged(path) {
    if (this.route.__queryParams && this.route.__queryParams["shared"] === "true") {
      this.route["shared"] = this.data.key;
      this.route.__queryParams = {};
    }
    setTimeout(this._missionChanged.bind(this), 100);
  }

  _missionChanged() {
    this.$.api.method = "GET";
    this.$.api.path = `missions/${this.data.key}`;
    this.$.api.request().then(function(ajax) {
      this.set("mission", ajax.response);
      this._calcMissionStats();
    }.bind(this));
  }

  _shareMission(e) {
    const shareMissionNode = this.shadowRoot.querySelector("#shareMenu");
    const clonedNode = shareMissionNode.cloneNode(true);
    //TODO: make clonedNode a property, to be able to remove it later.
    shareMissionNode.addEventListener('iron-overlay-closed', function() {
      document.body.removeChild(clonedNode);
    }.bind(this));
    document.body.appendChild(clonedNode);
    clonedNode.share();
  }

  _setMissionOwnerName() {
    if (!this.mission.owner) return;
    var name = this.mission.owner.display_name.split(".")[1];
    if (name != undefined)
      this.set("ownerName", name);
    else
      this.set("ownerName", this.mission.owner.name);
  }
}
window.customElements.define(ShowMissionPage.is, ShowMissionPage);
