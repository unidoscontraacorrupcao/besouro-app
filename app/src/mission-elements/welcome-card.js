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
      }


      .welcome-card {
        display: block;
        padding: 0px;
        line-height: 0.7;
        position: relative;
        max-width: 500px;
        margin: 20px auto;
        background-color: var(--default-primary-color);
      }

      .welcome-card p {
        font-family: helvetica-neue;
        font-size: 16px;
        color: var(--paragraph-color);
        line-height: 1.3;
      }

      .welcome-card span { color: var(--accent-color); }


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
    </style>

    <div class="welcome-card">
      <div id="card-content">
        <div id="welcome-title"> boas vindas!</div>
        <p>
Que legal que você quer mobilizar o Brasil contra a corrupção!
<br>
<br>

Aqui você encontra diferentes missões de mobilização e pode se tornar ativista para conseguirmos unir o máximo possível de pessoas e eleger candidatos e candidatas comprometidos com o fim da corrupção!
        </p>
      </div>
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
