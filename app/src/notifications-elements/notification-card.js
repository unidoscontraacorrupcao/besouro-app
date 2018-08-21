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
      }
      .card-content h4 span {
        color: var(--paragraph-color);
      }
      .notification-card {
        padding: 0px;
        display: flex;
        background-color: var(--default-primary-color);
        border-bottom: 1px solid var(--disabled-text-color);
        color: var(--paragraph-color);
      }
      .notification-card[disabled] .card-icon,
      .notification-card[disabled] .card-icon iron-icon {
        background-color: var(--light-text-color);
      }
      .notification-card[disabled] .card-content {
        background-color: #e8e8e8;
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
        overflow: hidden;
        word-wrap: break-word;
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
        <h4>{{cardTitle}}<span id="title" class="target">{{notification.message.title}}</span><span>{{additionalText}}</span></h4>
        <span>{{cardDate}}</span>
      </div>
    </div>
`;
  }

  static get is() { return 'notification-card'; }
  static get properties() {
    return {
      notification: {
        type: Object,
        value: function() {},
        observer: 'setCardTitle'
      },
      cardIcon: String,
      cardTitle: String,
      cardDescription: String,
      cardDate: String,
      additionalText: String
    }
  }

  getDate(notification) {
    this.setCardIcon(notification);
    this.setRead(notification);
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const date = new Date(notification.created_at);
    const day = `0${date.getDate()}`.slice(-2);
    const month = date.getMonth();
    const hours = date.getHours();
    const minutes = `0${date.getMinutes()}`.slice(-2);
    this.set('cardDate', `${day} de ${months[month]}, às ${hours}:${minutes}`);
  }

  setRead(notification) {
    if(notification.read) {
      this.$.card.setAttribute("disabled", "");
    } else {
      this.$.card.removeAttribute("disabled");
    }
  }

  setCardIcon(notification) {
      switch(true) {
        case /mission/.test(notification.channel.sort):
          this.cardIcon = "app:mission-notifications";
          break;
        case /admin/.test(notification.channel.sort):
          this.cardIcon = "app:alert-users-notifications"
          break;
        case /trophy/.test(notification.channel.sort):
          this.cardIcon = "app:trophy-notifications"
          break;
        case /conversation/.test(notification.channel.sort):
          this.cardIcon = "app:notification-opinion-active"
          break;
        case /selected/.test(notification.channel.sort):
          this.cardIcon = "app:thumbs-up-notifications"
          break;
        case /press/.test(notification.channel.sort):
          this.cardIcon = "app:thumb-down-notifications"
          break;
        default:
          this.cardIcon = "app:alert-users-notifications"
          break;
    }
  }

  setCardTitle(notification) {
    if (!notification) return;
    
    var channel_sort = notification.channel.sort.split('-');
    
    if(channel_sort.length == 2) {
      var mission_id = channel_sort[1];
      this.$.api.path = `missions/${mission_id}`;
      this.$.api.request().then((ajax) => {
        var mission_name = ajax.response.title;
        this.set("cardTitle", `Há opiniões disponíveis na missão ${mission_name}.`);
        this.getDate(notification);
      });
    } else {
      switch(notification.channel.sort) {
        case "mission":
          this.set("cardTitle", `Missão nova no ar! Confira a `);
          break;
        case "trophy":
          this.set("cardTitle", `Parabéns! Você recebeu o troféu `);
          break;
        case "admin":
          this.$.title.removeAttribute("class");
          this.set("cardTitle", `` );
          break;
        case "selected":
          this.set('cardTitle', 'Você selecionou ');
          this.set('additionalText', `. Conheça suas ideias em: ${this.notification.message.body}`)
          break;
        case "press":
          this.set('cardTitle', 'Você pressionou ');
          this.set('additionalText', ' para que ele se comprometa contra a corrupção!')
          break;
        default:
          return "";
      }
      this.getDate(notification);
    }
  }

}
customElements.define(NotificationCard.is, NotificationCard);
