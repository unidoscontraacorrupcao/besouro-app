import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import './shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class AppFormHeader extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
      }

      app-header {
        background: var(--app-form-header-background);
        color: var(--app-form-header-color);
      }

    </style>
        <app-header slot="header" shadow\$="{{shadow}}">
          <app-toolbar>
            <slot name="arrow-back"></slot>
            <h1 class="title" main-title="">
              <slot name="main-title"></slot>
            </h1>
            <slot name="more-vert"></slot>
          </app-toolbar>
        </app-header>
`;
  }

  static get is() { return 'app-form-header'; }

  static get properties() {
    return {
      shadow: {
        type: Boolean
      }
    }
  }

  constructor() {
    super();
  }
}

window.customElements.define(AppFormHeader.is, AppFormHeader);
