import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-image/iron-image.js';

import '../app-elements/shared-styles.js';
import '../app-elements/styles/candidate-card-shared-styles.js';
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
    <style include="candidate-card-shared-styles"></style>
    <style>
      :host {
        display: block;
      }

    @keyframes selected-candidate {
      0% {left: unset;}
      10% {left: 10px;}
      20% {left: 20px;}
      30% {left: 30px;}
      40% {left: 40px;}
      50% {left: 50px;}
      60% {left: 60px;}
      70% {left: 70px; opacity: 0.3;}
      80% {left: 80px; opacity: 0.2;}
      90% {left: 90px; opacity: 0.1;}
      100% {opacity: 0;}
    }


    @keyframes pressed-candidate {
      0% {bottom: unset;}
      10% {bottom: 10px;}
      20% {bottom: 20px;}
      30% {bottom: 30px;}
      40% {bottom: 40px;}
      50% {bottom: 50px;}
      60% {bottom: 60px;}
      70% {bottom: 70px; opacity: 0.3;}
      80% {bottom: 80px; opacity: 0.2;}
      90% {bottom: 90px; opacity: 0.1;}
      100% {opacity: 0;}
    }

    @keyframes ignored-candidate {
      0% {opacity: unset;}
      10% {opacity: 1;}
      20% {opacity: 0.8;}
      30% {opacity: 0.7;}
      40% {opacity: 0.6;}
      50% {opacity: 0.5;}
      60% {opacity: 0.4;}
      70% {opacity: 0.3;}
      80% {opacity: 0.2;}
      90% {opacity: 0.1;}
      100% {opacity: 0;}
    }

    .selected-candidate-animation {
      animation: selected-candidate 0.8s;
      -webkit-animation: selected-candidate 0.8s;
    }

    .pressed-candidate-animation {
      animation: pressed-candidate 0.8s;
      -webkit-animation: pressed-candidate 0.8s;
    }

    .ignored-candidate-animation {
      animation: ignored-candidate 0.8s;
      -webkit-animation: ignored-candidate 0.8s;
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
                <span><b>{{candidate.party}} - {{candidate.uf}}</b></span>
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
    if (!user || Object.keys(user).length == 0) return;
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
    if (!user || Object.keys(user).length == 0) return;
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
    if (!user || Object.keys(user).length == 0) return;
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
    } else if (this.candidate.score == "bad") {
      var colors = ["rgba(230,0,0,0.5)", "rgba(0,0,0,1)"];
      this.setCardImageGradient(colors, false, "to bottom");
    } else {
      var colors = ["rgba(183,184,183,0.5)", "rgba(0,0,0,1)"];
      this.setCardImageGradient(colors, false, "to bottom");
    }
  }

  _hidePressBtn () {
    var pressBtn = this.shadowRoot.querySelector("paper-button:last-child");
    var selectBtn = this.shadowRoot.querySelector("paper-button:first-child");
    pressBtn.style.display = "none";
    selectBtn.style.margin = "20px auto";
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

  _candidateChanged() {
    this._removeCardAnimations();
    this._chooseCandidateColor();
  }

  _removeCardAnimations() {
    var card = this.shadowRoot.querySelector(".card");
    card.classList.remove("selected-candidate-animation");
    card.classList.remove("pressed-candidate-animation");
    card.classList.remove("ignored-candidate-animation");
  }


  constructor() { super(); }

  ready() {
    super.ready();
    this._chooseCandidateColor();
  }
}
customElements.define(CandidateCard.is, CandidateCard);
