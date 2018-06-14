import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../polymerfire/firebase-query.js';
import '../../../@polymer/paper-fab/paper-fab.js';
import '../../../@polymer/paper-tooltip/paper-tooltip.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../../@polymer/paper-listbox/paper-listbox.js';
import '../../../@polymer/paper-item/paper-item.js';
import '../../../@polymer/neon-animation/web-animations.js';
import '../../../@polymer/paper-spinner/paper-spinner.js';
import '../campaign-elements/campaign-card.js';
import '../app-elements/app-actions.js';
import '../app-elements/shared-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class CampaignsPage extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
        background: var(--secondary-background-color);
        height: 100vh;
        @apply --default-font;
      }
      app-header {
        color: var(--default-primary-color);
        background: var(--accent-color);
        --app-form-header-background: var(--accent-color);
        --app-form-header-color: var(--default-primary-color);
        @apply --default-font-medium;
      }
      h1[main-title] {
        margin-left: 20px;
      }
      app-drawer {
        --app-drawer-content-container_-_background-color: var(--default-primary-color);
        --app-drawer-content-container_-_background: var(--default-primary-color);
      }
      app-drawer .content {
        text-align: left;
        padding: 0 10px;
      }
      app-drawer .header {
        text-align: center;
      }
      paper-input paper-button {
        color: var(--accent-color);
        border: none;
      }
      .fill {
        flex: 1;
        padding: 0 0 20px 20px;
      }
      .fill h1 {
        color: var(--secondary-text-color);
      }
      .conditional {
        flex: 1;
        padding: 20px 10px 20px 20px;;
      }
      .scrollable {
        overflow-x: scroll;
        overflow-y: hidden;
        margin-bottom: 30px;
      }
      .scroll-content {
        width: auto;
        white-space: nowrap;
      }
      #filteredCard {
        width: 100%;
        max-width: 700px;
        margin-bottom: 20px;
      }
      .empty-message {
        text-align: center;
        padding-right: 10px;
        font-size: 22px;
      }
      paper-dropdown-menu,
      paper-listbox {
        width: 236px;
        font-size: 0.9rem;
      }
      paper-item {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: block;
        padding-top: 10px;
        min-height: 35px;
      }
      .spinner {
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%);
      }
    </style>

    <firebase-query id="query" path="/campaigns" data="{{campaigns}}">
    </firebase-query>

    <app-header-layout has-scrolling-region="">
      <app-header slot="header" fixed="" condenses="" effects="waterfall">
        <app-toolbar>
          <paper-icon-button icon="app:arrow-back" on-tap="_returnToInbox"></paper-icon-button>
          <h1 main-title="">Encontrar Campanha</h1>
          <paper-icon-button icon="app:filter" on-tap="_openFilter"></paper-icon-button>
        </app-toolbar>
      </app-header>
      <div class="fill">
        <dom-if if="{{campaigns.length}}">
          <template>
            <h1>Campanhas em destaque</h1>
            <div class="scrollable">
              <div class="scroll-content">
                <template id="campaignsList" is="dom-repeat" items="{{campaigns}}" as="campaign">
                  <campaign-card campaign="{{campaign.content}}" key="{{campaign.\$key}}" user="{{user}}" on-show-campaign="_goToCampaign"></campaign-card>
                </template>
              </div>
            </div>
          </template>
        </dom-if>
        <dom-if if="{{campaigns.length}}">
          <template>
            <h1>Majoritárias</h1>
            <div class="scrollable">
              <div class="scroll-content">
                <template id="majorityList" is="dom-repeat" items="{{majorityCampaigns}}" as="campaign">
                  <campaign-card campaign="{{campaign.content}}" key="{{campaign.\$key}}" user="{{user}}" on-show-campaign="_goToCampaign"></campaign-card>
                </template>
              </div>
            </div>
          </template>
        </dom-if>
        <dom-if if="{{campaigns.length}}">
          <template>
            <h1>Proporcionais</h1>
            <div class="scrollable">
              <div class="scroll-content">
                <template id="proportionalList" is="dom-repeat" items="{{proportionalCampaigns}}" as="campaign">
                  <campaign-card campaign="{{campaign.content}}" key="{{campaign.\$key}}" user="{{user}}" on-show-campaign="_goToCampaign"></campaign-card>
                </template>
              </div>
            </div>
          </template>
       </dom-if>
      </div>
      <template is="dom-if" if="{{filteredCampaigns}}">
        <div class="conditional">
          <template id="filteredList" is="dom-repeat" items="{{filteredCampaigns}}" as="campaign">
            <campaign-card id="filteredCard" campaign="{{campaign.content}}" key="{{campaign.\$key}}" user="{{user}}" on-show-campaign="_goToCampaign"></campaign-card>
          </template>
        </div>
      </template>
        <template is="dom-if" if="{{noResults}}">
          <div class="conditional">
            <div class="empty-message">
              <span>Não foram encontrados resultados para sua filtragem</span>
            </div>
          </div>
        </template>
      <app-actions id="actions" selected="{{selected}}" icon="app:add">
        <paper-fab slot="actions" mini="" icon="app:person-pin" id="campaign" name="create" on-tap="_openCampaignForm"></paper-fab>
        <paper-tooltip slot="actions" for="campaign">Criar campanha</paper-tooltip>
      </app-actions>
    </app-header-layout>

    <app-drawer id="filter" slot="drawer" align="end">
      <div class="content">
        <div class="header">
          <h1>Filtros</h1>
        </div>
        <paper-dropdown-menu label="Estado" on-value-changed="filterCampaign" name="state">
          <paper-listbox slot="dropdown-content" class="dropdown-content">
            <template id="statesList" is="dom-repeat" items="{{states}}" as="state">
              <paper-item>{{state}}</paper-item>
            </template>
          </paper-listbox>
        </paper-dropdown-menu>
        <paper-dropdown-menu label="Cargo que irá disputar" on-value-changed="filterCampaign" name="role">
          <paper-listbox slot="dropdown-content" class="dropdown-content">
            <paper-item>Presidente</paper-item>
            <paper-item>Governador</paper-item>
            <paper-item>Senador</paper-item>
            <paper-item>Deputado Federal</paper-item>
            <paper-item>Deputado Estadual</paper-item>
            <paper-item>Deputado Distrital</paper-item>
          </paper-listbox>
        </paper-dropdown-menu>
        <paper-dropdown-menu label="Categoria" on-value-changed="filterCampaign" name="categories">
          <paper-listbox slot="dropdown-content" class="dropdown-content">
            <template id="statesList" is="dom-repeat" items="{{categories}}" as="category">
              <paper-item>{{category}}</paper-item>
            </template>
          </paper-listbox>
        </paper-dropdown-menu>
      </div>
    </app-drawer>

    <dom-if if="{{!campaigns.length}}">
      <template>
        <div class="spinner">
          <paper-spinner active=""></paper-spinner>
        </div>
      </template>
    </dom-if>
