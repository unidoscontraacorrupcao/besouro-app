import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-spinner/paper-spinner.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PaperInputBehavior } from '@polymer/paper-input/paper-input-behavior.js';

import '../app-elements/app-icons.js';
import '../app-elements/app-dialog.js';
import '../app-elements/shared-styles.js';
import '../app-elements/styles/modal-shared-styles.js';
import './finish-confirmation-modal.js';
import {CommonBehaviorsMixin} from '../mixin-elements/common-behaviors-mixin.js';

class FinishMissionModal extends CommonBehaviorsMixin(mixinBehaviors([PaperInputBehavior], PolymerElement)) {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
      }

      .icon-bg paper-icon-button { margin-top: 3px; }

      .input-file-container { display: flex; }
      .input-file-container paper-icon-button { padding: 0; }

      .buttons { margin-left: 20px; }

    #file-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
      color: var(--light-text-color);
      width: 180px;
    }

    .btn-text {
      margin-left: 10px;
      text-align: left;
    }

    .btn-text h3, .btn-text h4 {
      margin: unset;
      margin-top: 5px;
      font-family: folio;
    }

    .btn-text h3 {
      font-size: 18px;
      text-transform: uppercase;
    }

    .description { margin-bottom: 30px; }
    .description h3 {
      text-align: left;
      text-transform: uppercase;
      margin: 0;
      font-size: 18px;
      font-family: folio;
    }

    paper-button {
      float: right;
    }

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
      .card-action {
        width: 75%;
        max-width: 400px;
        height: 64px;
        margin: auto;
        text-align: center;
        margin-top: 60px;
        margin-bottom: 60px;
        background-color:var(--accent-color);
      }

      .card-action div { position: relative; }
      .card-action a {
        text-decoration: none;
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        margin: 19px 46px 19px 46px;
      }

      .card-action span {
        font-family: Folio;
        text-transform: uppercase;
        font-size: 24px;
        color: white;
        margin: auto;
        letter-spacing: 3px;
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

      paper-textarea { text-align: left; }

      paper-button {
        float: right;
        font-size: 15px;
        padding-bottom: 25px;
     }

    </style>

    <app-besouro-api id="api"></app-besouro-api>

    <app-dialog id="finishConfirmation">
      <finish-confirmation-modal></finish-confirmation-modal>
    </app-dialog>


    <div class="modal-header">
      <div class="header-content">
        <div id="header-text"><span>concluir missão</span></div>
        <div class="icon-header">
          <paper-icon-button slot="suffix" icon="app:end-mission"></paper-icon-button>
          <paper-icon-button on-tap="_dismiss" id="closeModal" icon="app:closeModal"></paper-icon-button>
        </div>
      </div>
      <div id="confirmation-text">
        <span>agradecemos seu engajamento! <3</span>
        <p>Agora é hora de pedir para o comitê de campanha validar sua missão e oferecer a sua recompensa, caso tenha. Pra isso basta enviar a comprovação solicitada na missão descrevendo sua solução e, se necessário,
        fazendo o upload de imagens e/ou arquivos.</p>
        <div class="description">
          <h3>Descrição<h3>
          <paper-textarea value="{{description}}" max-rows="4" rows="2" maxlength="1000" placeholder="Uma breve descrição da comprovação pode ser escrita aqui" no-label-float></paper-textarea>
        </div>
        <div class="buttons">
          <div class="input-file-container">
            <paper-icon-button id="uploadIcon" slot="suffix" icon="app:receipt-upload" on-tap="_openInput"><paper-input id="input" type="file"></paper-input></paper-icon-button>
            <div class="btn-text">
              <h3>Enviar arquivo</h3>

              <h4 id="file-name">
                {{fileName}}
              </h4>
            </div>
          </div>
        </div>
        <div id="loading">
          <paper-spinner active=""></paper-spinner>
        </div>
        <div class="card-action">
          <div>
            <a on-tap="_sendReceipts"><span>enviar</span></a>
          </div>
        </div>
      </div>
    </div>
`;
  }

  static get is() { return 'finish-mission-modal'; }
  static get properties() {
    return {
      input: {
        type: Object
      },
      fileName: {
        type: String,
        value: 'Nenhum arquivo selecionado'
      },
      file: {
        type: Object
      },
      description: {
        type: String,
        value: ""
      },
      missionId: String,
      missionReceipts: {
        type: Array
      },
      fileArray: {
        type: Array,
        value: []
      },
      user: Object
    }
  }

  _openInput() {
    this.input = this.$.input.inputElement.inputElement;
    this.input.addEventListener('change', this._setFileName.bind(this));
    this.input.click();
  }

  _setFileName() {
    if(this.input.files.length === 0)
      this.set('fileName',  'Nenhum arquivo selecionado');
    else {
      this.set('fileName',  this.input.files[0].name);
      this.set('file',  this.input.files[0]);
    }
  }

  _sendReceipts() {
    this.showLoading();
    var formData = new FormData();
    formData.append("userName", this.user.displayName);
    formData.append("userEmail", this.user.email);
    formData.append("uid", this.user.uid);
    formData.append("status", "pending");
    formData.append("description", this.description);

    if(this.input && this.input.files.length > 0) {
      formData.append("receiptFile", this.input.files[0]);
    }
    this.$.api.xhrData = { method: "post",
      url: `${this.$.api.baseUrl}/api/v1/missions/${this.missionId}/receipt/`,
      body: formData
    };
    this.$.api.user = this.user;
    this.$.api.xhrRequest().then(function(response) {
        this.$.input.value = '';
        this.set('description', '');
        this.hideLoading();
        this._dismiss();
    }.bind(this));
  }

  _dismiss() {
    this.dispatchEvent(new CustomEvent('close-modal'));
    this.dispatchEvent(new CustomEvent('open-conversation'));
  }

  ready() {
    super.ready();
    var receiptPaperIcon = this.$.uploadIcon;
    var ironIcon = receiptPaperIcon.shadowRoot.querySelector("iron-icon");
    ironIcon.setAttribute("style", "width: 40px; height: 40px;");
    this.hideLoading();
  }
}
customElements.define(FinishMissionModal.is, FinishMissionModal);
