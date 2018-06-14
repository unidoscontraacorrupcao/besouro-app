import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class SocialDialog extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: flex;
      }

      .submit {
        text-align: right;
        margin-top: 15px;
      }
    </style>
    <div>
      <paper-input label="URL" required="" auto-validate="" error-message="Digite uma URL válida." pattern="^https?://.*" value="{{socialLink}}"></paper-input>
      <div class="submit">
        <paper-button class="plain" on-tap="_saveSocial">Salvar</paper-button>
      </div>
    </div>
`;
  }

  static get is() { return 'social-dialog'; }
  static get properties() {
    return {
      socialLink: String,
      socialMedia: String
    };
  }

  _saveSocial() {
    const link = this.socialLink;
    this.dispatchEvent(new CustomEvent('save-social', { detail: { link } }));
    this.socialLink = '';
  }
}
window.customElements.define(SocialDialog.is, SocialDialog);
