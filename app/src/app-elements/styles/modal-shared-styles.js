import '@polymer/polymer/polymer-legacy.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="modal-shared-styles">
  <template>
  <style>
      paper-spinner {
        width: 40px;
        height: 40px;
        padding: 5px;
        background-color: var(--default-primary-color);
        border-radius: 50%;
      }

      #loading {
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
