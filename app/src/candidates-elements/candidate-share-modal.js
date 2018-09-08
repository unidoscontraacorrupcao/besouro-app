import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-spinner/paper-spinner.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PaperInputBehavior } from '@polymer/paper-input/paper-input-behavior.js';

import 'share-menu/share-menu.js';
import '../app-elements/app-icons.js';
import '../app-elements/app-dialog.js';
import '../app-elements/shared-styles.js';
import '../app-elements/styles/modal-shared-styles.js';
import {CommonBehaviorsMixin} from '../mixin-elements/common-behaviors-mixin.js';

class CandidateShareModal extends CommonBehaviorsMixin(mixinBehaviors([PaperInputBehavior], PolymerElement)) {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
      }

      .icon-bg paper-icon-button { margin-top: 3px; }


    @media screen and (max-width: 350px) {
      .btn-text h3 { font-size: 15px; }
      .btn-text h4 { font-size: 13px !important; }

      .buttons { margin-left: unset; }
    }

    @media screen and (max-width: 310px) {
      .input-file-container {
        flex-direction: column;
      }

      .btn-text {
        margin-top: 10px;
      }
    }

      .header-content {
        background-color: var(--accent-color);
        height: 76px;
        position: absolute;
        top: 0;
        width: 100%;
      }

      #header-text {
        padding: 30px 10px 20px 10px;
        text-align: center;
      }


      #header-text span, #confirmation-text span {
        text-transform: uppercase;
        font-family: folio;
      }

      #header-text span {
        font-size: 24px;
        color: white;
      }

      #confirmation-text {
        margin: 115px 15px 34px 13px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 24px;
      }

      #confirmation-text p {
        font-family: helvetica-neue;
        font-size: 16px;
        color: #333333;
        margin: 34px auto 40px auto;
        width: 90%;
      }

      .icon-header {
        position: absolute;
        top: -20px;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
      }

      .icon-header paper-icon-button { padding: 0px; }

      .icon-header #closeModal {
        position: absolute;
        right: 0;
        top: -15px;
        color: white;
        padding: 10px;
      }

      #icons div:first-child { margin-bottom: 22px; }

      #icons div:first-child span {
        text-align: center;
        text-transform: unset !important;
        color: var(--light-text-color);
        font-size: 16px;
      }

      #icons div:last-child {
        width: 90%;
        margin: auto;
      }

      #icons div:last-child paper-icon-button {
        padding: 0;
        margin-left: 10px;
        width: 60px;
        height: 60px;
      }


    </style>

    <share-menu
      id="shareMenu"
      title="{{mission.title}}"
      text="{{stripHtmlTags(mission.description)}}"
      url="{{address}}/{{data.key}}?shared=true"
      enabled-services='["telegram", "whatsapp"]'>
    </share-menu>


    <app-besouro-api id="api"></app-besouro-api>


    <div class="modal-header">
      <div class="header-content">
        <div id="header-text"><span>pressionando candidato[a]</span></div>
        <div class="icon-header">
          <paper-icon-button slot="suffix" icon="app:pink-share"></paper-icon-button>
          <paper-icon-button on-tap="_dismiss" id="closeModal" icon="app:closeModal"></paper-icon-button>
        </div>
      </div>
      <div id="confirmation-text">
        <p> {{modalText}}</p>

        <div id="icons">
          <div>
            <span>compartilhar via</span>
          </div>
          <div>
            <paper-icon-button on-click="_fbShare" icon="app:candidate-share-facebook"></paper-icon-button>
            <paper-icon-button on-click="_twitterShare" icon="app:candidate-share-twitter"></paper-icon-button>
            <paper-icon-button on-click="_telegramShare" icon="app:candidate-share-telegram"></paper-icon-button>
            <paper-icon-button on-click="_whatsAppShare" icon="app:candidate-share-whatsapp"></paper-icon-button>
          </div>
        </div>
      </div>
    </div>
`;
  }

  static get is() { return 'candidate-share-modal'; }
  static get properties() {
    return {
      candidate: {
        type: Object,
        value: {}
      },
      share: {
        type: Object,
        value: {}
      },
      modalText: String,
      quoteText: String
    }
  }

  _candidateChanged() {
    if (!this.candidate || Object.keys(this.candidate).length == 0) return;
    this._setShareContent();
  }

  setCandidate(candidate) {
    this.set("candidate", candidate);
    this._setShareContent();
  }

  _setShareContent() {
    this.share.url = `http://localhost:8081/candidate/${this.candidate.id}`;
    if (this.candidate.score == "good") {
      this.set('modalText', `Quem é contra corrupção e defende a democracia merece nosso apoio! ${this.candidate.name} tem uma candidatura comprometida. Compartilhe.`);
      this.set('quoteText', `Quem é contra corrupção e defende a democracia merece nosso apoio! ${this.candidate.name} tem uma candidatura comprometida. Saiba mais sobre ela aqui.`);
    } else if (this.candidate.score == "bad") {
      this.share.text = `Quem não tem passado limpo não pode nos representar. ${this.candidate.name} não atestou passado limpo ou não se comprometeu. Vamos divulgar e pedir sua desistência.`;
      this.set('modalText', `Quem não tem passado limpo não pode nos representar. ${this.candidate.name} não atestou passado limpo ou não se comprometeu. Vamos divulgar e pedir sua desistência.`);
      this.set('quoteText', this.modalText);
    } else {
      this.set('modalText', `Quem luta contra corrupção e defende a democracia não desiste nunca. ${this.candidate.name} não respondeu tudo o que pede a campanha. Vamos ajudá-la/o a se lembrar.`);
      this.set('quoteText', this.modalText);
    }
  }

  _dismiss() { this.dispatchEvent(new CustomEvent('close-modal')); }

  _fbShare(){
    this.$.shareMenu.url = this.share.url;
    this.$.shareMenu.text = this.quoteText;
    this.$.shareMenu._facebookTap();
  }
  _twitterShare(){
    this.$.shareMenu.url = this.share.url;
    this.$.shareMenu.text = this.quoteText;
    this.$.shareMenu._twitterTap();
  }
  _telegramShare() {
    this.$.shareMenu.url = this.share.url;
    this.$.shareMenu.text = this.quoteText;
    this.$.shareMenu._telegramTap();
  }
  _whatsAppShare() {
    this.$.shareMenu.url = this.share.url;
    this.$.shareMenu.text = this.quoteText;
    this.$.shareMenu._whatsappTap();
  }
}
customElements.define(CandidateShareModal.is, CandidateShareModal);
