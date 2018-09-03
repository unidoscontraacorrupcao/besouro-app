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
      }

      .content h2 {
        font-size: 1.3em;
        font-family: Folio;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }

      .content p {
        font-size: 1.1em;
        color: rgba(51,51,51,1);
        font-family: helvetica-neue;
      }

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


      #social-medias {
        width: 85%;
        margin: auto;
        margin: 22px auto 12px auto;
      }

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

      h1[condensed-title] {
        font-family: Folio;
        text-transform: uppercase;
      }

      .content { padding: 20px 20px; }

      .content p,
      .content h2 { margin: 10px 0; }

      .hide[disabled] { opacity: 0.4; }

      #tse-data { margin-bottom: 150px; }

      #unselected {
        display: flex;
        width: 70%;
        margin: auto;
      }

      #unselected paper-button {
        flex-grow: 1;
        height: 64px;
        font-family: folio;
        text-align: center;
      }

      #unselected paper-button:first-child {
        border-color: var(--secondary-text-color);
        border-style: solid;
        border-width: 1px;
        color: var(--secondary-text-color);
      }

      #unselected paper-button:last-child {
        background-color: var(--secondary-text-color);
        color: white;
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

      .stats-columns {
        display: flex;
      }

      .stats-columns div { flex-grow: 1; }


      @media only screen and (max-width: 460px) {
        .stats-content { font-size: 1.0rem; }
      }

      @media only screen and (max-width: 390px) {
        .stats-content {
          font-size: 0.9rem;
        }
        .card-action { height: 65px;}
      }

      @media only screen and (max-width: 330px) {
        .card-action span { font-size: 1.5em };
      }
    </style>
    <app-besouro-api id="api"></app-besouro-api>
    <app-dialog id="unauthorizedDialog">
      <unauthorized-modal
        on-close-modal="_dismissUnauthorizedModal"
        on-go-to-register="_goToLogin">
      </unauthorized-modal>
    </app-dialog>

    <share-menu
      id="shareMenu"
      title="{{mission.title}}"
      text="{{stripHtmlTags(mission.description)}}"
      url="{{address}}/{{data.key}}?shared=true"
      enabled-services='["telegram", "whatsapp"]'>
    </share-menu>

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

            <h1 condensed-title class="dark title">{{mission.title}}</h1>
            <!-- <paper-icon-button icon="app:mission-edit"></paper-icon-button> -->
        </app-toolbar>

        <app-toolbar class="tall">
          <p bottom-item main-title="" class="title">
            {{mission.title}}
            <div bottom-item class="timing">

            <paper-icon-button
              icon="app:mission-timing">
            </paper-icon-button>
            <span>{{mission.remainig_days}}</span>
            </div>
          </p>
      <mission-player
        id="player"
        mission-image="{{missionImage}}"
        mission="{{mission}}"
        mission-key="{{data.key}}">
      </mission-player>

      <div class="actions">

        <paper-icon-button
          on-tap="_shareMission"
          id="share-mission"
          icon="app:share">
        </paper-icon-button>
      </div>
    </app-toolbar>
  </app-header>

  <div class="stats">
    <div class="stats-content">
      <div class="stats-columns">
        <div>
          <span>
            <span class="stats-number">{{candidateStatus.selected_count}} </span>
              selecionaram <span class="space">&nbsp;&verbar;&nbsp;</span>
            </span>
        </div>

        <div>
          <span>
            <span class="stats-number">{{candidateStatus.pressed_count}}</span>
            pressionaram <span class="space">&nbsp;&verbar;&nbsp;</span>
          </span>
        </div>

        <div>
          <span>
            <span class="stats-number">{{candidateStatus.fav_count}}</span>
            favoritaram</span>
        </div>
      </div>
    </div>
  </div>

      <div class="content">
        <h2>{{candidate.name}}</h2>
        <div id="unselected">
          <paper-button on-click="_selectCandidate">
            <div>
              <div id="btn-icon">
                <iron-icon icon="app:select-candidate"></iron-icon>
              </div>
              selecionar
            </div>
          </paper-button>
          <paper-button on-click="_pressCandidate">
            <div>
              <div id="btn-icon">
                <iron-icon icon="app:press-candidate"></iron-icon>
              </div>
              pressionar
            </div>
          </paper-button>
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
        observer: "_candidateChanged"
      },
      candidateStatus: Object,
      key: String
    };
  }

  static get observers() { return [ 'routePathChanged(route.path)' ] }

  routePathChanged(path) {
    this._getCandidate();
    this._getCandidateStatistics();
    this._setActionButton();
  }

  _setActionButton() {
    if (this.candidateStatus == "unselected") {
    }
  }

  _candidateChanged() {
      if(!this.candidate) return;
      this._chooseCandidateColor();
  }

  _getCandidate() {
    var user = this.getUser();
    this.$.api.path = `candidates/${this.data.key}`;
    this.$.api.method = "GET";
    this.$.api.request().then((ajax) => {
      this.set("candidate", ajax.response)
    });
  }

  _getCandidateStatistics() {
    var user = this.getUser();
    this.$.api.path = `candidates/${this.data.key}/status`;
    this.$.api.method = "GET";
    this.$.api.request().then((ajax) => {
      this.set("candidateStatus", ajax.response)
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
    this._showPressBtn();
    if (this.candidate.score == "good") {
      this._hidePressBtn();
      var colors = ["rgba(50,206,166,0.5)", "rgba(0,0,0,1)"];
      this._setHeaderGradient(colors);
    } else if (this.candidate.score == "bad") {
      this._hidePressBtn();
      var colors = ["rgba(230,0,0,0.5)", "rgba(0,0,0,1)"];
      this._setHeaderGradient(colors);
    } else {
      var colors = ["rgba(183,184,183,0.5)", "rgba(0,0,0,1)"];
      this._setHeaderGradient(colors);
    }
  }

  _hidePressBtn () {
    var pressBtn = this.shadowRoot.querySelector("paper-button:last-child");
    var selectBtn = this.shadowRoot.querySelector("paper-button:first-child");
    pressBtn.style.display = "none";
    selectBtn.style.margin = "20px auto";
    selectBtn.style.width = "262px";
  }

  _showPressBtn() {
    var selectBtn = this.shadowRoot.querySelector("#unselected paper-button:first-child");
    var pressBtn = this.shadowRoot.querySelector("#unselected paper-button:last-child");
    pressBtn.style.display = "block";
    selectBtn.style.marginLeft = "auto";
    selectBtn.style.marginRight = "5px";
    selectBtn.style.width = "128px";
    pressBtn.style.width = "128px";
  }

  _setHeaderGradient(colors) {
    if(this.candidate) {
      var image = this._linearGradient(colors, "to bottom",
        `url(${this.candidate.image})`);
      this.updateStyles({ '--layer-image': `${image}`});
    }
  }
}

window.customElements.define(CandidatePage.is, CandidatePage);
