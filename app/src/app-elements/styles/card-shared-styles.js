import '@polymer/polymer/polymer-legacy.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="card-shared-styles">
  <template>
  <style>
      .card {
        padding: 0px;
        line-height: 0.7;
        position: relative;
        max-width: 500px;
        margin: 10px auto 0px auto;
        background: white;
      }

      .card iron-image {
        width: 100%;
        height: 300px;
        background-color: var(--dark-primary-color);
      }

      .card-header { height: 114px; }

      .card-header .container {
        margin: 20px 20px 20px 20px;
        position: absolute;
        width: 100%;
      }

      .card-header paper-icon-button {
        padding: 5px;
        color: var(--accent-color);
      }

      .card-content {
        flex: 1;
        margin: 0 20px;
        display: flex;
        flex-direction: column;
      }

    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
