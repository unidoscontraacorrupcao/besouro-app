import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-button/paper-button.js';
import '../api-elements/api-auth-user.js';
import '../api-elements/api-login.js';
import '../api-elements/api-logout.js';
import '../api-elements/api-sign-up.js';
import '../api-elements/api-update-user.js';
import '../api-elements/api-user.js';
import '../api-elements/api-user-profile.js';
import './sign-up-view.js';
import './login-view.js';
import './forgot-password-view.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class LoginController extends PolymerElement {
  static get template() {
    return html`
      <style>
        paper-toast {
          --paper-toast-color: white;
          --paper-toast-background-color: #e7007e;
          left: auto !important;
        }
      </style>

      <login-view id="login"
        feedback="{{_login.feedback}}"
        on-login="_requestLogin",
        on-sign-up="_showSignUp" on-forgot-password="_showForgotPassword"></login-view>

      <sign-up-view id="signUp"
        feedback="{{_signUp.feedback}}"
        on-sign-up="_requestSignUp"
        on-login="_showLogin"
        on-forgot-password="_showForgotPassword"></sign-up-view>

      <paper-toast id="toast"
        text="{{_toastMessage}}"></paper-toast>

      <api-login id="apiLogin"
        on-result="_onLogin"></api-login>
      <api-sign-up id="apiSignUp"
        on-result="_onSignUp"></api-sign-up>
      <api-logout id="apiLogout"></api-logout>
      <api-auth-user id="apiAuthUser"
        on-result="_onAuthUser"></api-auth-user>
      <api-user id="apiUser"
        on-result="_onUser"></api-user>
      <api-user-profile id="apiUserProfile"
        on-result="_onUserProfile"></api-user-profile>
      <api-update-user id="apiUpdateUser"
        on-result="_onUpdateUser"></api-update-user>
    `;
  }

  static get is() { return `login-controller`; }

  static get properties() {
    return {
      _toastMessage: String,
      _login: {
        type: Object,
        value: function() { return this._getEmptyLogin(); }
      },
      _signUp: {
        type: Object,
        value: function() { return this._getEmptySignUp(); }
      },
      _user: {
        type: Object,
        value: function() { return this._getEmptyUser(); }
      }
    };
  }

  // Public Actions

  signOut(key) {
    this.$.apiLogout.request(key);
    this._user = this._getEmptyUser();
    this._dispatchUser();
  }

  // View Events

  _requestLogin(e, form) {
    this._login.form = form;
    this.$.apiLogin.request(form.email, form.password);
  }

  _requestSignUp(e, form) {
    this._signUp.form = form;
    this.$.apiSignUp.request(form.email, form.name, form.password);
  }

  _showSignUp() {
    this.$.signUp.style.display = `flex`;
    this.$.login.style.display = `none`;
    // this.$.forgotPassword.style.display = `none`;
    this._user = this._getEmptyUser();
    this._login = this._getEmptyLogin();
    this._signUp = this._getEmptySignUp();
  }

  _showLogin() {
    this.$.signUp.style.display = `none`;
    this.$.login.style.display = `flex`;
    // this.$.forgotPassword.style.display = `none`;
    this._user = this._getEmptyUser();
    this._login = this._getEmptyLogin();
    this._signUp = this._getEmptySignUp();
  }

  _showForgotPassword() {
    this.$.signUp.style.display = `none`;
    this.$.login.style.display = `none`;
    // this.$.forgotPassword.style.display = `flex`;
    this._user = this._getEmptyUser();
    this._login = this._getEmptyLogin();
    this._signUp = this._getEmptySignUp();
  }

  // API Events

  _onLogin(e, result) {
    if(result.success) {
      this._user.key = result.data.key;
      this.$.apiAuthUser.request(this._user.key);
    } else {
      let errors = result.errors;
      if(errors.notFound) {
        this._toastUnknownError();
      } else {
        this._login.feedback.errors = {
          email: errors.username,
          password: errors.password
        };
        if(errors.non_field_errors) {
          this._toastIt(errors.non_field_errors);
        } else {
          this._toastInvalidFields();
        }
      }
    }
  }

  _onSignUp(e, result) {
    if(result.success) {
      this._user.key = result.data.key;
      this.$.apiAuthUser.request(this._user.key);
    } else {
      let errors = result.errors;
      if(errors.notFound) {
        this._toastUnknownError();
      } else {
        this._signUp.feedback.errors = {
          email: errors.email,
          password: errors.password1
        };
        this._toastInvalidFields();
      }
    }
  }

  _onAuthUser(e, result) {
    if(result.success) {
      this._user.uid = result.data.id;
      if(`form` in this._signUp) {
        this.$.apiUpdateUser.request(this._user.key, this._user.uid, this._signUp.form.name);
      } else {
        this.$.apiUser.request(this._user.key, this._user.uid);
      }
    } else {
      this._toastUnknownError();
    }
  }

  _onUser(e, result) {
    if(result.success) {
      this._user.email = result.data.email;
      this._user.displayName = result.data.displayName;
      this._user.isAdmin = result.data.isAdmin;
      this.$.apiUserProfile.request(this._user.key, this._user.uid);
    } else {
      this._toastUnknownError();
    }
  }

  _onUserProfile(e, result) {
    if(result.success) {
      this._user.city = result.data.city;
      this._user.state = result.data.state;
      this._user.country = result.data.country;
      this._user.gender = result.data.gender;
      this._user.race = result.data.race;
      this._user.politicalActivity = result.data.politicalActivity;
      this._user.biography = result.data.biography;
      this._user.photoURL = result.data.image;
      if(`form` in this._signUp) {
        this._signUp.feedback.finished = true;
      } else {
        this._login.feedback.finished = true;
      }
      this._dispatchUser()
    } else {
      this._toastUnknownError();
    }
  }

  _onUpdateUser(e, result) {
    if(result.success) {
      this._user.email = result.data.email;
      this._user.displayName = result.data.displayName;
      this._user.isAdmin = result.data.isAdmin;
      this.$.apiUserProfile.request(this._user.key, this._user.uid);
    } else {
      this._toastUnknownError();
    }
  }

  // Utility

  _dispatchUser() {
    this.dispatchEvent(new CustomEvent(`user-update`, { detail: this._user } ));
    this._user = this._getEmptyUser();
    this._login = this._getEmptyLogin();
    this._signUp = this._getEmptySignUp();
  }

  _toastIt(message) {
    this._toastMessage = message;
    this.$.toast.open();
  }

  _toastUnknownError() {
    this._toastIt("Um erro aconteceu. Por favor, tente novamente mais tarde.")
  }

  _toastInvalidFields() {
    this._toastIt("Cadastro inválido. Consulte os erros nos campos.");
  }

  _getEmptyUser() {
    return {
      biography: ``,
      city: ``,
      country: ``,
      displayName: ``,
      gender: ``,
      email: ``,
      isAdmin: false,
      key: ``,
      photoURL: ``,
      politicalActivity: ``,
      race: ``,
      state: ``,
      uid: 0
    };
  }

  _getEmptyLogin() {
    return {
      feedback: {
        exists: false
      }
    };
  }

  _getEmptySignUp() {
    return {
      feedback: {
        exists: false
      }
    };
  }
}

window.customElements.define(LoginController.is, LoginController);
