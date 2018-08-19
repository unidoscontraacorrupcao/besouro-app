import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

import '../app-elements/shared-styles.js';

class EmptySearchCard extends PolymerElement {
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
        margin-top: 40px;
        background-color: #f5f5f5;
        padding: 10px 0;
        margin: 0 auto;
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
        <p>Não foram encontrados candidatos.</p>
      </div>
    </div>

`;
  }

  static get is() { return 'empty-search-card'; }

  static get properties() {
    return {
    }
  }

  constructor() {
    super();
  }
  
}
customElements.define(EmptySearchCard.is, EmptySearchCard);
