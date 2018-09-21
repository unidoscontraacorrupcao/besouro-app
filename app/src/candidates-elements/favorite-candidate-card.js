import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-image/iron-image.js';

import '../app-elements/shared-styles.js';
import '../candidates-elements/candidate-share-modal.js'
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
 * @FavoriteCandidateCard
 * @appliesMixin CommonBehaviorsMixin
 * @appliesMixin CardMixin
 */
class FavoriteCandidateCard extends CommonBehaviorsMixin(CardMixin(PolymerElement)) {
  static get template() {
    return html`
    <style include="candidate-card-shared-styles"></style>
    <style>
      :host {
        display: block;
      }

      #close span {
        position: absolute;
        top: -15px;
        right: -18px;
        left: -2px;
        line-height: 0.9;
        font-size: 14px;
      }

      #close paper-icon-button { width:28px; }

      .card-footer  {
        width: 90%;
        margin: auto;
        height: 98px;
      }

      hr {
        color: var(--divider-color);
        margin-bottom: 16px;
      }

      #social-medias {
        width: 85%;
        margin: auto;
        margin: 22px auto 12px auto;
      }

      #social-medias span {
        text-transform: uppercase;
        font-family: Folio;
        font-size: 16px;
      }

      #medias {
        display: flex;
        margin-top: 16px;
      }

      #medias > * { flex-grow: 1; }
      #medias paper-icon-button {padding: 4px;}


      .card-footer paper-button:last-child {
        background-color: rgba(0,159,227,1);
        border-color: rgba(0,159,227,1);
      }

      #btn-icon { margin: 5px 0; }

      #see-more {
        width: 90%;
        margin: auto;
        text-align: center;
        padding: 30px 0 30px 0;
        text-decoration: underline;
        color: var(--accent-color);
      }

      #see-more a {
        text-transform: uppercase;
        color: var(--secondary-text-color);
        font-family: folio;
        font-size: 18px;
        cursor: pointer;
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

      .ignored-candidate-animation {
        animation: ignored-candidate 0.8s;
        -webkit-animation: ignored-candidate 0.8s;
      }

      .card-footer paper-button:first-child {
        background-color: var(--accent-color);
        color: var(--default-primary-color);
        border: none;
      }

      #urn-number {
        color: var(--accent-color) !important;
      }

      #favoriteBtn {
        width: 262px;
        margin: 20px auto;
        color: var(--accent-color);
        border: 1px solid var(--accent-color);
        background-color: var(--primary-background-color);
      }

      @media screen and (min-width: 1100px) {
        :host {
          flex: 0 0 49%;
        }
      }
    </style>

    <app-dialog id="candidateShareDialog">
      <candidate-share-modal on-close-modal="_closeModal"></candidate-share-modal>
    </app-dialog>

    <app-besouro-api id="api"></app-besouro-api>

    <div class="card">

      <div class="card-header">
        <div class="container">
          <span id="candidate-name" on-tap="_showCandidate"> {{candidate.name}} </span>
          <div id="candidate-infos">
            <div class="flex">
              <div id="candidacy">
                <span>candidatura:</span>
                <span><b>{{candidate.candidacy}}</b></span>
              </div>
            </div>
            <div>
              <div id="urn">
                <span>urna:</span>
                <span id="urn-number"><b>{{candidate.urn}}</b></span>
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
                Nosso critério de passado limpo é rígido. 
                A referência são os crimes da Lei da Ficha Limpa. 
                No caso de candidata/o à reeleição, veremos quem é 
                réu no STF.
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
        <paper-button on-click="_wrapUnfavoriteCandidate" id="favoriteBtn">
          <div>
            <div id="btn-icon">
              <iron-icon icon="app:unfavorite"></iron-icon>
            </div>
            desfazer santinho
          </div>
        </paper-button>
        <!-- <paper-button on-click="_supportCandidate" id="supportBtn">
          <div>
            <div id="btn-icon">
              <iron-icon icon="app:wallet"></iron-icon>
            </div>
            apoiar
          </div>
        </paper-button> -->
      </div>

      <div id="see-more">
        <a on-click="_showCandidate">ver detalhes</a>
      </div>

      </div>
`;
  }

  static get is() { return 'favorite-candidate-card'; }

  static get properties() {
    return {
      candidate: {
        type: Object,
        observer: '_candidateChanged'
      }
    }
  }

  _wrapUnfavoriteCandidate() {
    this._unfavoriteCandidate().then((ajax) => {
      this.dispatchEvent(new CustomEvent("unfavorite-candidate"));
    });
  }

  _chooseCandidateColor() {
    if (this.candidate.score == "good") {
      // this._showSupportBtn();
      var colors = ["rgba(50,206,166,0.5)", "rgba(0,0,0,1)"];
      this.setCardImageGradient(colors, false, "to bottom");
    } else if (this.candidate.score == "bad") {
      // this._hideSupportBtn();
      var colors = ["rgba(230,0,0,0.5)", "rgba(0,0,0,1)"];
      this.setCardImageGradient(colors, false, "to bottom");
    } else {
      // this._hideSupportBtn();
      var colors = ["rgba(183,184,183,0.5)", "rgba(0,0,0,1)"];
      this.setCardImageGradient(colors, false, "to bottom");
    }
  }

  // _hideSupportBtn () {
  //   var supportBtn = this.shadowRoot.querySelector("#supportBtn");
  //   supportBtn.style.display = "none";
  //   let favoriteBtn = this.shadowRoot.querySelector("#favoriteBtn");
  //   favoriteBtn.style.width = "262px";
  //   favoriteBtn.style.margin = "20px auto";
  // }

  // _showSupportBtn() {
  //   if(!this._invalidSocialMediaUrl("crowdfunding_url")) {
  //     var supportBtn = this.shadowRoot.querySelector("#supportBtn");
  //     supportBtn.style.display = "flex";
  //   }
  //   else {
  //     this._hideSupportBtn();
  //   }
  // }

  _candidateChanged() {
    this._chooseCandidateColor();
    this._removeCardAnimations();
  }

  _removeCardAnimations() {
    var card = this.shadowRoot.querySelector(".card");
    card.classList.remove("ignored-candidate-animation");
  }

  constructor() { super(); }

  ready() {
    super.ready();
    this._chooseCandidateColor();
  }

  _toggle(e) {
    var item = e.target.parentNode.parentNode;
    var itemHeight = item.clientHeight;
    if (itemHeight == 40) {
      item.setAttribute("style", "height: 90px");
      e.target.set("icon",  "app:expand-less");
    }
    else {
      item.setAttribute("style", "height: 40px");
      e.target.icon = "app:expand-more";
    }
  }

  _toggleBig(e) {
    var item = e.target.parentNode.parentNode;
    var itemHeight = item.clientHeight;
    if (itemHeight == 40) {
      item.setAttribute("style", "height: 200px");
      e.target.set("icon",  "app:expand-less");
    }
    else {
      item.setAttribute("style", "height: 40px");
      e.target.icon = "app:expand-more";
    }
  }

  _showCandidate() {
    this.dispatchEvent(new CustomEvent("show-candidate",
      { detail: {candidate: this.candidate.id} }));
  }

  _closeModal() { this.$.candidateShareDialog.dismiss(); }
  
}
customElements.define(FavoriteCandidateCard.is, FavoriteCandidateCard);
