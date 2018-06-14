import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../vaadin-date-picker/vaadin-date-picker.js';
import '../../../polymerfire/firebase-storage-ref.js';
import '../../../@polymer/iron-image/iron-image.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import '../mixin-elements/mission-duration-mixin.js';
import './mission-player.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
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
      }
      .card-header span {
        font-size: 1.1em;
        position: absolute;
        bottom: 35px;
        left: 75px;
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
        color: black;
        font-weight: bold;
      }
      .card-content p {
        font-size: 0.8em;
        line-height: 1.5;
        flex-grow: 1;
        max-height: 6em;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }

      .card-header .timing {
        font-size: 0.8em;
        position: absolute;
        bottom: 0;
        left: 75px;
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
        padding: 20px 10px;
        font-size: 0.9rem;
      }
      .card-footer .stats .stats-number {
        color: var(--accent-color);
        font-weight: bold;
      }
      .card-footer .stats paper-button {
        border: none;
        text-transform: none;
        font-size: 0.9em;
        float: right;
        margin-top: -12px;
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
    </style>

    <firebase-storage-ref id="campaignRef">
    </firebase-storage-ref>

    <firebase-document id="campaign" data="{{campaign}}" log="true">
    </firebase-document>

    <div class="card mission-card">
      <div class="card-header">
        <a href="/show-campaign/{{mission.cid}}">
          <iron-image sizing="cover" class="campaign" src="{{candidatePhoto}}"></iron-image>
          <span>{{campaign.content.name}}</span>
          <p class="timing"> <iron-icon icon="app:watch-later"></iron-icon> {{remainingTime}} </p>
        </a>
        <paper-icon-button class="go" on-tap="_goToMission" icon="app:arrow-forward"></paper-icon-button>
      </div>
      <dom-if if="{{!hasMessage}}">
        <template>
          <div class="card-content">
            <h1> {{mission.title}} </h1>
            <p> {{mission.description}} </p>
          </div>
          <iron-image sizing="cover" preload="" fade="" src="{{missionImage}}"></iron-image>
        </template>
      </dom-if>
      <dom-if if="{{hasMessage}}">
        <template>
        <div class="card-content">
          <h1> {{mission.title}} </h1>
          <div class="message">
            {{message}}
          </div>
        </div>
        </template>
      </dom-if>
      <div class="card-footer">
        <div class="stats">
          <span><span class="stats-number">{{accepted}}</span> aceitaram | </span>
          <span><span class="stats-number">{{concluded}}</span> concluiram</span>
          <paper-button on-tap="_goToMission">
            <iron-icon icon="app:chat-bubble-outline"></iron-icon>
            Comentar
          </paper-button>
        </div>
      </div>
      <dom-if if="{{!hasMessage}}">
        <template>
          <mission-player id="player" mission-image="{{missionImage}}" mission="{{mission}}" mission-key="{{key}}">
          </mission-player>
        </template>
      </dom-if>
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
      remainingTime: {
        type: String,
        computed: 'calcMissionDate(mission)'
      },
      fileArray: {
        type: Array,
        value: []
      },
      campaign: {
        type: Object,
        observer: "_onCampaignChanged"
      },
      candidatePhoto: String
    }
  }

  constructor() {
    super();
  }

  _goToMission() {
    this.dispatchEvent(new CustomEvent('show-mission', { detail: { mission: this.key } }))
  }

  setMissionData(mission) {
    const cid = mission.cid;
    this.$.campaign.path = `/campaigns/${cid}`;
    this.set('accepted', mission.usersAccepted ? mission.usersAccepted.length : '0');
    this.set('concluded', mission.usersFinished ? mission.usersFinished.length: '0');
    this.set('hasMessage', mission.receipts ? mission.receipts.reduce(function (t, r) {
      return t || (r.uid === this.uid && r.status === 'realized');
    }.bind(this), false) : false);
    if(this.hasMessage) {
      this.set('message', 'Obrigado por colaborar conosco nessa missão! Com sua ajuda, somos mais fortes!');
    }
  }

  _onCampaignChanged() {
    if (Object.keys(this.campaign).length == 0) return;
    this.$.campaignRef.getDownloadURL(`/campaigns/${this.mission.cid}/${this.campaign.content.candidateImage}`).then(function(photo) {
      this.set("candidatePhoto", photo);
    }.bind(this));
  }
}
customElements.define(MissionCard.is, MissionCard);
