import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-spinner/paper-spinner.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

import '../mission-elements/unauthorized-modal.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import '../app-elements/styles/modal-shared-styles.js';
import '../mission-elements/welcome-card.js';
import '../mission-elements/empty-card.js';
import '../candidates-elements/candidate-card.js';
import '../candidates-elements/selected-candidate-card.js';
import '../candidates-elements/candidate-filter.js';
import '../candidates-elements/empty-search-card.js';
import '../app-elements/app-besouro-api.js';
import {CommonBehaviorsMixin} from '../mixin-elements/common-behaviors-mixin.js';
class CandidatesPage extends CommonBehaviorsMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="modal-shared-styles"></style>
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
        height: 100vh;
      }
      app-toolbar { font-size: 35px; }
      .tabs-text {
        font-size: 18px;
        font-family: Folio;
        text-transform: uppercase;
      }
      .tabs-number {
        font-size: 18px;
        font-family: Folio;
        text-transform: uppercase;
        color: var(--accent-color);
        margin-left: 10px;
      }
      .header-icon {
        padding: 7px;
        margin-top: 4px;
      }
      [main-title] {
        color: var(--accent-color);
        margin-left: 15px;
        text-transform: uppercase;
        font-family: Folio;
        font-size: 32px;
      }
      .inbox {
        padding-bottom: 80px;
        overflow-x: hidden;
      }
      welcome-card, selected-candidate-card { margin-top: 56px; }
      paper-toast {
        --paper-font-common-base: Folio;
        font-family: Folio;
        font-weight: 200;
      }
      .toast-text {
        color: white;
        text-transform: uppercase;
        margin-top: 0;
      }

      #loadMoreCandidates {
        width: 90%;
        margin: 52px auto 50px auto;
        text-align: center;
      }

      #loadMoreCandidates  span {
        font-family: Folio;
        font-size: 18px;
        text-transform: uppercase;
        color: var(--secondary-text-color);
        cursor: pointer;
      }

      welcome-card p {
        color: var(--paragraph-color);
      }

      @media screen and (min-width: 1100px) {
        .candidates {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          width: 90%;
          margin: 0 auto;
        }
      }


    </style>

    <div id="loading">
      <paper-spinner active=""></paper-spinner>
    </div>

    <app-besouro-api id="api"></app-besouro-api>
    <paper-toast id="toast" class="error" text="{{_toastMessage}}"></paper-toast>
    <paper-toast id="selectedToast" class="error" text="{{_toastMessage}}">
      <h3 class="toast-text">Candidato(a) selecionado com sucesso</h3>
      <p class="toast-text">Agradecemos sua participação! Continue selecionando candidatos que te interessem e não deixe de conferir sua caixa de notificações para acompanhar as novidades</p>
    </paper-toast>
    <paper-toast id="pressedToast" class="error" text="{{_toastMessage}}">
      <h3 class="toast-text">Candidato(a) pressionado com sucesso</h3>
      <p class="toast-text">Agradecemos sua participação! Continue pressionando candidatos que não se comprometeram ainda e não deixe de conferir as novidades na sua caixa de notificações</p>
    </paper-toast>
    <app-dialog id="unauthorizedDialog">
      <unauthorized-modal on-close-modal="_dismissUnauthorizedModal" on-go-to-register="_goToLogin"></unauthorized-modal>
    </app-dialog>

    <app-header-layout has-scrolling-region="">

      <app-header slot="header" condenses="" reveals="" fixed="" effects="waterfall">
        <app-toolbar>
          <paper-icon-button class="header-icon" icon="app:menu" drawer-toggle="" on-tap="openDrawer"></paper-icon-button>
          <div main-title="">{{pageTitle}}</div>
          <!-- <paper-icon-button class="header-icon" icon="app:search"></paper-icon-button> -->
        </app-toolbar>
        <app-toolbar sticky="">
          <paper-tabs selected="{{inboxtab}}" fallback-selection="0">
            <paper-tab><span class="tabs-text">TODOS</span></paper-tab>
            <paper-tab><span class="tabs-text">SELECIONADOS</span><span class=tabs-number>{{selectedCount}}</span></paper-tab>
          </paper-tabs>
        </app-toolbar>
        <candidate-filter
          tab="{{inboxtab}}"
          on-reload-candidates="_reloadCandidates"
          on-filtered-candidates="_showFilteredCandidates"
          user="{{user}}" 
          id="filter">
        </candidate-filter>
      </app-header>
      <iron-pages selected="{{inboxtab}}">
        <div class="inbox">
          <welcome-card>
            <div>
              <p>
                Descubra quais candidatas/os atendem a três critérios: 1. Passado Limpo; 2. Compromisso com Democracia; 
                e 3. Adesão às Novas Medidas contra a Corrupção.
              </p>
              <ul>
                <li>VERDE é SIM nos três critérios</li>
                <li>VERMELHO é NÃO em algum critério.</li>
                <li>CINZA: ainda não respondeu</li>
              </ul>
              <p>
                Você pode selecionar aqueles que te interessarem Também pode pressionar para que 
                candidatas/os se comprometam! Veja mais detalhes em AJUDA, no menu.
              </p>
            </div>
          </welcome-card>
          <template is="dom-if" if="{{!allCandidates.length}}">
            <empty-search-card></empty-search-card>
          </template>
          <div class="candidates">
            <template is="dom-repeat" items="{{allCandidates}}">
              <candidate-card
                candidate="[[item]]"
                on-selected-candidate="_selectedCandidatesChanged"
                on-pressed-candidate="_pressedCandidatesChanged"
                on-ignored-candidate="_ignoredCandidatesChanged"
                on-unauthorized="_openRestrictModal">
              </candidate-card>
            </template>
          </div>
        </div>

        <div class="inbox">
          <div class="candidates">
            <template is="dom-repeat" items="{{selectedCandidates}}">
              <selected-candidate-card
                candidate="[[item]]"
                on-unselect-candidate="_unselectCandidatesChanged">
              </selected-candidate-card>
            </template>
          </div>
          <div id="loadMoreCandidates">
            <span on-click="_getMoreSelectedCandidates">carregar mais candidatos</span>
          </div>
        </div>
      </iron-pages>
    </app-header-layout>
