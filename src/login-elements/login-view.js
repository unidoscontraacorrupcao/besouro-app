import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '../app-elements/shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class LoginView extends PolymerElement {
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
      .fields {
        padding-top: 40px;
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
        <paper-input label="email" type="email" value="{{email}}" error-message="Usuário não existe" on-value-changed="setInvalid"></paper-input>
        <paper-input label="senha" type="password" minlength="8" value="{{password}}" error-message="Senha incorreta" on-value-changed="setInvalid"></paper-input>
      </div>
      <paper-button class="plain" on-tap="submitCredentials">Entrar</paper-button>
    </div>
    <div class="social">
      <div class="social-text">Você também pode usar</div> 
      <div class="social-text">suas redes sociais.</div>
      <paper-icon-button class="facebook" icon="app:facebook" on-tap="signInWithFacebook"></paper-icon-button>
      <paper-icon-button class="facebook" icon="app:google" on-tap="signInWithGoogle"></paper-icon-button>
      <div class="social-text" on-tap="openRegister">
        <span>Esqueci minha senha</span> | <span> Não tenho cadastro</span>
      </div>
    </div>
`;
  }

  static get is() { return 'login-view'; }
  static get properties() {
    return {
      credentials: {
        type: Object,
        notify: true
      },
      email: String,
      password: String,
      sharedMission: String
    };
  }
  submitCredentials(e) {
   const inputs = Array.from(this.shadowRoot.querySelectorAll('paper-input'));
   let invalid = inputs.reduce((invalid, input) => invalid || input.invalid, false);
   let isblank = inputs.reduce((isblank, input) => isblank || !input.value, false);
   if (invalid || isblank) return; //TODO: use app-notify to display error message.
   else this.credentials = {
     email: this.email,
     password: this.password,
   };
  }

  signInWithFacebook(e) {
    this.dispatchEvent(new CustomEvent('provider-auth', { detail: { provider: 'facebook' } }));
  }

  signInWithGoogle(e) {
    this.dispatchEvent(new CustomEvent('provider-auth', { detail: { provider: 'google' } }));
  }

  openRegister(e) {
    this.dispatchEvent(new CustomEvent('open-register'));
  }

  setInvalid(e) {
    e.target.invalid = false;
  }
}

window.customElements.define(LoginView.is, LoginView);
