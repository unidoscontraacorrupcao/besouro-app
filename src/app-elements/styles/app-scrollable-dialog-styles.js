import '@polymer/polymer/polymer-legacy.js';
import '@polymer/paper-dialog-behavior/paper-dialog-shared-styles.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="app-scrollable-dialog-styles">
  <template>
  <style include="paper-dialog-shared-styles"></style>
  <style>
      :host([modal]) {
        min-width: 60%;
        background: transparent;
      }
      :host([modal]) ::slotted(*),
      :host([modal]) > * {
        margin: 0 !important;
        padding: 0 !important;
      }

      :host([animated]) ::slotted([slot=header]) {
        transition-duration: 0.25s !important;
        transform: translateY(70px) !important;
      }

      :host([animated]) ::slotted(.animated[slot=header]) {
        opacity: 1;
        transform: translateY(0) !important;
      }

      :host([animated]) ::slotted(*) {
        transition: ease .25s;
        opacity: 0;
        transform: translateY(70px);
      }

      :host([animated]) ::slotted(.animated) {
        opacity: 1;
        transform: translateY(0);
      }

      paper-dialog-scrollable {
        background: var(--secondary-background-color);
      }

      .list-item {
        color: var(--paper-grey-600);
        padding: 5px 0;
        font-size: .8rem;
        word-wrap: break-word;
      }
      .list-item:last-child {
        padding-bottom: 20px;
      }
      .list-item span {
        font-weight: 600;
        color: var(--primary-text-color);
      }
      .error {
        color: var(--error-color) !important;
      }
      .error.title {
        margin: 0 0 20px;
        text-transform: none;
        line-height: 1;
      }
      .actions {
        text-align: right;
        padding: 10px 6px;
      }
      .confirm {
        padding: 24px;
      }
      @media screen and (min-width: 600px) {
        :host([modal]) {
          max-width: 400px;
        }
        .content[with-columns] {
          column-count: 2;
          column-gap: 2rem;
        }
        .content section {
          -webkit-column-break-inside: avoid;
          break-inside: avoid-column;
          page-break-inside: avoid;
          padding-top: 1px;
        }
      }
      @media screen and (max-width: 640px) {
        :host([modal]) {
          min-width: 100%;
          min-height: 100%;
          margin: 0;
        }
        app-toolbar {
          padding: 0 5px;
        }
        .title {
          margin-left: 15px;
          max-width: calc(100vw - 110px);
        }
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
