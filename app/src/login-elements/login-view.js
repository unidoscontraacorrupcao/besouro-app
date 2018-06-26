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
        background-color: #F5F5F5;
        flex-direction: column;
        min-height: 100vh;
      }
      .fill {
        flex: 1;
        padding: 2vh 6vh 0;
      }
      .image {
        height: 98px;
        margin: 6vh auto 0;
      }
      .image iron-image {
        width: 210px;
        height: 98px;
        margin: auto;
        display: block;
      }
      .title {
        text-transform: uppercase;
        text-align: center;
        margin: 4vh auto 0;
        padding-bottom: 0.5vh;
        color: #312783;
        font-family: Folio;
        font-size: 50px;
        line-height: 55px;
      }
      .fields {
        margin-top: 4vh;
      }
      paper-input {
        --paper-input-container-color: #B7B8B7;
        --paper-input-container-focus-color: #312783;
        --paper-input-container-input-color: #312783;
      }
      paper-button {
        display: block;
        height: auto;
        max-width: 170px;
        color: white;
        background-color: #E6007E;
        font-family: Folio;
        font-size: 24px;
        letter-spacing: 5px;
        line-height: 26px;
        text-align: center;
        margin: 4vh auto 0;
        border-radius: 0;
      }
      .forgot-password {
        margin-top: 1vh;
        color: #e6007e;
        font-size: 14px;
        font-weight: bold;
        line-height: 19px;
        text-align: center;
      }
      .social {
        text-align: center;
        margin-top: 5vh;
      }
      .social-text {
        font-family: Folio;
        font-size: 18px;
        line-height: 19px;
        color: #312783;
      }
      .social-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 1.6vh auto 0;
      }
      .social-button {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
      .social-button.google {
        height: 67px;
        width: 67px;
        border: 1px solid #b7b7b7;
        background-color: white;
      }
      .social-button.facebook {
        margin-left: 2.35vw;
        height: 66px;
        width: 66px;
        color: white;
        background-color: #4460a0;
      }
      .line {
        box-sizing: border-box;
        margin-top: 4vh;
        height: 3px;
        width: 100%;
        border: 1px solid #b7b8b7;
        opacity: 0.3;
      }
      .sign-up-text {
        margin-top: 3.7vh;
        text-transform: uppercase;
        color: #312783;
        font-family: Folio;
        font-size: 50px;
        line-height: 55px;
        text-align: center;
      }
      .sign-up-button {
        background-color: #009fe3;
        max-width: none;
        margin-bottom: 5vh;
      }
    </style>
    <div class="fill">
      <div class="image">
        <iron-image sizing="contain" src="/images/logo.png"></iron-image>
      </div>
      <div class="title">
        Faça Login
      </div>
      <div class="fields">
        <paper-input label="Email" type="email" value="{{email}}" error-message="Usuário inválido!"></paper-input>
        <paper-input label="Senha" type="password" minlength="8" value="{{password}}" error-message="Senha incorreta!"></paper-input>
      </div>
      <paper-button on-tap="submitCredentials">
        Entrar
      </paper-button>
      <div class="forgot-password">
        esqueci minha senha
      </div>
    </div>
    <div class="social">
      <div class="social-text">
      Você também pode usar suas redes sociais
      </div>
      <div class="social-buttons">
        <div class="social-button google">
          <paper-icon-button icon="app:google" on-tap="signInWithGoogle"></paper-icon-button>
        </div>
        <div class="social-button facebook">
          <paper-icon-button icon="app:facebook" on-tap="signInWithFacebook"></paper-icon-button>
        </div>
      </div>
    </div>
    <div class="fill">
      <div class="line"></div>
      <div class="sign-up-text">
        Ainda não faz parte do app?
      </div>
      <paper-button class="sign-up-button" on-tap="openRegister">
        Cadastre-se
      </paper-button>
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
    if (!invalid && !isblank) {
      this.credentials = {
        email: this.email,
        password: this.password
      };
    }
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
}

window.customElements.define(LoginView.is, LoginView);
