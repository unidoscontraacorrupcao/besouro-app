import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import 'share-menu/share-menu.js';

import '../candidates-elements/candidate-share-modal.js'
import '../app-elements/styles/candidate-card-shared-styles.js';
import '../mission-elements/unauthorized-modal.js';
import '../app-elements/app-scrollable-dialog.js';
import '../app-elements/app-form-header.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import '../mission-elements/mission-player.js';
import '../app-elements/app-besouro-api.js';
import {CommonBehaviorsMixin} from '../mixin-elements/common-behaviors-mixin.js';
import {CardMixin} from '../mixin-elements/card-mixin.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { resolveCss } from '@polymer/polymer/lib/utils/resolve-url';
class CandidatePage extends CardMixin(CommonBehaviorsMixin(PolymerElement)) {
  static get template() {
    return html`
    <style include="candidate-card-shared-styles"></style>
    <style>

      :host {
        display: block;
        background: white;
        @apply --default-font;
        height: 100vh;
        --layer-image: '';
        max-width: 900px;
        margin: auto;
      }

      .content {
        max-width: 800px;
        margin: auto;
      }

      .content h2 {
        font-size: 1.8em;
        font-family: Folio;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }

      .content p {
        font-size: 1.1em;
        color: rgba(51,51,51,1);
        font-family: helvetica-neue;
      }

      hr { margin-bottom: 38px; }

      mission-player { margin: auto; }

      app-header {
        height: 250px;
        color: white;
        /* https://bugs.chromium.org/p/chromium/issues/detail?id=637072 */
        --app-header-background-front-layer: {
          background-image: var(--layer-image);
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
        };
      }

      app-header[shadow] { color: black; }

      app-header[shadow] .tall {
        background: unset;
        width: 100px;
      }

      app-header[shadow] .tall .actions { display: none; }

      app-header[shadow] #share-candidate { display: none; }

      app-toolbar {
        width: 90%;
        margin: auto;
        padding: 0;
      }

      app-toolbar.short {
        height: 45px;
        z-index: 2;
      }

      app-header[shadow] .tall .actions,
      app-header[shadow] .tall .timing {
        display: none;
      }

      app-header app-toolbar paper-icon-button {
        width: 25px;
        height: 25px;
      }
      app-header[shadow] paper-icon-button[icon="app:arrow-back"] {
        color: black;
      }

      p[bottom-item],
      div[bottom-item] {
        position: absolute;
        right: 0;
        bottom: 10px;
        left: 0;
      }

      .tall .actions {
        position: absolute;
        bottom: 10px;
        right: 0;
      }
      .tall { height: 175px; }


      #social-medias { margin: 22px auto 12px auto; }

      #social-medias span {
        text-transform: uppercase;
        font-family: Folio;
        font-size: 16px;
      }

      #medias {
        display: flex;
        margin-top: 16px;
      }

      #medias > * { flex-grow: 1; }
      #medias paper-icon-button {padding: 4px;}

      paper-icon-button {
        padding: 0;
        color: white;
      }

      p.title[main-title] {
        color: white;
        text-transform: uppercase;
        font-family: Folio;
        font-size: 32px;
        padding-top: 10px;
        line-height: 1.2;
        white-space: unset;
        max-width: 400px;
        margin-bottom: 20px;
      }

      h3 {
        color: var(--dark-primary-color);
        margin: 5px 0;
      }

      span[condensed-title] {
        font-family: Folio;
        text-transform: uppercase;
        margin-left: 10px;
      }

      .content { padding: 20px 20px; }

      .content p,
      .content h2 { margin: 10px 0; }

      .hide[disabled] { opacity: 0.4; }

      #tse-data { margin-bottom: 150px; }

      #user-actions {
        display: flex;
        width: 90%;
        margin: 40px auto 40px auto;
        max-width: 605px;
      }

      #user-actions paper-button {
        flex-grow: 1;
        height: 74px;
        max-width: 300px;
        font-family: folio;
        text-align: center;
      }

      #unselectedButtons, #pressedButton {
        margin: auto;
        display: flex;
      }

      #user-actions #selectButton,
      #supportButtons paper-button:first-child,
      #user-actions #unselectedButtons paper-button,
      #user-actions #pressedButton paper-button {
          border-color: var(--secondary-text-color);
          border-style: solid;
          border-width: 1px;
          text-align: center;
        }

      #user-actions #pressedButton paper-button { color: var(--secondary-text-color); }

      #user-actions #pressButton {
        background-color: var(--secondary-text-color);
        color: white;
      }

      #user-actions  #supportButtons { flex-direction: column; }

      #user-actions  #supportButtons paper-button:last-child {
        background-color: rgba(0,159,227,1);
        border-color: rgba(0,159,227,1);
        color: white;
        margin-top: 10px;
      }

      #share-btn { margin: 10px 25px 0 0; }
      #share-btn paper-icon-button { color: var(--dark-primary-color); }

      .stats {
        color: var(--light-text-color);
        background-color: rgba(238,238,238,1);
        height: 40px;
      }

      .stats .stats-number {
        color: var(--accent-color);
        font-weight: bold;
      }
      .stats-content {
        width: 80%;
        padding-top: 5px;
        margin: auto;
        text-align: center;
        font-size: 1.2rem;
        font-family: Folio;
        height: 30px;
      }

      .stats-columns { display: flex; }

      .stats-columns div { flex-grow: 1; }

      #candidate-infos div span:nth-child(2) {
        font-family: folio;
        font-size: 18px;
      }

      #political-infos {
        position: relative;
        z-index: 1;
        bottom: 50px;
      }

      #political-infos .info iron-icon { color: unset; }

      app-toolbar {z-index: 5}

      #share-candidate paper-icon-button { padding: 9px; }
      #share-candidate div div:last-child { margin-top: 2px; }

      @media only screen and (max-width: 460px) {
        .stats-content {
          font-size: 1.0rem;
          width: 95%;
        }
      }

      @media only screen and (max-width: 390px) {
        .stats-content {
          font-size: 0.9rem;
        }
        .card-action { height: 65px;}
      }

      @media only screen and (max-width: 330px) {
        .card-action span { font-size: 1.5em };
        #candidate-infos{ width: 100%; }
      }
    </style>
    <app-dialog id="candidateShareDialog">
      <candidate-share-modal
        on-close-modal="_closeModal">
      </candidate-share-modal>
    </app-dialog>

    <app-besouro-api id="api"></app-besouro-api>
    <app-dialog id="unauthorizedDialog">
      <unauthorized-modal
        on-close-modal="_dismissUnauthorizedModal"
        on-go-to-register="_goToLogin">
      </unauthorized-modal>
    </app-dialog>

    <app-route
      route="{{route}}"
      pattern="/candidate/:key"
      data="{{data}}">
    </app-route>

    <app-header-layout has-scrolling-region="">
      <app-header
        slot="header"
        fixed=""
        condenses=""
        effects="waterfall resize-title blend-background parallax-background">
        <app-toolbar>
          <paper-icon-button
            icon="app:arrow-back"
            on-tap="_returnToCandidates">
          </paper-icon-button>

          <span condensed-title class="dark title">{{candidate.name}}</span>
        </app-toolbar>
        <div on-click="_shareCandidate" id="share-candidate">
          <div>
            <div>
              <paper-icon-button icon="app:share"></paper-icon-button>
            </div>
            <div>
              <span>compartilhar</span>
            </div>
          </div>
        </div>
        <app-toolbar class="tall">
          <p bottom-item main-title="" class="title">
          </p>
      <mission-player
        id="player"
        mission-image="{{missionImage}}"
        mission="{{mission}}"
        mission-key="{{data.key}}">
      </mission-player>
    </app-toolbar>
        <div id="political-infos">
          <div class="info">
            <div id="short">
              <span>Tem passado limpo?<iron-icon icon="app:help"></iron-icon></span>
              <paper-tooltip position="right">
                Nosso critério de passado limpo é mais rígido.
                A referência são os crimes da Lei da Ficha Limpa,
                mas para nós eles nunca prescrevem. No caso de
                quem tentará reeleição, veremos quem responde a 
                processo no STF.
              </paper-tooltip>
            </div>
            <div>
              <span>{{candidate.has_clean_pass}}</span>
            </div>
          </div>
          <div class="info">
            <div>
              <span>Comprometeu-se com democracia?<iron-icon icon="app:help"></iron-icon></span>
              <paper-tooltip position="top">
                O critério de compromisso com os princípios
                democráticos baseia-se na adesão ao Pacto
                pela Democracia – iniciativa da sociedade pela
                preservação e revigoramento da vida política e
                democrática do país.
              </paper-tooltip>
            </div>
            <div>
              <span>{{candidate.committed_to_democracy}}</span>
            </div>
          </div>
          <div class="info">
            <div>
              <span>Aderiu às novas medidas?<iron-icon icon="app:help"></iron-icon></span>
              <paper-tooltip position="left">
                No caso do combate à corrupção, a/o candidata/o
                terá de se comprometer a, se eleita/o, pôr nossas
                propostas em tramitação e atuar por sua aprovação.
                Ressalvas terão de ser identificadas e justificadas.
              </paper-tooltip>
            </div>
            <div>
              <span>{{candidate.adhered_to_the_measures}}</span>
            </div>
          </div>
        </div>
  </app-header>

  <div class="stats">
    <div class="stats-content">
      <div class="stats-columns">
        <div>
          <span>
            <span class="stats-number">{{candidateMetrics.selected_count}} </span>
              selecionaram <span class="space">&nbsp;&verbar;&nbsp;</span>
            </span>
        </div>

        <div>
          <span>
            <span class="stats-number">{{candidateMetrics.pressed_count}}</span>
            pressionaram <span class="space">&nbsp;&verbar;&nbsp;</span>
          </span>
        </div>

        <div>
          <span>
            <span class="stats-number">{{candidateMetrics.fav_count}}</span>
            favoritaram</span>
        </div>
      </div>
    </div>
  </div>

      <div class="content">
        <h2>{{candidate.name}}</h2>
        <div id="candidate-infos">
          <div>
            <div id="candidacy">
              <span>candidatura:</span>
              <span><b>{{candidate.candidacy}}</b></span>
            </div>
          </div>
          <div>
            <div id="urn">
              <span>urna:</span>
              <span><b>{{candidate.urn}}</b></span>
            </div>
          </div>
          <div>
            <div id="party-uf">
              <span>partido - UF:</span>
              <span><b>{{candidate.party}} - {{candidate.uf}}</b></span>
            </div>
          </div>
        </div>
        <div id="user-actions">
          <div id="unselectedButtons">
            <paper-button id="selectButton" on-click="_wrapSelectCandidate">
              <div>
                <div id="btn-icon">
                  <iron-icon icon="app:select-candidate"></iron-icon>
                </div>
                selecionar
              </div>
            </paper-button>

            <paper-button id="pressButton" on-click="_wrapPressCandidate">
              <div>
                <div id="btn-icon">
                  <iron-icon icon="app:press-candidate"></iron-icon>
                </div>
                pressionar
              </div>
            </paper-button>
          </div>

          <div id="supportButtons">
            <paper-button on-click="_wrapUnselectCandidate">
              <div>
                <div id="btn-icon">
                  <iron-icon icon="app:unselect-candidate-page"></iron-icon>
                </div>
                remover seleção
              </div>
            </paper-button>
            <paper-button on-click="_supportCandidate">
              <div>
                <div id="btn-icon">
                  <iron-icon icon="app:wallet"></iron-icon>
                </div>
                apoiar
              </div>
            </paper-button>
          </div>
          <div id="pressedButton">
            <paper-button disabled>
              <div>
                <div id="btn-icon">
                  <iron-icon icon="app:pressed-candidate"></iron-icon>
                </div>
                pressionado
              </div>
            </paper-button>
          </div>
        </div>

      <div id="social-medias">
        <hr>
        <span>redes sociais deste candidato:</span>
        <div id="medias">
            <paper-icon-button id="facebookBtn" on-click="_redirectToSocialLink" data-item="facebook_url" icon="app:social-facebook"></paper-icon-button>
            <paper-icon-button id="twitterBtn" on-click="_redirectToSocialLink" data-item="twitter_url" icon="app:social-twitter"></paper-icon-button>
            <paper-icon-button id="instagramBtn" on-click="_redirectToSocialLink" data-item="instagram_url" icon="app:social-insta"></paper-icon-button>
            <paper-icon-button id="youtubeBtn" on-click="_redirectToSocialLink" data-item="youtube_url" icon="app:social-youtube"></paper-icon-button>
            <paper-icon-button id="crowdBtn" on-click="_redirectToSocialLink" data-item="crowdfunding_url" icon="app:social-link"></paper-icon-button>
        </div>
      </div>
        <div id="tse-data">
          <div class="item">
            <div class="item-header">
              <div class="item-title">
                <span>Nome Completo</span>
              </div>
              <paper-icon-button on-click="_toggle" icon="app:expand-more"></paper-icon-button>
            </div>
          <div class="item-body">
             <span>{{candidate.full_name}}</span>
          </div>

          </div>
          <div class="item">
            <div class="item-header">
              <div class="item-title">
                <span>Ocupação Profissional</span>
              </div>
              <paper-icon-button on-click="_toggle" icon="app:expand-more"></paper-icon-button>
            </div>
            <div class="item-body">
              <span>
                {{candidate.occupation}}
              </span>
            </div>
          </div>
          <div class="item">
            <div class="item-header">
              <div class="item-title">
                <span>Aderiu totalmente às novas medidas?</span>
              </div>
              <paper-icon-button on-click="_toggleBig" icon="app:expand-more"></paper-icon-button>
            </div>
            <div class="item-body">
              <span>
                {{candidate.justify_adhered_to_the_measures}}
              </span>
            </div>
          </div>
          <div class="item">
            <div class="item-header">
              <div class="item-title">
                <span>Total de bens e patrimônio</span>
              </div>
              <paper-icon-button on-click="_toggle" icon="app:expand-more"></paper-icon-button>
            </div>
            <div class="item-body">
              <span>
                {{candidate.riches}}
              </span>
            </div>
          </div>
          <div class="item">
            <div class="item-header">
              <div class="item-title">
                <span>Total de processos a que responde</span>
              </div>
              <paper-icon-button on-click="_toggleBig" icon="app:expand-more"></paper-icon-button>
            </div>
            <div class="item-body">
              <span>
                {{candidate.lawsuits}}
              </span>
            </div>
          </div>
        </div>
      </div>

    </app-header-layout>
`;
  }

