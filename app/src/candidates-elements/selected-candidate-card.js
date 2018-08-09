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

      .card-footer paper-button:last-child {
        background-color: rgba(0,159,227,1);
        border-color: rgba(0,159,227,1);
      }

      #btn-icon { margin: auto 20px 7px auto; }
    </style>

    <app-besouro-api id="api"></app-besouro-api>

    <div class="card">

      <div class="card-header">
        <div class="container">
          <span id="candidate-name"> {{candidate.name}} </span>
          <div id="close">
            <div>
              <div>
                <paper-icon-button on-click="_ignoreCandidate" icon="app:remove-selected"></paper-icon-button>
              </div>
              <span on-click="_ignoreCandidate">remover seleção</span>
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
      <!--
      <paper-button on-click="_supportCandidate">
        <div>
        <div id="btn-icon">
        <iron-icon icon="app:fav-candidate"></iron-icon>
        </div>
      favoritar
        </div>
      </paper-button>
      -->

      <paper-button on-click="_supportCandidate">
        <div>
          <div id="btn-icon">
            <iron-icon icon="app:wallet"></iron-icon>
          </div>
          apoiar
        </div>
      </paper-button>
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

  _supportCandidate() {
    window.open(this.candidate.support_url);
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
    if (this.candidate.score == "good") {
      this._showSupportBtn();
      var colors = ["rgba(50,206,166,0.5)", "rgba(0,0,0,1)"];
      this.setCardImageGradient(colors, false, "to bottom");
    } else {
      this._hideSupportBtn();
      var colors = ["rgba(255,255,255,0.5)", "rgba(0,0,0,1)"];
      this.setCardImageGradient(colors, false, "to bottom");
    }
  }

  _hideSupportBtn () {
    var supportBtn = this.shadowRoot.querySelector("paper-button:first-child");
    supportBtn.style.display = "none";
  }

  _showSupportBtn() {
    var supportBtn = this.shadowRoot.querySelector("paper-button:first-child");
    supportBtn.style.margin = "auto";
    supportBtn.style.width = "262px";
  }

  _candidateChanged() { this._chooseCandidateColor(); }

  constructor() { super(); }

  ready() {
    super.ready();
    this._chooseCandidateColor();
  }
}
customElements.define(SelectedCandidateCard.is, SelectedCandidateCard);
