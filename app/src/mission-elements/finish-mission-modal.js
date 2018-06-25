import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-textarea.js';
import '../app-elements/app-icons.js';
import '../app-elements/app-dialog.js';
import '../app-elements/shared-styles.js';
import './finish-confirmation-modal.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PaperInputBehavior } from '@polymer/paper-input/paper-input-behavior.js';
class FinishMissionModal extends mixinBehaviors([PaperInputBehavior], PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
        height: 100vh;
      }

      .confirmation-text {
        text-align: left;
        line-height: 1.6;
      }

      #icon-bg {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        text-align: center;
        background: linear-gradient(to left, var(--light-accent-color), var(--accent-color));
      }

      #icon-bg div {
        margin: 4px 4px 4px 5px;
      }

      paper-icon-button {
        color: white;
      }

      .icon-bg paper-icon-button { margin-top: 3px; }

      .input-file-container { display: flex; }

      paper-button {
        float: left;
        margin-bottom: 20px;
        margin-top: 10px;
        border: none;
        box-shadow: none;
        color: var(--accent-color);
      }

    #file-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.9em;
      width: 180px;
    }

    .btn-text {
      margin-left: 10px;
    }

    .btn-text h3, .btn-text h4 {
      margin: unset;
      margin-top: 2px;
    }

    .description { margin-bottom: 20px; }

    paper-button {
      float: right;
    }

    @media screen and (max-width: 350px) {
      .btn-text {
        font-size: 0.75em;
      }
    }

    @media screen and (max-width: 310px) {
      .input-file-container {
        flex-direction: column;
      }

      .btn-text {
        margin-top: 10px;
      }
    }
    </style>

    <app-besouro-api id="api"></app-besouro-api>

    <app-dialog id="finishConfirmation">
      <finish-confirmation-modal></finish-confirmation-modal>
    </app-dialog>



      <h2 class="message"> Obrigado! </h2>

      <div class="confirmation-text">
        <p>Agora é hora de pedir para o comitê de campanha validar sua missão e oferecer a sua recompensa. Pra isso basta enviar a comprovação solicitada na missão fazendo o upload ou descrevendo
          a sua solução.</p>
      <div class="buttons">

        <div class="input-file-container">
          <div id="icon-bg">
            <div>
              <paper-icon-button class="accent block" slot="suffix" icon="app:cloud-upload" on-tap="_openInput"><paper-input id="input" type="file"></paper-input></paper-icon-button>
            </div>
          </div>
          <div class="btn-text">
            <h3>Enviar arquivo</h3>

            <h4 id="file-name">
              {{fileName}}
            </h4>
          </div>
        </div>
        <div class="description">
          <paper-textarea value="{{description}}" max-rows="4" maxlength="1000" char-counter="" label="descrição"></paper-textarea>
        </div>

        <paper-button toggles="" raised="" on-tap="_sendReceipts">enviar</paper-button>
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
      }
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
    var formData = new FormData();
    formData.append("userName", "david");
    formData.append("userEmail", "david@mail.com");
    formData.append("uid", "1");
    formData.append("status", "pending");
    formData.append("description", this.description);

    if(this.input && this.input.files.length > 0) {
      formData.append("receiptFile", this.input.files[0]);
    }
    var data = {method: "post",
      url: `${this.$.api.baseUrl}/api/v1/missions/${this.missionId}/receipt/`,
      body: formData};
    this.$.api.xhrRequest(data).then(function(response){
        this.$.finishConfirmation.present();
    }.bind(this));
  }
}
customElements.define(FinishMissionModal.is, FinishMissionModal);