  static get is() { return 'candidate-page'; }

  static get properties() {
    return {
      route: {
        type: Object,
        notify: true
      },
      candidate: {
        type: Object,
        observer: '_candidateChanged'
      },
      candidateStatus: {
        type: String,
        observer: '_candidateStatusChanged'
      },
      candidateMetrics: {
        type: Object
      },
      key: String
    };
  }

  static get observers() { return [ 'routePathChanged(route.path)' ] }

  routePathChanged(path) { this._getCandidate(); }

  _getCandidate() {
    if (!this.data || Object.keys(this.data).length == 0) return;
    this.$.api.path = `candidates/${this.data.key}`;
    this.$.api.method = "GET";
    this.$.api.request().then((ajax) => {
      this.set("candidate", ajax.response)
      this._chooseCandidateColor();
      this._hideSocialMediaIcons();
      this._getCandidateStatistics();
    });
  }

  _getCandidateStatistics() {
    this._getCandidateMetrics();
    var user = this.getUser();
    if (!user || Object.keys(user).length == 0) {
      this._hideButtons();
      this._showUnselectedBtns();
      return;
    }
    else {
      this._getCandidateStatusByUser(user);
    }
  }

  _getCandidateStatusByUser(user) {
    this.$.api.path = `candidates/${this.data.key}/status`;
    this.$.api.method = "GET";
    this.$.api.params = {"user": user.uid};
    this.$.api.request().then((ajax) => {
      this.set("candidateStatus", ajax.response)
    });
  }

