import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '../pages/login-page.js';
import '../pages/inbox-page.js';
import '../pages/profile-page.js';
import '../pages/mission-page.js';
import '../pages/show-mission-page.js';
import '../pages/mission-receipts-page.js';
import '../pages/not-found-page.js';
import './app-icons.js';
import './app-theme.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

class AppShell extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }

      [hidden] {
        display: none !important;
      }

      app-drawer-layout:-webkit-full-screen-ancestor app-header,
      app-header-layout:-webkit-full-screen-ancestor app-header,
      app-drawer-layout:-webkit-full-screen-ancestor app-drawer {
        z-index: -1 !important;
      }

      app-drawer:not([persistent]) {
        --app-drawer-width: 90%;
      }

      app-drawer[persistent] {
        --app-drawer-width: 256px;
      }

      app-toolbar {
        background-color: #009fe3;
        height: 180px;
      }

      app-toolbar > div[top-item] {
        margin-left: 15px;
        margin-top: 15px;
      }

      div[top-item] > paper-icon-button {
        --paper-icon-button-ink-color: #312783;
        padding: 5px;
      }

      app-toolbar > iron-image {
        height: 80px;
        width: 80px;
        min-width: 80px;
        min-height: 80px;
        margin-top: 20px;
        margin-left: 4px;
        border: 2px solid white;
        border-radius: 50%;
        background: var(--secondary-text-color);
      }

      app-toolbar > div[main-title] {
        margin-top: 20px;
        margin-left: 10px;
        width: 60%;
      }

      div[main-title] > .username {
        color: white;
        max-width: 100%;
        font-family: Folio;
        font-size: 24px;
        line-height: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      div[main-title] > .email {
        color: #312783;
        max-width: 100%;
        margin-top: 20px;
        font-family: Folio;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 16px;
      }

      app-toolbar > div[bottom-item] {
        margin: 10px 0 15px 30px;
        opacity: 0.5;
        color: white;
        font-family: Folio;
        font-size: 14px;
        line-height: 16px;
        cursor: pointer;
      }

      div[bottom-item] > a {
        color: white;
        text-decoration: none;
      }

      .drawer-list {
        display: block;
        height: calc(100% - 180px);
        background: white;
      }

      .drawer-list a {
        display: block;
        margin-top: 30px;
        padding: 0 16px;
        text-transform: uppercase;
        text-decoration: none;
        color: #e6007e;
        font-family: Folio;
        font-size: 24px;
        line-height: 26px;
      }

      .drawer-list a[disabled] {
        color: #b7b8b7;
        margin-left: 5px;
      }

      .drawer-list a.drawer-item {
        color: #312783;
        margin-left: 5px;
      }

      .drawer-list a .drawer-item-block {
        color: white;
        background-color: #e7007e;
        padding: 7px 10px;
        margin-left: 5px;
      }

      .drawer-list hr {
        margin-left: 20px;
        margin-right: 20px;
        border: 1px solid #b7b8b7;
        opacity: 0.3;
      }
    </style>

    <app-location route="{{route}}"></app-location>
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}">
    </app-route>

    <app-drawer-layout fullbleed="" narrow="{{narrow}}">
      <!-- Drawer content -->
      <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
        <app-toolbar class="tall">
          <div top-item="" hidden$="[[!narrow]]">
            <paper-icon-button icon="app:menu" drawer-toggle></paper-icon-button>
          </div>
          <iron-image src="{{user.photoURL}}" sizing="cover" hidden$="[[!user.uid]]"></iron-image>
          <iron-image src="/images/default_avatar.png" sizing="cover" hidden$="[[user.uid]]"></iron-image>
          <div main-title>
            <div class="username" hidden$="[[!user.uid]]">
              {{user.displayName}}
            </div>
            <div class="username" hidden$="[[user.uid]]">
              Visitante
            </div>
            <div class="email" hidden$="[[!user.uid]]">
              {{user.email}}
            </div>
          </div>
          <div bottom-item="" on-tap="signOut" hidden$="[[!user.uid]]">
            fazer logout
          </div>
          <div bottom-item="" on-tap="" hidden$="[[user.uid]]">
            <a href="login">fazer login</a>
          </div>
        </app-toolbar>
        <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
          <a name="inbox" href="inbox" hidden$="[[!user.uid]]">
            <paper-icon-button icon="app:navMissions" drawer-toggle></paper-icon-button>
            Missões
          </a>
          <a name="profile" href="profile" hidden$="[[!user.uid]]">
            <paper-icon-button icon="app:profile" drawer-toggle></paper-icon-button>
            Perfil
          </a>
          <a name="notifications" href="" hidden$="[[!user.uid]]">
            <paper-icon-button icon="app:navNotifications" drawer-toggle></paper-icon-button>
            Notificações
          </a>
          <hr hidden$="[[!user.uid]]">
          <a name="rules" href="" disabled>
            Regras
          </a>
          <a name="back" class="drawer-item" href="http://www.unidoscontraacorrupcao.org.br" target="_blank">
            Voltar às novas medidas
          </a>
          <a name="sign_it" href="http://www.unidoscontraacorrupcao.org.br/#assine">
            <span class="drawer-item-block">
              Assine
            </span>
          </a>
          <a name="rules" class="drawer-item" href="">
            Divulgue
          </a>
          <hr>
        </iron-selector>
      </app-drawer>

      <!-- Main content -->
      <iron-pages id="pages" selected="[[page]]" attr-for-selected="name" fallback-selection="not-found" on-selected-item-changed="_selectedPageChanged" role="main">
          <profile-page name="profile" route="{{route}}" user="{{user}}"></profile-page>
          <inbox-page name="inbox" route="{{route}}" user="{{user}}" on-open-drawer="_openDrawer"></inbox-page>
          <mission-page name="mission" user="{{user}}" route="{{route}}"></mission-page>
          <show-mission-page name="show-mission" user="[[user]]" route-data="{{routeData}}" route="{{route}}"></show-mission-page>
          <mission-receipts-page name="mission-receipts" route-data="{{routeData}}" route="{{route}}" user="{{user}}"></mission-receipts-page>
          <mission-accepted-page name="mission-accepted" route-data="{{routeData}}" route="{{route}}"></mission-accepted-page>
          <mission-finished-page name="mission-finished" route-data="{{routeData}}" route="{{route}}"></mission-finished-page>
          <not-found-page name="not-found"></not-found-page>
          <login-page name="login" id="login" user="{{user}}" route="{{route}}">
        </login-page>
      </iron-pages>
    </app-drawer-layout>
