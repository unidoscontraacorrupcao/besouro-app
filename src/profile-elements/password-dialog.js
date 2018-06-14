import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class PasswordDialog extends PolymerElement {
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

      .confirmation-text {
        width: 80%;
      }

      .modal-header {
        width: 100%;
      }
      .buttons {
        padding-top: 30px;
      }

    </style>

    <div class="modal-header">
      <div class="confirmation-icon">
        <h2>Confirmação de senha</h2>
      </div>
      <div class="confirmation-text">
        <p>Confirme sua senha para prosseguir.</p>
        <paper-input type="password" value="{{password}}" invalid="{{passInvalid}}" error-message="Senha incorreta."></paper-input>
        <div class="buttons">
          <paper-button class="accent block" on-tap="confirmPass">Confirmar</paper-button>
        </div>
      </div>
    </div>
`;
  }

  static get is() { return 'password-dialog'; }
  static get properties() {
    return {
      password: String,
      passInvalid: Boolean
    };
  }
  confirmPass(e) {
    this.dispatchEvent(new CustomEvent('confirm-password', { detail: { password: this.password } }));
  }
}
window.customElements.define(PasswordDialog.is, PasswordDialog);