  _getCandidateMetrics() {
    this.$.api.path = `candidates/${this.data.key}/metrics`;
    this.$.api.method = "GET";
    this.$.api.params = {};
    this.$.api.request().then((ajax) => {
      this.set("candidateMetrics", ajax.response)
    });
  }

  _returnToCandidates() { this.set('route.path', '/candidates'); }


  _setLayerImage(candidatePhoto) {
    if(this.candidate) {
      this.updateStyles({ '--layer-image': `url(${candidatePhoto})` });
    }
  }

  _goToLogin() {
    this.$.unauthorizedDialog.dismiss();
    this.set("route.path", "/login");
  }

  _toggle(e) {
    var item = e.target.parentNode.parentNode;
    var itemHeight = item.clientHeight;
    if (itemHeight == 40) {
      item.setAttribute("style", "height: 90px");
      e.target.set("icon",  "app:expand-less");
    }
    else {
      item.setAttribute("style", "height: 40px");
      e.target.icon = "app:expand-more";
    }
  }

  _toggleBig(e) {
    var item = e.target.parentNode.parentNode;
    var itemHeight = item.clientHeight;
    if (itemHeight == 40) {
      item.setAttribute("style", "height: 200px");
      e.target.set("icon",  "app:expand-less");
    }
    else {
      item.setAttribute("style", "height: 40px");
      e.target.icon = "app:expand-more";
    }
  }

