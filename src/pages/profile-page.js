import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '../app-elements/app-icons.js';
import '../app-elements/app-dialog.js';
import '../app-elements/shared-styles.js';
import '../profile-elements/password-dialog.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class ProfilePage extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
        background: var(--secondary-background-color);
        height: 100vh;
        @apply --default-font;
      }
      app-header {
        color: var(--default-primary-color);
        background: var(--accent-color);
        --app-form-header-background: var(--accent-color);
        --app-form-header-color: var(--default-primary-color);
        @apply --default-font-medium;
      }
      h1[main-title] {
        margin-left: 20px;
      }
      paper-input paper-button {
        color: var(--accent-color);
        border: none;
      }
      .fill {
        flex: 1;
      }
      .cover {
        height: 84px;
        background: var(--accent-color);
      }
      .cover .image, 
      .cover iron-image {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        display: block;
        margin: auto;
        overflow: hidden; 
        background: var(--divider-color);
      }
      .cover paper-icon-button {
        display: block;
        margin: -40px auto;
        color: white;
        background: rgba(0,0,0,0.4);
        width: 100%;
      }
      .image paper-spinner {
        margin: -50px 60px 35px;
      }
      .username,
      .notify,
      .email {
        max-width: 340px;
        margin: auto;
        padding: 80px 20px 0;
      }
      .email {
        padding-top: 0;
      }
      .notify {
        display: flex;
        padding-top: 20px;
      }
      .notify span {
        flex: 1;
        font-size: 1.2rem;
        font-weight: bold;
      }
      paper-button {
        max-width: 340px;
        margin: 40px auto;
        display: block;
        text-align: center;
        border-radius: 20px;
      }
      #upload {
        display: block;
        height: 0;
        width: 0;
      }
    </style>

    <app-dialog id="dialog">
      <password-dialog id="passDialog" on-confirm-password="_updatePassword"></password-dialog>
    </app-dialog>


    <app-header-layout has-scrolling-region="">
      <app-header slot="header" fixed="" condenses="" effects="waterfall">
        <app-toolbar>
          <paper-icon-button icon="app:arrow-back" on-tap="_returnToInbox"></paper-icon-button>
          <h1 main-title="">{{user.displayName}}</h1>
          <paper-icon-button icon="app:more-vert" on-tap="_openMenu"></paper-icon-button>
        </app-toolbar>
      </app-header>
      <input type="file" id="upload" on-change="getPhoto" accept=".jpg, .jpeg, .png">
      <div class="fill">
        <div class="cover">
          <div class="image">
            <iron-image id="profile" src="{{user.photoURL}}" sizing="cover">  
            </iron-image>
            <paper-icon-button icon="app:create" on-tap="uploadImage"></paper-icon-button>
            <dom-if if="{{!user}}">
              <template>
                <paper-spinner active=""></paper-spinner>
              </template>
            </dom-if>
          </div>
        </div>
        <div class="username">
          <paper-input label="nome" value="{{data.displayName}}" minlength="5" auto-validate="" error-message="O nome deve ter no mínimo 5 caracteres."></paper-input>
        </div>
        <div class="email">
          <paper-input label="email" type="email" value="{{data.email}}" disabled=""></paper-input>
        </div>
        <div class="email">
          <paper-input label="senha" type="password" value="{{data.password}}" minlength="8" auto-validate="" error-message="A senha deve ter no mínimo 8 caracteres." disabled="{{!passProvider}}">
          </paper-input>
          <paper-input label="confirmação de senha" type="password" value="{{data.confirmpass}}" disabled="{{!passProvider}}">
          </paper-input>
        </div>
        <hr>
        <div class="notify">
          <span>Receber notificações</span> <paper-toggle-button checked=""></paper-toggle-button>
        </div>
        <paper-button class="accent" on-tap="saveUserData">Salvar</paper-button>
      </div>
    </app-header-layout>
`;
  }

  static get is() { return 'profile-page'; }
  static get properties() {
    return {
      selected: {
        observer: '_selectedChanged'
      },
      profile: {
        observer: '_setProfile'
      },
      fileArray: {
        type: Array,
        value: []
      },
      user: {
        type: Object,
        notify: true,
        observer: '_setFormData'
      },
      appUser: {
        type: Object
      }
    };
  }

  getPhoto(e) {
    let photo = e.target.files[0];
    if(photo) {
      let reader = new FileReader();
      const img = this.$.profile;
      reader.onload = function (e) {
        img.src = e.target.result;
      }
      reader.readAsDataURL(photo);
      this.$.photoRef.path = `/users/${this.user.uid}/photo`;
      this.$.photoRef.put(photo).then(function(res) {
        this.$.photoRef.path += `/${photo.name}`;
      }.bind(this));
    }
  }

  _setFormData(user) {
    if (!user) return;
    this.data = {
      displayName: user.displayName,
      email: user.email,
      password: 'samplepass',
      confirmpass: 'samplepass'
    };
    this.passProvider = this.user.providerData[0].providerId === 'password';
  }
  _selectedChanged(selected) {}

  _returnToInbox() {
    this.set('route.path', '/');
  }

  uploadImage(e) {
    console.log("eai");
    this.$.upload.click();
  }

  saveUserData(e) {
    const data = this.data;

    if (this._validateInputs(data)) {
      this.user.updateProfile(data).then(setTimeout(function() {
        this.notifyPath('user.displayName');
        this.notifyPath('user.photoURL');
        this.set('appUser.photoURL', data.photoURL);
        this.set('appUser.displayName', data.displayName);
      }.bind(this), 1000));
      if(data.password !== 'samplepass' && this.passProvider) {
        this.$.dialog.present();
      }
    }
  }

  _updatePassword(e) {
    const password = e.detail.password;
    this.$.auth.signInWithEmailAndPassword(this.user.email, password)
      .then(function(res) {
        // use app-notify to display success message
        this.user.updatePassword(this.data.password);
        this.$.dialog.dismiss();
      }.bind(this))
      .catch(function(err) {
        this.$.passDialog.passInvalid = true;
      }.bind(this));
  }
  _validateInputs(data) {
    let valid = true;
    Array.from(this.shadowRoot.querySelectorAll('paper-input')).forEach((input) => {
      valid = !input.invalid;
    });
    valid = (valid && data && data.password === data.confirmpass);
    return valid;
  }
}
window.customElements.define(ProfilePage.is, ProfilePage);
