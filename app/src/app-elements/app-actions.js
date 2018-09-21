import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-badge/paper-badge.js';
import './shared-styles.js';
import './app-icons.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { NeonAnimatableBehavior } from '@polymer/neon-animation/neon-animatable-behavior.js';
class AppActions extends mixinBehaviors(
  [NeonAnimatableBehavior],
  PolymerElement
) {
  static get template() {
    return html`
  <style>
      :host {
        display: block;
      }

      #app-actions {
        position: fixed;
        bottom: 0;
        background: white;
        width: calc(100% - 256px);
        box-shadow: 0 -5px 5px -5px #cccccc;
        z-index: 1000;
      }

      #app-actions span {
        text-transform: uppercase;
        color: var(--light-text-color);
        font-family: Folio;
        font-size: 14px;
      }

      #app-actions #actions-content {
        width: 80%;
        display: flex;
        text-align: center;
        padding-bottom: 5px;
        padding-top: 5px;
        margin: auto;
      }

      #app-actions #actions-content > * {flex-grow: 1;}

      .icon-container {
        display: flex;
        flex-direction: column;
      }

      .icon-container span { margin-top: -6px; }

      .icon-container > * {
        margin: auto;
      }

      #new-mission-btn {
        margin-top: 20px;
        width: 40px;
        height: 40px;
        background-color: var(--accent-color);
        border-radius: 50%;
        margin: 8px auto;
      }

      paper-icon-button {
        width: 40px;
        height: 40px;
        color: white;
      }

      paper-badge {
        --paper-badge: {
          width: 15px;
          height: 15px;
          margin-left: -15px;
          margin-top: 20px;
          font-weight: 800;
        }
      }

    #candidates-btn paper-icon-button {
        width: 50px;
    }

    @media only screen and (max-width: 640px) {
        #app-actions { width: 100%; }
        #actions-content {
          width: 90%;
          margin: auto;
      }
    }

    @media only screen and (min-width: 640px) {
      #app-actions { display: none; }
    }
  </style>
    <div id="app-actions">
      <div id="actions-content">
        <div id="missions-btn">
          <div class="icon-container">
            <paper-icon-button
              icon="app:navMissions"
              data-item="inbox"
              on-click="_goToDataItem">
            </paper-icon-button>
            <span>missões</span>
          </div>
        </div>
        <div id="candidates-btn">
          <div class="icon-container">
            <paper-icon-button
              on-click="_goToDataItem"
              data-item="candidates"
              icon="app:candidates">
            </paper-icon-button>
            <span>candidatos</span>
          </div>
        </div>
        <div id="notifications-btn">
          <div class="icon-container">
            <paper-icon-button
              id="btn-notifications"
              icon="app:navNotifications"
              data-item="notifications"
              on-click="_goToDataItem">
            </paper-icon-button>
            <template is="dom-if" if="{{unread}}">
              <paper-badge
                for="btn-notifications"
                label="{{unread}}">
              </paper-badge>
            </template>
            <span>notificações</span>
          </div>
        </div>
      </div>
    </div>
`;
  }

  static get is() {
    return "app-actions";
  }
  static get properties() {
    return {
      // collapsed reflects the header state
      collapsed: {
        type: Boolean,
        observer: "_setcollapsedStyle"
      },
      icon: String,
      selected: {
        type: String,
        notify: true,
        observer: "_hideActions"
      },
      unread: Number
    };
  }

  _goToDataItem(e) {
    var target = e.target.dataset.item;
    this.dispatchEvent(new CustomEvent(`go-to-${target}`))
  }
}
customElements.define(AppActions.is, AppActions);
