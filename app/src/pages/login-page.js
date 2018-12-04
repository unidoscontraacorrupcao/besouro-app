import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../app-elements/shared-styles.js';
import '../app-elements/app-dialog.js';
import '../login-elements/login-controller.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class LoginPage extends PolymerElement {
  static get template() {
    return html`
      <login-controller id="login"
        on-user-update="_onUserUpdate"></login-controller>
    `;
  }
  static get is() { return `login-page`; }
  static get properties() {return { };}

  signOut(key) {
    this.$.login.signOut(key);
    this.dispatchEvent(new CustomEvent(`logout-complete`));
  }
  _onUserUpdate(e, user) {
    this.dispatchEvent(new CustomEvent(`user-update`, { detail: user } ));
    this.dispatchEvent(new CustomEvent(`complete`));
  }

}

window.customElements.define(LoginPage.is, LoginPage);
