import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';

import '../app-elements/shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import {CommonBehaviorsMixin} from '../mixin-elements/common-behaviors-mixin.js';
/**
 * @polymer
 * @CandidateFilter
 */
class CandidateFilter extends CommonBehaviorsMixin(PolymerElement) {

  static get template() {
    return html`
    <style include="candidate-card-shared-styles"></style>
    <style>
      :host {
        display: block;
      }

    paper-listbox {
      --paper-listbox_-_max-height: 230px;
    }

      .item {
          position: relative;
          z-index: 1001;
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

    #filter-reload { margin-top: 4px; }
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

      paper-button {
        color: white;
        background-color: var(--accent-color);
        font-family: folio;
        width: 73%;
        height: 70%;
        margin-top: 6px;
      }

    </style>

      <div id="filter">
        <div id="filter-header">
          <span>filtre os resultados da lista</span>
          <paper-icon-button id="filter-reload" on-click="_reload" icon="app:icon-reload"></paper-icon-button>
          <paper-icon-button on-click="_toggle" icon="app:icon-down"></paper-icon-button>
        </div>
        <div id="filter-fields">
          <div class="row">
      <paper-input value="{{filterByName}}" always-float-label label="pesquise pelo nome">
        <iron-icon icon="app:icon-search" slot="suffix"></iron-icon>
      </paper-input>

            <paper-dropdown-menu id="candidacyOpts" label="tipo de candidatura">
              <paper-listbox slot="dropdown-content" selected="0">
                <paper-item>todas</paper-item>
                <paper-item>senador(a)</paper-item>
                <paper-item>deputado(a)</paper-item>
              </paper-listbox>
            </paper-dropdown-menu>
          </div>
          <div class="row">
            <paper-input value="{{filterByParty}}" always-float-label label="partido"></paper-input>
            <paper-dropdown-menu id="ufOpts" label="UF">
              <paper-listbox slot="dropdown-content" selected="0">
                  <paper-item>todas</paper-item>
                  <paper-item>AC</paper-item>
                  <paper-item>AL</paper-item>
                  <paper-item>AP</paper-item>
                  <paper-item>AM</paper-item>
                  <paper-item>BA</paper-item>
                  <paper-item>CE</paper-item>
                  <paper-item>ES</paper-item>
                  <paper-item>GO</paper-item>
                  <paper-item>MA</paper-item>
                  <paper-item>MT</paper-item>
                  <paper-item>MS</paper-item>
                  <paper-item>MG</paper-item>
                  <paper-item>PA</paper-item>
                  <paper-item>PB</paper-item>
                  <paper-item>PR</paper-item>
                  <paper-item>PE</paper-item>
                  <paper-item>PI</paper-item>
                  <paper-item>RJ</paper-item>
                  <paper-item>RN</paper-item>
                  <paper-item>RS</paper-item>
                  <paper-item>RO</paper-item>
                  <paper-item>RR</paper-item>
                  <paper-item>SC</paper-item>
                  <paper-item>SP</paper-item>
                  <paper-item>SE</paper-item>
                  <paper-item>TO</paper-item>
                  <paper-item>DF</paper-item>
              </paper-listbox>
            </paper-dropdown-menu>
          </div>
          <div class="row">
            <paper-input always-float-label label="visualizando"></paper-input>
            <paper-button on-tap="_filter">filtrar</paper-button>
          </div>
        </div>
      </div>

    <app-besouro-api id="api"></app-besouro-api>
`;
  }

  static get is() { return 'candidate-filter'; }

  static get properties() {
    return {
      filterByName: {
        type: String,
        value: ""
      },
      filterByParty: {
        type: String,
        value: ""
      },
      tab: {
        type: Number,
        value: 1
      }
    }
  }

  _toggle(e) {
    var item = e.target.parentNode.parentNode;
    var itemHeight = item.clientHeight;
    if (itemHeight == 40) {
      item.setAttribute("style", "height: 250px");
      e.target.set("icon",  "app:icon-up");
    }
    else {
      item.setAttribute("style", "height: 40px");
      e.target.icon = "app:icon-down";
    }
  }

  _fiterAllCandidates() {
    var user = this.getUser();
    this.$.api.path = `users/${user.uid}/candidates`;
    this.$.api.params = this._getFilters();
    this.$.api.request().then((ajax) => {
      this.dispatchEvent(new CustomEvent("filtered-candidates",
        {detail: {candidates: ajax.response, "tab": 0}}));
    });
  }

  _filterSelectedCandidates() {
    var user = this.getUser();
    this.$.api.path = `users/${user.uid}/selected-candidates`;
    this.$.api.params = this._getFilters();
    this.$.api.request().then((ajax) => {
      this.dispatchEvent(new CustomEvent("filtered-candidates",
        {detail: {candidates: ajax.response, "tab": 1}}));
    });
  }

  _getFilters() {
    let filters = {}
    filters["filter_by_name"] = this.filterByName;
    filters["filter_by_party"] = this.filterByParty;
    if (this.$.candidacyOpts.value == "todas")
      filters["filter_by_candidacy"] = '';
    else
      filters["filter_by_candidacy"] = this.$.candidacyOpts.value;
    if (this.$.ufOpts.value == "todas")
      filters["filter_by_uf"] = '';
    else
      filters["filter_by_uf"] = this.$.ufOpts.value;
    return filters;
  }

  _filter() {
    if (this.tab == 0)
      this._fiterAllCandidates();
    else
      this._filterSelectedCandidates();
  }

  _reload() {
    if (this.tab == 0)
      this.dispatchEvent(new CustomEvent("reload-candidates",
        {detail: {"tab": 0}}));
    else
      this.dispatchEvent(new CustomEvent("reload-candidates",
        {detail: {"tab": 1}}));
  }
}

customElements.define(CandidateFilter.is, CandidateFilter);
