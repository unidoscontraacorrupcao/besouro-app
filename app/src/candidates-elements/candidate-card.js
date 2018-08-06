import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-image/iron-image.js';

import '../app-elements/shared-styles.js';
import '../app-elements/styles/card-shared-styles.js';
import '../app-elements/app-dialog.js';
import '../app-elements/app-scrollable-dialog.js';
import '../mission-elements/accept-mission-modal.js';
import '../trophy-elements/blocked-mission-modal.js';
import '../mission-elements/finish-mission-modal.js';
import {CommonBehaviorsMixin} from '../mixin-elements/common-behaviors-mixin.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

/**
 * @polymer
 * @CandidateCard
 * @appliesMixin CommonBehaviorsMixin
 */
class CandidateCard extends CommonBehaviorsMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style include="card-shared-styles"></style>
    <style>
      :host {
        display: block;
      }

    #candidate-name {
      text-transform: uppercase;
      font-family: folio;
      font-size: 24px;
      color: var(--secondary-text-color);
    }

    #candidate-infos {
      display: flex;
      margin-top: 16px;
    }

    #candidate-infos div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    #candidate-infos div span:first-child {
      margin-bottom: 5px;
      font-family: helvetica-neue;
      text-transform: capitalize;
    }

    #urn span:nth-child(2) { color: var(--accent-color) !important; }

    #candidate-infos div span:nth-child(2) {
      text-transform: uppercase;
      color: var(--paragraph-color);
    }



    </style>

    <app-besouro-api id="api"></app-besouro-api>

    <div class="card">

      <div class="card-header">
        <div class="container">
          <span id="candidate-name"> nome da pessoa </span>
          <div id="candidate-infos">
      <div id="candidacy">
      <span>candidatura:</span>
      <span><b>{{candidate.candidacy}}</b></span>
      </div>
      <div id="urn">
        <span>urna:</span>
      <span><b>{{candidate.urn}}</b></span>
      </div>
      <div id="party-uf">
        <span>partido - UF:</span>
      <span><b>{{candidate.party}}</b></span>
      </div>
          </div>
        </div>
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
      </div>
    </div>
`;
  }

  static get is() { return 'candidate-card'; }

  static get properties() {
    return {
      candidate: {
        type: Object,
        value: function() {return {"candidacy": "senadora",
        "urn": "12345", "party": "pt"} }
      },
      candidatePhoto: String,
      user: Object
    }
  }

  constructor() { super(); }
}
customElements.define(CandidateCard.is, CandidateCard);
