import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import '../app-elements/app-confirmation-icon.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class FinishConfirmationModal extends PolymerElement {
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


    </style>

    <div class="modal-header">
      <app-confirmation-icon>Enviado</app-confirmation-icon>
      <div class="confirmation-text">
        <p>Agora é só aguardar a avaliação.</p>
        <p>Você receberá um e-mail e uma notificação no painel inicial.</p>
        <div class="buttons">
         <paper-button class="accent block" on-tap="_dismiss">fechar</paper-button>
        </div>
      </div>
    </div>
`;
  }

  static get is() { return 'finish-confirmation-modal'; }
  static get properties() {
    return {};
  }

  _dismiss() {
    this.dispatchEvent(new CustomEvent('close-modal'));
  }
}
window.customElements.define(FinishConfirmationModal.is, FinishConfirmationModal );
