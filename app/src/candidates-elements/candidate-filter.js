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

      .row paper-input:first-child,
      #partyName {
        margin-right: 20px;
      }

      #adheredOpts { margin-right: 20px; }

      #adheredOpts paper-item {
        --paper-item: {
            font-size: 14px;
        }
      }

      paper-button {
        color: white;
        background-color: var(--accent-color);
        font-family: folio;
        height: 70%;
        margin-top: 6px;
        flex: 1;
      }

      paper-item {
        color: var(--secondary-text-color);
        font-family: folio;
        text-transform: uppercase;
      }


      paper-dropdown-menu {
        --paper-input-container-input: {
          color: var(--secondary-text-color);
          font-family: folio;
        }
      }

      .filter-circle {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        margin-left: 10px;
      }

      #not-answer-circle { background-color: gray; }
      #not-clean-pass-circle, #not-compromise-circle { background-color: red; }
      #compromise-circle { background-color: green; }


      @media only screen and (max-width: 360px) {
        #filter {
          width: 300px;
        }

        #adheredOpts paper-item {
          --paper-item: {
            font-size: 14px;
          }
        }

          .filter-circle {
            width: 11px;
            height: 11px;
            border-radius: 50%;
            margin-left: 4px;
          }

      }

      @media only screen and (max-width: 320px) {
        #adheredOpts paper-item {
          --paper-item: {
              font-size: 11px;
          }
        }
      }


      @media screen and (min-width: 1100px) {
        #filter {
          width: calc(90% - 15px);
          right: 15px;
        }
        #filter-fields {
          display: flex;
          width: 95%;
          margin: 0 auto;
          justify-content: space-around;
          padding: 0 20px;
        }
        .row {
          width: unset;
          height: unset;
          margin: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          flex: 0 0 30%;
        }
        paper-button {
          margin: 0;
          flex: unset;
          height: unset;
        }
        #adheredOpts {
          margin: 0;
        }
        .row paper-input:first-child,
        #partyName {
          margin: 0;
        }
      }
    </style>

      <div id="filter">
        <div id="filter-header">
          <span>filtre os resultados da lista</span>
          <paper-icon-button id="filter-reload" on-click="_reload" icon="app:icon-reload"></paper-icon-button>
          <paper-icon-button id="filterToggle" on-click="_toggle" icon="app:icon-down"></paper-icon-button>
        </div>
        <div id="filter-fields">
          <div class="row">
            <paper-dropdown-menu id="adheredOpts" label="mostrando candidatos">
              <paper-listbox slot="dropdown-content" selected="0">
                <paper-item>TODOS</paper-item>
                <paper-item>se comprometeu <div class="filter-circle" id="compromise-circle"></div></paper-item>
                <paper-item>não se comprometeu <div class="filter-circle" id="not-compromise-circle"></div></paper-item>
                <paper-item>não tem passado limpo <div class="filter-circle" id="not-clean-pass-circle"></div></paper-item>
                <paper-item>não respondeu <div class="filter-circle" id="not-answer-circle"></div></paper-item>
              </paper-listbox>
            </paper-dropdown-menu>
            <paper-input value="{{filterByName}}" always-float-label label="pesquise pelo nome" id="candidateName">
              <iron-icon icon="app:icon-search" slot="suffix"></iron-icon>
            </paper-input>
          </div>
          <div class="row">
          <paper-dropdown-menu id=partyName label="partido">
              <paper-listbox slot="dropdown-content" selected="0">
                <paper-item>TODOS</paper-item>
                <paper-item>AVANTE</paper-item>
                <paper-item>DC</paper-item>
                <paper-item>DEM</paper-item>
                <paper-item>MDB</paper-item>
                <paper-item>NOVO</paper-item>
                <paper-item>PATRI</paper-item>
                <paper-item>PCB</paper-item>
                <paper-item>PCO</paper-item>
                <paper-item>PC do B</paper-item>
                <paper-item>PDT</paper-item>
                <paper-item>PHS</paper-item>
                <paper-item>PMB</paper-item>
                <paper-item>PMN</paper-item>
                <paper-item>PODE</paper-item>
                <paper-item>PP</paper-item>
                <paper-item>PPL</paper-item>
                <paper-item>PPS</paper-item>
                <paper-item>PR</paper-item>
                <paper-item>PRB</paper-item>
                <paper-item>PROS</paper-item>
                <paper-item>PRP</paper-item>
                <paper-item>PRTB</paper-item>
                <paper-item>PSB</paper-item>
                <paper-item>PSC</paper-item>
                <paper-item>PSD</paper-item>
                <paper-item>PSDB</paper-item>
                <paper-item>PSL</paper-item>
                <paper-item>PSOL</paper-item>
                <paper-item>PSTU</paper-item>
                <paper-item>PT</paper-item>
                <paper-item>PTB</paper-item>
                <paper-item>PTC</paper-item>
                <paper-item>PV</paper-item>
                <paper-item>REDE</paper-item>
                <paper-item>SD</paper-item>
              </paper-listbox>
            </paper-dropdown-menu>
            <paper-dropdown-menu id="candidacyOpts" label="tipo de candidatura">
              <paper-listbox slot="dropdown-content" selected="0">
                <paper-item>TODAS</paper-item>
                <paper-item>senador</paper-item>
                <paper-item>deputado federal</paper-item>
              </paper-listbox>
            </paper-dropdown-menu>
          </div>
          <div class="row">
            <paper-dropdown-menu id="ufOpts" label="UF">
              <paper-listbox slot="dropdown-content">
                <paper-item>TODAS</paper-item>
                <paper-item>AC</paper-item>
                <paper-item>AL</paper-item>
                <paper-item>AP</paper-item>
                <paper-item>AM</paper-item>
                <paper-item>BA</paper-item>
                <paper-item>CE</paper-item>
                <paper-item>DF</paper-item>
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
              </paper-listbox>
            </paper-dropdown-menu>
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
      tab: {
        type: Number,
        value: 1
      },
      user: {
        type: Object,
        observer: 'setStateOnFilter'
      },
      filters: {
        type: Object,
        value: {},
        notify: true
      }
    }
  }

  setStateOnFilter(user) {
    if(!user) return;
    if(user.state) this.$.ufOpts.value = user.state;
    else this.$.ufOpts.value = 'TODAS';
  }

  _toggle(e) {
    var item = this.$.filter;
    var itemHeight = item.clientHeight;
    if (itemHeight == 40) {
      if(window.innerWidth > 1100) {
        item.setAttribute("style", "height: 200px");
      } else {
        item.setAttribute("style", "height: 250px");
      }
      this.$.filterToggle.set("icon",  "app:icon-up");
      this.dispatchEvent(new CustomEvent('open-filter', { bubbles: true, composed: true }));
    }
    else {
      item.setAttribute("style", "height: 40px");
      this.$.filterToggle.icon = "app:icon-down";
      this.dispatchEvent(new CustomEvent('close-filter', { bubbles: true, composed: true }));
    }
  }

  _fiterAllCandidates() {
    var user = this.getUser();
    this._setFilters();
    this.$.api.params = this.filters;
    if (!user || Object.keys(user).length == 0) {
      this.$.api.path = `candidates`;
    }
    else {
      this.$.api.path = `users/${user.uid}/candidates`;
    }
    this.$.api.request().then((ajax) => {
      this.dispatchEvent(new CustomEvent("filtered-candidates",
        {detail: {candidates: ajax.response, "tab": 0}}));
      this._toggle();
      this._getTotalFiltered();
    });
  }

  _filterSelectedCandidates() {
    var user = this.getUser();
    if (!user || Object.keys(user).length == 0) return;
    this.$.api.path = `users/${user.uid}/selected-candidates`;
    this._setFilters();
    this.$.api.params = this.filters;
    this.$.api.request().then((ajax) => {
      this.dispatchEvent(new CustomEvent("filtered-candidates",
        {detail: {candidates: ajax.response, "tab": 1}}));
      this._toggle();
    });
  }

  _getTotalFiltered() {
    var user = this.getUser();
    if (!user || Object.keys(user).length == 0) {
      let apiBaseUrl = this.$.api.baseUrl;
      this.$.api.authUrl = `${apiBaseUrl}/candidates/total-filtered-candidates`;
      this.$.api.authRequest().then((ajax) => {
        this.dispatchEvent(new CustomEvent("total-filtered",
          {detail: {total: ajax.response.total}}));
      });
    } else {
      this.$.api.method = "GET";
      this.$.api.path = `users/${user.uid}/total-filtered-candidates/`;
      this.$.api.request().then((ajax) => {
        this.dispatchEvent(new CustomEvent("total-filtered",
          {detail: {total: ajax.response.total}}));
      });
    }
  }

  _setFilters() {
    let filters = {}
    filters["filter_by_name"] = this.filterByName;
    if(sessionStorage.getItem('ignored'))
      filters["filter_by_ignored"] = sessionStorage.getItem('ignored');
    else
      filters["filter_by_ignored"] = [];
    if (this.$.partyName.value == 'TODOS' || this.$.partyName.value == undefined)
      filters["filter_by_party"] = '';
    else
      filters["filter_by_party"] = this.$.partyName.value;
    if (this.$.candidacyOpts.value == 'TODAS' || this.$.candidacyOpts.value == undefined)
      filters["filter_by_candidacy"] = '';
    else
      filters["filter_by_candidacy"] = this.$.candidacyOpts.value;
    if (this.$.ufOpts.value == "TODAS" || this.$.ufOpts.value == undefined)
      filters["filter_by_uf"] = '';
    else
      filters["filter_by_uf"] = this.$.ufOpts.value;
    if (this.$.adheredOpts.value == 'TODOS' || this.$.adheredOpts.value == undefined)
      filters["filter_by_adhered"] = '';
    else
      switch (this.$.adheredOpts.value) {
        case 'não respondeu':
          filters["filter_by_adhered"] = 'SEM RESPOSTA';
          break;
        case 'não se comprometeu':
          filters["filter_by_adhered"] = 'NÃO';
          break;
        case 'se comprometeu':
          filters["filter_by_adhered"] = 'SIM';
          break;
        case 'não tem passado limpo':
          filters["filter_by_clean_pass"] = 'NÃO,CONDENADO,RÉ,RÉU';
          break;
        default:
          break;
      }
    this.set("filters", filters);
  }

  _resetFilters() {
    let filters = {};
    filters["filter_by_name"] = '';
    filters["filter_by_party"] = '';
    filters["filter_by_candidacy"] = '';
    filters["filter_by_uf"] = '';
    filters["filter_by_adhered"] = '';
    filters["filter_by_clean_pass"] = '';
    this.set("filters", filters);
  }


  _filter() {
    if (this.tab == 0)
      this._fiterAllCandidates();
    else
      this._filterSelectedCandidates();
  }

  _reload() {
    this.clearFields();
    this._resetFilters();
    if (this.tab == 0)
      this.dispatchEvent(new CustomEvent("reload-candidates",
        {detail: {"tab": 0}}));
    else
      this.dispatchEvent(new CustomEvent("reload-candidates",
        {detail: {"tab": 1}}));
  }

  clearFields() {
    this.$.candidateName.value = '';
    this.$.candidacyOpts.value = 'TODAS';
    this.$.ufOpts.value = 'TODAS';
    this.$.partyName.value = 'TODOS';
    this.$.adheredOpts.value = 'TODOS';
    const lists = this.shadowRoot.querySelectorAll('paper-listbox');
    lists.forEach(element => {
      element.selected = 0;
    });
  }

}

customElements.define(CandidateFilter.is, CandidateFilter);
