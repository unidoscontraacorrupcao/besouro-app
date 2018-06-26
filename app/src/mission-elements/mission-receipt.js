import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-image/iron-image.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import '../mixin-elements/mission-duration-mixin.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class MissionReceipt extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
        background: var(--secondary-background-color);
        @apply --default-font;
      }

      #modal-header h2 { color: var(--accent-color); }

      .actions #accept, .actions #reject {
        margin-bottom: 20px;
        margin-top: 20px;
      }
      .actions #accept {float: right;}
      .actions #reject {float: left;}

      span { font-size: 1.2em;  }

      hr {
        background-color: var(--divider-color);
        margin-top: 25px;
        margin-bottom: 25px;
      }

      .content {
        width: 90%;
        margin: auto;
      }

      paper-button {
        border-style: none;
        color: var(--accent-color);
      }

    </style>


    <app-besouro-api id="api"></app-besouro-api>
        <div class="content">
          <div id="modal-header">
            <h2><span> {{rcptData.userName}} </span></h2>
            <span> Enviou evidências de que concluiu essa missão </span>
          </div>

          <hr>

          <div class="receipts">

            <div class="receipt-text">
              <span> {{rcptData.description}} </span>
            </div>

            <a href="{{apiUrl}}{{rcptData.receiptFile}}" target="_blank">Comprovante</a>

          <hr>

          <div class="actions">
            <paper-button id="reject" on-tap="_rejectMission">rejeitar</paper-button>
            <paper-button id="accept" on-tap="_acceptMission">aceitar</paper-button>
          </div>
          </div>
        </div>
`;
  }

  static get is() { return 'mission-receipt'; }

  static get properties() {
    return {
      rcptData: {
        type: Object
      },
      receipts: {
        type: Array,
        value: []
      },
      downloadUrl: String,
      apiUrl: {
        type: String,
        computed: "getApiUrl()"
      }
    };
  }

  constructor() {
    super();
  }

  setRcptData(data) {
    this.set('rcptData', data);
  }

  _setReceiptStatus(status) {
    this.$.api.method = "POST";
    this.$.api.path = `missions/receipt/${this.rcptData.id}`;
    this.$.api.body = {"status": status };
    this.$.api.request().then(function(ajax) {
      this.dispatchEvent(new CustomEvent('close-modal'));
    }.bind(this));
  }

  _acceptMission(e) {
    this._setReceiptStatus("realized");
  }

  _rejectMission(e) {
    this._setReceiptStatus("rejected");
  }

  getApiUrl() {
    return this.$.api.baseUrl;
  }
}
customElements.define(MissionReceipt.is, MissionReceipt);
