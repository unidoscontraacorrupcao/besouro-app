import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

import '../app-elements/shared-styles.js';

class WelcomeCard extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>

      :host {
        display: block;
        padding: 0px;
        position: relative;
        max-width: 500px;
        margin: 20px auto;
        background-color: var(--default-primary-color);
      }
      

      ::slotted(p) {
        font-family: helvetica-neue;
        font-size: 16px;
        color: var(--paragraph-color) !important;
        line-height: 1.3;
      }

      ::slotted(div) {
        font-family: helvetica-neue;
        font-size: 16px;
        color: var(--paragraph-color) !important;
        line-height: 1.3;
      }

      :host span { color: var(--accent-color); }


      #welcome-title {
        color: var(--secondary-text-color);
        text-transform: uppercase;
        font-family: Folio;
        font-size: 24px;
        padding-bottom: 20px;
      }

      #card-content {
        width: 90%;
        margin: auto;
        padding: 20px 0 20px 0;
      }

      @media screen and (min-width: 1100px) {
        :host {
          max-width: unset;
          width: 90%;
        }
      }
    </style>

    <div id="card-content">
      <div id="welcome-title"> boas vindas!</div>
      <slot></slot>
    </div>

`;
  }

  static get is() { return 'welcome-card'; }

  static get properties() {
    return {
    }
  }

  constructor() {
    super();
  }

}
customElements.define(WelcomeCard.is, WelcomeCard);
