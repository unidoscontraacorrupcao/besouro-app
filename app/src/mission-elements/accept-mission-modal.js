import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class AcceptMissionModal extends PolymerElement {
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
        font-size: 16px;
        color: #333333;
        margin: 34px auto 40px auto;
        width: 90%;
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
    </style>

    <div class="modal-header">
      <div class="header-content">
        <div id="header-text"><span>missão aceita!</span></div>
        <div class="icon-header">
          <paper-icon-button slot="suffix" icon="app:accept-mission"></paper-icon-button>
        </div>
      </div>
      <div id="confirmation-text">
        <span>agradecemos seu envolvimento!</span>
        <p>
        Fique atento ao prazo restante  e não deixe de concluir a missão. Veja na aba
        <b>MINHAS MISSÕES</b> essa e outras missões que você aceitou.
        </p>
      <div class="card-action">
        <div>
          <a href="#" on-tap="_goToMission" ><span>ver missão</span></a>
        </div>
      </div>

      </div>
    </div>
`;
  }

  static get is() { return 'accept-mission-modal'; }
  static get properties() {
    return {
      missionId: String
    }
  }
  _goToMission() {
    this.dispatchEvent(new CustomEvent('modal-show-mission', { detail: { mission: this.missionId }}));
  }
}
window.customElements.define(AcceptMissionModal.is, AcceptMissionModal);