`;
  }

  static get is() {
    return "candidates-page";
  }
  static get properties() {
    return {
      inboxAction: {
        type: String,
        value: ""
      },
      route: {
        type: Object,
        notify: true
      },
      pageTitle: {
        type: String,
        value: "CANDIDATOS"
      },
      allCandidates: {
        type: Array,
        value: []
      },
      selectedCandidates: {
        type: Array,
        value: []
      },
      user: {
        type: Object
      },
      inboxtab: {
        type: Number,
        observer: "_tabChanged"
      },
      trophyData: {
        type: Object,
        value: {}
      },
      _toastMessage: String,
      selectedCount: String,
      limit: {
        type: Number,
        value: 10
      },
      selectedLimit: {
        type: Number,
        value: 10
      }
    };
  }

  static get observers() {
    return [
      'routePathChanged(route.path)'
    ]
  }

  routePathChanged(path) {
    this.$.filter.style.display = 'block';
    this.set("user", this.getUser());
    if (path == "/candidates") {
      if (!this.user || Object.keys(this.user).length == 0) {
        this._getAllCandidates();
      } else {
        this._getAllCandidates();
        this._getSelectedCandidates();
        this._requestGeocoder();
      }
    }
  }

  openDrawer() { this.dispatchEvent(new CustomEvent("open-drawer")); }

  _getAllCandidates() {
    this.showLoading();
    this.$.api.params = {"limit": this.limit};
    if(!this.user || Object.keys(this.user).length == 0) {
      this.$.api.path = `candidates/`;
    }
    if(this.user && Object.keys(this.user).length > 0) {
      if(this.getUser().state) {
        this.$.api.params["filter_by_uf"] = this.getUser().state;
        this.$.api.path = `users/${this.getUser().uid}/candidates`;
      } else {
        this.$.api.path = `users/${this.getUser().uid}/candidates`;
      }
    }
    this.$.api.method = "GET";
    this.$.api.request().then((ajax) => {
      if(!this.user || Object.keys(this.user).length == 0) {
        this.set("allCandidates", ajax.response.results);
      } else {
        this.set("allCandidates", ajax.response);
      }
      this.hideLoading();
    });
  }

  _showFilteredCandidates(e) {
    var candidates = e.detail.candidates;
    var tab = e.detail.tab;
    if (tab == 0) {
      if (candidates.results)
        this.set("allCandidates", candidates.results);
      else
        this.set("allCandidates", candidates);
    }
    if (tab == 1) {
      if (candidates.results)
        this.set("selectedCandidates", candidates.results);
      else
        this.set("selectedCandidates", candidates);
    }
  }

  _reloadCandidates(e) {
    var tab = e.detail.tab;
    if (tab == 0)
      this._getAllCandidates();
    if (tab == 1)
      this._getSelectedCandidates();
  }

  _getTotalSelected() {
    if(!this.user || Object.keys(this.user).length == 0) return;
    this.$.api.path = `users/${this.getUser().uid}/selected-candidates`;
    this.$.api.method = "GET";
    this.$.api.params = {};
    this.$.api.request().then((ajax) => {
      const count = `0${ajax.response.length}`.slice(-2);
      this.set("selectedCount", count);
    });
  }

  _getSelectedCandidates() {
    if(!this.user || Object.keys(this.user).length == 0) return;
    this._getTotalSelected();
    this.showLoading();
    this.$.api.path = `users/${this.getUser().uid}/selected-candidates`;
    this.$.api.method = "GET";
    this.$.api.params = {"limit": this.selectedLimit};
    this.$.api.request().then((ajax) => {
      if (ajax.response.length < 10) {
        this.$.loadMoreCandidates.style.display = "none";
      } else {
        this.$.loadMoreCandidates.style.display = "block";
      }
      this.set("selectedCandidates", ajax.response);
      this.hideLoading();
    });
  }

  _getMoreSelectedCandidates() {
    if(!this.user || Object.keys(this.user).length == 0) return;
    this.showLoading();
    this.$.api.path = `users/${this.getUser().uid}/selected-candidates`;
    this.selectedLimit += 10;
    this.$.api.method = "GET";
    this.$.api.params = {"limit": this.selectedLimit};
    this.$.api.request().then((ajax) => {
      if (ajax.response.length == this.selectedCount) {
        this.$.loadMoreCandidates.style.display = "none";
      } else {
        this.$.loadMoreCandidates.style.display = "block";
      }
      this.set("selectedCandidates", ajax.response);
      this.hideLoading();
    });
  }

  _showSelectedCardAnimation(e) {
    var card = e.target.shadowRoot.querySelector(".card");
    card.classList.add("selected-candidate-animation");
  }

  _showPressedCardAnimation(e) {
    var card = e.target.shadowRoot.querySelector(".card");
    card.classList.add("pressed-candidate-animation");
  }

  _showIgnoredCardAnimation(e) {
    var card = e.target.shadowRoot.querySelector(".card");
    card.classList.add("ignored-candidate-animation");
  }


   _selectedCandidatesChanged(e) {
    this._showSelectedToast('');
    this._showSelectedCardAnimation(e);
    setTimeout(() => {
      if (this.limit == 1)
        this.limit = 10;
      else
        this.limit -=1;
      var candidatesCards = this.shadowRoot.querySelectorAll("candidate-card");
      this._userCandidatesChanged();
    }, 500);
  }

  _pressedCandidatesChanged(e) {
    this._showPressedToast('');
    this._showPressedCardAnimation(e);
    setTimeout(() => {
      this._userCandidatesChanged();
    }, 500);
  }

  _ignoredCandidatesChanged(e) {
    this._showIgnoredCardAnimation(e);
    setTimeout(() => {
      this._userCandidatesChanged();
    }, 500);
  }

  _userCandidatesChanged() {
    this._getAllCandidates();
    this._getSelectedCandidates();
  }

  _unselectCandidatesChanged(e) {
    this._showIgnoredCardAnimation(e);
    setTimeout(() => {
      this._userCandidatesChanged();
    }, 500);
  }

  _dismissUnauthorizedModal() { this.$.unauthorizedDialog.dismiss(); }
  _selectInbox() { this.set("inboxtab", 0); }
  _openRestrictModal() { this.$.unauthorizedDialog.present(); }

  _goToLogin() {
    this.$.unauthorizedDialog.dismiss();
    this.set("route.path", "/login");
  }

  _tabChanged() {
    if (this.inboxtab == 1) {
      if (!this.user || Object.keys(this.user).length == 0) {
        this.$.unauthorizedDialog.present();
      }
    }
  }

  _requestGeocoder() {
    if(!this.user) return;
    if(!window.google) return;
    if(!this.user.state) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) =>{
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          const geocoder = new google.maps.Geocoder;
          geocoder.geocode({'location': pos}, (results, status) => {
            if(status === 'OK') {
              if(results[0]) {
                let state = "";
                let city = "";
                const states = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
                //administrative area level is way of google to respond to adress levels
                const stateObject = results[0].address_components.filter((c) => c.types.includes('administrative_area_level_1'));
                const cityObject = results[0].address_components.filter((c) => c.types.includes('administrative_area_level_2'));
                if(stateObject.length > 0 && states.includes(stateObject[0].short_name)) state = stateObject[0].short_name;
                if(cityObject.length > 0) city = cityObject[0].long_name;
                if(state) {
                  this._updateLocation(city, state);
                }
              } else {
                this._showToast('Encontramos dificuldades em identificar sua localidade. Acesse o seu perfil e defina uma localização para ver apenas candidatos do seu estado.');
              }
            } else {
              this._showToast('Encontramos dificuldades em identificar sua localidade. Acesse o seu perfil e defina uma localização para ver apenas candidatos do seu estado.');
            }
          });
        }, () => {
          console.log('Localização não fornecida');
        });
      } else {
        // Browser doesn't support Geolocation
        console.log('seu navegador nao suporta geolocalização');
      }
    }
  }

  _updateLocation(city, state) {
    if(!state) return;
    const data = {
      city: city,
      state: state,
      country: "Brasil"
    }
    this.$.api.user = this.user;
    this.$.api.path = `profiles/${this.getUser().profile_id}/`;
    this.$.api.body = data;
    this.$.api.method = "PATCH";
    this.$.api.request().then((ajax) => {
      let user = this.getUser();
      user.state = state;
      user.city = city;
      localStorage.setItem("user", JSON.stringify(user));
      this._userCandidatesChanged();
    });
  }

  _showSelectedToast(message) {
    this._toastMessage = message;
    this.$.selectedToast.open();
  }

  _showPressedToast(message) {
    this._toastMessage = message;
    this.$.pressedToast.open();
  }

}
window.customElements.define(CandidatesPage.is, CandidatesPage);
