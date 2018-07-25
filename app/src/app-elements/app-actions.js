import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-fab/paper-fab.js';
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
      #app-actions {
        position: fixed;
        bottom: 0;
        background: white;
        width: calc(100% - 256px);
        border-top-style: solid;
        border-top-color: #E7E7E7;
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

      #new-mission-btn paper-icon-button {
        width: 40px;
        color: white;
      }

      #app-actions #new-mission-btn paper-icon-button,
      #app-actions #missions-btn paper-icon-button,
      #app-actions #notifications-btn paper-icon-button,
      #app-actions #profile-btn paper-icon-button
      {
        display: block;
        padding: 3px;
      }

   @media only screen and (max-width: 640px) {
      #app-actions { width: 100%; }
      #actions-content {
        width: 90%;
        margin: auto;
    }
  }
  </style>
      <div id="app-actions">
        <div id="actions-content">
          <div id="missions-btn">
            <div class="icon-container">
              <paper-icon-button icon="app:navMissions" on-tap="_returnToInbox"></paper-icon-button>
              <span>missões</span>
            </div>
          </div>
          <!--
          <div>
            <div id="new-mission-btn" style="display: none">
              <paper-icon-button on-tap="_openMissionForm" icon="app:add"></paper-icon-button>
            </div>
          </div>
          -->
          <div id="notifications-btn">
            <div class="icon-container">
              <paper-icon-button icon="app:navNotifications" on-tap="_goToNotifications"></paper-icon-button>
              <span>notificações</span>
            </div>
          </div>
          <!-- <div id="profile-btn">
            <div class="icon-container">
              <paper-icon-button icon="app:profile" on-tap="_goToProfile"></paper-icon-button>
              <span>perfil</span>
            </div>
          </div> -->
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
      }
    };
  }

  _returnToInbox() {
    this.dispatchEvent(new CustomEvent("go-to-inbox"));
  }

  _goToProfile() {
    this.dispatchEvent(new CustomEvent("go-to-profile"));
  }

  _goToNotifications() {
    this.dispatchEvent(new CustomEvent("go-to-notifications"));
  }
}
customElements.define(AppActions.is, AppActions);
