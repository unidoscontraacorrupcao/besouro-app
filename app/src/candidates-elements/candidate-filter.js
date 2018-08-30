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

      #adheredOpts {
        margin-right: 20px;
        flex: 1;
      }

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

      @media only screen and (max-width: 360px) {
        #filter {
          width: 300px;
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
            <paper-input value="{{filterByName}}" always-float-label label="pesquise pelo nome" id="candidateName">
              <iron-icon icon="app:icon-search" slot="suffix"></iron-icon>
            </paper-input>
            <paper-dropdown-menu id="candidacyOpts" label="tipo de candidatura">
              <paper-listbox slot="dropdown-content" selected="0">
                <paper-item>todas</paper-item>
                <paper-item>senador</paper-item>
                <paper-item>deputado federal</paper-item>
              </paper-listbox>
            </paper-dropdown-menu>
          </div>
          <div class="row">
          <paper-dropdown-menu id=partyName label="partido">
              <paper-listbox slot="dropdown-content" selected="0">
                <paper-item>todos</paper-item>
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
            <paper-dropdown-menu id="ufOpts" label="UF">
              <paper-listbox slot="dropdown-content">
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
            <paper-dropdown-menu id="adheredOpts" label="Visualizando">
              <paper-listbox slot="dropdown-content" selected="0">
                <paper-item>todos</paper-item>
                <paper-item>não responderam</paper-item>
                <paper-item>não se comprometeram</paper-item>
                <paper-item>se comprometeram</paper-item>
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
    else this.$.ufOpts.value = 'todas';
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
    }
    else {
      item.setAttribute("style", "height: 40px");
      this.$.filterToggle.icon = "app:icon-down";
    }
  }

  _fiterAllCandidates() {
    var user = this.getUser();

    this._setFilters();
    this.$.api.params = this.filters;
    if (!this.user || Object.keys(this.user).length == 0) {
      this.$.api.path = `candidates`;
    }
    else {
      this.$.api.path = `users/${user.uid}/candidates`;
    }
    this.$.api.request().then((ajax) => {
      this.dispatchEvent(new CustomEvent("filtered-candidates",
        {detail: {candidates: ajax.response, "tab": 0}}));
      this._toggle();
    });
  }

  _filterSelectedCandidates() {
    var user = this.getUser();
    this.$.api.path = `users/${user.uid}/selected-candidates`;
    this._setFilters();
    this.$.api.params = this.filters;
    this.$.api.request().then((ajax) => {
      this.dispatchEvent(new CustomEvent("filtered-candidates",
        {detail: {candidates: ajax.response, "tab": 1}}));
      this._toggle();
    });
  }

  _setFilters() {
    let filters = {}
    filters["filter_by_name"] = this.filterByName;
    if (this.$.partyName.value == 'todos' || this.$.partyName.value == undefined)
      filters["filter_by_party"] = '';
    else
      filters["filter_by_party"] = this.$.partyName.value;
    if (this.$.candidacyOpts.value == 'todas' || this.$.candidacyOpts.value == undefined)
      filters["filter_by_candidacy"] = '';
    else
      filters["filter_by_candidacy"] = this.$.candidacyOpts.value;
    if (this.$.ufOpts.value == "todas" || this.$.ufOpts.value == undefined)
      filters["filter_by_uf"] = '';
    else
      filters["filter_by_uf"] = this.$.ufOpts.value;
    if (this.$.adheredOpts.value == 'todos' || this.$.adheredOpts.value == undefined)
      filters["filter_by_adhered"] = '';
    else
      switch (this.$.adheredOpts.value) {
        case 'não responderam':
          filters["filter_by_adhered"] = 'SEM RESPOSTA';
          break;
        case 'não se comprometeram':
          filters["filter_by_adhered"] = 'NÃO';
          break;
        case 'se comprometeram':
          filters["filter_by_adhered"] = 'SIM';
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
    this.$.candidacyOpts.value = 'todas';
    this.$.ufOpts.value = 'todas';
    this.$.partyName.value = 'todos';
    this.$.adheredOpts.value = 'todos';
    const lists = this.shadowRoot.querySelectorAll('paper-listbox');
    lists.forEach(element => {
      element.selected = 0;
    });
  }

}

customElements.define(CandidateFilter.is, CandidateFilter);
