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

import "@polymer/app-layout/app-grid/app-grid-style.js";
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
          margin: 10px 0;
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
        .categories {
          background-color: var(--default-primary-color);
          padding: 10px 20px;
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
      </div>
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
      rootPath: String
    };
  }

  _redirectToNotifications() {
    this.set("route.path", `/notifications`);
  }

}

window.customElements.define(SettingsPage.is, SettingsPage);
