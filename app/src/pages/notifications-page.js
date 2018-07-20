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
class NotificationsPage extends PolymerElement {
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
        p {
          font-family: helvetica-neue;
          font-size: 16px;
          color: #333333;
          text-transform: uppercase;
        }
        app-header {
          background-color: var(--default-primary-color);
          color: var(--accent-color);
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
          width: 60px;
          text-align: center;
        }
        .config-icon {
          height: inherit;
          width: 42px;
          color: var(--secondary-text-color);
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
          <paper-icon-button class="header-icon" icon="app:arrow-back" on-tap="_redirectToInbox"></paper-icon-button>
          <div main-title >Notificações</div>
          <paper-icon-button class="header-icon" icon="app:settings" on-tap="_redirectToNotifications"></paper-icon-button>
        </app-toolbar>
      </app-header>
        <div class="content">
        </div>
    </app-header-layout>    
`;
  }

  static get is() {
    return "notifications-page";
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

  _redirectToInbox() {
    this.set("route.path", `/`);
  }

  _redirectToNotifications() {
    this.set("route.path", `/settings`);
  }
}

window.customElements.define(NotificationsPage.is, NotificationsPage);
