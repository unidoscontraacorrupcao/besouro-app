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

      .confirmation-text {
        width: 80%;
      }

      .modal-header {
        width: 100%;
      }


      iron-icon {
        --iron-icon-width: 50%;
        --iron-icon-height: 50%;
      }
    </style>

    <div class="modal-header">
      <app-confirmation-icon>Você aceitou esta missão!</app-confirmation-icon>
      <div class="confirmation-text">
        <p>Fique atento ao prazo restante e não deixe de concluir a missão.</p>
        <div class="buttons">
          <!-- <paper-button class="accent block" on-tap="">Compartilhar</paper-button> -->
        </div>
      </div>
    </div>
`;
  }

  static get is() { return 'accept-mission-modal'; }
  static get properties() {
    return {};
  }
}
window.customElements.define(AcceptMissionModal.is, AcceptMissionModal);
