import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-button/paper-button.js';
import '../api-elements/api-auth-user.js';
import '../api-elements/api-login.js';
import '../api-elements/api-logout.js';
import '../api-elements/api-sign-up.js';
import '../api-elements/api-update-user.js';
import '../api-elements/api-user.js';
import '../app-elements/shared-styles.js';
import './register-view.js';
import './login-view.js';
import './forgot-password-view.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class LoginModal extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        paper-toast {
          --paper-toast-color: white;
          --paper-toast-background-color: #e7007e;
          left: auto !important;
        }
      </style>

      <register-view id="register" shared-mission="{{sharedMission}}" user="[[user]]" credentials="{{signUpData}}" errors="{{signUpErrors}}" on-open-login="openLogin" on-provider-auth="authWithProvider"></register-view>

      <login-view id="login" shared-mission="{{sharedMission}}" user="[[user]]" credentials="{{signInData}}" on-open-register="openRegister" on-provider-auth="authWithProvider" on-open-forgot-password="openForgotPassword"></login-view>

      <forgot-password-view id="forgotPassword" data="{{forgotPasswordData}}" errors="{{forgotPasswordErrors}}" on-open-register="openRegister" on-provider-auth="authWithProvider"></forgot-password-view>

      <paper-toast id="toast" text="{{toastMessage}}"></paper-toast>

      <api-login id="apiLogin" on-result="_onLogin"></api-login>
      <api-sign-up id="apiSignUp" on-result="_onSignUp"></api-sign-up>
      <api-logout id="apiLogout" on-result="_onLogout"></api-logout>
      <api-auth-user id="apiAuthUser" on-result="_onAuthUser"></api-auth-user>
      <api-user id="apiUser" on-result="_onUser"></api-user>
      <api-update-user id="apiUpdateUser" on-result="_onUpdateUser"></api-update-user>
    `;
  }

  static get is() { return 'login-modal'; }
  static get properties() {
    return {
      user: {
        type: Object,
        notify: true
      },
      userData: {
        type: Object,
        value: {
          key: 0,
          uid: 0,
          email: 0,
          photoURL: "/images/default_avatar.png",
          displayName: 0,
          isAdmin: false
        }
      },
      signUpData: {
        type: Object,
        value: {
          idle: true
        },
        observer: '_onSignUpDataChanged'
      },
      signUpErrors: {
        type: Object,
        value: {}
      },
      signInData: {
        type: Object,
        value: {
          idle: true
        },
        observer: '_onSignInDataChanged'
      },
      signInErrors: {
        type: Object,
        value: {}
      },
      forgotPasswordData: {
        type: Object,
        value: {
          idle: true
        },
        observer: '_onForgotPasswordDataChanged'
      },
      forgotPasswordErrors: {
        type: Object,
        value: {}
      },
      signedHeaders: {
        type: Object,
        value: {}
      },
      statusKnown: {
        notify: true
      },
      sharedMission: {
        type: String,
        value: ""
      },
      toastMessage: String
    };
  }

  openRegister() {
    this.$.register.style.display = 'flex';
    this.$.login.style.display = 'none';
    this.$.forgotPassword.style.display = 'none';
  }

  openLogin() {
    this.$.register.style.display = 'none';
    this.$.login.style.display = 'flex';
    this.$.forgotPassword.style.display = 'none';
  }

  openForgotPassword() {
    this.$.register.style.display = 'none';
    this.$.login.style.display = 'none';
    this.$.forgotPassword.style.display = 'flex';
  }

  authWithProvider(e) {
    // TODO: Request login based on provider
  }

  signOut() {
    this.$.apiLogout.request(this.userData.key);
    this.user = {};
  }

  _onSignInDataChanged() {
    if(!("idle" in this.signInData)) {
      this.$.apiLogin.request(this.signInData.email, this.signInData.password);
    }
  }

  _onSignUpDataChanged() {
    if(!("idle" in this.signUpData)) {
      // this.$.apiSignUp.generateRequest();
      this.$.apiSignUp.request(this.signUpData.email, this.signUpData.password);
    }
  }

  _onForgotPasswordDataChanged() {
    if(!("idle" in this.forgotPasswordData)) {
      // this.$.apiForgotPassword.generateRequest();
    }
  }

  _onLogin(e, result) {
    if(result.success) {
      this.userData.key = result.data.key;
      this.$.apiAuthUser.request(this.userData.key);
    } else {
      let errors = result.errors;
      if(errors.notFound) {
        this.toastUnknownError();
      } else {
        this.signInErrors = errors;
        if(errors.non_field_errors) {
          this.toastIt(errors.non_field_errors);
        } else {
          this.toastInvalidFields();
        }
      }
    }
  }

  _onSignUp(e, result) {
    if(result.success) {
      this.userData.key = result.data.key;
      this.$.apiAuthUser.request(this.userData.key);
    } else {
      let errors = result.errors;
      if(errors.notFound) {
        this.toastUnknownError();
      } else {
        this.signUpErrors = {
          email: errors.email,
          password: errors.password1
        };
        this.toastInvalidFields();
      }
    }
  }

  _onAuthUser(e, result) {
    if(result.success) {
      this.userData.uid = result.data.id;
      if(!("idle" in this.signUpData)) {
        this.$.apiUpdateUser.request(this.userData.key, this.userData.uid, this.signUpData.name);
      } else {
        this.$.apiUser.request(this.userData.key, this.userData.uid);
      }
    } else {
      this.toastUnknownError();
    }
  }

  _onUser(e, result) {
    if(result.success) {
      this.userData.email = result.data.email;
      this.userData.displayName = result.data.displayName;
      this.userData.isAdmin = result.data.isAdmin;
      this.user = this.userData;
    } else {
      this.toastUnknownError();
    }
  }

  _onUpdateUser(e, result) {
    if(result.success) {
      this.userData.email = result.data.email;
      this.userData.displayName = result.data.displayName;
      this.userData.isAdmin = result.data.isAdmin;
      this.user = this.userData;
    } else {
      this.toastUnknownError();
    }
  }

  toastIt(message) {
    this.toastMessage = message;
    this.$.toast.open();
  }

  toastUnknownError() {
    this.toastIt("Um erro aconteceu. Por favor, tente novamente mais tarde.")
  }

  toastInvalidFields() {
    this.toastIt("Cadastro inválido. Consulte os erros nos campos.");
  }
}

window.customElements.define(LoginModal.is, LoginModal);
