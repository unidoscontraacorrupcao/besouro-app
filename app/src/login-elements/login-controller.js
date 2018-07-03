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
import '../api-elements/api-forgot-password.js';
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
        on-login="_requestLogin",
        on-sign-up="_showSignUp" on-forgot-password="_showForgotPassword"></login-view>

      <sign-up-view id="signUp"
        on-sign-up="_requestSignUp"
        on-login="_showLogin"
        on-forgot-password="_showForgotPassword"></sign-up-view>

      <forgot-password-view id="forgotPassword"
        on-forgot-password="_requestForgotPassword"
        on-sign-up="_showSignUp"></forgot-password-view>

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
      <api-forgot-password id="apiForgotPassword"
        on-result="_onForgotPassword"></api-forgot-password>
    `;
  }

  static get is() { return `login-controller`; }

  static get properties() {
    return {
      _toastMessage: String,
      _login: Object,
      _signUp: Object,
      _forgotPassword: Object,
      _user: Object
    };
  }

  constructor() {
    super();
    this._toastMessage = ``;
    this._login = this._getEmptyLogin();
    this._signUp = this._getEmptySignUp();
    this._forgotPassword = this._getEmptyForgotPassword();
    this._user = this._getEmptyUser();
  }

  // Public Actions

  signOut(key) {
    this.$.apiLogout.request(key);
    this._user = this._getEmptyUser();
    this._dispatchUser();
  }

  // View Events

  _requestLogin(e, form) {
    const VALIDATION = this._validateLoginForm(form);
    if(VALIDATION.valid) {
      this._login.form = form;
      this.$.apiLogin.request(form.email, form.password);
    } else {
      this.$.login.exposeErrors(VALIDATION.errors);
      this._toastInvalidFields();
    }
  }

  _requestSignUp(e, form) {
    const VALIDATION = this._validateSignUpForm(form);
    if(VALIDATION.valid) {
      this._signUp.form = form;
      this.$.apiSignUp.request(form.email, form.name, form.password);
    } else {
      this.$.signUp.exposeErrors(VALIDATION.errors);
      this._toastInvalidFields();
    }
  }

  _requestForgotPassword(e, form) {
    const VALIDATION = this._validateForgotPasswordForm(form);
    if(VALIDATION.valid) {
      this.$.forgotPassword.clearErrors();
      this._forgotPassword.form = form;
      this.$.apiForgotPassword.request(form.email);
    } else {
      this.$.forgotPassword.exposeErrors(VALIDATION.errors);
      this._toastInvalidFields();
    }
  }

  _showSignUp() {
    this.$.signUp.style.display = `flex`;
    this.$.login.style.display = `none`;
    this.$.forgotPassword.style.display = `none`;
    this._clearForms();
  }

  _showLogin() {
    this.$.signUp.style.display = `none`;
    this.$.login.style.display = `flex`;
    this.$.forgotPassword.style.display = `none`;
    this._clearForms();
  }

  _showForgotPassword() {
    this.$.signUp.style.display = `none`;
    this.$.login.style.display = `none`;
    this.$.forgotPassword.style.display = `flex`;
    this._clearForms();
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
        this.$.login.emptyPassword();
      } else {
        this.$.login.exposeErrors({
          email: errors.username,
          password: errors.password
        });
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
        this.$.signUp.emptyPassword();
      } else {
        this.$.signUp.exposeErrors({
          email: errors.email,
          password: errors.password1
        });
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
      this.$.login.emptyPassword();
      this.$.signUp.emptyPassword();
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
      this.$.login.emptyPassword();
      this.$.signUp.emptyPassword();
      this._toastUnknownError();
    }
  }

  _onUserProfile(e, result) {
    if(result.success) {
      this._user.city = result.data.city;
      this._user.state = result.data.state;
      this._user.country = result.data.country;
      this._user.gender = result.data.gender;
      this._user.genderOther = result.data.genderOther;
      this._user.race = result.data.race;
      this._user.politicalActivity = result.data.politicalActivity;
      this._user.biography = result.data.biography;
      this._user.photoURL = result.data.image;
      this.$.login.emptyForm();
      this._dispatchUser();
    } else {
      this.$.login.emptyPassword();
      this.$.signUp.emptyPassword();
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
      let errors = result.errors;
      if(errors.notFound) {
        this._toastUnknownError();
        this.$.signUp.emptyPassword();
      } else {
        this.$.signUp.exposeErrors({
          name: errors.displayName
        });
        this._toastInvalidFields();
      }
    }
  }

  _onForgotPassword(e, result) {
    if(result.success) {
      this._toastIt(result.data.message);
    } else {
      let errors = result.errors;
      if(errors.notFound) {
        this._toastUnknownError();
      } else {
        this.$.forgotPassword.exposeErrors({
          email: errors.email
        });
        this._toastInvalidFields();
      }
    }
  }

  // Utility

  _dispatchUser() {
    this.dispatchEvent(new CustomEvent(`user-update`, { detail: this._user } ));
    this._clearForms();
  }

  _validateLoginForm(form) {
    let result = { valid: true, errors: { email: ``, password: `` } };

    result.errors.email = this._validateEmptiness(form.email);
    result.errors.password = this._validateEmptiness(form.password);

    result.valid = result.errors.email == `` && result.errors.password == ``;

    return result;
  }

  _validateSignUpForm(form) {
    let result = { valid: true, errors: { email: ``, name: ``, password: `` } };

    result.errors.email = this._validateEmptiness(form.email);
    if(result.errors.email == ``) {
      result.errors.email = this._validateEmail(form.email);
    }

    result.errors.name = this._validateEmptiness(form.name);

    result.errors.password = this._validateEmptiness(form.password);
    if(result.errors.password == ``) {
      result.errors.password = this._validatePassword(form.password);
    }

    result.valid = result.errors.email == ``
      && result.errors.name == ``
      && result.errors.password == ``;

    return result;
  }

  _validateForgotPasswordForm(form) {
    let result = { valid: true, errors: { email: `` } };

    result.errors.email = this._validateEmptiness(form.email);
    if(result.errors.email == ``) {
      result.errors.email = this._validateEmail(form.email);
    }

    result.valid = result.errors.email == ``;

    return result;
  }

  _validateEmptiness(field) {
    let errors = ``;
    if(field == ``) {
      errors += `Este campo não pode ser em branco. `;
    }
    return errors;
  }

  _validateEmail(email) {
    let errors = ``;
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!EMAIL_REGEX.test(email.toLowerCase())) {
      errors += `Insira um endereço de email válido. `;
    }
    return errors;
  }

  _validatePassword(password) {
    let errors = ``;
    if(password.length < 8) {
      errors += `Esta senha é muito curta. Ela precisa conter pelo menos 8 caracteres. `;
    }
    return errors;
  }

  _toastIt(message) {
    this._toastMessage = message;
    this.$.toast.open();
  }

  _toastUnknownError() {
    this._toastIt(`Um erro aconteceu. Por favor, tente novamente mais tarde.`)
  }

  _toastInvalidFields() {
    this._toastIt(`Formulário inválido. Consulte os erros nos campos.`);
  }

  _clearForms() {
    this._user = this._getEmptyUser();
    this._login = this._getEmptyLogin();
    this._signUp = this._getEmptySignUp();
    this._forgotPassword = this._getEmptyForgotPassword();
    this.$.login.emptyForm();
    this.$.signUp.emptyForm();
    this.$.forgotPassword.emptyForm();
  }

  _getEmptyUser() {
    return {
      biography: ``,
      city: ``,
      country: ``,
      displayName: ``,
      gender: ``,
      genderOther: ``,
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
    return {};
  }

  _getEmptySignUp() {
    return {};
  }

  _getEmptyForgotPassword() {
    return {};
  }
}

window.customElements.define(LoginController.is, LoginController);
