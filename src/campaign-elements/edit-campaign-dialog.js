import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import '../app-elements/app-confirmation-icon.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class EditCampaignDialog extends PolymerElement {
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
      <app-confirmation-icon>Campanha editada com sucesso!</app-confirmation-icon>
      <div class="confirmation-text">
        <p>Você pode conferir as informações atualizadas na página de campanha</p>
      </div>
    </div>
`;
  }

  static get is() { return 'edit-campaign-dialog'; }
  static get properties() {
    return {};
  }
}
window.customElements.define(EditCampaignDialog.is, EditCampaignDialog);
