import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-tooltip/paper-tooltip.js';

import '../candidates-elements/candidate-share-modal.js'
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

    #btn-icon { margin: auto auto 10px auto; }

    #favorite-button {
      width: 262px;
      margin: 20px auto;
      background-color: var(--accent-color);
      border: none;
    }

    #close div {
      margin: 0;
      padding: 10px;
    }

    #close span {
      margin: 0;
    }

    @media screen and (min-width: 1100px) {
      :host {
        flex: 0 0 49%;
        margin-bottom: 10px;
      }
      .card-footer {
        height: 108px;
      }
    }
    </style>

    <app-dialog id="candidateShareDialog">
      <candidate-share-modal
        on-close-modal="_closeModal">
      </candidate-share-modal>
    </app-dialog>

    <app-besouro-api id="api"></app-besouro-api>

    <div class="card">
      <div class="card-header">
        <div class="container">
          <span id="candidate-name" on-tap="_showCandidate"> {{candidate.name}} </span>
          <div id="close" on-click="_ignoreCandidate">
            <div>
              <span>esconder</span>
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
          <div on-click="_shareCandidate" id="share-candidate">
            <div>
              <div>
                <paper-icon-button icon="app:share"></paper-icon-button>
              </div>
              <div>
                <span>compartilhar</span>
              </div>
            </div>
          </div>
        <iron-image
          on-tap="_showCandidate"
          sizing="contain"
          preload="" fade=""
          src="{{candidate.image}}">
        </iron-image>

        <div id="political-infos">
          <div class="info">
            <div id="short">
              <span>Tem passado limpo?<iron-icon icon="app:help"></iron-icon></span>
              <paper-tooltip position="right">
                Nosso critério de passado limpo é mais rígido: a referência
                são os crimes da Lei da Ficha Limpa, mas sem o recorte temporal
                da lei. No caso de quem tentará reeleição,
                veremos quem é réu no STF.
              </paper-tooltip>
            </div>
            <div>
              <span><br>{{candidate.has_clean_pass}}</br></span>
            </div>
          </div>
          <div class="info">
            <div>
              <span>Comprometeu-se com democracia?<iron-icon icon="app:help"></iron-icon></span>
              <paper-tooltip position="top">
                O critério de compromisso com os princípios
                democráticos baseia-se na adesão ao Pacto
                pela Democracia – iniciativa da sociedade pela
                preservação e revigoramento da vida política e
                democrática do país.
              </paper-tooltip>
            </div>
            <div>
              <span><br>{{candidate.committed_to_democracy}}</br></span>
            </div>
          </div>
          <div class="info">
            <div>
              <span>Aderiu às novas medidas?<iron-icon icon="app:help"></iron-icon></span>
              <paper-tooltip position="left">
                No caso do combate à corrupção, a/o candidata/o
                terá de se comprometer a, se eleita/o, pôr nossas
                propostas em tramitação e atuar por sua aprovação.
                Ressalvas terão de ser identificadas e justificadas.
              </paper-tooltip>
            </div>
            <div>
              <span><br>{{candidate.adhered_to_the_measures}}</br></span>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <!-- <paper-button on-click="_wrapSelectCandidate">
          <div>
            <div id="btn-icon">
              <iron-icon icon="app:select-candidate"></iron-icon>
            </div>
            selecionar
          </div>
        </paper-button>
        <paper-button on-click="_wrapPressCandidate">
          <div>
            <div id="btn-icon">
              <iron-icon icon="app:press-candidate"></iron-icon>
            </div>
            pressionar
          </div>
        </paper-button> -->
        <paper-button on-click="_wrapFavoriteCandidate" id="favorite-button">
          <div>
            <div id="btn-icon">
              <iron-icon icon="app:favorite"></iron-icon>
            </div>
            salvar como santinho
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

  _chooseCandidateColor() {
    // this._showPressBtn();
    if (this.candidate.score == "good") {
      // this._hidePressBtn();
      var colors = ["rgba(50,206,166,0.5)", "rgba(0,0,0,1)"];
      this.setCardImageGradient(colors, false, "to bottom");
    } else if (this.candidate.score == "bad") {
      // this._hidePressBtn();
      var colors = ["rgba(230,0,0,0.5)", "rgba(0,0,0,1)"];
      this.setCardImageGradient(colors, false, "to bottom");
    } else {
      var colors = ["rgba(183,184,183,0.5)", "rgba(0,0,0,1)"];
      this.setCardImageGradient(colors, false, "to bottom");
    }
  }

  // _hidePressBtn () {
  //   var pressBtn = this.shadowRoot.querySelector("paper-button:last-child");
  //   var selectBtn = this.shadowRoot.querySelector("paper-button:first-child");
  //   pressBtn.style.display = "none";
  //   selectBtn.style.margin = "20px auto";
  //   selectBtn.style.width = "262px";
  // }

  // _showPressBtn() {
  //   var selectBtn = this.shadowRoot.querySelector("paper-button:first-child");
  //   var pressBtn = this.shadowRoot.querySelector("paper-button:last-child");
  //   pressBtn.style.display = "block";
  //   selectBtn.style.marginLeft = "auto";
  //   selectBtn.style.marginRight = "5px";
  //   selectBtn.style.width = "128px";
  // }

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

  _wrapSelectCandidate() {
    this.showLoading();
    this._selectCandidate().then((ajax) => {
      this.dispatchEvent(new CustomEvent("selected-candidate", {detail: {"candidate": ajax.response}}))
    });
  }

  _wrapPressCandidate() {
    this.showLoading();
    this._pressCandidate().then((ajax) => {
      this.dispatchEvent(new CustomEvent("pressed-candidate", {detail: {"candidate": ajax.response}}));
    });
  }

  _wrapFavoriteCandidate() {
    this._favoriteCandidate()
  }

  _closeModal() { this.$.candidateShareDialog.dismiss(); }

  _showCandidate() {
    this.dispatchEvent(new CustomEvent("show-candidate",
      { detail: {candidate: this.candidate.id} }));
  }
}
customElements.define(CandidateCard.is, CandidateCard);