`;
  }

  static get is() { return 'app-shell'; }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged',
      },
      routeData: {
        type: Object,
        value: function() { return {}; }
      },
      subroute: Object,
      route: Object,
      user: {
        type: Object,
        observer: "_userChanged",
        value: function() {return JSON.parse(sessionStorage.getItem("user"));}
      }
    }
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)',
    ];
  }

  _routePageChanged(page) {
    // If no page was found in the route data, page will be an empty string.
    // Default to 'inbox' in that case.
    this.page = page || 'inbox';
    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Load page import on demand. Show 404 page if fails
    import(`../pages/${page}-page.js`).catch((reason) => {
      console.log("MyView1 failed to load", reason);
    });
  }

  _selectedPageChanged(e) {
    const pages = this.$.pages.items;
    pages.forEach((p) => { p.selected = p === e.detail.value; });
  }

  _showPage404() {
    this.page = 'not-found';
  }

  _openDrawer(e) {
    this.$.drawer.open();
  }

  _userChanged(e) {
    if(this.valid_user()) {
      sessionStorage.setItem("user", JSON.stringify(this.user));
      this.set('route.path', '/');
    } else {
      console.log("[Shell] Cleaning Session");
      sessionStorage.setItem("user", JSON.stringify({}));
      this.set('route.path', '/login');
    }
  }

  valid_user() {
    return this.user != undefined
      && this.user != null
      && "key" in this.user
      && "uid" in this.user
      && "email" in this.user
      && "photoURL" in this.user
      && "displayName" in this.user
      && "isAdmin" in this.user;
  }

  signOut(e) {
    this.$.login.signOut();
  }

  gotoProfile(e) {
    this.set('route.path', '/profile');
  }
}

window.customElements.define(AppShell.is, AppShell);
