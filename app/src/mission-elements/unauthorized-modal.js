import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class UnauthorizedModal extends PolymerElement {
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
        background-color: var(--secondary-text-color);
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
        margin-top: 45px;
        margin-bottom: 45px;
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
      .icon-header #closeModal {
        position: absolute;
        right: 0;
        top: -15px;
        color: white;
        padding: 10px;
      }

      .icon-header paper-icon-button { padding: 0; }

      paper-button {
        float: right;
        font-size: 15px;
        padding-bottom: 25px;
     }
     .icon-header paper-icon-button {
       color: var(--secondary-text-color);
     }
    </style>

    <div class="modal-header">
      <div class="header-content">
        <div id="header-text"><span>acesso restrito</span></div>
        <div class="icon-header">
          <paper-icon-button slot="suffix" icon="app:unauthorized"></paper-icon-button>
          <paper-icon-button on-tap="_dismiss" id="closeModal" icon="app:closeModal"></paper-icon-button>
        </div>
      </div>
      <div id="confirmation-text">
        <span>Você precisar fazer login para acessar essa área</span>
        <p>
          Cadastre-se no app e aproveite todos os nossos recursos, sem limites!
        </p>
        <div class="card-action">
          <div>
            <a on-tap="_goToRegister"><span>login</span></a>
          </div>
        </div>
      </div>
    </div>
`;
  }

  static get is() { return 'unauthorized-modal'; }
  static get properties() {
    return {
      missionId: String
    }
  }
  _goToRegister() {
    this.dispatchEvent(new CustomEvent('go-to-register'));
  }

  _dismiss() { this.dispatchEvent(new CustomEvent('close-modal')); }
}
window.customElements.define(UnauthorizedModal.is, UnauthorizedModal);
