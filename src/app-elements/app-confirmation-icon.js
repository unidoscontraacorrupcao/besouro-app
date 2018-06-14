import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import './app-icons.js';
import './shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class AppConfirmationIcon extends PolymerElement {
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

      iron-icon {
        color: #96DA4B;
        --iron-icon-width: 70%;
        --iron-icon-height: 100%;
      }

      .icon-bg {
        background-color: #96DA4B;
        border-radius: 50%;
        border-width: 20px;
        width: 100%;
      }

      .white-bg {
        background-color: white;
        border-color: #96DA4B;
        border-style: solid;
        border-radius: 50%;
        width: 125px;
        height: 125px;
        margin: auto;
        border-width: 6px;
      }

      .confirmation-icon h2 { margin-top: 20px; }

    </style>

      <div class="confirmation-icon">
        <div class="white-bg">
          <iron-icon icon="app:check"></iron-icon>
        </div>
        <h2><slot></slot></h2>
      </div>
`;
  }

  static get is() { return 'app-confirmation-icon'; }
  static get properties() {
    return {};
  }
}
window.customElements.define(AppConfirmationIcon.is, AppConfirmationIcon);
