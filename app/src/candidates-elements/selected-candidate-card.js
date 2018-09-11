import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-tooltip/paper-tooltip.js';

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
 * @SelectedCandidateCard
 * @appliesMixin CommonBehaviorsMixin
 * @appliesMixin CardMixin
 */
class SelectedCandidateCard extends CommonBehaviorsMixin(CardMixin(PolymerElement)) {
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

      #see-more paper-button {
        text-transform: uppercase;
        color: var(--accent-color);
        font-family: folio;
        font-size: 18px;
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

      .selected-candidate-animation {
        animation: selected-candidate 0.8s;
        -webkit-animation: selected-candidate 0.8s;
      }

      .ignored-candidate-animation {
        animation: ignored-candidate 0.8s;
        -webkit-animation: ignored-candidate 0.8s;
      }

      .card-footer paper-button:first-child {
        color: var(--accent-color);
        border: 1px solid var(--accent-color);
      }

      @media screen and (min-width: 1100px) {
        :host {
          flex: 0 0 49%;
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
          <span id="candidate-name"> {{candidate.name}} </span>
          <div id="close">
            <div>
              <div>
                <paper-icon-button on-click="_unselectCandidate" icon="app:remove-selected"></paper-icon-button>
              </div>
              <span on-click="_wrapUnselectCandidate">remover seleção</span>
            </div>
          </div>
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
        <paper-button on-click="_favoriteCandidate" id="favoriteBtn">
          <div>
            <div id="btn-icon">
              <iron-icon icon="app:favorite"></iron-icon>
            </div>
            favoritar
          </div>
        </paper-button>
        <paper-button on-click="_supportCandidate" id="supportBtn">
          <div>
            <div id="btn-icon">
              <iron-icon icon="app:wallet"></iron-icon>
            </div>
            apoiar
          </div>
        </paper-button>
      </div>
      <div id="social-medias">
        <hr>
        <span>redes sociais deste candidato:</span>
        <div id="medias">
            <paper-icon-button id="facebookBtn" on-click="_redirectToSocialLink" data-item="facebook_url" icon="app:social-facebook"></paper-icon-button>
            <paper-icon-button id="twitterBtn" on-click="_redirectToSocialLink" data-item="twitter_url" icon="app:social-twitter"></paper-icon-button>
            <paper-icon-button id="instagramBtn" on-click="_redirectToSocialLink" data-item="instagram_url" icon="app:social-insta"></paper-icon-button>
            <paper-icon-button id="youtubeBtn" on-click="_redirectToSocialLink" data-item="youtube_url" icon="app:social-youtube"></paper-icon-button>
            <paper-icon-button id="crowdBtn" on-click="_redirectToSocialLink" data-item="crowdfunding_url" icon="app:social-link"></paper-icon-button>
        </div>
      </div>

        <div id="tse-data">
          <div class="item">
            <div class="item-header">
              <div class="item-title">
                <span>Nome Completo</span>
              </div>
              <paper-icon-button on-click="_toggle" icon="app:expand-more"></paper-icon-button>
            </div>
          <div class="item-body">
             <span>{{candidate.full_name}}</span>
          </div>

          </div>
          <div class="item">
            <div class="item-header">
              <div class="item-title">
                <span>Ocupação Profissional</span>
              </div>
              <paper-icon-button on-click="_toggle" icon="app:expand-more"></paper-icon-button>
            </div>
            <div class="item-body">
              <span>
                {{candidate.occupation}}
              </span>
            </div>
          </div>
          <div class="item">
            <div class="item-header">
              <div class="item-title">
                <span>Aderiu totalmente às novas medidas?</span>
              </div>
              <paper-icon-button on-click="_toggleBig" icon="app:expand-more"></paper-icon-button>
            </div>
            <div class="item-body">
              <span>
                {{candidate.justify_adhered_to_the_measures}}
              </span>
            </div>
          </div>
          <div class="item">
            <div class="item-header">
              <div class="item-title">
                <span>Total de bens e patrimônio</span>
              </div>
              <paper-icon-button on-click="_toggle" icon="app:expand-more"></paper-icon-button>
            </div>
            <div class="item-body">
              <span>
                {{candidate.riches}}
              </span>
            </div>
          </div>
          <div class="item">
            <div class="item-header">
              <div class="item-title">
                <span>Total de processos a que responde</span>
              </div>
              <paper-icon-button on-click="_toggleBig" icon="app:expand-more"></paper-icon-button>
            </div>
            <div class="item-body">
              <span>
                {{candidate.lawsuits}}
              </span>
            </div>
          </div>
        </div>

        <div id="see-more">
          <paper-button on-click="_showCandidate">conheça mais</paper-button>
        </div>

      </div>
`;
  }

  static get is() { return 'selected-candidate-card'; }

  static get properties() {
    return {
      candidate: {
        type: Object,
        observer: '_candidateChanged'
      }
    }
  }

  _wrapUnselectCandidate() {
    this._unselectCandidate().then((ajax) => {
      this.dispatchEvent(new CustomEvent("unselect-candidate"));
    });
  }

  _wrapfavoriteCandidate() {
    this._favoriteCandidate().then((ajax) => {
      this.dispatchEvent(new CustomEvent("favorite-candidate"));
    });
  }

  _chooseCandidateColor() {
    if (this.candidate.score == "good") {
      this._showSupportBtn();
      var colors = ["rgba(50,206,166,0.5)", "rgba(0,0,0,1)"];
      this.setCardImageGradient(colors, false, "to bottom");
    } else if (this.candidate.score == "bad") {
      this._hideSupportBtn();
      var colors = ["rgba(230,0,0,0.5)", "rgba(0,0,0,1)"];
      this.setCardImageGradient(colors, false, "to bottom");
    } else {
      this._hideSupportBtn();
      var colors = ["rgba(183,184,183,0.5)", "rgba(0,0,0,1)"];
      this.setCardImageGradient(colors, false, "to bottom");
    }
  }

  _hideSupportBtn () {
    var supportBtn = this.shadowRoot.querySelector("#supportBtn");
    supportBtn.style.display = "none";
    let favoriteBtn = this.shadowRoot.querySelector("#favoriteBtn");
    favoriteBtn.style.width = "262px";
    favoriteBtn.style.margin = "20px auto";
  }

  _showSupportBtn() {
    if(!this._invalidSocialMediaUrl("crowdfunding_url")) {
      var supportBtn = this.shadowRoot.querySelector("#supportBtn");
      supportBtn.style.display = "flex";
    }
    else {
      this._hideSupportBtn();
    }
  }

  _candidateChanged() {
    this._chooseCandidateColor();
    this._hideSocialMediaIcons();
    this._removeCardAnimations();
  }

  _removeCardAnimations() {
    var card = this.shadowRoot.querySelector(".card");
    card.classList.remove("selected-candidate-animation");
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
customElements.define(SelectedCandidateCard.is, SelectedCandidateCard);
