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
      <style include="shared-styles"></style>

      <register-view id="register" shared-mission="{{sharedMission}}" user="[[user]]" credentials="{{signUpData}}" on-open-login="openLogin" on-provider-auth="authWithProvider"></register-view>

      <login-view id="login" shared-mission="{{sharedMission}}" user="[[user]]" credentials="{{signInData}}" on-open-register="openRegister" on-provider-auth="authWithProvider"></login-view>

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
      signUpData: {
        observer: 'signUp'
      },
      signInData: {
        observer: 'signIn'
      },
      statusKnown: {
        notify: true
      },
      sharedMission: {
        type: String,
        value: ""
      }
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

  signUp(credentials) {
    this.$.ajax.method = "POST";
    this.$.ajax.url = "http://localhost:8000/rest-auth/registration/"
    this.$.ajax.headers = null;
    this.$.ajax.body = {
      "username": credentials.email,
      "email": credentials.email,
      "password1": credentials.password,
      "password2": credentials.password
    };
    this.$.ajax.generateRequest().completes.then(
      function(req) {
        if("key" in req.response) {
          this.updateUserNameByKey(req.response.key, credentials.name);
        } else {
          console.error("[Sign Up] Key not found");
        }
      }.bind(this),
      function(rejected) {
        console.error("[Sign Up] Sign up request failed");
        console.error(rejected);
      }.bind(this)
    );
  }

  signIn(credentials) {
    this.$.ajax.method = "POST";
    this.$.ajax.url = "http://localhost:8000/rest-auth/login/"
    this.$.ajax.headers = null;
    this.$.ajax.body = {
      "username": credentials.email,
      "password": credentials.password
    };
    this.$.ajax.generateRequest().completes.then(
      function(req) {
        if("key" in req.response) {
          this.getUserDataByKey(req.response.key);
        } else {
          console.error("[Login] Key not found");
        }
      }.bind(this),
      function(rejected) {
        console.error("[Login] Sign in request failed");
        console.error(rejected);
      }.bind(this)
    );
  }

  authWithProvider(e) {
    // TODO: Request login based on provider
  }

  signOut() {
    this.$.ajax.method = "POST";
    this.$.ajax.url = "http://localhost:8000/rest-auth/logout/";
    this.$.ajax.headers = { "Authorization": `Token ${this.user.key}` };
    this.$.ajax.body = null;
    this.$.ajax.generateRequest().completes.then((req) => {this.user = null;});
  }

  getUserDataByKey(key) {
    this.$.ajax.method = "GET";
    this.$.ajax.url = "http://localhost:8000/rest-auth/user/"
    this.$.ajax.headers = { "Authorization": `Token ${key}` };
    this.$.ajax.body = null;
    this.$.ajax.generateRequest().completes.then(
      function(req) {
        if("pk" in req.response) {
          this.getUserDataById(key, req.response.pk);
        } else {
          console.error("[Login] PK not found");
        }
      }.bind(this),
      function(rejected) {
        console.error("[Login] User data by key request failed");
        console.error(rejected);
      }.bind(this)
    );
  }

  getUserDataById(key, id) {
    this.$.ajax.method = "GET";
    this.$.ajax.url = `http://localhost:8000/api/v1/users/${id}/`
    this.$.ajax.headers = { "Authorization": `Token ${key}` };
    this.$.ajax.body = null;
    this.$.ajax.generateRequest().completes.then(
      function(req) {
        if("id" in req.response) {
          this.user = {
            key: key,
            uid: req.response.id,
            email: req.response.username,
            displayName: req.response.display_name.split(".")[1]
          };
        } else {
          console.error("[Login] ID not found");
        }
      }.bind(this),
      function(rejected) {
        console.error("[Login] User data by id request failed");
        console.error(rejected);
      }.bind(this)
    );
  }

  updateUserNameByKey(key, name) {
    this.$.ajax.method = "GET";
    this.$.ajax.url = "http://localhost:8000/rest-auth/user/"
    this.$.ajax.headers = { "Authorization": `Token ${key}` };
    this.$.ajax.body = null;
    this.$.ajax.generateRequest().completes.then(
      function(req) {
        if("pk" in req.response) {
          this.updateUserNameById(key, req.response.pk, name);
        } else {
          console.error("[Sign Up] PK not found");
        }
      }.bind(this),
      function(rejected) {
        console.error("[Sign Up] User data by key request failed");
        console.error(rejected);
      }.bind(this)
    );
  }

  updateUserNameById(key, id, name) {
    this.$.ajax.method = "PATCH";
    this.$.ajax.url = `http://localhost:8000/api/v1/users/${id}/`
    this.$.ajax.headers = { "Authorization": `Token ${key}` };
    this.$.ajax.body = { "display_name": `${id}.${name}` };
    this.$.ajax.generateRequest().completes.then(
      function(req) {
        if("id" in req.response) {
          this.user = {
            key: key,
            uid: req.response.id,
            email: req.response.username,
            displayName: req.response.display_name.split(".")[1]
          };
        } else {
          console.error("[Sign Up] ID not found");
        }
      }.bind(this),
      function(rejected) {
        console.error("[Sign Up] User data by id request failed");
        console.error(rejected);
      }.bind(this)
    );
  }
}

window.customElements.define(LoginModal.is, LoginModal);
