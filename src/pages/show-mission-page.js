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
        background: var(--secondary-background-color);
        @apply --default-font;
        height: 100vh;
        --layer-image: '';
      }

      mission-player { margin: auto; }

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

      app-header[shadow] { color: black; }

      app-header[shadow] .tall {
        background: unset;
        width: 100px;
      }

      app-header[shadow] .tall .actions { display: none; }

      .tall { height: 158px; }

      .tall .actions {
        position: absolute;
        bottom: 5px;
        right: 5px;
      }

      h1.title[main-title] { margin: 5px 20px; }

      h3 {
        color: var(--dark-primary-color);
        margin: 5px 0;
      }

      .dark { color: black; }

      .timing { font-size: 0.6em; }

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

      .comment .message paper-input { flex: 1; }

      .comment .message paper-button { margin: auto 5px 5px; }

      .hide[disabled] { opacity: 0.4; }

      .mission-author {
        display: flex;
        background-color: var(--primary-background-color);
        height: 60px;
        padding: 5px 0 5px 10px;
      }

      .author-photo { margin-top: 5px; }

      .author-photo iron-image {
        height: 50px;
        width: 50px;
        border-radius: 50%;
      }

      .author-name {
        margin-left: 5px;
        margin-top: 9px;
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

      #share-btn { padding: 4px 0px; }
      #share-btn paper-icon-button { color: var(--dark-primary-color); }

      .stats {
        height: 25px;
        font-size: 0.9em;
      }

      .stats-content {
        width: 80%;
        margin: auto;
        text-align: center;
      }

      .stats-content div {
        margin-right: 5px;
        display: inline;
      }

      .stats-value { color: var(--light-accent-color); }

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
        padding: 10px 0px;
      }
      .comments h2 { margin: 0; }
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
          <h1 condensed-title="" class="dark title">{{mission.title}}</h1>
          <paper-menu-button horizontal-align="right">
            <paper-icon-button icon="app:more-vert" slot="dropdown-trigger"></paper-icon-button>
            <paper-listbox slot="dropdown-content">
              <paper-item on-tap="_editMission">Editar missão</paper-item>
            </paper-listbox>
          </paper-menu-button>
        </app-toolbar>
        <app-toolbar class="tall">
          <h1 bottom-item="" main-title="" class="title">
            {{mission.title}}
            <div class="timing">
              <iron-icon icon="app:watch-later"></iron-icon>
              <span>{{remainingTime}}</span>
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
          <iron-image src="{{candidatePhoto}}" sizing="contain"></iron-image>
        </div>
        <div class="author-name">
          <span>Criado por</span>
          <span id="author">USER</span>
        </div>
      </div>
      <div class="stats">
        <div class="stats-content">
          <div>
            <a on-tap="_openAcceptedMissionList">
              <span class="stats-value">0</span> <span>aceitaram</span>
            </a>
          </div>
          <div>
            <a on-tap="_openFinishedMissionList">
              <span class="stats-value">0</span> <span>concluiram</span>
            </a>
          </div>
          <div>
            <a on-tap="_openMissionReceipts"><span class="stats-value">0</span> <span>pendentes</span></a>
          </div>
        </div>
      </div>

      <div id="action">
        <paper-button id="btnAction" toggles="" raised="">
          <iron-icon icon="{{actionIcon}}"></iron-icon>
          <span id="actionText">{{btnAction}}</span>
        </paper-button>
      </div>

      <template is="dom-if" if="{{mission}}">
        <div class="content">
          <h3>Entenda a missão</h3>
          <p>{{mission.description}}</p>

          <a id="leaveMission" href="#">Desistir dessa missão</a>
        </div>

        <div class="share-mission">
          <div class="share-mission-content">
            <h3>Compartilhar missão</h3>
            <div id="share-btn">
              <paper-icon-button on-tap="_shareMission" icon="app:share"></paper-icon-button>
            </div>
          </div>
        </div>

            <div class="comments">
              <h2>Comentários</h2>
              <dom-repeat items="{{comments}}" as="comment">
                <template>
                  <mission-comment user-photo="[[comment.content.image]]" comment="{{comment.content}}" key="{{comment.key}}">
                  </mission-comment>
                </template>
              </dom-repeat>
              <div class="comment">
                <dom-if if="{{user}}">
                  <template>
                    <div class="message">
                      <paper-input id="commentInput" label="Escreva um comentário" required="" error-message="O campo não pode ser vazio.">
                      </paper-input>
                      <paper-button on-tap="addComment" class="plain">Enviar</paper-button>
                    </div>
                  </template>
                </dom-if>
                <dom-if if="{{!user}}">
                  <template>
                    Faça o <a href="/login">login</a> para comentar.
                  </template>
                </dom-if>
              </div>
            </div>
        </template>
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
      candidatePhoto: String,
      remainingTime: {
        type: String,
        computed: 'calcMissionDate(mission.content)'
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
      acceptedMissionStats: {
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
      username: this.user.displayName,
      image: this.user.photoURL,
      text: input.value
    };
    this.$.query.ref.push({ content });
    input.value = "";
  }

  _acceptMission(e) {
    this.$.api.method = "POST";
    this.$.api.path = `missions/accept`;
    this.$.api.body = {"id": this.data.key, "user_id": "1" };
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
    if(missionImage && this.mission.content) {
      this.updateStyles({ '--layer-image': `url(${missionImage})` });
    }
  }

  _finishMission(e) {
    this.$.finishedDialog.present();
    this._calcMissionStats();
    this._setActionBtn();
  }

  _openMissionReceipts() {
    if (this.mission.content.usersPending &&
      this.mission.content.usersPending.length > 0 &&
      this.mission.content.uid == this.user.uid) {
      this.set('route.path', `/mission-receipts/${this.data.key}`);
    }
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
    this.$.api.method = "GET";
    this.$.api.path = `missions/${this.data.key}/user-status/${1}`;
    this.$.api.request().then(function(ajax) {
      this.set("currentMissionStats", ajax.response.status);
      this._setActionBtn();
    }.bind(this));
  }

  userAcceptedMission() {
    if (this.mission.users.length == 0) return false;
    if (this.mission.users.includes(1)) return true;
  }

  _setActionBtn() {
    const btn = this.$.btnAction;
    const btnText = this.$.actionText;
    btn.classList = [];
    btn.removeEventListener("tap", this.acceptMissionFunc, false);
    btn.removeEventListener("tap", this.finishMissionFunc, false);
    btnText.classList.add("btn-text-mission");

    if (this.currentMissionStats == "realized") {
      this.set('btnAction', 'Missão concluida');
      btn.classList.add("btn-realized-mission");
    }

    if (this.currentMissionStats == "new") {
      this.set('btnAction', 'Aceitar missão');
      btn.classList.add("btn-new-mission");
      btn.addEventListener('tap', this.acceptMissionFunc);
    }

    if (this.currentMissionStats == "started") {
      this.set('btnAction', 'Concluir missão');
      btn.classList.add("btn-started-mission");
      btn.addEventListener('tap', this.finishMissionFunc);
    }

    if (this.currentMissionStats == "pending") {
      this.set("btnAction", "Avaliação pendente");
      this.set("actionIcon", "app:report");
      btn.classList.add("btn-realized-mission");
    }

    if (this.currentMissionStats == "rejected") {
      this.set("btnAction", "Avaliação rejeitada");
      this.set("actionIcon", "app:report");
      btn.classList.add("btn-realized-mission");
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

  _campaignChanged() {
    if ((Object.keys(this.mission)[0] == "content") && (Object.keys(this.campaign)[0] == "content"))
      this.$.campaignRef.getDownloadURL(`/campaigns/${this.mission.content.cid}/${this.campaign.content.candidateImage}`).then(function(photo) {
        this.set("candidatePhoto", photo);
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
}
window.customElements.define(ShowMissionPage.is, ShowMissionPage);
