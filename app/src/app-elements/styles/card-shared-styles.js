import '@polymer/polymer/polymer-legacy.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="card-shared-styles">
  <template>
  <style>
      app-header {
        background: var(--default-primary-color);
        color: var(--secondary-text-color);
      }

      app-header-layout {
        overflow: hidden;
      }

      app-drawer-layout:-webkit-full-screen-ancestor app-header,
      app-header-layout:-webkit-full-screen-ancestor app-header,
      app-drawer-layout:-webkit-full-screen-ancestor app-drawer {
        z-index: -1 !important;
      }

      .card {
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

      @media screen and (min-width: 641px) {
        app-header [drawer-toggle] {
          display: none;
        }
        paper-tabs {
          width: 100%;
          margin: 0 auto;
        }
      }
      @media screen and (min-width: 961px) {
        app-header-layout {
          height: calc(100% - 50px);
        }
      }

    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