  _chooseCandidateColor() {
    if (this.candidate.score == "good") {
      var colors = ["rgba(50,206,166,0.5)", "rgba(0,0,0,1)"];
      this._setHeaderGradient(colors);
    } else if (this.candidate.score == "bad") {
      var colors = ["rgba(230,0,0,0.5)", "rgba(0,0,0,1)"];
      this._setHeaderGradient(colors);
    } else {
      var colors = ["rgba(183,184,183,0.5)", "rgba(0,0,0,1)"];
      this._setHeaderGradient(colors);
    }
  }

  _candidateStatusChanged() {
    if (!this.candidateStatus || Object.keys(this.candidateStatus).length == 0) return;
    this._hideButtons();
    this._showButtonsByStatus();
  }

  _showButtonsByStatus() {
    if (this.candidateStatus.status == 'selected') { this._showSupportBtn(); }
    if (this.candidateStatus.status == 'pressed') { this._showPressedBtn(); }
    if (this.candidateStatus.status == 'unselected') { this._showUnselectedBtns(); }
  }

  _hideButtons () {
    var unselectedBtns = this.shadowRoot.querySelector("#user-actions #unselectedButtons");
    var pressedBtn = this.shadowRoot.querySelector("#user-actions #pressedButton");
    var supportBtns = this.shadowRoot.querySelector("#user-actions #supportButtons");
    supportBtns.style.display = "none";
    unselectedBtns.style.display = "none";
    pressedBtn.style.display = "none";
  }

