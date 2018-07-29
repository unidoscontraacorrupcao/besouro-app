import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import '../app-elements/app-besouro-api.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class NotificationCard extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
      }
      h4 {
        color: var(--paragraph-color);
        font-size: 22px;
        font-family: Folio;
        margin: 10px 0 0;
        line-height: 1;
        font-weight: 400;
      }
      .card-content .target {
        text-transform: uppercase;
        color: var(--paragraph-color);
      }
      .notification-card {
        padding: 0px;
        display: flex;
        background-color: var(--default-primary-color);
        border-bottom: 1px solid var(--disabled-text-color);
      }
      .notification-card[disabled] .card-icon,
      .notification-card[disabled] .card-icon iron-icon {
        background-color: var(--light-text-color);
      }
      .card-icon {
        width: 15%;
        display: inline-block;
        text-align: center;
        background-color: var(--accent-color);
      }
      .card-icon iron-icon {
        height: 100%;
        --iron-icon-height: 35px;
        --iron-icon-width: 35px;
        background-color: var(--accent-color);
      }
      .card-content {
        flex: 1;
        display: inline-block;
        padding: 10px 20px;
      }
      .card-content span {
        font-family: Folio;
        color: var(--disabled-text-color);
      }

    </style>
    <app-besouro-api id="api"></app-besouro-api>

    <div id="card" class="notification-card">
      <div class="card-icon">
        <iron-icon icon="{{cardIcon}}"></iron-icon>
      </div>
      <div class="card-content">
        <h4>{{setCardTitle(notification)}}<span class="target">{{notification.message.title}}</span></h4>
        <span>{{getDate(notification)}}</span>
      </div>
    </div>
`;
  }

  static get is() { return 'notification-card'; }
  static get properties() {
    return {
      notification: {
        type: Object,
        value: function() {}
      },
      cardIcon: String
    }
  }

  getDate(notification) {
    this.setCardIcon(notification);
    this.setRead(notification);
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const date = new Date(notification.created_at);
    const day = date.getDate()
    const month = date.getMonth();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day} de ${months[month]}, às ${hours}:${minutes}`;
  }

  setRead(notification) {
    if(notification.read) {
      this.$.card.setAttribute("disabled", "");
    }
  }

  setCardIcon(notification) {
    switch(notification.channel.sort) {
      case "mission":
        this.cardIcon = "app:mission-notifications";
        break;
      case "admin":
        this.cardIcon = "app:alert-users-notifications"
        break;
      case "trophy":
        this.cardIcon = "app:trophy-notifications"
        break;
    }
  }

  setCardTitle(notification) {
    switch(notification.channel.sort) {
      case "mission":
        return `Missão nova no ar! Confira a `;
        break;
      case "trophy":
        return `Parabéns! Você recebeu o troféu `;
        break;
      case "admin":
        const message = notification.message.title;
        notification.message.title = "";
        return message;
        break;
      default:
        return "";
    } 
  }

}
customElements.define(NotificationCard.is, NotificationCard);
