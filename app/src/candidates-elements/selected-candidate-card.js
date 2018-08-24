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
      }

      hr {
        color: var(--divider-color);
        margin-bottom: 16px;
      }

      #social-medias {
        width: 75%;
        margin: auto;
        margin-bottom: 12px;
      }

      #social-medias span {
        text-transform: uppercase;
        font-family: Folio;
        font-size: 14px;
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

      #btn-icon { margin: auto 20px 7px auto; }

      #see-more {
        width: 90%;
        margin: auto;
        text-align: center;
        padding-bottom: 46px;
        text-decoration: underline;
        color: var(--accent-color);
      }

      #see-more span {
        text-transform: uppercase;
        color: var(--accent-color);
        font-family: folio;
        font-size: 16px;
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

      @media screen and (min-width: 1100px) {
        :host {
          flex: 0 0 49%;
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
                <paper-icon-button on-click="_unselectCandidate" icon="app:remove-selected"></paper-icon-button>
              </div>
              <span on-click="_unselectCandidate">remover seleção</span>
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
      <paper-button on-click="_supportCandidate">
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
            <paper-icon-button on-click="_redirectToSocialLink" data-item="facebook_url" icon="app:social-facebook"></paper-icon-button>
            <paper-icon-button on-click="_redirectToSocialLink" data-item="twitter_url" icon="app:social-twitter"></paper-icon-button>
            <paper-icon-button on-click="_redirectToSocialLink" data-item="insta_url" icon="app:social-insta"></paper-icon-button>
            <paper-icon-button on-click="_redirectToSocialLink" data-item="youtube_url" icon="app:social-youtube"></paper-icon-button>
            <paper-icon-button on-click="_redirectToSocialLink" data-item="crowdfunding_url" icon="app:social-link"></paper-icon-button>
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
            {{candidate.full_name}}
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
              {{candidate.occupation}}
            </div>
          </div>
          <div class="item">
            <div class="item-header">
              <div class="item-title">
                <span>Aderiu totalmente às novas medidas</span>
              </div>
              <paper-icon-button on-click="_toggle" icon="app:expand-more"></paper-icon-button>
            </div>
            <div class="item-body">
              {{candidate.justify_adhered_to_the_measures}}
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
              {{candidate.riches}}
            </div>
          </div>
          <div class="item">
            <div class="item-header">
              <div class="item-title">
                <span>Total de processos a que responde</span>
              </div>
              <paper-icon-button on-click="_toggle" icon="app:expand-more"></paper-icon-button>
            </div>
            <div class="item-body">
              {{candidate.lawsuits}}
            </div>
          </div>
        </div>

        <!-- <div id="see-more">
            <span>conheça mais</span>
        </div> -->

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

  _supportCandidate() { window.open(this.candidate.crowdfunding_url); }

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

  _unselectCandidate() {
    var user = this.getUser();
    this.$.api.method = "POST";
    this.$.api.path = `users/${user.uid}/unselect-candidate/`;
    this.$.api.body = {"candidate": this.candidate.id};
    this.$.api.user = user;
    this.$.api.request().then((ajax) => {
      this.dispatchEvent(new CustomEvent("unselect-candidate"));
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
    var cardFooter = this.shadowRoot.querySelector(".card-footer");
    cardFooter.style.display = "none";
  }

  _showSupportBtn() {
    var cardFooter = this.shadowRoot.querySelector(".card-footer");
    cardFooter.style.display = "flex";
    var supportBtn = this.shadowRoot.querySelector("paper-button:first-child");
    supportBtn.style.margin = "auto";
    supportBtn.style.width = "300px";
  }

  _candidateChanged() { this._chooseCandidateColor(); }

  constructor() { super(); }

  ready() {
    super.ready();
    this._chooseCandidateColor();
  }

  _toggle(e) {
    var item = e.target.parentNode.parentNode;
    var itemHeight = item.clientHeight;
    if (itemHeight == 40) {
      item.setAttribute("style", "height: 80px");
      e.target.set("icon",  "app:expand-less");
    }
    else {
      item.setAttribute("style", "height: 40px");
      e.target.icon = "app:expand-more";
    }
  }

  _redirectToSocialLink(e) {
    var link = e.target.dataset.item;
    window.open(this.candidate[`${link}`]);
  }
}
customElements.define(SelectedCandidateCard.is, SelectedCandidateCard);
