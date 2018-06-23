import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-image/iron-image.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
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

    <app-besouro-api id="api"></app-besouro-api>
    <div class="card mission-card">
      <div class="card-header">
        <a href="/show-campaign/1">
          <iron-image sizing="cover" class="campaign" src="{{candidatePhoto}}"></iron-image>
          <span>algum texto aqui</span>
        </a>
        <paper-icon-button class="go" on-tap="_goToMission" icon="app:arrow-forward"></paper-icon-button>
      </div>
      <div class="card-content">
        <h1> {{mission.title}} </h1>
        <p> {{mission.description}} </p>
      </div>
      <iron-image sizing="cover" preload="" fade="" src="{{missionImage}}"></iron-image>
      <div class="card-footer">
        <div class="stats">
          <span><span class="stats-number">{{accepted}}</span> aceitaram | </span>
          <span><span class="stats-number">{{concluded}}</span> concluiram</span>
          <span><span class="stats-number">{{pending}}</span> pendentes</span>
          <paper-button on-tap="_goToMission">
            <iron-icon icon="app:chat-bubble-outline"></iron-icon>
            Comentar
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
      candidatePhoto: String
    }
  }

  constructor() {
    super();
  }

  _goToMission() {
    this.dispatchEvent(new CustomEvent('show-mission', { detail: { mission: this.mission.id } }))
  }

  setMissionData(mission) {
    this.set("missionImage", `http://localhost:8000/local${mission.fileUpload}`)
    this.$.api.method = "GET";
    this.$.api.path = `missions/${mission.id}/statistics`;
    this.$.api.request().then(function(ajax) {
      this.set("accepted", ajax.response.accepted);
      this.set("concluded", ajax.response.realized);
      this.set("pending", ajax.response.pending);
    }.bind(this));
  }
}
customElements.define(MissionCard.is, MissionCard);
