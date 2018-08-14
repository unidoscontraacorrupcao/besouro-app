import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';

import '../app-elements/shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';


/**
 * @polymer
 * @CandidateFilter
 */
class CandidateFilter extends PolymerElement {

  static get template() {
    return html`
    <style include="candidate-card-shared-styles"></style>
    <style>
      :host {
        display: block;
      }

    #filter {
      background-color: white;
      height: 40px;
      width: 360px;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 10;
      position: absolute;
      overflow: hidden;
      transition: height 0.2s;
      box-shadow: 0 2px 5px 0 rgba(0,0,0,0.2);
    }

    #filter-header {
      width: 90%;
      margin: auto;
      color: var(--secondary-text-color);
      height: 35px;
    }

    #filter-header span {
      float: left;
      padding-top: 7px;
      font-family: folio;
      text-transform: uppercase;
    }

    #filter-header paper-icon-button {float: right;}

      .row {
        width: 90%;
        height: 70px;
        margin: auto;
        display: flex;
      }

      .row paper-input:first-child {
        margin-right: 20px;
      }

    </style>

      <div id="filter">
        <div id="filter-header">
          <span>filtre os resultados da lista</span>
          <paper-icon-button on-click="_toggle" icon="app:expand-more"></paper-icon-button>
        </div>
        <div id="filter-fields">
          <div class="row">
            <paper-input always-float-label label="pesquise pelo nome"></paper-input>
            <paper-input always-float-label label="tipo de candidatura"></paper-input>
          </div>
          <div class="row">
            <paper-input always-float-label label="partido"></paper-input>
            <paper-input always-float-label label="cidade-uf"></paper-input>
          </div>
          <div class="row">
            <paper-input always-float-label label="visualizando"></paper-input>
            <paper-button>filtrar</paper-button>
          </div>
        </div>
      </div>

    <app-besouro-api id="api"></app-besouro-api>
`;
  }

  static get is() { return 'candidate-filter'; }

  static get properties() {
    return {}
  }

  _toggle(e) {
    var item = e.target.parentNode.parentNode;
    var itemHeight = item.clientHeight;
    if (itemHeight == 40) {
      item.setAttribute("style", "height: 250px");
      e.target.set("icon",  "app:expand-less");
    }
    else {
      item.setAttribute("style", "height: 40px");
      e.target.icon = "app:expand-more";
    }
  }
}

customElements.define(CandidateFilter.is, CandidateFilter);
