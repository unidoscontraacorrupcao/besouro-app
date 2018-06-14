import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '../app-elements/app-form-header.js';
import '../app-elements/app-scrollable-dialog.js';
import '../mission-elements/mission-receipt.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class MissionReceiptsPage extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>

      :host {
        display: block;
        --app-form-header-background: #fff;
        --app-form-header-color: #000;
        background: var(--secondary-background-color);
        height: 100vh;
      }

      .receipt-item {
        display: flex;
      }

      .supporter-name {
        margin-top: 15px;
        margin-left: 12px;
        flex-grow: 2;
      }

      #modal-header span, .accepted-stats { color: var(--accent-color); }

      .accepted-stats {
        width: 35px;
        height: 35px;
        margin-top: 5px;
      }

      paper-button {
      float: right;
      margin-bottom: 10px;
      margin-top: 20px;
    }

    .receipts {
      width: 90%;
      margin: auto;
      margin-top: 20px;
    }

    app-form-header {
      color: var(--default-primary-color);
      background: var(--accent-color);
      --app-form-header-background: var(--accent-color);
      --app-form-header-color: var(--default-primary-color);
      @apply --default-font-medium;
    }

    .avaliation-stats paper-icon-button {
      width: 50px;
      height: 50px;
    }

    paper-spinner {
      width: 40px;
      height: 40px;
      padding: 5px;
      background-color: var(--default-primary-color);
      border-radius: 50%;
    }

    #inboxLoading {
      position: absolute;
      top: 50%;
      right: 50%;
      transform: translate(50%);
    }

    .supporter-img iron-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }


    </style>

    <app-route route="{{route}}" pattern="/mission-receipts/:key" data="{{routeData}}">
    </app-route>



    <app-scrollable-dialog id="missionReceipt">
      <mission-receipt></mission-receipt>
    </app-scrollable-dialog>

    <app-header-layout has-scrolling-region="">
      <app-form-header shadow="" slot="header">
        <paper-icon-button slot="arrow-back" icon="app:arrow-back" on-tap="_returnToInbox"></paper-icon-button>
        <span slot="main-title">{{mission.content.receipts.length}} pessoas concluiram</span>
        <paper-icon-button slot="more-vert" icon="app:more-vert"></paper-icon-button>
      </app-form-header>

      <template is="dom-if" if="{{missionLoaded}}" restamp="">
        <div class="receipts">
          <template is="dom-repeat" items="{{mission.content.receipts}}" filter="setUserPhoto">
            <div class="receipt-item">
              <div class="supporter-img">
                <iron-image id="{{item.uid}}" sizing="cover"></iron-image>
              </div>
              <div class="supporter-name">
                <a on-tap="_openUserReceipt"><span>{{item.userName}}</span></a>
              </div>

              <div class="avaliation-stats">
                <paper-icon-button on-tap="_openUserReceipt" class="accepted-stats" icon="{{_setReceiptIcon(item)}}">
              </paper-icon-button></div>
            </div>
          </template>
        </div>
        </template>
      </app-header-layout>
`;
  }

  static get is() { return 'mission-receipts-page'; }

  static get properties() {
    return {
      supporter: {
        type: Object
      },
      receipts: {
        type: Array
      },
      userData: {
        type: Object
      },
      mission: {
        type: Object,
        observer: '_missionChanged'
      },
      routeData: Object,
      missionLoaded: {
        type: Boolean,
        value: false
      },
      receiptModal: {
        type: Boolean,
        observer: '_closeModal'
      },
      receiptIcon: {
        type: String,
        value: "app:check"
      }
    }
  }

  constructor() {
    super();
  }

  _openUserReceipt(e) {
    const data = e.model.get('item');
    data["missionId"] = this.routeData.key;
    this.shadowRoot.querySelector('mission-receipt').setRcptData(data);
    this.$.missionReceipt.present();
  }

  _returnToInbox() {
    this.set('route.path', `/show-mission/${this.routeData.key}`);
  }

  _missionChanged() {
    if (this.mission.content !== undefined && this.mission.content.receipts) {
      this.set('missionLoaded', true);
    }
  }

  ready() {
    super.ready();
    this.$.missionReceipt.querySelector("mission-receipt").addEventListener('close-modal', this._closeReceiptModal.bind(this));
  }

  _closeReceiptModal() {
    this.$.missionReceipt.dismiss();
    this.$.document.path = `/missions/${this.routeData.key}`;
  }

  _setReceiptIcon(_item) {
    if (_item.status === "realized" || _item.status === "rejected")
      return "app:radio-button-checked";
    return "app:radio-button-unchecked";
  }

  setUserPhoto(_item) {
    setTimeout(function() {
      this.$.photoDoc.getStoredValue(`/users/${_item.uid}/content`).then(function(res) {
        this.shadowRoot.querySelector(`#${_item.uid}`).setAttribute("src", res.photoURL);
      }.bind(this));
    }.bind(this), 10);
    return true;
  }

  hideLoading(e) {
    this.shadowRoot.querySelector('#inboxLoading').setAttribute('style', 'display:none');
  }
}
customElements.define(MissionReceiptsPage.is, MissionReceiptsPage);
