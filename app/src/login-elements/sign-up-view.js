import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-spinner/paper-spinner.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

import '../app-elements/styles/modal-shared-styles.js';
import {CommonBehaviorsMixin} from '../mixin-elements/common-behaviors-mixin.js';
class SignUpView extends CommonBehaviorsMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="modal-shared-styles"></style>
      <style>
        :host {
          display: none;
          background-color: #f5f5f5;
          flex-direction: column;
          min-height: 100vh;
        }
        [hidden] {
          display: none !important;
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
          margin-top: 4vh;
        }
        paper-input {
          --paper-input-container-color: #b7b8b7;
          --paper-input-container-focus-color: #312783;
          --paper-input-container-input-color: #312783;
        }
        div.fields > paper-input-error {
          position: relative;
          white-space: normal;
          word-wrap: break-word;
        }
        paper-button {
          display: block;
          height: auto;
          max-width: 170px;
          color: white;
          background-color: #e6007e;
          font-family: Folio;
          font-size: 24px;
          letter-spacing: 5px;
          line-height: 26px;
          text-align: center;
          margin: 4vh auto 0;
          border-radius: 0;
        }

        .line {
          box-sizing: border-box;
          margin-top: 4vh;
          width: 100%;
          border: 1px solid #b7b8b7;
          opacity: 0.3;
        }
        .login-button {
          border: 1px solid #009fe3;
          background-color: #f5f5f5;
          color: #009fe3;
          max-width: none;
          margin-bottom: 5vh;
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
          Cadastre-se
        </div>
        <div class="fields">
          <paper-input id="email"
            label="Email"
            type="email"
            value="{{_form.email}}"
            invalid=[[_errors.email]]
            required></paper-input>
          <paper-input-error
            hidden$="[[!_errors.email]]" invalid>
            {{_errors.email}}
          </paper-input-error>
          <paper-input id="name"
            label="Nome"
            value="{{_form.name}}"
            allowed-pattern="[A-Za-zÀ-ÿ ]"
            invalid=[[_errors.name]]
            required></paper-input>
          <paper-input-error hidden$="[[!_errors.name]]" invalid>
            {{_errors.name}}
          </paper-input-error>
          <paper-input id="password"
            label="Senha"
            type="password"
            value="{{_form.password}}"
            invalid=[[_errors.password]]
            required></paper-input>
          <paper-input-error hidden$="[[!_errors.password]]" invalid>
            {{_errors.password}}
          </paper-input-error>
        </div>
        <paper-button on-tap="_onSignUp">
          Entrar
        </paper-button>
      </div>
      <div class="social" id="socialButtons">
        <div class="social-text">
        Você também pode usar suas redes sociais
        </div>
        <div class="social-buttons">
          <div class="social-button facebook">
            <paper-icon-button icon="app:facebook" on-tap="_onAuthFacebook"></paper-icon-button>
          </div>
        </div>
        <div id="social-notice">
          <span>
            Não publicamos nem cedemos nenhuma informação para essas redes
          </span>
        </div>
      </div>
      <div class="fill">
        <div class="line"></div>
        <paper-button class="login-button" on-tap="_onLogin">
          Já possuo login
        </paper-button>
      </div>
    `;
  }

  static get is() { return `sign-up-view`; }

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
    this.$.email.updateValueAndPreserveCaret("");
    this.$.name.updateValueAndPreserveCaret("");
    this.$.password.updateValueAndPreserveCaret("");
  }

  emptyPassword() {
    this.$.password.updateValueAndPreserveCaret("");
    this._form.password = "";
  }

  _onSignUp(e) {
    this.dispatchEvent(new CustomEvent(`sign-up`, { detail: this._form } ));
  }

  _onLogin(e) {
    this.dispatchEvent(new CustomEvent(`login`));
  }

  _forgotPassword(e) {
    this.dispatchEvent(new CustomEvent(`forgot-password`));
  }

  _onAuthFacebook(e) {
    this.showLoading();
    this.dispatchEvent(new CustomEvent(`auth-facebook`));
  }

  _getEmptyForm() {
    return {
      email: ``,
      name: ``,
      password: ``
    };
  }

  _getEmptyErrors() {
    return {
      email: ``,
      name: ``,
      password: ``
    };
  }

  ready() {
    super.ready();
    this.hideLoading();
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.$.socialButtons.style.display = 'none';
    } else {
      this.$.socialButtons.style.display = 'block';
    }
  }
}

window.customElements.define(SignUpView.is, SignUpView);
