import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-spinner/paper-spinner.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

import '../app-elements/styles/modal-shared-styles.js';
import '../app-elements/app-besouro-api.js';
import {CommonBehaviorsMixin} from '../mixin-elements/common-behaviors-mixin.js';

class ForgotPasswordView extends CommonBehaviorsMixin(PolymerElement) {
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
          padding: 0 6vh;
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
          display: flex;
          align-items: center;
          height: 70px;
          max-width: 170px;
          color: white;
          background-color: #e6007e;
          font-family: Folio;
          font-size: 24px;
          letter-spacing: 3px;
          line-height: 26px;
          text-align: center;
          margin: 4vh auto 0;
          border-radius: 0;
        }
        .line {
          box-sizing: border-box;
          width: 100%;
          border: 1px solid #b7b8b7;
          opacity: 0.3;
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
      <app-besouro-api id="api"></app-besouro-api>

      <div id="loading">
        <paper-spinner active=""></paper-spinner>
      </div>
      <div class="fill">
        <div class="image">
      <iron-image sizing="contain" src="/images/generic/logo.png"></iron-image>
        </div>
        <div class="main-title">
          Refazer Senha
        </div>
        <div class="social">
          <div class="social-text">
            Preencha o campo abaixo e aguarde o recebimento do link de acesso
          </div>
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
        </div>
        <paper-button on-tap="_onForgotPassword">
          Enviar
        </paper-button>
      </div>
      <div class="social">
        <div class="social-text">
          Você também pode usar suas redes sociais
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
      <div class="fill">
        <div class="line"></div>
        <div class="sign-up-text">
          Ainda não faz parte do app?
        </div>
        <paper-button class="sign-up-button" on-tap="_onSignUp">
          Cadastre-se
        </paper-button>
      </div>
    `;
  }

  static get is() { return `forgot-password-view`; }

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
  }

  clearErrors(errors) {
    this._errors = this._getEmptyErrors();
  }

  emptyForm() {
    this._form = this._getEmptyForm();
    this._errors = this._getEmptyErrors();
    this.$.email.updateValueAndPreserveCaret(``);
  }

  _onForgotPassword(e) {
    let base = this.$.api.baseUrl;
    this.$.api.authUrl = `${base}/social-account-exists`;
    this.$.api.method = "GET";
    this.$.api.params = {"email": this._form.email};
    this.$.api.authRequest().then(function(ajax) {
      var social_login_exists = ajax.response.account_exists;
      if(!social_login_exists )
        this.dispatchEvent(new CustomEvent(`forgot-password`, {
          detail: this._form
        }));
      else {
        this.hideLoading();
        var errors = {"email": "Você entrou no aplicativo via login social. Por favor clique em login via facebook para acessar novamente."};
        this.exposeErrors(errors);
      }
    }.bind(this));
  }

  _onSignUp(e) { this.dispatchEvent(new CustomEvent(`sign-up`)); }
  _onAuthFacebook(e) {
    this.showLoading();
    this.dispatchEvent(new CustomEvent(`auth-facebook`));
  }


  _getEmptyForm() {
    return {
      email: ``
    };
  }

  _getEmptyErrors() {
    return {
      email: ``
    };
  }

  ready() {
    super.ready();
    this.hideLoading();
  }
}

window.customElements.define(ForgotPasswordView.is, ForgotPasswordView);
