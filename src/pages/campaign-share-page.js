import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/iron-form/iron-form.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../polymerfire/firebase-document.js';
import '../../../@polymer/app-media/app-media.js';
import '../../../@polymer/app-media/app-media-recorder.js';
import '../../../@polymer/app-layout/app-header-layout/app-header-layout.js';
import '../../../@polymer/paper-spinner/paper-spinner.js';
import '../../../share-menu/share-menu.js';
import '../app-elements/app-form-header.js';
import '../app-elements/app-scrollable-dialog.js';
import '../mission-elements/mission-receipt.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class CampaignSharePage extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
        --app-form-header-background: #fff;
        --app-form-header-color: #000;
        background: var(--secondary-background-color);
        height: 100vh;
      }

      app-form-header {
        color: var(--default-primary-color);
        background: var(--accent-color);
        --app-form-header-background: var(--accent-color);
        --app-form-header-color: var(--default-primary-color);
        @apply --default-font-medium;
      }

      .fill iron-icon {
        width: 150px;
        height: 150px;
        transform: rotate(-45deg);
        background: var(--accent-color);
        color: white;
        border-radius: 50%;
        display: block;
        margin: 50px auto;
      }

      .fill p {
        max-width: 300px;
        text-align: center;
        margin: -30px auto;
        font-size: 1.4rem;
      }

      .fill .share {
        margin: 60px auto;
        text-align: center;
        font-size: 0.8rem;
        color: var(--secondary-text-color);
      }
      .options {
        text-align: center;
      }
      paper-icon-button {
        color: white;
        border-radius: 50%;
        margin: 2px;
      }
      [name="whatsapp"] {
        background: #50ae55;
      }
      [name="facebook"] {
        background: #3d5c98;
      }
      [name="twitter"] {
        background: #2daae1;
      }
      [name="telegram"] {
        background: #32b2e2;
      }
      [name="clipboard"] {
        background: var(--secondary-text-color);
      }
    </style>

    <app-route route="{{route}}" pattern="/campaign-share/:key" data="{{routeData}}">
    </app-route>

    <firebase-document id="document" path="/campaigns/{{routeData.key}}/content" data="{{campaign}}">
    </firebase-document>

    <app-header-layout has-scrolling-region="">
      <app-form-header shadow="" slot="header">
        <paper-icon-button slot="arrow-back" icon="app:arrow-back" on-tap="_returnToInbox"></paper-icon-button>
        <span slot="main-title">Compartilhar campanha</span>
        <paper-icon-button slot="more-vert" icon="app:more-vert"></paper-icon-button>
      </app-form-header>

      <div class="fill">
        <iron-icon icon="app:link"></iron-icon>
        <p>Compartilhe o link dessa campanha com seus amigos!</p>
        <div class="share">{{share}}</div>
        <div class="options">
          <paper-icon-button name="twitter" icon="app:twitter" on-tap="_share"></paper-icon-button>
          <paper-icon-button name="facebook" icon="app:facebook" on-tap="_share"></paper-icon-button>
          <paper-icon-button name="whatsapp" icon="app:whatsapp" on-tap="_share"></paper-icon-button>
          <paper-icon-button name="telegram" icon="app:telegram" on-tap="_share"></paper-icon-button>
          <paper-icon-button name="clipboard" icon="app:clipboard" on-tap="_share"></paper-icon-button>
        </div>
      </div>
      
      <share-menu id="shareMenu" title="{{campaign.name}}" text="{{campaign.description}}" url="{{share}}">
      </share-menu>

      </app-header-layout>
`;
  }

  static get is() { return 'campaign-share-page'; }

  static get properties() {
    return {
      share: {
        type: String,
      },
      user: {
        type: Object,
      },
      selected: {
        observer: '_selectedChanged'
      },
      routeData: Object,
    }
  }
  static get observers() {
    return ['_computeShare(routeData.key, user)'];
  }

  constructor() {
    super();
  }

  _selectedChanged(selected) {
   if (!selected) {
   }
 }

  _returnToInbox() {
    this.set('route.path', `/show-campaign/${this.routeData.key}`);
  }

  _computeShare(path, user) {
    if (!user || !path) return;
    this.share = `${location.origin}/c/${this.routeData.key}?s=clipboard&u=${user.uid}`;
  }

  _share(e) {
    const service = e.target.getAttribute('name');
    this.share = `${location.origin}/c/${this.routeData.key}?s=${service}&u=${this.user.uid}`;
    this.$.shareMenu.enabledServices = [ service ];
    document.body.appendChild(this.$.shareMenu);
    if(navigator.share) {
      this.$.shareMenu.share();
    } else {
      this.$.shareMenu.shadowRoot.querySelector(`#${service}`).click();
    }
  }
}
customElements.define(CampaignSharePage.is, CampaignSharePage);
