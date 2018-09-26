import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-spinner/paper-spinner.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

import '../app-elements/styles/modal-shared-styles.js';
import {CommonBehaviorsMixin} from '../mixin-elements/common-behaviors-mixin.js';
class LoginView extends CommonBehaviorsMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="modal-shared-styles"></style>
      <style>
        :host {
          display: none;
          background-color: #F5F5F5;
          flex-direction: column;
          min-height: 100vh;
        }
        [hidden] {
          display: none !important;
        }
        .fill {
          flex: 1;
          padding: 0 6vh;
          max-height: 580px;
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
        .main-title {
          text-transform: uppercase;
          text-align: center;
          margin: 4vh auto 0;
          padding-bottom: 0.5vh;
          color: #312783;
          font-family: Folio;
          font-size: 45px;
          line-height: 55px;
        }
        .fields {
          margin-top: 3vh;
        }
        paper-input {
          --paper-input-container-color: #B7B8B7;
          --paper-input-container-focus-color: #312783;
          --paper-input-container-input-color: #312783;
        }
        div.fields > paper-input-error {
          position: relative;
          white-space: normal;
          word-wrap: break-word;
        }
        paper-button {
          display: flex;
          align-items: center;
          height: 70px;
          max-width: 170px;
          color: white;
          background-color: #E6007E;
          font-family: Folio;
          font-size: 24px;
          letter-spacing: 3px;
          line-height: 26px;
          text-align: center;
          margin: 4vh auto 0;
          border-radius: 0;
        }
        .forgot-password {
          margin-top: 1vh;
          color: var(--light-text-color);
          font-size: 14px;
          font-weight: bold;
          line-height: 19px;
          text-align: right;
        }
        .sign-up-text {
          margin-top: 3.7vh;
          text-transform: uppercase;
          color: #312783;
          font-family: Folio;
          font-size: 45px;
          line-height: 55px;
          text-align: center;
        }
        .sign-up-button {
          background-color: #009fe3;
          max-width: none;
          margin-bottom: 5vh;
        }
        .signup-text {
          color: var(--accent-color);
        }
        .signup-option {
          display: block;
          color: var(--secondary-text-color);
          margin: 15px 0;
        }
        .social-text {
          color: var(--light-text-color);
        }
        .login {
          padding: 0 6vh;
        }
        @media only screen and (max-width: 400px) {
          paper-button {
            font-size: 20px;
          }
        }
        @media only screen and (max-width: 340px) {
          .main-title {
            font-size: 40px;
          }
          paper-button {
            font-size: 18px;
          }
        }
      </style>
      <div id="loading">
        <paper-spinner active=""></paper-spinner>
      </div>
      <div class="fill">
        <div class="image">
      <iron-image sizing="contain" src="/images/generic/logo.png"></iron-image>
        </div>
        <div class="main-title">
          Login via email
        </div>
        <div class="fields">
          <paper-input id="email"
            label="Email"
            type="email"
            value="{{_form.email}}"
            invalid=[[_errors.email]]
            required></paper-input>
          <paper-input-error
            hidden$=[[!_errors.email]] invalid>
            {{_errors.email}}
          </paper-input-error>
          <paper-input id="password"
            label="Senha"
            type="password"
            value="{{_form.password}}"
            invalid=[[_errors.password]]
            required></paper-input>
          <paper-input-error hidden$=[[!_errors.password]] invalid>
            {{_errors.password}}
          </paper-input-error>
        </div>
        <div class="forgot-password" on-tap="_onForgotPassword">
          esqueci minha senha
        </div>
        <paper-button on-tap="_onLogin">
          Entrar
        </paper-button>
      </div>
      <div class="social" id="socialButtons">
        <div class="social-text">
          ainda não tem login? <span on-tap="_onSignUp" class="signup-text">Cadastre-se!</span>
          <span class="signup-option">ou</span>
        </div>
        <div class="login" >
          <div class="login-buttons">
            <paper-button class="facebook-button" on-tap="_onAuthFacebook"><iron-icon icon="app:facebook-square"></iron-icon>login via facebook</paper-button>
          </div>
        </div>
        <div id="social-notice">
          <span>
            Não publicamos nem cedemos nenhuma informação para essas redes
          </span>
        </div>
      </div>
    `;
  }

  static get is() { return `login-view`; }

  static get properties() {
    return {
      _errors: Object,
      _form: Object
    };
  }

  constructor() {
    super();
    this._form = this._getEmptyForm();
    this._errors = this._getEmptyErrors();
  }

  exposeErrors(errors) {
    this._errors = errors;
    this.emptyPassword();
  }

  emptyForm() {
    this._form = this._getEmptyForm();
    this._errors = this._getEmptyErrors();
    this.$.email.updateValueAndPreserveCaret(``);
    this.$.password.updateValueAndPreserveCaret(``);
  }

  emptyPassword() {
    this.$.password.updateValueAndPreserveCaret(``);
    this._form.password = ``;
  }

  _onLogin(e) {
    this.dispatchEvent(new CustomEvent(`login`, { detail: this._form } ));
  }

  _onSignUp(e) {
    this.dispatchEvent(new CustomEvent(`sign-up`));
  }

  _onForgotPassword(e) {
    this.dispatchEvent(new CustomEvent(`forgot-password`));
  }

  _onAuthFacebook(e) {
    this.showLoading();
    this.dispatchEvent(new CustomEvent(`auth-facebook`));
  }

  _onAuthGoogle(e) {
    this.dispatchEvent(new CustomEvent(`auth-google`));
  }

  _getEmptyForm() {
    return {
      email: ``,
      password: ``
    };
  }

  _getEmptyErrors() {
    return {
      email: ``,
      password: ``
    };
  }

  ready() {
    super.ready();
    this.hideLoading();
  }
}

window.customElements.define(LoginView.is, LoginView);
