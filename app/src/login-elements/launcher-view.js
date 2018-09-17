import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-spinner/paper-spinner.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

import '../app-elements/styles/modal-shared-styles.js';
import {CommonBehaviorsMixin} from '../mixin-elements/common-behaviors-mixin.js';
class LauncherView extends CommonBehaviorsMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="modal-shared-styles"></style>
      <style>
        :host {
          display: flex;
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
        .login {
          text-align: center;
          padding: 2vh 6vh 0;
          flex: 1;
        }
        paper-button {
          display: flex;
          align-items: center;
          height: 70px;
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
        #login-notice {
          width: 300px;
          margin: 20px auto;
          color: var(--light-text-color);
          font-family: folio;
          font-size: 18px;
        }
        @media only screen and (max-width: 400px) {
          paper-button {
            font-size: 20px;
          }
        }
        @media only screen and (max-width: 340px) {
          paper-button {
            font-size: 18px;
          }
        }
      </style>
      <div class="fill">
        <div class="image">
      <iron-image sizing="contain" src="/images/generic/logo.png"></iron-image>
        </div>
        <div class="main-title">
          Boas Vindas!
        </div>
      </div>
      <div class="login">
        <div class="login-buttons">
          <paper-button on-tap="_onLogin"><iron-icon icon="app:login-mail"></iron-icon>login via email</paper-button>
          <paper-button class="facebook-button" on-tap="_onAuthFacebook"><iron-icon icon="app:facebook-square"></iron-icon>login via facebook</paper-button>
        </div>
        <div id="login-notice">
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

  static get is() { return `launcher-view`; }

  static get properties() {
    return {
    };
  }

  constructor() {
    super();
  }

  _onSignUp(e) { this.dispatchEvent(new CustomEvent(`sign-up`)); }
  _onLogin(e) { this.dispatchEvent(new CustomEvent(`login`)); }

  _onAuthFacebook(e) {
    this.showLoading();
    this.dispatchEvent(new CustomEvent(`auth-facebook`));
  }

}

window.customElements.define(LauncherView.is, LauncherView);
