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
import '@polymer/paper-toast/paper-toast.js';

import '../app-elements/app-besouro-api.js';
import "share-menu/share-menu.js";
import './app-actions.js';
import './app-besouro-api.js';
import '../pages/login-page.js';
import '../pages/inbox-page.js';
import '../pages/profile-page.js';
import '../pages/mission-page.js';
import '../pages/show-mission-page.js';
import '../pages/not-found-page.js';
import '../pages/privacy-page.js';
import '../pages/notifications-page.js';
import '../pages/settings-page.js';
import '../pages/help-page.js';
import '../pages/reset-password-page.js';
import '../pages/candidates-page.js';
import './app-icons.js';
import './app-theme.js';
//import messaging from '../../firebase.js'
import {CommonBehaviorsMixin} from '../mixin-elements/common-behaviors-mixin.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

class AppShell extends CommonBehaviorsMixin(PolymerElement) {
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
        --app-drawer-width: 80%;
      }

      app-drawer[persistent] {
        --app-drawer-width: 256px;
        z-index: 0;
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
        color: white;
        font-family: Folio;
        font-size: 16px;
        line-height: 16px;
        cursor: pointer;
      }

      div[bottom-item] > a {
        color: #312783;
        text-decoration: none;
      }

      .drawer-list {
        display: block;
        height: calc(100% - 180px);
        background: white;
        overflow: scroll;
      }

      .drawer-list a {
        display: block;
        margin-top: 25px;
        padding: 0 16px;
        text-transform: uppercase;
        text-decoration: none;
        color: #e6007e;
        font-family: Folio;
        font-size: 24px;
        line-height: 26px;
      }

      .drawer-list a[name="sign_it"],
      .drawer-list a[name="rules"] {
        margin-top: 30px;
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

    <app-besouro-api id="api"></app-besouro-api>
    <app-location route="{{route}}"></app-location>
    <app-route
      route="{{route}}"
      pattern="/:page"
      data="{{routeData}}"
      tail="{{subroute}}"></app-route>

    <share-menu id="shareMenu" dialog-title="Divulgue esta causa!" title="Conheça as Novas Medidas Contra a Corrupção e faça parte da maior união anticorrupção que o país já viu #UnidosContraaCorrupção" url="http://www.unidoscontraacorrupcao.org.br/" enabled-services='["telegram", "whatsapp"]'></share-menu>

    <app-dialog id="unauthorizedDialog">
      <unauthorized-modal on-close-modal="_dismissUnauthorizedModal" on-go-to-register="_goToRegister"></unauthorized-modal>
    </app-dialog>

    <app-drawer-layout fullbleed narrow="{{narrow}}">
      <!-- Drawer content -->
      <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
        <app-toolbar class="tall">
          <iron-image src="{{user.photoURL}}" sizing="cover" hidden$="[[!user.uid]]"></iron-image>
      <iron-image src="/images/generic/avatar_default-menu.png" sizing="cover" hidden$="[[user.uid]]"></iron-image>
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
          <div bottom-item on-tap="_signOut" hidden$="[[!user.uid]]">
            <a>fazer logout</a>
          </div>
          <div bottom-item hidden$="[[user.uid]]">
            <a href="/login">fazer login</a>
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
          <!-- <a name="notifications" href="" hidden$="[[!user.uid]]">
            <paper-icon-button icon="app:navNotifications" drawer-toggle></paper-icon-button>
            Notificações
          </a> -->
          <hr hidden$="[[!user.uid]]">
          <a name="rules" on-tap="_redirectToHelp" disabled>
            Ajuda
          </a>
          <a name="privacy" on-tap="_redirectToPrivacy" disabled>
            Privacidade
          </a>
          <a name="back" class="drawer-item" href="http://www.unidoscontraacorrupcao.org.br" target="_blank">
            Voltar às novas medidas
          </a>
          <a name="sign_it" href="http://www.unidoscontraacorrupcao.org.br/#assine" target="_blank">
            <span class="drawer-item-block">
              Assine
            </span>
          </a>
          <a name="rules" class="drawer-item" on-tap="_shareLink">
            Divulgue
          </a>
          <hr>
        </iron-selector>
      </app-drawer>

      <!-- Main content -->
      <iron-pages id="pages"
        selected="[[page]]"
        attr-for-selected="name"
        fallback-selection="not-found" on-selected-item-changed="_selectedPageChanged"
        role="main">
          <inbox-page name="inbox" route="{{route}}" user="{{user}}" on-open-drawer="_openDrawer"></inbox-page>
          <candidates-page name="candidates" route="{{route}}" user="{{user}}" on-open-drawer="_openDrawer"></candidates-page>
          <mission-page name="mission" user="{{user}}" route="{{route}}"></mission-page>
          <show-mission-page name="show-mission" user="[[user]]" route-data="{{routeData}}" route="{{route}}"></show-mission-page>
          <mission-receipts-page name="mission-receipts" route-data="{{routeData}}" route="{{route}}" user="{{user}}"></mission-receipts-page>
          <mission-accepted-page name="mission-accepted" route-data="{{routeData}}" route="{{route}}"></mission-accepted-page>
          <mission-finished-page name="mission-finished" route-data="{{routeData}}" route="{{route}}"></mission-finished-page>
          <notifications-page name="notifications" route="{{route}}" user="{{user}}"></notifications-page>
          <settings-page name="settings" route="{{route}}" user="{{user}}"></settings-page>
          <privacy-page name="privacy" route="{{route}}" user="{{user}}"></privacy-page>
          <help-page name="help" route="{{route}}"></help-page>
          <reset-password-page name="reset-password" route="{{route}}"></reset-password-page>
          <not-found-page name="not-found"></not-found-page>
          <login-page id="login"
            name="login"
            on-user-update="_onUserUpdate"
            on-complete="_onLoginComplete"
            on-logout-complete="_onLogoutComplete">
          </login-page>
          <profile-page id="profile"
            name="profile"
            route="{{route}}"
            on-request-user="_onRequestUser"
            on-user-update="_onUserUpdate"
            on-access-denial="_onProfileAccessDenial"
            on-to-inbox-pressed="_goToInbox"
            on-back-pressed="_goToHome"></profile-page>
      </iron-pages>
      <template is="dom-if" if="{{canShowBottomBar}}">
        <app-actions
          on-go-to-inbox="_goToInbox"
          on-go-to-notifications="_goToNotifications"
          on-go-to-candidates="_goToCandidates"
          unread={{unread}}>
        </app-actions>
      </template>
    </app-drawer-layout>
    <script src="/node_modules/web-animations-js/web-animations-next-lite.min.js"></script>
`;
  }

  static get is() {
    return "app-shell";
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: "_pageChanged"
      },
      routeData: {
        type: Object,
        value: function() {
          return {};
        }
      },
      subroute: Object,
      route: {
        type: Object
      },
      user: Object,
      _afterLogin: String,
      canShowBottomBar: Boolean,
      noBottomBarList: {
        type: Array,
        value: ['privacy', 'help', 'not-found', 'login', 'reset-password']
      },
      unread: Number
    };
  }

  static get observers() { return ["_routePageChanged(routeData.page)", "routePathChanged(route.path)"]; }

  constructor() {
    super();
    this._afterLogin = `/`;
    this.user = this.getUser();
  }

  _routePageChanged(page) {
    // If no page was found in the route data, page will be an empty string.
    // Default to 'inbox' in that case.
    this.page = page || "candidates";
    this.canShowBottomBar = !this.noBottomBarList.includes(this.page);
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }

    var exception_pages = ["login", "reset-password"];
    if (!exception_pages.includes(this.page)) {
      this._checkToken().then((ajax) => {
        if (ajax.response.expired) {
          this.resetUser();
          this.set('route.path', '/login');
        } else {
          this._getUserNotifications(page);
        }
      });
    }
  }

  routePathChanged(path) {
    if(path === '' || path === '/') this.set('route.path', '/candidates');
  }

  _pageChanged(page) {
    // Load page import on demand. Show 404 page if fails
    import(`../pages/${page}-page.js`).catch(reason => {
      console.log(`"${page} failed to load"`, reason);
    });
  }

  _selectedPageChanged(e) {
    const pages = this.$.pages.items;
    pages.forEach(p => {
      p.selected = p === e.detail.value;
    });
  }

  _showPage404() {
    this.page = "not-found";
  }

  _openDrawer(e) {
    this.$.drawer.open();
  }

  gotoProfile(e) {
    this.set("route.path", "/profile");
  }

  _goToInbox() {
    this.set(`route.path`, `/inbox`);
  }

  _goToHome() {
    this.set(`route.path`, `/`);
  }

  _redirectToPrivacy() {
    this.set("route.path", "/privacy");
  }

  _redirectToHelp() {
    this.set("route.path", "/help");
  }

  _goToRegister() {
    this.set('route.path', '/login');
    this._dismissUnauthorizedModal();
  }

  _goToNotifications() {
    if(!this.user || Object.keys(this.user).length == 0) {
      this.$.unauthorizedDialog.present();
    } else {
      this.set("route.path", "/notifications");
    }
  }

  _goToCandidates() {
    this.set("route.path", "/candidates");
  }

  _dismissUnauthorizedModal() { this.$.unauthorizedDialog.dismiss(); }

  // User

  _onRequestUser(e) {
    this.$[e.target.id].storedUser(this.user);
  }

  _onUserUpdate(e, user) {
    if (user.key != 0) {
      this.saveUser(user);
    } else {
      this.saveUser({});
    }
    this.user = this.getUser();
  }

  // Login

  _signOut(e) {
    this.$.login.signOut(this.user.key);
  }

  _onLoginComplete(e) {
    this.set("route.path", this._afterLogin);
    this._afterLogin = `/`;
  }

  _onLogoutComplete(e) {
    //this reload is necessary because facebook api is returning an
    //invalid access token, when the user login with facebook, logout, and
    //try to login with facebook again.
    location.reload();
    this.set("route.path", `/`);
  }

  _getUserNotifications(page) {
    if(!this.user) return;
    if(page === "" || page === "inbox" || page === "show-mission" || page === "profile" || page === "notifications" || page === "candidates") {
      this.$.api.method = "GET";
      this.$.api.path = `notifications/user/${this.user.uid}/unread`;
      this.$.api.request().then((ajax) => {
        this.unread = ajax.response.length;
      }, (error) => {
      });
    }
  }

  //Get token for push notification
  _setUserToken(token, user) {
    if(/Version\/(.*)Safari/.test(navigator.userAgent)) return;
    if(!user || !this.user || Object.keys(this.user).length == 0) return;
    messaging.getToken().then((currentToken) => {
      if (currentToken) {
        return Promise.resolve(currentToken);
      } else {
        // Need to request permissions to show notifications.
        return messaging.requestPermission().then(function(result) {
          return messaging.getToken();
        });
      }
    }).then((currentToken) => {
      let apiBaseUrl = this.$.api.baseUrl;
      const data = {
        user_id: user.uid,
        registration_id: currentToken
      }
      this.$.api.authUrl = `${apiBaseUrl}/create-user-device/`;
      this.$.api.method = "POST";
      this.$.api.body = data;
      this.$.api.user = user;
      this.$.api.authRequest().then((ajax) => {
      }, (error) => {
        console.log('Failed to update token');
      });
    }).catch((err) =>{
      console.log('Notificações não habilitadas');
    });
  }

  // Profile

  _onProfileAccessDenial(e) {
    this._afterLogin = `/profile`;
    this.set(`route.path`, `/login`);
  }

  _shareLink(e) {
    const shareLinkNode = this.shadowRoot.querySelector("#shareMenu");
    const clonedNode = shareLinkNode.cloneNode(true);
    //TODO: make clonedNode a property, to be able to remove it later.
    shareLinkNode.addEventListener(
      "iron-overlay-closed",
      function() {
        document.body.removeChild(clonedNode);
      }.bind(this)
    );
    document.body.appendChild(clonedNode);
    clonedNode.share();
  }

  _checkToken() {
    var currentUser = this.getUser();
    if (currentUser && currentUser.key) {
      var base = this.$.api.baseUrl;
      this.$.api.authUrl = `${base}/check-token`;
      this.$.api.user = currentUser;
      this.$.api.method = "GET";
      return this.$.api.authRequest();
    }
    return new Promise((resolve, reject) => {
      resolve({"response": {"expired": false}});
    })
  }
}

window.customElements.define(AppShell.is, AppShell);