  _hidePressBtn () {
    var pressBtn = this.shadowRoot.querySelector("#user-actions #pressButton");
    var pressedBtn = this.shadowRoot.querySelector("#user-actions #pressedButton");
    var selectBtn = this.shadowRoot.querySelector("#user-actions #selectButton");
    var supportBtn = this.shadowRoot.querySelector("#user-actions #supportButtons");
    supportBtn.style.display = "none";
    pressBtn.style.display = "none";
    selectBtn.style.margin = "20px auto";
    selectBtn.style.width = "262px";
  }

  _showUnselectedBtns() {
    this.shadowRoot.querySelector("#user-actions #unselectedButtons").style.display = "flex";
    var selectBtn = this.shadowRoot.querySelector("#user-actions #unselectedButtons paper-button:first-child");
    var pressBtn = this.shadowRoot.querySelector("#user-actions #unselectedButtons paper-button:last-child");
    if (this.candidate && (this.candidate.score == "good" || this.candidate.score == "bad"))  {
      pressBtn.style.display = "none";
      selectBtn.style.display = "block";
      selectBtn.style.width = "262px";
    }
    else {
      pressBtn.style.display = "block";
      selectBtn.style.display = "block";
      selectBtn.style.marginLeft = "auto";
      selectBtn.style.marginRight = "5px";
      selectBtn.style.width = "128px";
      pressBtn.style.width = "128px";
    }
  }

  _showPressedBtn() {
    this.shadowRoot.querySelector("#user-actions #pressedButton").style.display = "flex";
    var pressedBtn = this.shadowRoot.querySelector("#user-actions #pressedButton paper-button");
    pressedBtn.style.display = "block";
    pressedBtn.style.width = "262px";
  }

  _showSupportBtn() {
    var pressBtn = this.shadowRoot.querySelector("#user-actions #pressButton");
    var selectBtn = this.shadowRoot.querySelector("#user-actions #selectButton");
    var supportBtns = this.shadowRoot.querySelector("#user-actions #supportButtons");
    var crowdButton = this.shadowRoot.querySelector("#user-actions #supportButtons paper-button:last-child");
    crowdButton.style.display = "block";
    if (this._invalidSocialMediaUrl("crowdfunding_url")) {
      crowdButton.style.display = "none";
    }
    supportBtns.style.display = "flex";
    supportBtns.style.margin = "auto";
    supportBtns.style.width = "300px";
  }

  _setHeaderGradient(colors) {
    if(this.candidate) {
      var image = this._linearGradient(colors, "to bottom",
        `url(${this.candidate.image})`);
      this.updateStyles({ '--layer-image': `${image}`});
    }
  }

  _wrapSelectCandidate() {
    var user = this.getUser();
    if (!user || Object.keys(user).length == 0) {
      this.set("route.redirect_back", `/candidate/${this.data.key}/`);
      this.$.unauthorizedDialog.present();
    }
    else {
      this._selectCandidate().then((ajax) => {
        this._getCandidateStatistics();
      });
    }
  }

  _wrapPressCandidate() {
    var user = this.getUser();
    if (!user || Object.keys(user).length == 0) {
      this.set("route.redirect_back", `/candidate/${this.data.key}/`);
      this.$.unauthorizedDialog.present();
    }
    else {
    }
    this._pressCandidate().then((ajax) => {
      this._getCandidateStatistics();
      this._shareCandidate(true);
    });
  }

  _wrapUnselectCandidate() {
    this._unselectCandidate().then((ajax) => {
      this._getCandidateStatistics();
    });
  }

  _closeModal() { this.$.candidateShareDialog.dismiss(); }
  _dismissUnauthorizedModal() { this.$.unauthorizedDialog.dismiss(); }
}

window.customElements.define(CandidatePage.is, CandidatePage);
