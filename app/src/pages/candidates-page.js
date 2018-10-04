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
import '../candidates-elements/favorite-candidate-card.js';
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

      #favorite-empty {
        display: block;
        margin-top: 50px;
        width: 100%;
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
      welcome-card, selected-candidate-card, favorite-candidate-card { margin-top: 56px; }
      paper-toast {
        --paper-font-common-base: Folio;
        font-family: Folio;
        font-weight: 200;
      }
      .toast-text {
        color: white;
        margin-top: 0;
      }

      #loadMoreSelectedCandidates, #loadMoreCandidates, #loadMoreFavoriteCandidates {
        width: 90%;
        margin: 52px auto 50px auto;
        text-align: center;
      }

      #loadMoreSelectedCandidates span,
      #loadMoreCandidates span,
      #loadMoreFavoriteCandidates span {
        font-family: Folio;
        font-size: 18px;
        text-transform: uppercase;
        color: var(--secondary-text-color);
        cursor: pointer;
      }

      #noMoreCandidates {
        display: none;
        text-align: center;
        padding: 20px;
      }

      #noMoreCandidates span {
        font-family: Folio;
        font-size: 18px;
        text-transform: uppercase;
        color: var(--secondary-text-color);
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
      <h3 class="toast-text">SELECIONADO(A) COM SUCESSO</h3>
      <p class="toast-text">Veja mais detalhes sobre {{targetCandidate}} na aba "Selecionados"</p>
    </paper-toast>
    <paper-toast id="pressedToast" class="error" text="{{_toastMessage}}">
      <h3 class="toast-text">PRESSIONADO(A) COM SUCESSO</h3>
      <p class="toast-text">{{targetCandidate}} receberá um email da campanha Unidos Contra a Corrupção para que mude de opinião!</p>
    </paper-toast>
    <paper-toast id="favoriteToast" class="error" text="{{_toastMessage}}">
      <h3 class="toast-text">CANDIDATO/A ADICIONADO A SANTINHOS</h3>
      <p class="toast-text">Continue adicionando candidatos/as para o dia da eleição e acesse sua aba SANTINHO</p>
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
            <!-- <paper-tab id="selectedTab"><span class="tabs-text">SELECIONADOS</span><span class=tabs-number>{{selectedCount}}</span></paper-tab> -->
            <paper-tab><span class="tabs-text">SANTINHO</span><span class=tabs-number>{{favoriteCount}}</span></paper-tab>
          </paper-tabs>
        </app-toolbar>
        <candidate-filter
          tab="{{inboxtab}}"
          on-reload-candidates="_reloadCandidates"
          on-filtered-candidates="_showFilteredCandidates"
          on-loading="showLoading"
          on-hide-loading="hideLoading"
          on-total-filtered="_getTotalFiltered"
          user="{{user}}"
          filtered="{{filtered}}"
          filters="{{filters}}"
          id="filter">
        </candidate-filter>
      </app-header>
      <iron-pages selected="{{inboxtab}}">
        <div class="inbox">
          <welcome-card>
            <div>
              <p>
                Aqui você vê todas as candidatas e candidatos à Câmara dos Deputados e ao
                Senado e se eles têm:
              </p>
              <p>
                PASSADO LIMPO; <br>
                Compromisso com DEMOCRACIA; e<br>
                Adesão às NOVAS MEDIDAS contra a Corrupção.
              </p>
              <p>
                PESQUISE sobre os candidatos e use o botão ESTRELA para salvar
                suas preferências no SANTINHO digital. Para dúvidas, acesse FAQ.
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
                on-unauthorized="_openRestrictModal"
                on-favorite-candidate="_favoriteCandidateChanged"
                on-show-candidate="_showCandidate">
              </candidate-card>
            </template>
          </div>
          <div id="loadMoreCandidates">
            <span on-click="_getMoreCandidates">carregar mais candidatos</span>
          </div>
          <div id="noMoreCandidates">
            <span>Não há mais candidatos</span>
          </div>
        </div>
        <!-- <div class="inbox">
          <div class="candidates">
            <template is="dom-repeat" items="{{selectedCandidates}}">
              <selected-candidate-card
                candidate="[[item]]"
                on-unselect-candidate="_unselectCandidatesChanged"
                on-favorite-candidate="_favoriteCandidateChanged"
                on-show-candidate="_showCandidate">
              </selected-candidate-card>
            </template>
          </div>
          <div id="loadMoreSelectedCandidates">
            <span on-click="_getMoreSelectedCandidates">carregar mais candidatos</span>
          </div>
        </div> -->
        <div class="inbox">
          <div class="candidates">
          <template is="dom-if" if="{{!favoriteCandidates.length}}">
            <empty-search-card id="favorite-empty"></empty-search-card>
          </template>
            <template is="dom-repeat" items="{{favoriteCandidates}}">
              <favorite-candidate-card
                candidate="[[item]]"
                on-unfavorite-candidate="_unfavoriteCandidatesChanged"
                on-show-candidate="_showCandidate">
              </favorite-candidate-card>
            </template>
          </div>
          <div id="loadMoreFavoriteCandidates">
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
        value: "TODOS OS CANDIDATOS"
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
        observer: "_tabChanged",
        notify: true
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
      },
      filters: {
        type: Object
      },
      targetCandidate: String,
      totalFiltered: {
        type: Number,
        observer: 'toggleLoadMoreButton'
      },
      favoriteCount: String,
      filtered: Boolean
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
        if(!this.filtered)
          this.filters['filter_by_adhered'] = 'SIM';
        this._getAllCandidates();
      } else {
        this._firstFilter();
        // this._getSelectedCandidates();
        this._getFavoriteCandidates();
        this._requestGeocoder();
      }
    }
  }

  openDrawer() { this.dispatchEvent(new CustomEvent("open-drawer")); }

  _firstFilter() {
    if(!this.user || Object.keys(this.user).length == 0) {
      this._getAllCandidates();
      } else {
        this.showLoading();
        this.$.api.params = this.filters;
        if(this.filtered) {
          this.$.api.params['filter_by_adhered'] = this.filters['filter_by_adhered'];
        } else {
          this.$.api.params['filter_by_adhered'] = 'SIM'
        }

        if(this.getUser().state) {
          if(this.filtered) {
            this.$.api.params['filter_by_uf'] = this.filters['filter_by_uf'];
          } else {
            this.$.api.params['filter_by_uf'] = this.getUser().state;
          }
        }
        this.$.api.params['limit'] = this.limit;
        this.$.api.path = `users/${this.getUser().uid}/candidates`;
        this.$.api.method = "GET";
        this.$.api.request().then((ajax) => {
          this.set("allCandidates", ajax.response);
          this.hideLoading();
        });
      }
  }

  _getAllCandidates(limit=0) {
    this.showLoading();
    this.$.api.params = this.filters;
    if(sessionStorage.getItem('ignored')) {
      this.filters["filter_by_ignored"] = sessionStorage.getItem('ignored');
    }
    if (limit > 0) {
      this.set("limit", 10);
      this.$.api.params['limit'] = limit;
    }
    else
      this.$.api.params['limit'] = this.limit;
    if(!this.user || Object.keys(this.user).length == 0) {
      this.$.api.path = `candidates/`;
    } else {
      this.$.api.path = `users/${this.getUser().uid}/candidates`;
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
      this.toggleLoadMoreButton();
    }
    if (tab == 1) {
      if (candidates.results)
        this.set("favoriteCandidates", candidates.results);
      else
        this.set("favoriteCandidates", candidates);
      this.toggleLoadMoreButton();
    }
  }

  _reloadCandidates(e) {
    var tab = e.detail.tab;
    if (tab == 0)
      this._getAllCandidates(10);
    if (tab == 1)
      this._getFavoriteCandidates();
  }

  _getTotalSelected() {
    if(!this.user || Object.keys(this.user).length == 0) return;
    this.$.api.path = `users/${this.getUser().uid}/total-selected-candidates`;
    this.$.api.method = "GET";
    this.$.api.params = {};
    this.$.api.request().then((ajax) => {
      const count = `0${ajax.response.total}`.slice(-2);
      this.set("selectedCount", count);
    });
  }

  _getTotalFavorite() {
    if(!this.user || Object.keys(this.user).length == 0) return;
    this.$.api.path = `users/${this.getUser().uid}/total-favorite-candidates`;
    this.$.api.method = "GET";
    this.$.api.params = {};
    this.$.api.request().then((ajax) => {
      const count = `0${ajax.response.total}`.slice(-2);
      this.set("favoriteCount", count);
    });
  }

  _getTotalFiltered(e) {
    this.set('totalFiltered', e.detail.total);
  }

  toggleLoadMoreButton() {
    if(this.totalFiltered === this.allCandidates.length) {
      this.$.loadMoreCandidates.style.display = "none";
      this.$.noMoreCandidates.style.display = "block";
    } else {
      this.$.loadMoreCandidates.style.display = "block";
      this.$.noMoreCandidates.style.display = "none";
    }
  }

  _getSelectedCandidates(limit=0) {
    if(!this.user || Object.keys(this.user).length == 0) return;
    this._getTotalSelected();
    this.showLoading();
    this.$.api.path = `users/${this.getUser().uid}/selected-candidates`;
    this.$.api.method = "GET";
    if (limit > 0) {
      this.set("selectedLimit", 10);
      this.$.api.params = {"limit": limit};
    }
    else
      this.$.api.params = {"limit": this.selectedLimit};
    this.$.api.request().then((ajax) => {
      if (ajax.response.length < 10) {
        this.$.loadMoreSelectedCandidates.style.display = "none";
      } else {
        this.$.loadMoreSelectedCandidates.style.display = "block";
      }
      this.set("selectedCandidates", ajax.response);
      this.hideLoading();
    });
  }

  _getFavoriteCandidates(limit=0) {
    if(!this.user || Object.keys(this.user).length == 0) return;
    this._getTotalFavorite();
    this.showLoading();
    this.$.api.path = `users/${this.getUser().uid}/favorite-candidates`;
    this.$.api.method = "GET";
    if (limit > 0) {
      this.set("selectedLimit", 10);
      this.$.api.params = {"limit": limit};
    }
    else
      this.$.api.params = {"limit": this.selectedLimit};
    this.$.api.request().then((ajax) => {
      if (ajax.response.length < 10) {
        this.$.loadMoreFavoriteCandidates.style.display = "none";
      } else {
        this.$.loadMoreFavoriteCandidates.style.display = "block";
      }
      this.set("favoriteCandidates", ajax.response);
      this.hideLoading();
    });
  }

  _getMoreCandidates() {
    if(!this.user || Object.keys(this.user).length == 0) {
      this.$.api.path = 'candidates';
    }
    else {
      this.$.api.path = `users/${this.getUser().uid}/candidates`;
    }
    this.showLoading();

    this.$.api.method = "GET";
    this.limit += 10;
    this.$.api.params = this.filters;
    this.$.api.params["limit"] = this.limit;
    this.$.api.request().then((ajax) => {
      if (ajax.response.results)
        this.set("allCandidates", ajax.response.results);
      else
        this.set("allCandidates", ajax.response);
      this.hideLoading();
      this.toggleLoadMoreButton();
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
        this.$.loadMoreSelectedCandidates.style.display = "none";
      } else {
        this.$.loadMoreSelectedCandidates.style.display = "block";
      }
      if (ajax.response.results)
        this.set("selectedCandidates", ajax.response.results);
      else
        this.set("selectedCandidates", ajax.response);
      this.hideLoading();
      this.toggleLoadMoreButton();
    });
  }

  _showSelectedCardAnimation(e) {
    var card = e.target.shadowRoot.querySelector(".card");
    card.classList.add("selected-candidate-animation");
  }

  _showPressedCardAnimation(e) {
    var card = e.target.shadowRoot.querySelector(".card");
    card.classList.add("pressed-candidate-animation");
    e.target._shareCandidate(true);
  }

  _showIgnoredCardAnimation(e) {
    var card = e.target.shadowRoot.querySelector(".card");
    card.classList.add("ignored-candidate-animation");
  }

   _selectedCandidatesChanged(e) {
    this.set('targetCandidate', e.detail.candidate.candidate);
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
    this.set('targetCandidate', e.detail.candidate.candidate);
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
    // this._getSelectedCandidates();
    this._getFavoriteCandidates();
  }

  _unselectCandidatesChanged(e) {
    this._showIgnoredCardAnimation(e);
    setTimeout(() => {
      this._userCandidatesChanged();
    }, 500);
  }

  _unfavoriteCandidatesChanged(e) {
    this._showIgnoredCardAnimation(e);
    setTimeout(() => {
      this._userCandidatesChanged();
    }, 500);
  }

  _favoriteCandidateChanged(e) {
    this._showFavoriteToast('');
    this._showSelectedCardAnimation(e);
    setTimeout(() => {
      if (this.limit == 1)
        this.limit = 10;
      else
        this.limit -=1;
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
    switch (this.inboxtab) {
      case 0:
        this.set('pageTitle', 'TODOS OS CANDIDATOS');
        break;
      case 1:
        this.set('pageTitle', 'SANTINHO');
        if (!this.user || Object.keys(this.user).length == 0) {
          this.$.unauthorizedDialog.present();
        }
        break;
      default:
        break;
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

  _showFavoriteToast(message) {
    this._toastMessage = message;
    this.$.favoriteToast.open();
  }

  _showCandidate(e) { this.set("route.path", `/candidate/${e.detail.candidate}`); }

}
window.customElements.define(CandidatesPage.is, CandidatesPage);
