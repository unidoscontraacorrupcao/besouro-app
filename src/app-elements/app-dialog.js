import '@polymer/polymer/polymer-legacy.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icon/iron-icon.js';
import { PaperDialogBehavior } from '@polymer/paper-dialog-behavior/paper-dialog-behavior.js';
import './app-icons.js';
import './styles/app-dialog-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class AppDialog extends mixinBehaviors([PaperDialogBehavior], PolymerElement) {
  static get template() {
    return html`
    <style include="app-dialog-styles"></style>
    <slot id="slot"></slot>
`;
  }

  static get is() { return 'app-dialog'; }
  static get properties() {
    return {
      withBackdrop: {
        value: true
      },
      opened: {
        observer: '_resetParent',
        notify: true
      }
    };
  }

  present() {
    if(this.opened) return;
    this.__parent = this.parentNode;
    document.body.appendChild(this);
    this.open();
    setTimeout(this._animateSlotted.bind(this), 100);
  }

  confirm(e) {
    if(!this.opened) return;
    this.dispatchEvent(new CustomEvent('confirm'));
    this._animateSlotted();
    setTimeout(this.close.bind(this), 100);
  }

  dismiss(e) {
    if(!this.opened) return;
    this.dispatchEvent(new CustomEvent('dismiss'));
    this._animateSlotted();
    this.set('opened', false);
    setTimeout(this.close.bind(this), 100);
  }

  _resetParent(opened) {
    if(!opened && this.__parent) this.__parent.appendChild(this);
  }

  _animateSlotted() {
    const nodes = Array.from(this.$.slot.assignedNodes()).filter(e => e.nodeName !== '#text');
    nodes.forEach(node => node.classList.toggle('animated'));
  }
}
customElements.define(AppDialog.is, AppDialog);
