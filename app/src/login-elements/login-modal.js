import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-button/paper-button.js';
import '../app-elements/shared-styles.js';
import './register-view.js';
import './login-view.js';
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

      <login-view id="login" shared-mission="{{sharedMission}}" user="[[user]]" credentials="{{signInData}}" on-open-register="openRegister" on-provider-auth="authWithProvider"></login-view>

      <paper-toast id="toast" text="{{toastMessage}}"></paper-toast>

      <iron-ajax
        id="apiSignIn" content-type="application/json" handle-as="json"
        method="POST"
        url="http://localhost:8000/rest-auth/login/"
        body='{"username":"{{signInData.email}}","password":"{{signInData.password}}"}'
        on-response="_handleSignInResponse"
        on-error="_handleSignInErrorResponse"></iron-ajax>

      <iron-ajax
        id="apiSignUp" content-type="application/json" handle-as="json"
        method="POST"
        url="http://localhost:8000/rest-auth/registration/"
        body='{"username":"{{signUpData.email}}","email":"{{signUpData.email}}","password1":"{{signUpData.password}}","password2":"{{signUpData.password}}"}'
        on-response="_handleSignUpResponse"
        on-error="_handleSignUpErrorResponse"></iron-ajax>

      <iron-ajax
        id="apiSignOut" content-type="application/json" handle-as="json"
        method="POST"
        url="http://localhost:8000/rest-auth/logout/"
        headers={{signedHeaders}}></iron-ajax>

      <iron-ajax
        id="apiGetUserByKey" content-type="application/json" handle-as="json"
        method="GET"
        url="http://localhost:8000/rest-auth/user/"
        headers={{signedHeaders}}
        on-response="_handleGetUserByKeyResponse"
        on-error="_handleGetUserByKeyErrorResponse"></iron-ajax>

      <iron-ajax
        id="apiGetUser" content-type="application/json" handle-as="json"
        method="GET"
        url="http://localhost:8000/api/v1/users/"
        headers={{signedHeaders}}
        on-response="_handleGetUserResponse"
        on-error="_handleGetUserErrorResponse"></iron-ajax>

      <iron-ajax
        id="apiUpdateUser" content-type="application/json" handle-as="json"
        method="PATCH"
        url="http://localhost:8000/api/v1/users/"
        headers={{signedHeaders}}
        body='{"display_name":"{{userData.uid}}.{{signUpData.name}}"}'
        on-response="_handleUpdateUserResponse"
        on-error="_handleUpdateUserErrorResponse"></iron-ajax>

      <iron-ajax id="ajax" handle-as="json" content-type="application/json" debounce-duration="300"></iron-ajax>
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
  }

  openLogin() {
    this.$.register.style.display = 'none';
    this.$.login.style.display = 'flex';
  }

  authWithProvider(e) {
    // TODO: Request login based on provider
  }

  signOut() {
    this.signedHeaders = {
      "authorization": `Token ${this.user.key}`
    };
    this.user = {};
    this.$.apiSignOut.generateRequest();
  }

  _onSignInDataChanged() {
    if(!("idle" in this.signInData)) {
      this.$.apiSignIn.generateRequest();
    }
  }

  _onSignUpDataChanged() {
    if(!("idle" in this.signUpData)) {
      this.$.apiSignUp.generateRequest();
    }
  }

  _handleSignInResponse(e) {
    let response = e.detail.xhr.response;
    if("key" in response) {
      this.userData.key = response.key;
      this.signedHeaders = {
        "authorization": `Token ${response.key}`
      };
      this.$.apiGetUserByKey.generateRequest();
    } else {
      console.error("[Login] Key not found");
      this.toastUnknownError();
    }
  }

  _handleSignInErrorResponse(e, iron) {
    let response = iron.request.xhr.response;
    let errors = {};
    if("username" in response) {
      errors.email = response.username.join("\n");
    }
    if("password" in response) {
      errors.password = response.password.join("\n");
    }
    console.error(errors);
    this.signInErrors = errors;

    if("non_field_errors" in response) {
      this.toastIt(response.non_field_errors.join("\n"));
    } else {
      this.toastInvalidFields();
    }
  }

  _handleSignUpResponse(e) {
    let response = e.detail.xhr.response;
    if("key" in response) {
      this.userData.key = response.key;
      this.signedHeaders = {
        "authorization": `Token ${response.key}`
      };
      this.$.apiGetUserByKey.generateRequest();
    } else {
      console.error("[Sign Up] Key not found");
      this.toastUnknownError();
    }
  }

  _handleSignUpErrorResponse(e, iron) {
    let response = iron.request.xhr.response;
    let errors = {};
    if("email" in response) {
      errors.email = response.email.join("\n");
    }
    if("password1" in response) {
      errors.password = response.password1.join("\n");
    }
    this.signUpErrors = errors;
    console.error(errors);
    this.toastInvalidFields();
  }

  _handleGetUserByKeyResponse(e) {
    let response = e.detail.xhr.response;
    if("pk" in response) {
      this.userData.uid = response.pk;
      if(!("idle" in this.signUpData)) {
        this.$.apiUpdateUser.url += `${this.userData.uid}/`;
        this.$.apiUpdateUser.generateRequest();
      } else {
        this.$.apiGetUser.url += `${this.userData.uid}/`;
        this.$.apiGetUser.generateRequest();
      }
    } else {
      console.error("[Sign Up/Login] User not found");
      this.toastUnknownError();
    }
  }

  _handleGetUserByKeyErrorResponse(e, iron) {
    let response = iron.request.xhr.response;
    console.error(response);
    this.toastUnknownError();
  }

  _handleGetUserResponse(e) {
    let response = e.detail.xhr.response;
    if("id" in response) {
      // TODO: Get user's avatar from profile
      this.userData.email = response.email;
      this.userData.displayName = this.parseName(response.display_name);
      this.userData.isAdmin = response.is_superuser || response.is_staff;
      this.user = this.userData;
    } else {
      console.error("[Login] User not found");
      this.toastUnknownError();
    }
  }

  _handleGetUserErrorResponse(e, iron) {
    let response = iron.request.xhr.response;
    console.error(response);
    this.toastUnknownError();
  }

  _handleUpdateUserResponse(e) {
    let response = e.detail.xhr.response;
    if("id" in response) {
      // TODO: Get user's avatar from profile
      this.userData.email = response.email;
      this.userData.displayName = this.parseName(response.display_name);
      this.userData.isAdmin = false;
      this.user = this.userData;
    } else {
      console.error("[Sign Up] Update user failed");
      this.toastUnknownError();
    }
  }

  _handleUpdateUserErrorResponse(e, iron) {
    let response = iron.request.xhr.response;
    let errors = {};
    if("display_name" in response) {
      errors.name = response.name.join("\n");
    }
    this.signUpErrors = errors;
    console.error(errors);
    this.toastInvalidFields();
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

  parseName(name) {
    if(name.indexOf(".") != -1) {
      return name.split(".")[1];
    } else {
      return "Admin";
    }
  }
}

window.customElements.define(LoginModal.is, LoginModal);
