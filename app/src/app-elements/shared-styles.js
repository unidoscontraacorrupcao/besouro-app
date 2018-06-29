import '@polymer/polymer/polymer-element.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      
      body {
        @apply --default-font;
      }
      
      .card {
        margin: 15px 0;
        padding: 16px;
        color: #757575;
        background-color: #fff;
      }

      a:focus,
      a:hover,
      a:visited,
      a {
        color: var(--secondary-text-color);
      }

      p {
        color: var(--secondary-text-color);
      }

      .center {
        text-align: center;
      }

      .bottom {
        position: absolute;
        bottom: 25px;
        left: 0;
        right: 0;
      }

      h1.title {
        margin: 0 20px;
        font-size: 22px;
        line-height: 26px;
        @apply --default-title-font;
        @apply --layout-flex;
      }

     .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-transform: capitalize;
        max-width: calc(100vw - 132px);
      }
      
      /* block button */
      .block {
        display: block;
        margin: 0 auto;
        text-align: center;
      }

      hr {
        color: var(--secondary-background-color);
        background-color: var(--secondary-background-color);
        border: none;
        height: 1px;
      }
    
      h1 {
        font-size: 22px;
        line-height: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        @apply --default-title-font;
      } 

      app-header {
        background: var(--default-primary-color);
        color: var(--secondary-text-color);
      }

      paper-tabs,
      app-toolbar[sticky] {
        height: 50px;
      }
      app-toolbar {
        padding: 0 7px;
      }

      paper-tabs {
        width: calc(100% + 14px);
        margin: 0 -7px;
        max-width: 500px;
      }
      paper-tab {
        width: calc(50% - 32px);
      }

      app-header-layout {
        overflow: hidden;
      }

      app-header paper-icon-button {
        --paper-icon-button-ink-color: var(--secondary-text-color);
        padding: 8px;
      }

      app-drawer-layout:-webkit-full-screen-ancestor app-header,
      app-header-layout:-webkit-full-screen-ancestor app-header,
      app-drawer-layout:-webkit-full-screen-ancestor app-drawer {
        z-index: -1 !important;
      }

      paper-button.accent,
      paper-fab {
        @apply --accent-gradient;
      }

      paper-button {
        @apply --simple-button;
      }

      paper-button.plain {
        @apply --plain-button;
      }

      paper-fab[mini] {
        background: var(--default-primary-color);
        color: var(--secondary-text-color);
      }

      .file-upload {
        position: relative;
      }
      .file-upload input,
      .upload-button input {
        position: absolute;
        opacity: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .file-upload iron-icon {
        --iron-icon-fill-color: var(--dark-primary-color);
      }
      
      .facebook {
        color: #3d5c98;
      }
      .twitter {
        color: #2daae1;
      }
      .instagram {
        color: #cc2366
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

/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/* shared styles for all views */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
;
