import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class SignUpView extends PolymerElement {
  static get template() {
    return html`
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
          margin-top: 5px;
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
      <div class="fill">
        <div class="image">
          <iron-image sizing="contain" src="/images/logo.png"></iron-image>
        </div>
        <div class="main-title">
          Cadastre-se
        </div>
        <div class="fields">
          <paper-input
            label="Email"
            type="email"
            value="{{_form.email}}"
            required></paper-input>
          <paper-input-error hidden$="[[!feedback.errors.email]]" invalid>
            {{feedback.errors.email}}
          </paper-input-error>
          <paper-input
            label="Nome"
            value="{{_form.name}}"
            allowed-pattern="[A-Za-zÀ-ÿ ]"
            required></paper-input>
          <paper-input-error hidden$="[[!feedback.errors.name]]" invalid>
            {{feedback.errors.name}}
          </paper-input-error>
          <paper-input
            label="Senha"
            type="password"
            value="{{_form.password}}"
            required></paper-input>
          <paper-input-error hidden$="[[!feedback.errors.password]]" invalid>
            {{feedback.errors.password}}
          </paper-input-error>
        </div>
        <paper-button on-tap="_onSignUp">
          Entrar
        </paper-button>
      </div>
      <div class="social">
        <div class="social-text">
        Você também pode usar suas redes sociais
        </div>
        <div class="social-buttons">
          <div class="social-button google">
            <paper-icon-button icon="app:google" on-tap="_onAuthGoogle"></paper-icon-button>
          </div>
          <div class="social-button facebook">
            <paper-icon-button icon="app:facebook" on-tap="_onAuthFacebook"></paper-icon-button>
          </div>
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
      feedback: {
        type: Object,
        value: function () { return this._getEmptyFeedback(); },
        observer: `_onFeedback`
      },
      _form: {
        type: Object,
        value: function () { return this._getEmptyForm(); }
      }
    };
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
    this.dispatchEvent(new CustomEvent(`auth-facebook`));
  }

  _onAuthGoogle(e) {
    this.dispatchEvent(new CustomEvent(`auth-google`));
  }

  _onFeedback(e, feedback) {
    if(this.feedback.exists && this.feedback.success) {
      this._form = this._getEmptyForm();
      this.feedback = this._getEmptyFeedback();
    }
  }

  _getEmptyForm() {
    return {
      email: ``,
      name: ``,
      password: ``
    };
  }

  _getEmptyFeedback() {
    return {
      exists: false
    };
  }
}

window.customElements.define(SignUpView.is, SignUpView);
