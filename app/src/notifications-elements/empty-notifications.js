import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

import '../app-elements/shared-styles.js';

class EmptyNotifications extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
      }

      .empty-card {
        display: block;
        max-width: 500px;
        width: 90%;
        margin: auto;
        margin-top: 40px;
        background-color: #f5f5f5;
        padding: 10px 0;
      }

      p, span {
        font-family: folio;
        color: #B7B8B7;
        text-align: center;
        text-transform: uppercase;
      }

      #card-content {
        width: 90%;
        margin: auto;
      }

      p {
        font-size: 32px;
        line-height: 1.3;
      }
      
      </style>

    <div class="empty-card">
      <div id="card-content">
        <p>você não possui nenhuma notificação no momento.</p>
      </div>
    </div>

`;
  }

  static get is() { return 'empty-notifications'; }

  static get properties() {
    return {
    }
  }

  constructor() {
    super();
  }

  changeSelected() { this.dispatchEvent(new CustomEvent('select-inbox')); }
}
customElements.define(EmptyNotifications.is, EmptyNotifications);