`;
  }

  static get is() { return 'campaigns-page'; }
  static get properties() {
    return {
      selected: {
        observer: '_selectedChanged'
      },
      campaigns: {
        type: Array,
        observer: '_sortCampaigns'
      },
      majorityCampaigns: {
        type: Array
      },
      proportionalCampaigns: {
        type: Array
      },
      states: {
        type: Array,
        value: ["Acre", "Alagoas", "Amapá	", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"]
      },
      filteredCampaigns: {
        type: Array,
        observer: '_hideCampaigns'
      },
      noResults: {
        type: Boolean,
        value: false
      },
      categories: {
        type: Array,
        value: ["Educação", "Gestão Pública e Economia", "Democracia de Alta Intensidade", "Infraestrutura", "Segurança Pública", "Pacto Federativo e Municipalismo", "Utilização dos recursos naturais", "Trabalho no campo a na cidade", "Esportes e cidades"]
      }
    };
  }

  _selectedChanged(selected) {
    this.filteredCampaigns = undefined; 
    const hide = this.shadowRoot.querySelector('.fill');
    hide.style.display = "block";
    this.noResults = false;
  }

  _returnToInbox() {
    this.set('route.path', '/');
  }

  openDrawer() {
    this.dispatchEvent(new CustomEvent('open-drawer'));
  }

  _openFilter() {
    this.$.filter.toggle();
  }

  _openCampaignForm() {
    this.set('route.path', '/new-campaign');
  }

  _goToCampaign(e) {
    let key = e.detail.campaignKey;
    this.set('route.path', `/show-campaign/${key}`);
  }

  _sortCampaigns(campaigns) {
    this.majorityCampaigns = [];
    this.proportionalCampaigns = [];
    this.campaigns.forEach( campaign => {
      if(campaign.content.role === "Presidente" || campaign.content.role === "Governador" || campaign.content.role === "Senador") {
        this.majorityCampaigns.push(campaign);
      } else {
        this.proportionalCampaigns.push(campaign);
      }
    });
  }

  filterCampaign(e) {
    let option = e.target.value;
    const type = e.target.getAttribute('name');
    let child = `content/${type}`;
    if(type === 'categories') {
      child = `content/categories/${option}`;
      option = true;
    }
    let filter = this.$.query.ref.orderByChild(child).equalTo(option).once("value").then(function(filter) {
      if (!filter.val()) {
        this.filteredCampaigns = [];
        return;
      }
      let campaigns = Object.values(filter.val());
      let filtered = [];
      campaigns.forEach((campaign, index) => {
        let obj = {};
        obj.$key = Object.keys(filter.val())[index];
        Object.assign(obj, campaign);
        filtered.push(obj);
      });
      this.filteredCampaigns = filtered;
    }.bind(this));
    this.$.filter.close();
  }

  _hideCampaigns(filteredCampaigns) {
    const hide = this.shadowRoot.querySelector('.fill');
    if(filteredCampaigns && filteredCampaigns.length) {
      hide.style.display = "none";
      this.noResults = false;
    } else {
      hide.style.display = "none";
      this.noResults = true;
    }
  }
}

window.customElements.define(CampaignsPage.is, CampaignsPage);
