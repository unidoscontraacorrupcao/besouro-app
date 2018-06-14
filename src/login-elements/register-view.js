import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '../app-elements/shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class RegisterView extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: flex;
        background: url(/images/frame-bg.svg);
        background-size: cover;
        background-position: center;
        flex-direction: column;
        min-height: 100vh;
      }
      .fill {
        flex: 1;
        padding: 20px 60px;
      }
      paper-button {
        display: block;
        text-align: center;
        margin: 20px auto 10px;
        background: var(--default-primary-color);
      }
      paper-input {
        --paper-input-container-color: var(--default-primary-color);
        --paper-input-container-focus-color: var(--default-primary-color);
        --paper-input-container-invalid-color: var(--default-primary-color);
        --paper-input-container-input-color: var(--default-primary-color);
      }
      .facebook {
        color: #1A467B;
        border: none;
        background: white;
        border-radius: 50%;
        overflow: hidden;
        margin: 10px;
      }
      .image {
        height: 13vh;
        margin: 6vh 10px 0;
      }
      .image iron-image {
        width: 100%;
        height: 100%;
        max-width: 250px;
        margin: auto;
        display: block;
      }
      .social {
        text-align: center;
        margin: 30px;
      }
      .social-text {
        font-weight: bold;
        color: #99391f;
      }
    </style>
    <div class="fill">
      <div class="image">
        <iron-image sizing="contain" src="/images/logo-white.svg"></iron-image>
      </div>
      <div class="fields">
        <paper-input label="nome" value="{{name}}" minlength="5" auto-validate="" error-message="O nome deve ter no mínimo 5 caracteres."></paper-input>
        <paper-input label="email" type="email" value="{{email}}" auto-validate="" error-message="Informe um email válido."></paper-input>
        <paper-input label="senha" type="password" minlength="8" value="{{password}}" auto-validate="" error-message="A senha deve ter no mínimo 8 caracteres."></paper-input>
      </div>
      <paper-button class="plain" on-tap="submitCredentials">Registrar</paper-button>
    </div>
    <div class="social">
      <div class="social-text">Você também pode usar</div> 
      <div class="social-text">suas redes sociais.</div>
      <paper-icon-button class="facebook" icon="app:facebook" on-tap="signUpWithFacebook"></paper-icon-button>
      <paper-icon-button class="facebook" icon="app:google" on-tap="signUpWithGoogle"></paper-icon-button>
      <div class="social-text" on-tap="openLogin">Já possuo cadastro</div>
    </div>
`;
  }

  static get is() { return 'register-view'; }
  static get properties() {
    return {
      credentials: {
        type: Object,
        notify: true
      },
      name: String,
      email: String,
      password: String,
      sharedMission: String
    };
  }
  submitCredentials(e) {
    const inputs = Array.from(this.shadowRoot.querySelectorAll('paper-input'));
    let invalid = inputs.reduce((invalid, input) => invalid || input.invalid, false);
    let isblank = inputs.reduce((isblank, input) => isblank || !input.value, false);
    if(invalid || isblank) return; //TODO: use app-notify to display error message.
    else this.credentials = {
      displayName: this.name,
      email: this.email,
      password: this.password,
    };
  }

  signUpWithFacebook(e) {
    this.dispatchEvent(new CustomEvent('provider-auth', { detail: { provider: 'facebook' } }));
  }

  signUpWithGoogle(e) {
    this.dispatchEvent(new CustomEvent('provider-auth', { detail: { provider: 'google' } }));
  }

  openLogin(e) {
    this.dispatchEvent(new CustomEvent('open-login'));
  }
}

window.customElements.define(RegisterView.is, RegisterView);
