import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class RejecttMissionModal extends PolymerElement {
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
      <div class="confirmation-icon">
        <iron-icon icon="app:thumb-down"></iron-icon>
        <h2>Você rejeitou esta missão</h2>
      </div>
      <div class="confirmation-text">
        <p>Está missão não será mais vista em sua caixa de entrada</p>
        <div class="buttons">
          <!-- <paper-button class="accent block" on-tap="">Compartilhar</paper-button> -->
        </div>
      </div>
    </div>
`;
  }

  static get is() { return 'reject-mission-modal'; }
  static get properties() {
    return {};
  }
}
window.customElements.define(RejecttMissionModal.is, RejecttMissionModal);
