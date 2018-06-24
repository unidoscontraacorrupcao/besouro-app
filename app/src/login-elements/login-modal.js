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
`;
  }

  static get is() { return 'login-modal'; }
  static get properties() {
    return {
      user: {
        type: Object,
        observer: 'userChanged',
        notify: true
      },
      signUpData: {
        observer: 'sendSignUpCredentials'
      },
      signInData: {
        observer: 'sendSignInCredentials'
      },
      statusKnown: {
        notify: true
      },
      newUser: {
        type: Object
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

  sendSignUpCredentials(credentials) {
    this.$.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(function(res) {
        // use app-notify to display success message
        if (this.sharedMission) {
          this.dispatchEvent(new CustomEvent('returnToMission', {detail: { mission: this.sharedMission }}));
        }
      }.bind(this))
      .catch((err) => console.error(err));
  }

  sendSignInCredentials(credentials) {
    this.$.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(function(res) {
        // use app-notify to display success message
        if (this.sharedMission) {
          this.dispatchEvent(new CustomEvent('returnToMission', {detail: { mission: this.sharedMission }}));
        }
      }.bind(this))
      .catch((err) => {
        console.log(err.message);
        if(err.code === "auth/wrong-password") {
          let input = this.$.login.shadowRoot.querySelector('paper-input[type="password"]');
          input.invalid = true;
        } else {
          let input = this.$.login.shadowRoot.querySelector('paper-input');
          input.invalid = true;
        }
      });
  }

  authWithProvider(e) {
    this.$.auth.signInWithPopup(e.detail.provider)
      .then(function(res) {
        // use app-notify to display success message
      }.bind(this))
      .catch((err) => console.error(err));
  }

  userChanged(user) {
    if(!user) return;
    if(!user.displayName && this.signUpData && this.signUpData.displayName)
      user.updateProfile({ displayName: this.signUpData.displayName });
    if(user.displayName) {
      this.userData = {
        displayName: user.displayName,
        photoURL: user.photoURL
      };
      this.$.document.path = `/users/${user.uid}/content`;
      this.$.document.ref.set(this.userData);
    }
  }
}
window.customElements.define(LoginModal.is, LoginModal);
