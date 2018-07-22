/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import '@polymer/app-layout/app-grid/app-grid-style.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-button/paper-button.js';

import { html } from "@polymer/polymer/lib/utils/html-tag.js";
class SettingsPage extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
    </style>
    <style>
      :host {
          --app-grid-columns: 2;
          display: block;
          background: #f5f5f5;
          flex-direction: column;
          min-height: 100vh;
        }
        app-header-layout {
          height: 100vh;
        }
        app-header {
          color: var(--accent-color);
          background-color: var(--default-primary-color);
        }
        app-toolbar {
          display: flex;
          padding-right: 0;
        }
        .header-box {
          flex: 1;
        }
        h5 {
          color: var(--paragraph-color);
          font-size: 18px;
          font-family: Folio;
          text-transform: uppercase;
          margin: 10px 0 20px;
        }
        div[main-title] {
          margin-left: 20px;
          font-family: Folio;
          font-size: 30px;
          text-transform: uppercase;
        }
        .header-icon {
          color: var(--secondary-text-color);
        }
        .content {
          padding: 10px 20px;
        }
        .icon-box {
          height: 100%;
          background-color: var(--secondary-text-color);
          width: 60px;
          text-align: center;
        }
        .config-icon {
          background-color: var(--secondary-text-color);
          height: inherit;
          width: 42px;
          color: var(--default-primary-color);
        }
        .page-heading {
          text-align: center;
          text-transform: uppercase;
          font-size: 20px;
          font-family: Folio;
          color: var(--secondary-text-color);
          padding: 0 20px;
        }
        .categories,
        .general,
        .share {
          background-color: var(--default-primary-color);
          padding: 10px 20px;
          border-bottom: 1px solid var(--disabled-text-color);
        }
        .save {
          background-color: var(--default-primary-color);
          padding: 50px 30px;
          margin-bottom: 64px;
        }
        .row {
          display: flex;
        }
        .category {
          flex: 1;
          margin-bottom: 20px;
          position: relative;
        }
        .category-icon,
        .category paper-toggle-button {
          width: calc(50% - 5px);
          display: inline-block;
          text-align: center;
        }
        .category paper-toggle-button {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translate(0%, -50%) scale(1.1);
          --paper-toggle-button-checked-bar-color: var(--secondary-text-color);
          --paper-toggle-button-checked-button-color: var(--default-primary-color);
          --paper-toggle-button-checked-bar: {
            opacity: 1;
          }
        }
        .category iron-icon {
          --iron-icon-height: 35px;
          --iron-icon-width: 40px;
          --iron-icon-fill-color: var(--secondary-text-color);
        }
        .category-icon span {
          font-family: Folio;
          text-transform: uppercase;
          color: var(--secondary-text-color);
          display: block;
        }
        paper-checkbox {
          margin-bottom: 20px;
          padding: 0 10px;
          --paper-checkbox-checked-color: var(--secondary-text-color);
          --paper-checkbox-checked-ink-color: var(--secondary-text-color);
          --paper-checkbox-label-color: var(--secondary-text-color);
          --paper-checkbox-label-checked-color: var(--secondary-text-color);
          --paper-checkbox-label:{
            width: 275px;
            font-family: Folio;
          }
        }
       

        @media screen and (max-width: 300px) {
          div[main-title] {
            margin-left: 10px;
          }
        }
    </style>
    
    <app-header-layout has-scrolling-region>
      <app-header slot="header" condenses reveals fixed effects="waterfall">
        <app-toolbar>
          <paper-icon-button class="header-icon" icon="app:arrow-back"  on-tap="_redirectToNotifications"></paper-icon-button>
          <div main-title >Notificações</div>
          <div class="header-space"></div>
          <div class="icon-box">
            <paper-icon-button class="config-icon" icon="app:settings"></paper-icon-button>
          </div>
        </app-toolbar>
      </app-header>
      <div class="page-heading">
        <p>Você pode editar as configurações das notificações a qualquer momento.</p>
      </div>
      <div class="categories">
        <h5>Notificações por categorias:</h5>
        
        <div class="row">
          <div class="category">
            <div class="category-icon">
              <iron-icon icon="app:navMissions"></iron-icon>
              <span>Missões</span>
            </div>
            <paper-toggle-button></paper-toggle-button>      
          </div>
          <div class="category">
            <div class="category-icon">
              <iron-icon icon="app:volume-up"></iron-icon>
              <span>Alertas</span>
            </div>
            <paper-toggle-button></paper-toggle-button>      
          </div>
        </div>

        <div class="row">
          <div class="category">
            <div class="category-icon">
              <iron-icon icon="app:splash-blocked"></iron-icon>
              <span>Troféus</span>
            </div>
            <paper-toggle-button></paper-toggle-button>      
          </div>
          <div class="category">
            <div class="category-icon">
              <iron-icon icon="app:thumb-up"></iron-icon>
              <span>Aprovados</span>
            </div>
            <paper-toggle-button></paper-toggle-button>      
          </div>
        </div>

        <div class="row">
          <div class="category">
            <div class="category-icon">
              <iron-icon icon="app:assignment"></iron-icon>
              <span>Opiniões</span>
            </div>
            <paper-toggle-button></paper-toggle-button>      
          </div>
          <div class="category">
            <div class="category-icon">
              <iron-icon icon="app:thumb-down"></iron-icon>
              <span>Reprovados</span>
            </div>
            <paper-toggle-button></paper-toggle-button>      
          </div>
        </div>
      </div>

      <div class="general">
        <h5>Notificações gerais:</h5>
        <paper-checkbox>permito que a campanha me envie notificações aqui no app</paper-checkbox>
        <paper-checkbox>permito que a campanha me envie emails</paper-checkbox>
      </div>

      <div class="share">
        <h5>Compartilhamento de dados:</h5>
        <paper-checkbox>aceito compartilhar minhas informações de perfil com a campanha, para uso exclusivo na campanha</paper-checkbox>
      </div>

      <div class="save">
        <paper-button class="flex-button pink-button" on-tap="_updateSettings">Salvar Edições</paper-button>
      </div>

      <div></div>
    </app-header-layout>    
`;
  }

  static get is() {
    return "settings-page";
  }
  static get properties() {
    return {
      route: {
        type: Object,
        notify: true
      },
      rootPath: String,
      user: Object,
      settings: Object
    };
  }

  _redirectToNotifications() {
    this.set("route.path", `/notifications`);
  }

  _updateSettings() {
    console.log('eae');
  }

}

window.customElements.define(SettingsPage.is, SettingsPage);
