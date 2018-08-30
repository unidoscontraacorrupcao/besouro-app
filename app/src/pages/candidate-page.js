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
import {MissionMixin} from '../mixin-elements/mission-mixin.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { resolveCss } from '@polymer/polymer/lib/utils/resolve-url';
class CandidatePage extends MissionMixin(CommonBehaviorsMixin(PolymerElement)) {
  static get template() {
    return html`
    <style include="shared-styles"></style>
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
        color: var(--light-text-color);
        /* https://bugs.chromium.org/p/chromium/issues/detail?id=637072 */
        --app-header-background-front-layer: {
          background-image: var(--layer-image);
          background-position: center;
          background-size: 125%;
          background-color: grey;
          filter: contrast(.7) brightness(.6);
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


      #share-mission {
        position: absolute;
        right: 0;
        bottom: -20px;
        margin-right: 10px;
      }

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

      .dark { color: black; }

      .timing {
        font-size: 19px;
      }

      .timing paper-icon-button { top: -16px; }
      .timing span { top: -12px; }
      .timing paper-icon-button, .timing span { position: absolute; }

      .timing paper-icon-button {
        bottom: 0;
        left: 0;
        right: 0;
        padding: 6px;
      }

      .timing span {
        left: 30px;
        color: white;
        font-family: opensans-bold;
        font-size: 14px;
      }

      .progress {
        position: absolute;
        top: 0; bottom: 0;
        left: 0; right: 0;
      }

      .progress paper-progress { width: 100%; }

      .progress .spinner {
        height: 125px;
        text-align: center;
        padding-top: 97px;
      }

      .content { padding: 20px 20px; }

      .content p,
      .content h2 { margin: 10px 0; }

      .comment {margin-bottom: 106px;}
      .comment .message { display: flex; }

      .comment .message paper-textarea { flex: 1; }

      .comment .message paper-button { margin: auto 5px 5px; }

      .hide[disabled] { opacity: 0.4; }

      .mission-author {
        display: flex;
        background-color: var(--primary-background-color);
        height: 70px;
        padding: 5px 0 5px 10px;
      }

      .author-photo { margin-top: 5px; }

      .author-photo iron-image {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        background-color: var(--dark-primary-color);
      }

      .author-name {
        margin-left: 10px;
        margin-top: 16px;
        flex-grow: 1;
        font-family: Folio;
        font-size: 1.3em;
      }

      #author {
        display: block;
        margin-top: -10px;
      }

      .share-mission, .stats {
        background-color: #f1f1f1;
      }

      .share-mission { height: 50px; }

      .share-mission .share-mission-content {
        width: 90%;
        margin: auto;
        font-size: 1em;
        display: flex;
      }

      .share-mission .share-mission-content h3 {
        display: inline-block;
        margin: 0;
        flex-grow: 2;
        padding-top: 8px;
      }

      #share-btn { margin: 10px 25px 0 0; }
      #share-btn paper-icon-button { color: var(--dark-primary-color); }

      .stats {
        color: var(--light-text-color);
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
        display: flex;
        height: 30px;
      }

      .stats-content div {
        margin-right: 5px;
        display: inline;
        flex-grow: 1;
      }

      #action {
        text-align: center;
        margin-top: 10px;
        margin-bottom: 10px;
      }

      #action paper-button {
        border-top-left-radius: 27px;
        border-bottom-left-radius: 27px;
        border-top-right-radius: 27px;
        border-bottom-right-radius: 27px;
      }

      .btn-realized-mission { background-color: #C1C6CA; }

      .btn-started-mission { background: linear-gradient(to left, #79BE38, #92D242); }

      .btn-new-mission { background: linear-gradient(to left, var(--light-accent-color), var(--accent-color)); }

      .btn-text-mission {
        color: #ffffff;
        text-transform: initial;
        font-size: 0.8em;
      }

      #action iron-icon {
        color: #ffffff;
        margin-right: 5px;
      }

      paper-item {
        margin-right: 30px;
        margin-left: 10px;
      }

      .comments {
        background-color: var(--primary-background-color);
        padding: 10px 0px 60px 0px;
      }
      .comments h2 { margin-bottom: 20px; }

      .card-action {
        width: 75%;
        max-width: 400px;
        height: 80px;
        margin: auto;
        text-align: center;
        margin-top: 70px;
        margin-bottom: 70px;
      }

      .card-action a { text-decoration: none; }
      .card-action span {
       font-family: Folio;
       text-transform: uppercase;
       font-size: 2em;
       color: white;
       margin: auto;
       letter-spacing: 3px;
      }

      .card-action div { padding-top: 15px; }

    #mission-finished, #mission-accepted, #mission-blocked {
      display: none;
      flex-direction: column;
    }

    #mission-finished span,
    #mission-finished paper-icon-button,
    #mission-blocked span,
    #mission-blocked  paper-icon-button {
      color: rgba(183,184,183,1);
    }

    #mission-accepted span { color: var(--accent-color); }
    #mission-accepted div:first-child {
      border-color: var(--accent-color);
      border-width: 1.5px;
      border-style: solid;
      padding: 10px 10px 10px 10px;
    }

    #mission-accepted div:nth-child(2) {
      display: block;
      font-size: 7px;
    }

    #mission-accepted div:nth-child(2) span { letter-spacing: 0; }
    #mission-accepted div:nth-child(2) a { text-decoration: underline; }

    #load-more-comments {
      width: 90%;
      margin: 52px auto 50px auto;
      text-align: center;
    }

    #load-more-comments span {
      font-family: Folio;
      font-size: 18px;
      text-transform: uppercase;
      color: var(--secondary-text-color);
    }

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

    <template is="dom-if" if="{{candidate}}">
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
      </div>
    </template>
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
      candidate: Object,
      candidateStatus: Object,
      key: String
    };
  }


  static get observers() {
    return [
      'routePathChanged(route.path)'
    ]
  }

  routePathChanged(path) {
    this._getCandidate();
    this._getCandidateStatistics();
  }

  _getCandidate() {
    var user = this.getUser();
    this.$.api.path = `candidates/${this.data.key}`;
    this.$.api.method = "GET";
    this.$.api.request().then((ajax) => {
      this.set("candidate", ajax.response)
      this._setLayerImage(this.candidate.image);
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

  ready() {
    super.ready();
  }

  _goToLogin() {
    this.$.unauthorizedDialog.dismiss();
    this.set("route.path", "/login");
  }
}

window.customElements.define(CandidatePage.is, CandidatePage);
