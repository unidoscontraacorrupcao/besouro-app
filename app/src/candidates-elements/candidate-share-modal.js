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
        background-color: #009FE3;
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

      .icon-header paper-icon-button { padding: 0; }

      .icon-header #closeModal {
        position: absolute;
        right: 0;
        top: -15px;
        color: white;
        padding: 10px;
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
        <div id="header-text"><span>compartilhe o candidato no seu facebook</span></div>
        <div class="icon-header">
          <paper-icon-button on-tap="_dismiss" id="closeModal" icon="app:closeModal"></paper-icon-button>
        </div>
      </div>
      <div id="confirmation-text">
        <p> Quem luta contra corrupção e defende a democracia não desiste nunca.
Subtexto: <nome-do-candidato> não respondeu tudo o que pede a campanha. Vamos ajudá-la/o a se lembrar.</p>

        <paper-button on-click="_shareCandidate">
          <div>
            <div id="btn-icon">
              <iron-icon icon="app:facebook"></iron-icon>
            </div>
            compartilhar
          </div>
        </paper-button>
      </div>
    </div>
`;
  }

  static get is() { return 'candidate-share-modal'; }
  static get properties() {
    return {
    }
  }

  _dismiss() {
    this.dispatchEvent(new CustomEvent('close-modal'));
  }

  _shareCandidate(){
    FB.ui({
      method: 'share',
      quote: 'ajude-nos a combater a corrupção',
      href: 'https://developers.facebook.com/docs/',
    }, function(response){}); 
  }

  ready() {
    super.ready();
    this.hideLoading();
    //var receiptPaperIcon = this.$.uploadIcon;
    //var ironIcon = receiptPaperIcon.shadowRoot.querySelector("iron-icon");
    //ironIcon.setAttribute("style", "width: 40px; height: 40px;");
  }
}
customElements.define(CandidateShareModal.is, CandidateShareModal);
