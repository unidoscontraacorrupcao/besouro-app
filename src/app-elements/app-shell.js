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

      app-drawer-layout:-webkit-full-screen-ancestor app-header,
      app-header-layout:-webkit-full-screen-ancestor app-header,
      app-drawer-layout:-webkit-full-screen-ancestor app-drawer {
        z-index: -1 !important;
      }

      app-toolbar.tall {
        background: var(--accent-color);
        height: 148px;
      }

      .tall iron-image {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        background: var(--secondary-text-color);
      }

      .tall .username,
      .tall .email {
        color: var(--light-text-color);
        font-size: 0.6em;
        line-height: 1;
        font-weight: 100;
      }
      .tall .username {
        font-size: 0.8em;
        font-weight: 400;
      }
      .tall [bottom-item] {
        padding: 10px;
      }
      .tall [bottom-item] paper-icon-button {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: var(--light-text-color);
      }

      .drawer-list {
        padding: 20px 0;
        display: block;
        height: calc(100% - 185px);
        background: white;
      }
      .drawer-list a {
        display: block;
        padding: 0 16px;
        text-decoration: none;
        color: var(--primary-text-color);
        line-height: 40px;
      }
      .drawer-list a.iron-selected {
        color: black;
        font-weight: bold;
      }
      @media screen and (min-width: 961px) {
        app-drawer {
          top: -70px;
          left: unset;
          --app-drawer-content-container: {
            background: transparent;
          };
        }
      }
    </style>

    <app-location route="{{route}}"></app-location>

    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}">
    </app-route>

    <app-drawer-layout fullbleed="" narrow="{{narrow}}">
      <!-- Drawer content -->
      <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
        <app-toolbar class="tall">
          <div bottom-item="" on-tap="gotoProfile">
            <iron-image src="{{user.photoURL}}" sizing="cover">
            </iron-image>
            <div class="username">
              {{user.displayName}}
            </div>
            <div class="email">
              {{user.email}}
            </div>
            <paper-icon-button icon="app:expand-more"></paper-icon-button>
          </div>
        </app-toolbar>
        <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
          <a name="inbox" href="inbox">Caixa de Entrada</a>
          <hr>
          <a name="login" href="login" on-tap="signOut">Sair</a>
        </iron-selector>
      </app-drawer>

      <!-- Main content -->
      <iron-pages id="pages" selected="[[page]]" attr-for-selected="name" fallback-selection="not-found" on-selected-item-changed="_selectedPageChanged" role="main">
          <profile-page name="profile" route="{{route}}" user="{{user}}"></profile-page>
          <inbox-page name="inbox" route="{{route}}" user="{{user}}" on-open-drawer="_openDrawer"></inbox-page>
          <mission-page name="mission" user="{{user}}" route="{{route}}"></mission-page>
          <show-mission-page name="show-mission" user="[[user]]" route-data="{{routeData}}" route="{{route}}"></show-mission-page>
          <mission-receipts-page name="mission-receipts" route-data="{{routeData}}" route="{{route}}"></mission-receipts-page>
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
        value: function () { return { uid: "1" } }
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
    console.log(`../pages/${page}-page.js`);
    console.log(this.route);
    import(`../pages/${page}-page.js`).then((MyView1) => {
      console.log("MyView1 loaded");
    }).catch((reason) => {
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

  signOut(e) {
    this.$.login.signOut();
  }

  gotoProfile(e) {
    this.set('route.path', '/profile');
  }
}

window.customElements.define(AppShell.is, AppShell);
