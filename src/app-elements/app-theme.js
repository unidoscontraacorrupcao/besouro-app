import '@polymer/polymer/lib/elements/custom-style.js';
import '@polymer/paper-styles/shadow.js';
import '@polymer/paper-styles/typography.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
  <style>
    /*
     * PolymerThemes v1.0.3
     * Homepage: https://polymerthemes.com
     * Copyright 2015 Polymer Themes
     * Licensed under BSD
     * Based on Polymer: http://www.polymer-project.org/
     * Compatible with Polymer 1.0
     */
    @font-face {
      font-family: "Calibre";
      src: url("/fonts/Calibre-Light.ttf") format("truetype"),
           url("/fonts/Calibre-Medium.ttf") format("truetype"),
           url("/fonts/Calibre-Regular.otf") format("opentype");
    }

    :root { 
      --default-primary-color: #FFFFFF;
      --dark-primary-color: #646A74;
      --accent-color: #E6007E;
      --light-accent-color: #E6007E;
      --primary-background-color: #ffffff;
      --secondary-background-color: #f8f8f8;
      --primary-text-color: #2d2d2d;
      --secondary-text-color: #000083;
      --light-text-color: #B7B8B7;
      --disabled-text-color: #666666;
      --divider-color: #e0e0e0;

      --paper-checkbox-checked-color: #E15E36;
      --paper-checkbox-checked-ink-color: #E15E36;
      --paper-checkbox-unchecked-color: #777777;
      --paper-checkbox-unchecked-ink-color: #777777;
      --paper-checkbox-label-color: #2d2d2d;

      --paper-fab-background: #E15E36;
      --paper-fab-disabled-background: #afb1b9;
      --paper-fab-disabled-text: #313238;

      --paper-icon-button-disabled-text: #afb1b9;

      --paper-input-container-color: #7a7a7a;
      --paper-input-container-focus-color: #E15E36;
      --paper-input-container-invalid-color: #f13c14;
      --paper-input-container-input-color: #7a7a7a;

      --paper-menu-background-color: #f3f3f3;
      --paper-menu-color: #2d2d2d;
      --paper-menu-disabled-color: #afb1b9;

      --paper-progress-active-color: #E15E36;
      --paper-progress-secondary-color: #E15E36;

      --paper-radio-button-checked-color: #E15E36;
      --paper-radio-button-checked-ink-color: white;
      --paper-radio-button-unchecked-color: #2d2d2d;
      --paper-radio-button-unchecked-ink-color: #2d2d2d;
      --paper-radio-button-label-color: #2d2d2d;

      --paper-slider-knob-color: #E15E36;
      --paper-slider-active-color: #E15E36;
      --paper-slider-pin-color: #E15E36;

      --paper-spinner-layer-1-color: #E6007E;
      --paper-spinner-layer-2-color: #E6007E;
      --paper-spinner-layer-3-color: #E6007E;
      --paper-spinner-layer-4-color: #E6007E;

      --paper-tabs-selection-bar-color: #D9589F;
      --paper-tab-ink: #E15E36;

      --paper-toggle-button-checked-bar-color: #E15E36;
      --paper-toggle-button-checked-button-color: #E15E36;
      --paper-toggle-button-checked-ink-color: #E15E36;
      --paper-toggle-button-unchecked-bar-color: #777777;
      --paper-toggle-button-unchecked-button-color: white;
      --paper-toggle-button-unchecked-ink-color: white;

      --paper-toolbar-background: #e7e7e7;
      --paper-toolbar-color: #777777;

      --iron-overlay-backdrop-opacity: 0.3;

      --error-color: #FF4C69;
      --warning-color: #FFCC00;
      --info-color: #FFCC00;
      --success-color:  #74BF30;

      --app-form-header-background: #fff;
      --app-form-header-color: #000;

      --accent-gradient: {
        color: white;
        background: linear-gradient(to left, var(--light-accent-color), var(--accent-color));
        @apply --shadow-elevation-3dp;
        border: none;
      };

      --simple-button: {
        color: var(--secondary-text-color);
        height: 35px;
        line-height: 1;
        border-radius: 17px;
        max-width: 210px;
        margin: auto;
      };

      --plain-button: {
        border: none;
        color: var(--accent-color);
      }

      --default-title-font: {
        font-family: 'Calibre';
        font-weight:  600;
      };

      --default-font: {
        font-family: 'Calibre';
        font-weight:  400;
      };

      --default-font-medium: {
        font-family: 'Calibre';
        font-weight:  600;
      };
    }

  </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
