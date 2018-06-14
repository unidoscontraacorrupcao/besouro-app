import '../../../@polymer/polymer/polymer-legacy.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/iron-icon/iron-icon.js';
import { PaperDialogBehavior } from '../../../@polymer/paper-dialog-behavior/paper-dialog-behavior.js';
import '../../../@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import './app-icons.js';
import './styles/app-scrollable-dialog-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '../../../@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
class AppScrollableDialog extends mixinBehaviors([PaperDialogBehavior], PolymerElement) {
  static get template() {
    return html`
    <style include="app-scrollable-dialog-styles"></style>
    <slot id="header" name="header"></slot>
    <paper-dialog-scrollable id="scroll">
      <slot id="slot"></slot>
    </paper-dialog-scrollable>
`;
  }

  static get is() { return 'app-scrollable-dialog'; }
  static get properties() {
    return {
      withBackdrop: {
        value: true
      },
      opened: {
        observer: '_resetParent'
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.scroll.dialogElement = this;
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
    setTimeout(this.close.bind(this), 100);
  }

  _resetParent(opened) {
    if(!opened) this.__parent.appendChild(this);
  }

  _animateSlotted() {
    const nodes = Array.from(this.$.slot.assignedNodes()).filter(e => e.nodeName !== '#text');
    nodes.forEach(node => node.classList.toggle('animated'));
    const header = Array.from(this.$.header.assignedNodes()).filter(e => e.nodeName !== '#text');
    header.forEach(node => node.classList.toggle('animated'));

  }
}
customElements.define(AppScrollableDialog.is, AppScrollableDialog);
