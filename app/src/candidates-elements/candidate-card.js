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
import {CardMixin} from '../mixin-elements/card-mixin.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

/**
 * @polymer
 * @CandidateCard
 * @appliesMixin CommonBehaviorsMixin
 * @appliesMixin CardMixin
 */
class CandidateCard extends CommonBehaviorsMixin(CardMixin(PolymerElement)) {
  static get template() {
    return html`
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
      margin-bottom: 16px;
    }

    #candidate-infos {
      display: flex;
      flex-grow: 2;
      margin-top: 25px;
      width: 95%;
    }

    #candidate-infos div {
      float: left;
      margin-right: 10px;
    }
    #candidate-infos #candidacy,
    #candidate-infos #urn,
    #candidate-infos #party-uf{
      display: flex;
      flex-direction: column;
    }

    #candidate-infos div span:first-child {
      margin-bottom: 5px;
      font-family: helvetica-neue;
      text-transform: capitalize;
      font-size: 18px;
    }

    #candidate-infos div span:nth-child(2) {
      text-transform: uppercase;
      color: var(--paragraph-color);
    }

      .card-footer {
        height: 141px;
        position: relative;
        display: flex;
      }

      .card-footer paper-button {
        height: 80px;
        width: 128px;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        border-style: solid;
        border-radius: 0;
        border-width: 1px;
        border-color: var(--secondary-text-color);
        font-family: folio;
        text-align: center;
      }

      .card-footer paper-button:first-child {
        margin-left: auto;
        margin-right: 5px;
        color: var(--secondary-text-color);
      }

      .card-footer paper-button:last-child {
        margin-left: 5px;
        margin-right: auto;
        background-color: var(--secondary-text-color);
        color: white;
      }

      .card-footer paper-button div {
        display: flex;
        flex-direction: column;
      }

      #btn-icon {
        width: 25%;
        margin: auto auto 10px auto;
      }

      #card-image { position: relative; }

      #political-infos {
        position: absolute;
        bottom: 8px;
        height: 57px;
        left: 20px;
        right: 20px;
        display: flex;
        color: white;
      }

      #political-infos .info {
        margin-left: 7px;
        display: flex;
        flex-direction: column;
      }

      #political-infos .info div:first-child {
        font-family: helvetica-neue;
        text-align: center;
        line-height: 0.9;
      }

      #political-infos .info div:last-child {
        font-family: folio;
        text-align: center;
        text-transform: uppercase;
        font-size: 20px;
      }


    #close {
      position: absolute;
      top: -8px;
      right: 22px;
      background-color: var(--accent-color);
      height: 29px;
      width: 69px;
    }

    #close div {
      margin: 10px 10px 10px 17px;
      font-family: folio;
      color: white;
      position: relative;
    }
    
    #close div div:first-child {
      position: absolute;
      top: -19px;
      left: -35px;
      bottom: 0;
      right: 0;
    }

    #close paper-icon-button {
      width: 26px;
      height: auto;
    }

    #close span { margin: 8px 8px 8px 10px; }

    @media only screen and (max-width: 360px) {
      #political-infos {
        left: 0;
        right: 0;
      }
    }
    </style>

    <app-besouro-api id="api"></app-besouro-api>

    <div class="card">

      <div class="card-header">
        <div class="container">
          <span id="candidate-name"> {{candidate.name}} </span>
          <div id="close">
            <div>
              <div>
                <paper-icon-button on-click="_ignoreCandidate" icon="app:closeModal"></paper-icon-button>
              </div>
              <span on-click="_ignoreCandidate">fechar</span>
            </div>
          </div>
          <div id="candidate-infos">
            <div>
              <div id="candidacy">
                <span>candidatura:</span>
                <span><b>{{candidate.candidacy}}</b></span>
              </div>
            </div>
            <div>
              <div id="urn">
                <span>urna:</span>
                <span><b>{{candidate.urn}}</b></span>
              </div>
            </div>
            <div>
              <div id="party-uf">
                <span>partido - UF:</span>
                <span><b>{{candidate.party}}</b></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="card-image">
        <iron-image
          sizing="cover"
          preload="" fade=""
          src="{{candidate.image}}">
        </iron-image>

        <div id="political-infos">
          <div class="info">
            <div>
              <span>Tem passado limpo?</span>
            </div>
            <div>
              <span><br>{{candidate.has_clean_pass}}</br></span>
            </div>
          </div>
          <div class="info">
            <div>
              <span>Comprometeu-se com democracia?</span>
            </div>
            <div>
              <span><br>{{candidate.committed_to_democracy}}</br></span>
            </div>
          </div>
          <div class="info">
            <div>
              <span>Aderiu às novas medidas?</span>
            </div>
            <div>
              <span><br>{{candidate.adhered_to_the_measures}}</br></span>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer">
      <paper-button on-click="_selectCandidate">
        <div>
          <div id="btn-icon">
            <iron-icon icon="app:select-candidate"></iron-icon>
          </div>
          selecionar
        </div>
      </paper-button>
      <paper-button on-click="_pressCandidate">
        <div>
          <div id="btn-icon">
            <iron-icon icon="app:press-candidate"></iron-icon>
          </div>
          pressionar
        </div>
      </paper-button>
      </div>
    </div>
`;
  }

