import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/iron-image/iron-image.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../polymerfire/firebase-auth.js';
import '../../../polymerfire/firebase-document.js';
import '../app-elements/shared-styles.js';
import './register-view.js';
import './login-view.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class LoginModal extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
        background: var(--secondary-background-color);
      }
      #content {
        display: flex;
        position: relative;
        flex-direction: column;
        min-height: 100vh;
      }
      .fill {
        flex: 1;
        padding: 40px;
      }
      p {
        min-height: 18vh;
      }
      paper-button {
        display: block;
        text-align: center;
        margin: 20px auto;
      }
      .image {
        height: 24vh;
        margin: 6vh 10px 0;
      }
      .image iron-image {
        width: 100%;
        height: 100%;
        max-width: 250px;
      }
    </style>

    <div id="content">
      <div class="fill center">
        <div class="image">
          <iron-image sizing="contain" src="/images/splash.svg"></iron-image>
        </div>
        <p>SOMOS é uma plataforma para engajar eleitores e candidatos 
          a desempenharem suas melhores versões pela renovação da política.
        </p>
        <paper-button class="accent" on-tap="openRegister">Começar</paper-button>
        <a class="bottom" href="#">créditos</a>
      </div>
    </div>

    <firebase-auth id="auth" user="{{user}}" on-error="handleError" status-known="{{statusKnown}}">
    </firebase-auth>

    <firebase-document id="document">
    </firebase-document>

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
    this.$.content.style.display = 'none';
    this.$.register.style.display = 'flex';
    this.$.login.style.display = 'none';
  }

  openLogin() {
    this.$.content.style.display = 'none';
    this.$.register.style.display = 'none';
    this.$.login.style.display = 'flex';
  }

  openSplash() {
    this.$.content.style.display = 'flex';
    this.$.register.style.display = 'none';
    this.$.login.style.display = 'none';
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
