import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import '@polymer/paper-toast/paper-toast.js';
import "@polymer/app-layout/app-grid/app-grid-style.js";
import '@polymer/paper-spinner/paper-spinner.js';

import '../app-elements/app-besouro-api.js';
import '../notifications-elements/notification-card.js';
import '../notifications-elements/empty-notifications.js';
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
          padding: 10px 0 0;
          margin-bottom: 64px;
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

    <app-besouro-api id="api"></app-besouro-api>
    <paper-toast id="toast" class="error" text="{{_toastMessage}}"></paper-toast>
    
    <app-header-layout has-scrolling-region>
      <app-header slot="header" condenses reveals fixed effects="waterfall">
        <app-toolbar>
          <paper-icon-button class="header-icon" icon="app:arrow-back" on-tap="_redirectToInbox"></paper-icon-button>
          <div main-title >Notificações</div>
          <paper-icon-button class="header-icon" icon="app:settings" on-tap="_redirectToNotifications"></paper-icon-button>
        </app-toolbar>
      </app-header>
        <div class="content">
          <template is="dom-if" if="{{!notifications.length}}">
            <empty-notifications></empty-notifications>
          </template>
          <template is="dom-repeat" items="{{notifications}}" as="notification">
            <notification-card notification="{{notification}}" on-tap="_checkRead"></notification-card>
          </template>
        </div>
    </app-header-layout>

    <template is="dom-if" if="{{loading}}">
      <div class="page-loading">
        <paper-spinner active></paper-spinner>
      </div>
    </template>
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
      selected: {
        observer: "_selectedChanged"
      },
      notifications: {
        type: Array,
        value: []
      },
      rootPath: String,
      loading: Boolean
    };
  }

  _selectedChanged(selected) {
    if(!selected) return;
    this._requestNotifications();
    this.set('loading', true);
  }

  _redirectToInbox() {
    this.set("route.path", `/`);
  }

  _redirectToNotifications() {
    this.set("route.path", `/settings`);
  }

  _requestNotifications() {
    if(!this.user) return;
    this.$.api.method = "GET";
    this.$.api.path = `notifications/user/${this.user.uid}/`;
    this.$.api.request().then((ajax) => {
      this.set('notifications', ajax.response)
      this.set('loading', false);
    }, (error) => {
      this._showToast('Ocorreu um problema ao requisitar suas notificações. Tente novamente.');
    });
  }

  _checkRead(e) {
    const notification = e.model.get('notification');
    const card = e.target;
    this.redirectToTarget(notification);
    if(!notification.read) {
      const data = {
        notification_id: notification.id,
        read: true
      }
      this.$.api.method = "PUT";
      this.$.api.user = this.user;
      this.$.api.path = `notifications/update-read`;
      this.$.api.body = data;
      this.$.api.request().then((ajax) => {
        card.notification = ajax.response;
      }, (error) => {
        this._showToast('Problema ao atualizar as notificações. Recarregue a página.');
      });
    }
  }

  redirectToTarget(notification) {
    var channel_sort = notification.channel.sort.split('-');
    if(channel_sort.length == 2) {
      var mission_id = channel_sort[1];
      this.$.api.path = `missions/${mission_id}`;
      this.$.api.method = "GET";
      this.$.api.request().then((ajax) => {
        var mission_name = ajax.response.title;
        this.set('route.show_conversation', true);
        this.set('route.path', `/show-mission/${mission_id}`);
      });
    }
    else {
      switch(notification.channel.sort) {
        case "mission":
          this.set('route.path', `/show-mission/${notification.message.target}`);
          break;
        case "trophy":
          this.set('route.path', '/profile');
          break;
        case "admin":
          if(notification.message.link) window.open(notification.message.link, "_blank");
          break;
        case "selected":
          if(notification.message.link) {
            if (/^www/.test(notification.message.link)) {
              notification.message.link = 'http://' + notification.message.link;
              window.open(notification.message.link, "_blank");
            } else {
              window.open(notification.message.link, "_blank");
            }
          }
          break;
        case "press":
          break;
        default:
          break;
      }
    }
  }

  //Utility functions
  _showToast(message) {
    this._toastMessage = message;
    this.$.toast.open();
  }

}

window.customElements.define(NotificationsPage.is, NotificationsPage);
