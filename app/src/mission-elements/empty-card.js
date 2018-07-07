import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

import '../app-elements/shared-styles.js';

class EmptyCard extends PolymerElement {
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
        margin-top: 60px;
        background-color: #eeeeee
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

      p:last-child { font-size: 18px }

         </style>

    <div class="empty-card">
      <div id="card-content">
        <p>
        você não possui nenhuma missão no momento.
        </p>
        <p> Vá às <a on-tap="changeSelected">missões públicas</a> e aceite alguma para começar o jogo </p>
      </div>
    </div>

`;
  }

  static get is() { return 'empty-card'; }

  static get properties() {
    return {
    }
  }

  constructor() {
    super();
  }

  changeSelected() { this.dispatchEvent(new CustomEvent('select-inbox')); }
}
customElements.define(EmptyCard.is, EmptyCard);
