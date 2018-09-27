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
      }

      #cardContent {
        width: 90%;
        margin: auto;
        padding: 20px 0 20px 0;
      }
      
      .close-dialog {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        top: 10px;
        right: 10px;
        background-color: #B7B8B7;
        width: 20px;
        height: 20px;
        color: var(--primary-background-color);
        cursor: pointer;
      }

      @media screen and (min-width: 1100px) {
        :host {
          max-width: unset;
          width: 90%;
        }
      }
    </style>

    <div id="cardContent">
      <span class="close-dialog" on-tap="hideWelcomeCard">x</span>
      <div id="welcome-title">boas vindas!</div>
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

  connectedCallback() {
    super.connectedCallback();
    this.welcomeCardVisibility();
  }

  welcomeCardVisibility() {
    if(localStorage.getItem('welcomeHide')) {
      this.$.cardContent.style.display = 'none';
    } else {
      this.$.cardContent.style.display = 'block';
    }
  }

  hideWelcomeCard() {
    localStorage.setItem('welcomeHide', true);
    this.welcomeCardVisibility();
  }

}
customElements.define(WelcomeCard.is, WelcomeCard);