  static get is() { return 'candidate-card'; }

  static get properties() {
    return {
      candidate: {
        type: Object,
        observer: '_candidateChanged'
      }
    }
  }

  _selectCandidate() {
    var user = this.getUser();
    this.$.api.method = "POST";
    this.$.api.path = "selected-candidates/";
    this.$.api.user = user;
    //TODO: replace 1 by the candidate id.
    this.$.api.body = {"user": user.uid, "candidate": this.candidate.id};
    this.$.api.request().then((ajax) => {
      this.dispatchEvent(new CustomEvent("selected-candidate"));
    });
  }

  _pressCandidate() {
    var user = this.getUser();
    this.$.api.method = "POST";
    this.$.api.path = "pressed-candidates/";
    this.$.api.user = user;
    //TODO: replace 1 by the candidate id.
    this.$.api.body = {"user": user.uid, "candidate": this.candidate.id};
    this.$.api.request().then((ajax) => {
      this.dispatchEvent(new CustomEvent("pressed-candidate"));
    });
  }

  _ignoreCandidate() {
    var user = this.getUser();
    this.$.api.method = "POST";
    this.$.api.path = "ignored-candidates/";
    this.$.api.user = user;
    //TODO: replace 1 by the candidate id.
    this.$.api.body = {"user": user.uid, "candidate": this.candidate.id};
    this.$.api.request().then((ajax) => {
      this.dispatchEvent(new CustomEvent("ignored-candidate"));
    });
  }


  _chooseCandidateColor() {
    this._showPressBtn();
    if (this.candidate.score == "good") {
      this._hidePressBtn();
      var colors = ["rgba(50,206,166,0.5)", "rgba(0,0,0,1)"];
      this.setCardImageGradient(colors, false, "to bottom");
    } else {
      var colors = ["rgba(255,255,255,0.5)", "rgba(0,0,0,1)"];
      this.setCardImageGradient(colors, false, "to bottom");
    }
  }

  _hidePressBtn () {
    var pressBtn = this.shadowRoot.querySelector("paper-button:last-child");
    var selectBtn = this.shadowRoot.querySelector("paper-button:first-child");
    pressBtn.style.display = "none";
    selectBtn.style.margin = "auto";
    selectBtn.style.width = "262px";
  }

  _showPressBtn() {
    var selectBtn = this.shadowRoot.querySelector("paper-button:first-child");
    var pressBtn = this.shadowRoot.querySelector("paper-button:last-child");
    pressBtn.style.display = "block";
    selectBtn.style.marginLeft = "auto";
    selectBtn.style.marginRight = "5px";
    selectBtn.style.width = "128px";
  }

  _candidateChanged() { this._chooseCandidateColor(); }

  constructor() { super(); }

  ready() {
    super.ready();
    this._chooseCandidateColor();
  }
}
customElements.define(CandidateCard.is, CandidateCard);
