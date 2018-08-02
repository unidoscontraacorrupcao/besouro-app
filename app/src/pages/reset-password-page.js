import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-toast/paper-toast.js';

import '../app-elements/app-besouro-api.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class ResetPasswordPage extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
    </style>
    <style>
      :host {
        display: block;
        padding: 10px 20px;
      }
      .password-form {
        text-align: center;
        padding: 0 10px;
        margin: 0 auto;
      }
      h1 {
        font-family: Folio;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }
      paper-input {
        width: 80%;
        margin: 0 auto;
        --paper-input-container-color: #B7B8B7;
        --paper-input-container-focus-color: #312783;
        --paper-input-container-input-color: #312783;
      }
    </style>

    <app-besouro-api id="api"></app-besouro-api>
    <paper-toast id="toast" class="error" text="{{_toastMessage}}"></paper-toast>
    <app-route
      route="{{route}}"
      pattern="/reset-password/reset/:uid/:token"
      data="{{data}}">
    </app-route>

    <div class="content">
      <div class="password-form">
        <h1>Redefinir senha</h1>
      </div>
      <paper-input type="password" value="{{password1}}" label="Nova senha"></paper-input>
      <paper-input type="password" value="{{password2}}" label="Repita a nova senha"></paper-input>
      <paper-button class="pink-button" on-tap="sendNewPassword">Redefinir</paper-button>
    </div>
`;
  }

  static get is() { return 'reset-password-page'; }
  static get properties() {
    return {
      route: {
        type: Object,
        notify: true
      },
      selected: {
        observer: "_selectedChanged"
      },
      rootPath: String,
      data: Object,
      password1: String,
      password2: String
    };
  }

  _selectedChanged(selected) {
    if(!selected) return;
  }

  sendNewPassword() {
    let apiBaseUrl = this.$.api.baseUrl;
    if(this.password1 === this.password2) {
      const data = {
        uid: this.data.uid,
        token: this.data.token,
        new_password1: this.password1,
        new_password2: this.password2
      }
      this.$.api.authUrl = `${apiBaseUrl}/rest-auth/password/reset/confirm/ `;
      this.$.api.method = "POST";
      this.$.api.body = data;
      this.$.api.authRequest().then((ajax) => {
        this._showToast('Senha redefinida com sucesso!');
        this.redirectToLogin();
      }, (error) => {
        this._showToast('Problema ao atualizar a senha. Tente novamente.');
      });
    } else {
      this._showToast('As duas senhas devem ser iguais');
    }
  }

  _showToast(message) {
    this._toastMessage = message;
    this.$.toast.open();
  }

  redirectToLogin() {
    setTimeout(function(){ 
      this.set('route.path', '/');
    }.bind(this), 2000)
  }

}

window.customElements.define(ResetPasswordPage.is, ResetPasswordPage);
