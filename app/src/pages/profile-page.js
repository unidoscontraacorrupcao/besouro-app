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
        --app-form-header-background: white;
        --app-form-header-color: #333333;
      }
      app-toolbar:not([tab-bar]) {
        color: white;
        padding: 0;
        height: 250px;
        --layout-center_-_align-items: normal;
      }
      app-toolbar > paper-icon-button.left {
        margin: 20px 0 0 20px;
      }
      app-toolbar > h1[main-title] {
        width: 100%;
        display: flex
      }
      h1[main-title] > div.wrap-title {
        align-self: flex-end;
        font-family: Folio;
        font-size: 32px;
        line-height: 35px;
        font-weight: normal;
      }
      div.wrap-title > div.status {
        font-size: 14px;
        line-height: 19px;
      }
      app-toolbar > paper-icon-button.right {
        margin: 20px 20px 0 0;
      }
      app-toolbar > iron-image {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -2;
      }
      .image-filter {
        position: absolute;
        background: rgba(49,39,131,0.5);
        width: 100%;
        height: 100%;
        z-index: -1;
      }
      .tabs-text {
        font-family: Folio;
        text-transform: uppercase;
        font-size: 18px;
        line-height: 19px;
      }
      paper-input paper-button {
        color: var(--accent-color);
        border: none;
      }
      .fill {
        flex: 1;
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
        padding: 0px 20px 0;
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
        margin: 20px auto 100px;
        display: block;
        text-align: center;
        border-radius: 20px;
      }
      #upload {
        display: block;
        height: 0;
        width: 0;
      }

      #app-actions {
        position: fixed;
        bottom: 0;
        background: white;
        width: 85%;
        border-top-style: solid;
        border-top-color: #E7E7E7;
        z-index: 1000;
      }

      #app-actions span {
        text-transform: uppercase;
        color: var(--light-text-color);
        font-family: Folio;
      }

      #app-actions #actions-content {
        width: 80%;
        display: flex;
        text-align: center;
        padding-bottom: 5px;
        padding-top: 5px;
      }

      #app-actions #actions-content > * {flex-grow: 1;}

      .icon-container {
        display: flex;
        flex-direction: column;
      }

      .icon-container span { margin-top: -6px; }

      .icon-container > * {
        margin: auto;
      }

      #new-mission-btn {
        margin-top: 20px;
        width: 40px;
        height: 40px;
        background-color: var(--accent-color);
        border-radius: 50%;
        margin: 8px auto;
      }

      #new-mission-btn paper-icon-button {
        width: 40px;
        color: white;
      }

      #app-actions #new-mission-btn paper-icon-button { display: block; }
      #app-actions #missions-btn paper-icon-button {
        display: block;
        padding: 0px;
      }
      #app-actions #notifications-btn paper-icon-button {
        display: block;
        padding: 0px;
      }

      @media only screen and (max-width: 640px) {
        #app-actions { width: 100%; }
        #actions-content {
          width: 90%;
          margin: auto;
        }
      }
    </style>

    <app-dialog id="dialog">
      <password-dialog id="passDialog" on-confirm-password="_updatePassword"></password-dialog>
    </app-dialog>

    <app-header-layout has-scrolling-region="">
      <app-header slot="header">
        <app-toolbar>
          <paper-icon-button class="left" icon="app:arrow-back" on-tap="_returnToInbox"></paper-icon-button>
          <h1 main-title>
            <div class="wrap-title">
              <div class="title-name">
                {{user.displayName}}
              </div>
              <div class="status">
                Status do participante
              </div>
            </div>
          </h1>
          <paper-icon-button class="right" icon="app:edit-profile" on-tap="uploadImage"></paper-icon-button>
          <iron-image class="image" id="profile" src="{{user.photoURL}}" sizing="cover"></iron-image>
          <div class="image-filter"></div>
        </app-toolbar>
        <app-toolbar tab-bar>
          <paper-tabs selected="{{tab}}" fallback-selection="0">
            <paper-tab>
              <span class="tabs-text">
                infos
              </span>
            </paper-tab>
            <paper-tab>
              <span class="tabs-text">
                troféus
              </span>
            </paper-tab>
            <paper-tab>
              <span class="tabs-text">
                contribuições
              </span>
            </paper-tab>
          </paper-tabs>
        </app-toolbar>
      </app-header>
      <iron-pages selected="{{tab}}">
        <div id="info">
          <input type="file" id="upload" on-change="getPhoto" accept=".jpg, .jpeg, .png">
          <div class="fill">
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
        </div>
        <div id="trophies">
          Troféus
        </div>
        <div id="contributions">
          Contribuições
        </div>
      </iron-pages>
      <div id="app-actions">
        <div id="actions-content">
          <div id="missions-btn">
            <div class="icon-container">
              <paper-icon-button icon="app:navMissions"></paper-icon-button>
              <span>missões</span>
            </div>
          </div>
          <div>
            <div id="new-mission-btn" style="display: none">
              <paper-icon-button on-tap="_openMissionForm" icon="app:add"></paper-icon-button>
            </div>
          </div>
          <div id="notifications-btn">
            <div class="icon-container">
              <paper-icon-button icon="app:navNotifications"></paper-icon-button>
              <span>notificações</span>
            </div>
          </div>
        </div>
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
      },
      tab: {
        type: Object,
        value: function() { return 0; },
        observer: 'tabChanged'
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
  }
  _selectedChanged(selected) {}

  _returnToInbox() {
    this.set('route.path', '/');
  }

  tabChanged(e) {
    if(this.tab == 0) {
      this.setTabDivs('flex', 'none', 'none');
    } else if(this.tab == 1) {
      this.setTabDivs('none', 'flex', 'none');
    } else {
      this.setTabDivs('none', 'none', 'flex');
    }
  }

  setTabDivs(info, trophies, contributions) {
    this.$.info.style.display = info;
    this.$.trophies.style.display = trophies;
    this.$.contributions.style.display = contributions;
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
