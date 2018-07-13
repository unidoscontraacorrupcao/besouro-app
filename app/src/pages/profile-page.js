import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/app-layout/app-grid/app-grid-style.js';

import '../trophy-elements/blocked-mission-modal.js';
import '../api-elements/api-user-profile.js';
import '../api-elements/api-user-trophies.js';
import '../api-elements/api-trophies.js';
import '../api-elements/api-update-profile.js';
import '../api-elements/api-update-user.js';
import '../app-elements/app-actions.js';
import '../app-elements/app-icons.js';
import '../app-elements/app-dialog.js';
import '../profile-elements/password-dialog.js';
import '../app-elements/app-besouro-api.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class ProfilePage extends PolymerElement {
  static get template() {
    return html`
      <style include="app-grid-style">
        :host {
          --app-grid-columns: 2;
          display: block;
          background: #f5f5f5;
          flex-direction: column;
          min-height: 100vh;
        }
        [hidden] {
          display: none !important;
        }
        paper-toast {
          --paper-toast-color: white;
          --paper-toast-background-color: #e7007e;
          margin-bottom: 65px;
          text-align: center;
          min-height: 100px;
          width: 100%;
        }
        app-header {
          --app-form-header-background: white;
          --app-form-header-color: #333333;
        }
        app-toolbar:not([tab-bar]) {
          color: white;
          padding: 0;
          height: 250px;
          --layout-center_-_align-items: normal;
        }
        app-toolbar > paper-icon-button.left {
          margin: 20px 0 0 20px;
        }
        app-toolbar > h1[main-title] {
          width: 100%;
          display: flex;
        }
        h1[main-title] > div.wrap-title {
          align-self: flex-end;
          font-family: Folio;
          font-size: 32px;
          line-height: 35px;
          font-weight: normal;
        }
        div.wrap-title > div.status {
          font-size: 14px;
          line-height: 19px;
        }
        app-toolbar > paper-icon-button.right {
          margin: 20px 20px 0 0;
        }
        app-toolbar > iron-image {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: -2;
        }
        .cover paper-icon-button {
          display: block;
          margin: -40px auto;
          color: white;
          background: rgba(0,0,0,0.4);
          width: 100%;
        }
        .image-filter {
          position: absolute;
          background: rgba(49,39,131,0.5);
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        paper-tabs {
          height: 63px;
          width: 100%;
          --paper-tabs-selection-bar: {
            display: none;
          };
        }
        paper-tab {
          margin-bottom: 20px;
        }
        .tabs-text {
          font-family: Folio;
          text-transform: uppercase;
          font-size: 18px;
          line-height: 19px;
          font-weight: normal;
        }
        .iron-selected > .selected-mark {
          position: absolute;
          top: 55px;
          height: 25px;
          width: 25px;
          transform: rotate(45deg);
          background-color: #dddddd;
        }
        .fill {
          flex: 1;
        }
        iron-pages {
          background-color: #dddddd;
          margin-left: 10px;
          margin-right: 10px;
          padding: 20px;
          height: auto;
          min-height: 50vh;
          margin-bottom: 50px;
        }
        .info-name {
          color: var(--secondary-text-color);
          font-family: Folio;
          font-size: 14px;
          line-height: 16px;
        }
        .info-value {
          color: #333333;
          font-size: 16px;
          font-weight: bold;
          line-height: 22px;
          margin-bottom: 20px;
        }
        .form {
          display: none;
          width: 100%;
        }
        paper-input {
          --paper-input-container-color: #333333;
          --paper-input-container-focus-color: var(--secondary-text-color);
          --paper-input-container-input-color: var(--secondary-text-color);
        }
        paper-dropdown-menu {
          width: 100%;
          --paper-input-container-color: #333333;
          --paper-input-container-focus-color: var(--secondary-text-color);
          --paper-input-container-input-color: var(--secondary-text-color);
          --paper-input-container-label-color: #333333;
        }
        paper-textarea {
          --paper-input-container-color: #333333;
          --paper-input-container-focus-color: var(--secondary-text-color);
          --paper-input-container-input-color: var(--secondary-text-color);
          --paper-input-container-label-color: #333333;
        }
        paper-listbox {
          --paper-listbox: {
            max-height: 200px;
          };
        }
        div.fields > paper-input-error {
          position: relative;
          white-space: normal;
          word-wrap: break-word;
        }
        .fields paper-button,
        .form paper-button {
          display: block;
          height: auto;
          max-width: 170px;
          color: white;
          background-color: #E6007E;
          font-family: Folio;
          font-size: 24px;
          letter-spacing: 5px;
          line-height: 26px;
          text-align: center;
          margin: 4vh auto 0;
          border-radius: 0;
        }
        input#image {
          display: none;
        }
        paper-button.flex-button {
          width: 100%;
          margin: 0 auto;
          max-width: 100%;
        }
        ul.app-grid {
          width: 100%;
          padding: 0;
          margin: 5px 0;
          list-style: none;
        }
        div#trophies > ul.app-grid {
           margin-bottom: 60px;
        }
        ul.app-grid > li.item {
          padding: 20px 2.5vw;
          text-align: center;
        }
        .trophy-icon {
          border-radius: 50%;
          background-color: white;
          height: 13vh;
          width: 13vh;
          padding: 2vh;
          margin: auto;
        }
        .trophy-icon > iron-image {
          height: 13vh;
          width: 13vh;
          border-radius: 50%;
        }
        .trophy-name {
          margin-top: 5px;
          color: var(--secondary-text-color);
          font-family: Folio;
          font-size: 16px;
          line-height: 18px;
        }
        .trophy-more {
          margin-top: 10px;
          color: #e7007e;
          font-family: Folio;
          font-size: 16px;
          text-transform: uppercase;
          line-height: 18px;
        }
        .contribution-value {
          color: var(--secondary-text-color);
          font-family: Folio;
          font-size: 50px;
          line-height: 55px;
        }
        .contribution-value.special {
          text-align: center;
          color: #e6007e;
        }
        .contribution-description {
          text-align: center;
          color: var(--secondary-text-color);
          font-family: Folio;
          font-size: 16px;
          line-height: 18px;
        }
        .contribution-total {
          margin-top: 20px;
          margin-bottom: 60px;
        }
        .footer-edit {
          text-align: right;
          color: var(--secondary-text-color);
        }
        .footer-edit paper-button {
          font-family: Folio;
          text-transform: unset;
        }
        .footer-edit iron-icon {
          --iron-icon-stroke-color: var(--secondary-text-color);
        }
      </style>

    <app-besouro-api id="api"></app-besouro-api>
    <app-dialog id="blockedDialog">
      <blocked-mission-modal
        trophy-id="{{trophyId}}"
        on-close-modal="_dismissBlockedTrophy">
      </blocked-mission-modal>
    </app-dialog>

     <app-actions on-go-to-inbox="_dispatchToInboxPressed"></app-actions>
      <app-header-layout has-scrolling-region>
        <app-header slot="header">
          <app-toolbar>
            <paper-icon-button class="left" icon="app:arrow-back" on-tap="_dispatchBackPressed"></paper-icon-button>
            <h1 main-title>
              <div class="wrap-title">
                <div class="title-name">
                  {{_user.displayName}}
                </div>
                <div class="status">
                  Status do participante
                </div>
              </div>
            </h1>
            <paper-icon-button class="right" icon="app:edit-profile" on-tap="_switchInfo"></paper-icon-button>
            <iron-image class="image" id="avatar" src="{{_user.photoURL}}" sizing="cover"></iron-image>
            <div class="image-filter"></div>
          </app-toolbar>
          <app-toolbar tab-bar>
            <paper-tabs selected="{{_tab}}" fallback-selection="0">
              <paper-tab>
                <span class="tabs-text">
                  infos
                </span>
                <div class="selected-mark"></div>
              </paper-tab>
              <paper-tab>
                <span class="tabs-text">
                  troféus
                </span>
                <div class="selected-mark"></div>
              </paper-tab>
              <!-- <paper-tab>
                <span class="tabs-text">
                  contribuições
                </span>
                <div class="selected-mark"></div>
              </paper-tab> -->
            </paper-tabs>
          </app-toolbar>
          <iron-pages selected="{{_tab}}">
            <div id="info">
              <div class="content" id="content">
                <div class="info-name">email</div>
                <div class="info-value">{{_info.email}}</div>

                <div class="info-name">cidade</div>
                <div class="info-value">{{_info.city}}</div>

                <div class="info-name">país</div>
                <div class="info-value">{{_info.country}}</div>

                <div class="info-name">identidade de gênero</div>
                <div class="info-value">{{_info.gender}}</div>

                <div class="info-name">cor / raça</div>
                <div class="info-value">{{_info.race}}</div>

                <div class="info-name">Telefone/WhatsApp</div>
                <div class="info-value">{{_info.phone}}</div>

                <div class="info-name">Idade</div>
                <div class="info-value">{{_info.age}}</div>

                <div class="footer-edit">
                  <paper-button on-tap="_switchInfo"><iron-icon icon="app:edit-profile"></iron-icon>Editar perfil</paper-button>
                </div>

              </div>
              <div class="form" id="form">
                <div class="fields">
                  <input type="file" id="image" on-change="_extractPhoto" accept=".jpg, .jpeg, .png">
                  <paper-button class="flex-button" on-tap="_requestPhoto">Atualizar foto de perfil</paper-button>
                  <paper-input-error
                    hidden$=[[!_errors.image]] invalid>
                    {{_errors.image}}
                  </paper-input-error>
                  <paper-input id="displayName"
                    label="Nome"
                    value="{{_form.displayName}}"
                    invalid=[[_errors.displayName]]
                    required></paper-input>
                  <paper-input-error
                    hidden$=[[!_errors.displayName]] invalid>
                    {{_errors.displayName}}
                  </paper-input-error>
                  <paper-input id="city"
                    label="Cidade"
                    value="{{_form.city}}"
                    allowed-pattern="[A-Za-zÀ-ÿ ]"
                    invalid=[[_errors.city]]
                    required></paper-input>
                  <paper-input-error
                    hidden$=[[!_errors.city]] invalid>
                    {{_errors.city}}
                  </paper-input-error>
                  <paper-input id="state"
                    label="Estado"
                    value="{{_form.state}}"
                    allowed-pattern="[A-Za-z]"
                    maxlength="2"
                    invalid=[[_errors.state]]
                    required></paper-input>
                  <paper-input-error
                    hidden$=[[!_errors.state]] invalid>
                    {{_errors.state}}
                  </paper-input-error>
                  <paper-input id="country"
                    label="País"
                    value="{{_form.country}}"
                    allowed-pattern="[A-Za-zÀ-ÿ ]"
                    invalid=[[_errors.country]]
                    required></paper-input>
                  <paper-input-error
                    hidden$=[[!_errors.country]] invalid>
                    {{_errors.country}}
                  </paper-input-error>
                  <paper-dropdown-menu label="Identidade de gênero"
                    on-value-changed="_onGenderChanged">
                    <paper-listbox slot="dropdown-content" selected="{{_form.gender}}">
                      <paper-item>Não informado</paper-item>
                      <paper-item>Feminino</paper-item>
                      <paper-item>Masculino</paper-item>
                      <paper-item>Feminino Cis</paper-item>
                      <paper-item>Masculino Cis</paper-item>
                      <paper-item>Agênero</paper-item>
                      <paper-item>Queer</paper-item>
                      <paper-item>Gênero fluído</paper-item>
                      <paper-item>Gênero não conformista</paper-item>
                      <paper-item>Gênero variante</paper-item>
                      <paper-item>Intersex</paper-item>
                      <paper-item>Não binário</paper-item>
                      <paper-item>Transgênero</paper-item>
                      <paper-item>Pangênero</paper-item>
                      <paper-item>Mulher transexual</paper-item>
                      <paper-item>Homem transexual</paper-item>
                      <paper-item>Transfeminino</paper-item>
                      <paper-item>Transmasculino</paper-item>
                      <paper-item>Não sei</paper-item>
                      <paper-item>Nenhum</paper-item>
                      <paper-item>Outro</paper-item>
                    </paper-listbox>
                  </paper-dropdown-menu>
                  <paper-input-error
                    hidden$=[[!_errors.gender]] invalid>
                    {{_errors.gender}}
                  </paper-input-error>
                  <paper-input id="genderOther"
                    label="Especificar identidade de gênero"
                    value="{{_form.genderOther}}"
                    allowed-pattern="[A-Za-zÀ-ÿ ]"
                    invalid=[[_errors.genderOther]]
                    required></paper-input>
                  <paper-input-error
                    hidden$=[[!_errors.genderOther]] invalid>
                    {{_errors.genderOther}}
                  </paper-input-error>
                  <paper-dropdown-menu label="Cor / raça">
                    <paper-listbox slot="dropdown-content" selected="{{_form.race}}">
                      <paper-item>Não informada</paper-item>
                      <paper-item>Preto</paper-item>
                      <paper-item>Marrom</paper-item>
                      <paper-item>Branco</paper-item>
                      <paper-item>Amarelo</paper-item>
                      <paper-item>Indígena</paper-item>
                      <paper-item>Não sei</paper-item>
                    </paper-listbox>
                  </paper-dropdown-menu>
                  <paper-input-error
                    hidden$=[[!_errors.race]] invalid>
                    {{_errors.race}}
                  </paper-input-error>
                  <paper-input id="phone"
                    label="Telefone/WhatsApp"
                    value="{{_form.phone}}"
                    allowed-pattern="[0-9]"
                    pattern="[0-9]"
                    invalid=[[_errors.phone]]>
                  </paper-input>
                  <paper-input-error
                    hidden$=[[!_errors.phone]] invalid>
                    {{_errors.phone}}
                  </paper-input-error>
                  <paper-input id="age"
                    type="number"
                    label="Idade"
                    value="{{_form.age}}"
                    allowed-pattern="[0-9]"
                    pattern="[0-9]"
                    maxlength="3"
                    invalid=[[_errors.age]]>
                  </paper-input>
                  <paper-input-error
                    hidden$=[[!_errors.age]] invalid>
                    {{_errors.age}}
                  </paper-input-error>
                </div>
                <paper-button class="accent" on-tap="_updateProfile">Salvar</paper-button>
              </div>
            </div>
            <div id="trophies">
              <ul class="app-grid">
                <template id="trophyList" is="dom-repeat" items="{{_trophies}}" as="trophy">
                  <li class="item">
                    <div class="trophy-icon">
                      <iron-image src="{{trophy.icon}}" sizing="cover"></iron-image>
                    </div>
                    <div class="trophy-name">
                      {{trophy.name}}
                    </div>
                    <div class="trophy-more">
                      <a on-tap="_triggerTrophyAction">{{trophy.label}}</a>
                    </div>
                  </li>
                </template>
              </ul>
            </div>
            <!-- <div id="contributions">
              <ul class="app-grid">
                <li class="item">
                  <div class="contribution-value">
                    {{_contributions.missions_pending}}
                  </div>
                  <div class="contribution-description">
                    Missões pendentes
                  </div>
                </li>
                <li class="item">
                  <div class="contribution-value">
                    {{_contributions.missions_complete}}
                  </div>
                  <div class="contribution-description">
                    Missões completas
                  </div>
                </li>
                <li class="item">
                  <div class="contribution-value">
                    {{_contributions.missions_total}}
                  </div>
                  <div class="contribution-description">
                    Total de missões
                  </div>
                </li>
                <li class="item">
                  <div class="contribution-value">
                    {{_contributions.votes_total}}
                  </div>
                  <div class="contribution-description">
                    Total de votos
                  </div>
                </li>
                <li class="item">
                  <div class="contribution-value">
                    {{_contributions.shares_total}}
                  </div>
                  <div class="contribution-description">
                    Total de compartilhamentos
                  </div>
                </li>
                <li class="item">
                  <div class="contribution-value">
                    {{_contributions.trophies_total}}
                  </div>
                  <div class="contribution-description">
                    Total de troféus
                  </div>
                </li>
              </ul>
              <div class="contribution-total">
                <div class="contribution-value special">
                  {{_contributions.score}}
                </div>
                <div class="contribution-description">
                  Total de pontos
                </div>
              </div>
            </div> -->
          </iron-pages>
        </app-header>
      </app-header-layout>

      <paper-toast id="toast"
        text="{{_toastMessage}}"></paper-toast>

      <api-trophies id="apiTrophies"
      on-result="_onTrophies"></api-trophies>
      <api-user-profile id="apiUserProfile"
        on-result="_onUserProfile"></api-user-profile>
      <api-user-trophies id="apiUserTrophies"
        on-result="_onUserTrophies"></api-user-trophies>
      <api-update-profile id="apiUpdateProfile"
        on-result="_onUpdateProfile"></api-update-profile>
      <api-update-user id="apiUpdateUser"
        on-result="_onUpdateUser"></api-update-user>
    `;
  }

  static get is() { return `profile-page`; }

  static get properties() {
    return {
      route: {
        type: Object,
        observer: `_onRouteChanged`
      },
      _contributions: Object,
      _errors: Object,
      _form: Object,
      _info: Object,
      _tab: {
        type: Number,
        observer: `_onTabChanged`
      },
      _toastMessage: String,
      _trophies: Array,
      _data: Array,
      _showGenderOther: Boolean,
      _blockedTrophy: {
        type: String,
        value: "detalhes"
      },
      _availableTrophy: {
        type: String,
        value: "ver missão"
      },
      selected: {
        observer: "_selectedChanged"
      }
    };
  }

  _selectedChanged(selected) {
    if(!selected) return;
    this._requestUser();
  }

  constructor() {
    super();
    this._contributions = this._getEmptyContributions();
    this._errors = this._getEmptyErrors();
    this._form = this._getEmptyForm();
    this._info = this._getEmptyInfo();
    this._trophies = [];
    this._tab = 1;
    this._toastMessage = ``;
    this._showGenderOther = false;
  }

  storedUser(user) {
    if(user != null
      && user != undefined
      && `key` in user
      && `uid` in user) {
      this._user = user;
      this.$.apiUserProfile.request(user.key, user.uid);
      this.$.apiUserTrophies.request(this._user.key, this._user.uid);
    } else {
      this._dispatchAccessDenial();
    }
  }

  _onTabChanged(e) {
    if(this._tab == 0) {
      this._setTabDivs(`block`, `none`, `none`);
    } else if(this._tab == 1) {
      this._setTabDivs(`none`, `block`, `none`);
    } else {
      this._setTabDivs(`none`, `none`, `block`);
      // TODO: Change to API request
      this._contributions = {
        missions_pending: 32,
        missions_complete: 23,
        missions_total: 55,
        votes_total: 2332,
        shares_total: 34,
        trophies_total: 12,
        score: 235223
      };
    }
  }

  _setTabDivs(info, trophies, contributions) {
    this.$.info.style.display = info;
    this.$.trophies.style.display = trophies;
    // this.$.contributions.style.display = contributions;
  }

  _updateProfile(e) {
    const VALIDATION = this._validateForm();
    if(VALIDATION.valid) {
      this.$.apiUpdateProfile.request(this._user.key, this._user.uid, this._form);
    } else {
      this._errors = VALIDATION.errors;
      this._toastInvalidFields();
    }
  }

  _validateForm() {
    return { valid: true };
  }

  _requestPhoto() {
    this.$.image.click();
  }

  _extractPhoto(e) {
    let photo = e.target.files[0];
    if(photo) {
      let reader = new FileReader();
      let avatar = this.$.avatar;
      let apiUpdateProfile = this.$.apiUpdateProfile
      let key = this._user.key;
      let uid = this._user.uid;
      reader.onload = function(e) {
        avatar.src = e.target.result;
      }
      reader.readAsDataURL(photo);
      apiUpdateProfile.imageRequest(key, uid, photo);
    }
  }

  _onRouteChanged() {
    if(this.route.path == `/profile`) {
      this._requestUser();
    }
  }

  _onGenderChanged(e, gender) {
    if(gender.value == `Outro`) {
      this.$.genderOther.style.display = `block`;
    } else {
      this.$.genderOther.style.display = `none`;
    }
  }

  _dispatchUser() {
    this.dispatchEvent(new CustomEvent(`user-update`, { detail: this._user } ));
  }

  _dispatchAccessDenial() {
    this.dispatchEvent(new CustomEvent(`access-denial`));
  }

  _dispatchBackPressed() {
    this.dispatchEvent(new CustomEvent(`back-pressed`));
  }

  _dispatchToInboxPressed() {
    this.dispatchEvent(new CustomEvent(`to-inbox-pressed`));
  }

  _requestUser() {
    this.dispatchEvent(new CustomEvent(`request-user`));
  }

  _switchInfo() {
    this._tab = 0;
    if(this.$.content.style.display == `none`) {
      this.$.content.style.display = `block`;
      this.$.form.style.display = `none`;
    } else {
      this.$.content.style.display = `none`;
      this.$.form.style.display = `block`;
    }
  }

  _onUserProfile(e, result) {
    if(result.success) {
      this._extractUserInfo(result.data);
      this._updateForm(result.data, this._user.displayName);
      this._user.state = result.data.state;
      this._user.country = result.data.country;
      this._user.gender = result.data.gender;
      this._user.race = result.data.race;
      this._user.photoURL = result.data.image;
      this._dispatchUser();
    } else {
      this._toastUnknownError();
    }
  }

  _onUpdateProfile(e, result) {
    if(result.success) {
      this.$.apiUpdateUser.request(this._user.key, this._user.uid, this._form.displayName);
    } else {
      this.$.avatar.src = this._user.photoURL;
      let errors = result.errors;
      if(errors.notFound) {
        this._toastUnknownError();
      } else {
        this._errors = {
          image: errors.image,
          displayName: errors.display_name,
          city: errors.city,
          state: errors.state,
          country: errors.country,
          gender: errors.gender,
          genderOther: errors.gender_other,
          race: errors.race,
          phone: errors.phone,
          age: errors.age
        };
      }
      this._toastUnknownError();
    }
  }

  _onUpdateUser(e, result) {
    if(result.success) {
      this._user.displayName = result.data.displayName;
      this._dispatchUser();
      this._requestUser();
      this._toastIt(`Perfil atualizado com sucesso!`);
    } else {
      let errors = result.errors;
      if(errors.notFound) {
        this._toastUnknownError();
      } else {
        let formErrors = this._errors;
        formErrors.displayName = errors.displayName;
        this._errors = formErrors;
        this._toastInvalidFields();
      }
    }
  }

  _onUserTrophies(e, result) {
    if(result.success) {
      this._data = result.data;
      this.$.apiTrophies.request(this._user.key);
    } else {
      this._toastUnknownError();
    }
  }

  //TODO: Move this to besouro backend as an api endpoint.
  _onTrophies(e, result) {
    if(result.success) {
      var userTrophies = this._data;
      var allTrophies = result.data;
      for(let dataIndex in allTrophies) {
        var trophyKey = allTrophies[dataIndex].key;

        this.$.api.path = `users/1/required_trophies/?trophy=${trophyKey}`;
        this.$.api.request().then(function(ajax) {

          var requiredTrophies = ajax.response;
          if (requiredTrophies.length == 0)
            allTrophies[dataIndex]["label"] = this._availableTrophy;

          if (requiredTrophies.length > userTrophies.length) {
            allTrophies[dataIndex]["label"] = this._blockedTrophy;
            var mid = this.missionIdFromTrophy(allTrophies[dataIndex]);
            this.$.api.path = `missions/${mid}`;
            this.$.api.request().then(function (ajax) {
              allTrophies[dataIndex]["name"] = ajax.response.title;
            }.bind(this));
          }

          else{
            for(let index in requiredTrophies) {
              if (this.userHavePreReqs(userTrophies, requiredTrophies))
                allTrophies[dataIndex]["label"] = this._availableTrophy;
              else {
                allTrophies[dataIndex]["label"] = this._blockedTrophy;
                var mid = this.missionIdFromTrophy(allTrophies[dataIndex]);
                this.$.api.path = `missions/${mid}`;
                this.$.api.request().then(function (ajax) {
                  allTrophies[dataIndex]["name"] = ajax.response.title;
                }.bind(this));
              }
            }
          }
        }.bind(this));
      }
      setTimeout(function () {
        this._trophies = [];
        let userIdx;
        let allIdx;
        for (userIdx in userTrophies) {
          for (allIdx in allTrophies) {
            if(allTrophies[allIdx].key == userTrophies[userIdx].trophy) {
              if (userTrophies[userIdx].percentage == 100)
                allTrophies[allIdx].icon = allTrophies[allIdx].icon_complete;
              else
                allTrophies[allIdx].icon = allTrophies[allIdx].icon_not_started;
            }
            else
              allTrophies[allIdx].icon = allTrophies[allIdx].icon_not_started;
}
        }
        this._trophies = allTrophies;
      }.bind(this), 400);
    }
    else {
      this._toastUnknownError();
    }
  }

  missionIdFromTrophy(trophy) {
    var reference_link = trophy["reference_link"];
    var missionId = reference_link.split("/")[reference_link.split("/").length - 1];
    return missionId;
  }

  userHavePreReqs(userTrophies, requiredTrophies) {
    let idx;
    var filteredTrophies = [];
    for (idx in requiredTrophies) {
      filteredTrophies.push(userTrophies.filter(function(trophy) {
        return trophy.trophy == requiredTrophies[idx].key
          && trophy.percentage == 100;
      }).filter(el => el.length > 0));
    }
    return filteredTrophies.length == requiredTrophies.length;
  }




  _updateForm(user, displayName) {
    let form = {
      image: user.image,
      displayName: displayName,
      city: user.city,
      state: user.state,
      country: user.country,
      gender: user.gender,
      genderOther: user.genderOther,
      race: user.race,
      phone: user.phone,
      age: user.age
    };
    this._form = form;
  }

  _extractUserInfo(user) {
    let info = this._getEmptyInfo();

    info.email = this._user.email;

    if(user.city != ``) {
      info.city = user.city;
      if(user.state != ``) {
        info.city += ` - ` + user.state;
      }
    } else {
      info.city = `Não informada`;
    }

    if(user.country != ``) {
      info.country = user.country;
    } else {
      info.country = `Não informado`;
    }

    if(user.gender != 0) {
      info.gender = this._getGenderText(user.gender);
      if(user.genderOther != ``) {
        info.gender += `: ` + user.genderOther;
      }
    } else {
      info.gender = `Não informado`;
    }

    if(user.race != 0) {
      info.race = this._getRaceText(user.race);
    } else {
      info.race = `Não informada`;
    }

    if (user.phone) {
      info.phone = user.phone;
    } else {
      info.phone = `Não informado`;
    }

    if (user.age) {
      info.age = user.age;
    } else {
      info.age = `Não informada`;
    }

    if(user.image != ``) {
      this.$.avatar.src = user.image;
    }

    this._info = info;
  }

  _getGenderText(genderId) {
    switch(genderId) {
      case 1: return `Feminino`;
      case 2: return `Masculino`;
      case 3: return `Feminino Cis`;
      case 4: return `Masculino Cis`;
      case 5: return `Agênero`;
      case 6: return `Queer`;
      case 7: return `Gênero fluído`;
      case 8: return `Gênero não conformista`;
      case 9: return `Gênero variante`;
      case 10: return `Intersex`;
      case 11: return `Não binário`;
      case 12: return `Transgênero`;
      case 13: return `Pangênero`;
      case 14: return `Mulher transexual`;
      case 15: return `Homem transexual`;
      case 16: return `Transfeminino`;
      case 17: return `Transmasculino`;
      case 18: return `Não sei`;
      case 19: return `Nenhum`;
      case 20: return `Outro`;
      default: return ``;
    }
  }

  _getRaceText(raceId) {
    switch(raceId) {
      case 1: return `Preto`;
      case 2: return `Marrom`;
      case 3: return `Branco`;
      case 4: return `Amarelo`;
      case 5: return `Indígena`;
      case 6: return `Não sei`;
      default: return ``;
    }
  }

  _getEmptyInfo() {
    return {
      email: ``,
      city: ``,
      country: ``,
      gender: ``,
      genderOther: ``,
      race: ``,
      phone: ``,
      age: ``
    };
  }

  _getEmptyForm() {
    return {
      image: ``,
      displayName: ``,
      city: ``,
      state: ``,
      country: ``,
      gender: ``,
      genderOther: ``,
      race: ``,
      phone: ``,
      age: ``
    };
  }

  _getEmptyErrors() {
    return {
      image: ``,
      displayName: ``,
      city: ``,
      state: ``,
      country: ``,
      gender: ``,
      genderOther: ``,
      race: ``,
      phone: ``,
      age: ``
    };
  }

  _getEmptyContributions() {
    return {
      missions_pending: 0,
      missions_complete: 0,
      missions_total: 0,
      votes_total: 0,
      shares_total: 0,
      trophies_total: 0,
      score: 0
    };
  }

  _toastIt(message) {
    this._toastMessage = message;
    this.$.toast.open();
  }

  _toastUnknownError() {
    this._toastIt(`Um erro aconteceu. Por favor, tente novamente mais tarde.`)
  }

  _toastInvalidFields() {
    this._toastIt(`Formulário inválido. Consulte os erros nos campos.`);
  }

  _triggerTrophyAction(e) {
    var  trophy = e.model.trophy;
    var linkText = e.target.text;
    if (linkText == this._availableTrophy)
    {
      var reference_link = trophy.reference_link;
      var missionId = reference_link.split("/")[reference_link.split("/").length - 1];
      this.set("route.path", `/show-mission/${missionId}`);
    }
    if (linkText == this._blockedTrophy){
      this.set("trophyId", trophy.key);
      this.$.blockedDialog.present();
    }
  }

  _dismissBlockedTrophy() { this.$.blockedDialog.dismiss(); }
  _openBlockedTrophyModal() { this.$.blockedDialog.present(); }

  _setTrophyIcon(item) {
    this.$.api.path = `users/${this._user.uid}/trophies?key=${item.key}/`
    promise = this.$.api.request().then(function (ajax) {
    });
    return promise;
  }
}
window.customElements.define(ProfilePage.is, ProfilePage);
