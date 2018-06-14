import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/paper-fab/paper-fab.js';
import './shared-styles.js';
import './app-icons.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '../../../@polymer/polymer/lib/legacy/class.js';
import { NeonAnimatableBehavior } from '../../../@polymer/neon-animation/neon-animatable-behavior.js';
class AppActions extends mixinBehaviors([NeonAnimatableBehavior], PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
        --actions-height: 0;
      }
      .backdrop {
        position: fixed;
        left: 0; right: 0;
        top: 0; bottom: 0;
        background: black;
        transition: opacity ease .35s;
        opacity: 0;
      }
      .animatable {
        transition: all ease .35s;
      }
      .record-form-actions,
      .record-form-actions.fixed {
        opacity: 0;
        height: 0;
        position: fixed;
        bottom: 60px;
        top: unset;
        width: 40px;
        right: 19px;
        overflow: hidden;
        padding: 0 4px 0 120px;
        transition: all ease .35s;
      }
      .record-form-actions.visible {
        padding: 10px 4px 35px 120px;
        height: var(--actions-height, 150px);
        opacity: 1;
      }
      .record-form-actions ::slotted(paper-fab) {
        box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
        background-color: var(--primary-background-color);
        margin-top: 10px;
        border-radius: 50%;
        color: var(--secondary-text-color);
      }
      .toggle-actions {
        position: fixed;
        height: 60px;
        top: unset;
        bottom: 15px;
        right: 15px;
        transition: all ease .35s;
        transform: scale(1);
      }
      .toggle-actions paper-fab {
        position: absolute;
        top: 0;
      }
      .toggle-actions #toggler {
        box-shadow: none;
        transition: transform ease .5s;
        position: relative;
        background: transparent;
      }
      paper-fab {
        @apply --accent-gradient;
      }
      @media screen and (max-width: 640px) {
        .backdrop.visible {
          opacity: 0.3;
        }
      }
      @media screen and (min-width: 961px) {
        .toggle-actions {
          right: calc(50% - 460px);
        }
        .record-form-actions,
        .record-form-actions.fixed {
          right: calc(50% - 455px);
        }
      }
    </style>
    <div class="backdrop" id="backdrop" style="display: none;" on-tap="_toggleActions"></div>
    <div class="record-form-actions" id="actions">
      <iron-selector attr-for-selected="name" selected="{{selected}}" role="navigator" fallback-selection="" on-selected-changed="_setHeight">
        <slot id="slot" name="actions"></slot>
      </iron-selector>
    </div>
    <div class="toggle-actions">
      <paper-fab icon=""></paper-fab>
      <paper-fab icon="[[icon]]" id="toggler" on-tap="_toggleActions"></paper-fab>
    </div>
`;
  }

  static get is() { return 'app-actions'; }
  static get properties() {
    return {
      // collapsed reflects the header state
      collapsed: {
        type: Boolean,
        observer: '_setcollapsedStyle'
      },
      icon: String,
      selected: {
        type: String,
        notify: true,
        observer: '_hideActions'
      }
    };
  }

  ready() {
    super.ready();
    this.$.slot.addEventListener('slotchange', this._setHeight.bind(this));
  }

  _toggleActions(e) {
    if(this.__visible) {
      this._hideActions();
    } else {
      this._showActions();
    }
  }

  _setHeight() {
    const tips = this.$.slot.assignedNodes().filter(n => n.nodeName === 'PAPER-TOOLTIP');
    const visibleTips = tips.filter(n => n.style.display !== 'none');
    tips.forEach((tip) => {
      tip.position = 'left';
      tip.updatePosition();
    });
    this.updateStyles({ '--actions-height': `${visibleTips.length*50}px` });
    this.__tips = tips;
  }

  _showTips() {
    this.__tips.forEach((tip) => {
      tip.show();
    });
  }

  _showActions() {
    this.__visible = true;
    this.$.backdrop.style.display = 'block';
    this.$.actions.classList.add('visible');
    this.$.toggler.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      this.$.backdrop.classList.add('visible');
      this._showTips();
    }, 100);
    setTimeout(() => {
      this.$.toggler.icon = 'app:close';
      this.$.toggler.style.transform = 'none';
    }, 300);
  }

  _hideActions() {
    this.__visible = false;
    this.$.backdrop.classList.remove('visible');
    this.$.actions.classList.remove('visible');
    this.$.toggler.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      this.$.backdrop.style.display = 'none';
      this._hideTips();
    }, 100);
    setTimeout(() => {
      this.$.toggler.icon = this.icon;
      this.$.toggler.style.transform = 'none';
    }, 300);
  }

  _hideTips() {
    this.__tips.forEach((tip) => {
      tip.hide();
    });
  }
}
customElements.define(AppActions.is, AppActions);
