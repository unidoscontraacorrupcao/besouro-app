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

      #social-notice {
        width: 300px;
        margin: 20px auto;
        color: var(--light-text-color);
        font-family: folio;
        font-size: 18px;
      }

      .social-button.facebook {
        margin-left: 2.35vw;
        height: 66px;
        width: 66px;
        color: white;
        background-color: #4460a0;
      }

      .social-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 1.6vh auto 0;
      }

      .social-button {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .social {
        text-align: center;
        margin-top: 5vh;
      }

      .social-text {
        font-family: Folio;
        font-size: 18px;
        line-height: 19px;
        color: #312783;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
