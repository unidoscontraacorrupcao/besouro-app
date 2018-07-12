import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class BlockedMissionModal extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
      }

      confirmation-icon,
      .confirmation-text {
        margin: auto;
        text-align: center;
      }

      .confirmation-icon {
        width: 100%;
        text-align: center;
      }

      .modal-header {
        width: 100%;
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
        margin: 115px auto 34px auto;
        width: 80%;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 24px;
      }

      #confirmation-text p {
        font-family: helvetica-neue;
        font-size: 20px;
        color: #333333;
        margin: 34px auto 40px auto;
        width: 90%;
        line-height: 1.3;
      }

      iron-icon {
        --iron-icon-width: 50%;
        --iron-icon-height: 50%;
      }

      .card-action {
        width: 75%;
        max-width: 400px;
        height: 64px;
        margin: auto;
        text-align: center;
        margin-top: 60px;
        margin-bottom: 60px;
        background-color:#009FE3;
      }

      .card-action a {
        text-decoration: none;
        position: absolute;
        right: 0;
        left: 0;
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

      #blocked-icon { text-align: center; }
      #blocked-icon-border {
        border-radius: 50% 50%;
        border-style: solid;
        width: 104px;
        border-color: grey;
        margin: 40px auto 40px auto;
        border-width: 1px;
      }
      #blocked-icon-border paper-icon-button {
        width: 100px;
        height: 100px;
      }
    </style>

    <app-besouro-api id="api"></app-besouro-api>

    <div class="modal-header">
      <div class="header-content">
        <div id="header-text"><span>troféu bloqueado</span></div>
        <div class="icon-header">
          <paper-icon-button slot="suffix" icon="app:splash-blocked"></paper-icon-button>
          <paper-icon-button on-tap="_dismiss" id="closeModal" icon="app:closeModal"></paper-icon-button>
        </div>
      </div>
      <div id="confirmation-text">
        <span>esse troféu possui prerequesitos</span>
        <div class="blocked-icon">
          <div id="blocked-icon-border">
            <paper-icon-button icon="app:mission-blocked-circle"></paper-icon-button>
          </div>
        </div>
        <p>
        Para o usuário ter acesso a esse troféu, requer possuir {{preReqNames}}
        </p>
      </div>
    </div>
`;
  }

  static get is() { return 'blocked-mission-modal'; }
  static get properties() {
    return {
      trophyId: {
        type: String,
        observer: "_getTrophyPreReqs"
      },
      preReqNames: String
    }
  }

  _goToMission() {
    this.dispatchEvent(new CustomEvent('modal-show-mission',
      { detail: { mission: this.missionId }}
    ));
  }

  _getTrophyPreReqs() {
    //TODO: move this endpoint to a better place. This hack was necessary
    //because boogie is not exposing the required_trophies variable on
    //trophies endpoint.
    this.$.api.path = `users/1/required_trophies/?trophy=${this.trophyId}`;
    this.$.api.request().then(function(ajax) {
      let preReqNames = "";
      ajax.response.map(x => preReqNames += x.name + ',');
      preReqNames = preReqNames.substring(0,  preReqNames.length - 1); 
      this.set("preReqNames", preReqNames);
    }.bind(this));
  }

  _dismiss() { this.dispatchEvent(new CustomEvent('close-modal')); }
}
window.customElements.define(BlockedMissionModal.is, BlockedMissionModal);
