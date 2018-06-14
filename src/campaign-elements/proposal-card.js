import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../polymerfire/firebase-document.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class ProposalCard extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
      }
      .card {
        position: relative;
        padding: 5px 15px;
        background-color: var(--primary-background-color);
        margin: 5px 0 10px 0;
        color: var(--secondary-text-color);
      }
      .card h4 {
        color: var(--primary-text-color);
      }
      .card span {
        display: block;
        line-height: 0.7;
        font-size: 14px;
      }
      .card p {
        margin: 10px 0;
        line-height: 1.2;
        height: 65px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
      }
      .card iron-icon {
        position: absolute;
        bottom: 10px;
        right: 0;
        background: white;
        padding: 0 10px;
        color: var(--accent-color);
      }
      .card a {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      hr {
        margin: 5px 0;
      }
      h4 {
        margin: 0;
        color: var(--dark-primary-color);
      }
     
    </style>

    <firebase-document id="document" path="/proposals/{{key}}">
    </firebase-document>

    <div class="card">
      <a on-tap="_openDetailProposal"></a>
      <h4>{{proposal.content.title}}</h4>
      <span>{{proposal.content.category}}</span>
      <hr>
      <p>{{proposal.content.description}}</p>
      <iron-icon icon="app:more-horiz"></iron-icon>
    </div>
`;
  }

  static get is() { return 'proposal-card'; }
  static get properties() {
    return {
      proposal: {
        type: Object
      },
      key: String
    };
  }

  _openDetailProposal() {
    this.dispatchEvent(new CustomEvent('open-detail', {}))
  }
}
window.customElements.define(ProposalCard.is, ProposalCard);
