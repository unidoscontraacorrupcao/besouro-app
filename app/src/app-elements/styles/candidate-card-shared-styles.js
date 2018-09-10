import '@polymer/polymer/polymer-legacy.js';
import './card-shared-styles.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="candidate-card-shared-styles">
  <template>
  <style include="card-shared-styles"></style>
  <style>
    .card-header {
      height: unset;
    }

    .card-header .container {
      margin: 0;
      position: unset;
      width: unset;
      padding: 20px 0px 0px 20px;
      margin-bottom: 10px;
    }

    #candidate-name {
      text-transform: uppercase;
      font-family: folio;
      font-size: 24px;
      color: var(--secondary-text-color);
      margin-bottom: 16px;
    }

    #candidate-infos {
      display: flex;
      flex-grow: 2;
      margin-top: 20px;
      line-height: 0.8;
    }

    .card iron-image {
      width: 100%;
      height: 220px;
      background-color: white;
    }

    #candidate-infos div:first-of-type {
      flex: 0 0 45%;
    }

    #candidate-infos div {
      flex: 1;
    }

    #candidate-infos #candidacy,
    #candidate-infos #urn,
    #candidate-infos #party-uf{
      display: flex;
      flex-direction: column;
    }

    #candidate-infos #urn {
      padding-left: 15px;
    }

    #candidate-infos div span:first-child {
      margin-bottom: 5px;
      font-family: helvetica-neue;
      text-transform: capitalize;
      font-size: 18px;
    }

    #candidate-infos div span:nth-child(2) {
      text-transform: uppercase;
      color: var(--paragraph-color);
      line-height: 0.95;
      font-family: folio;
      font-size: 18px;
    }

    .card-footer {
      height: 128px;
      position: relative;
      display: flex;
    }

    .card-footer paper-button {
      height: 70px;
      width: 128px;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: 20px auto;
      border-style: solid;
      border-radius: 0;
      border-width: 1px;
      border-color: var(--secondary-text-color);
      font-family: folio;
      text-align: center;
    }

    .card-footer paper-button:first-child {
      margin-left: auto;
      margin-right: 5px;
      color: var(--secondary-text-color);
    }

    .card-footer paper-button:last-child {
      margin-left: 5px;
      margin-right: auto;
      background-color: var(--secondary-text-color);
      color: white;
    }

    .card-footer paper-button div {
      display: flex;
      flex-direction: column;
    }

    #btn-icon {
      width: 25%;
      margin: auto auto auto auto;
    }

    #card-image { position: relative; }

    #political-infos {
      position: absolute;
      bottom: 8px;
      height: 57px;
      left: 10px;
      display: flex;
      color: white;
      width: 100%;
    }

    #political-infos .info {
      flex: 0 1 32%;
      text-align: center;
      flex-direction: column;
    }

    #political-infos .info iron-icon {
      width: 18px;
      height: 15px;
      color: var(--disabled-text-color);
    }

    #political-infos .info paper-tooltip {
      width: 170px;
      --paper-tooltip-text-color: var(--paragraph-color);
      --paper-tooltip-background: var(--primary-background-color);
      --paper-tooltip-opacity: 1;
      --paper-tooltip: {
        border: 1px solid var(--paragraph-color);
        font-size: 14px;
        text-align: left;
        font-family: helvetica-neue;
      }
    }

    #political-infos .info #short {
      width: 65%;
    }

    #political-infos .info div:first-child {
      font-family: helvetica-neue;
      text-align: center;
      line-height: 0.9;
      width: 85%;
      margin: 0 auto;
    }

    #political-infos .info div:first-child:hover iron-icon {
      color: white;
    }

    #political-infos .info div:last-child {
      font-family: folio;
      text-align: center;
      text-transform: uppercase;
      font-size: 20px;
    }

    #share-candidate, #close {
      position: absolute;
      right: 0;
      height: 29px;
    }

    #close div div:first-child {
      position: absolute;
      bottom: 0;
      right: 0;
    }

    #close span { margin: 8px 8px 8px 10px; }

    #share-candidate {
      z-index: 1;
      top: 15px;
      background-color : white;
      color: var(--secondary-text-color);
      font-family: folio;
    }

    #share-candidate div div:first-child {
      float: left;
      margin: -6px;
    }

    #share-candidate div div:last-child {
      float: right;
      margin: 8px 5px 0 0;
    }

    #close {
      top: 15px;
      background-color: var(--accent-color);
      width: 69px;
    }

    #close div div:first-child {
      top: -19px;
      left: -35px;
    }

    #close div {
      margin: 10px 10px 10px 17px;
      font-family: folio;
      color: white;
      position: relative;
    }

    #close paper-icon-button {
      width: 26px;
      height: auto;
    }


    #tse-data {
      border-color: rgba(49,39,131,1);
      border-style: solid;
      border-width: 1px;
      width: 90%;
      margin: auto auto;
    }

    .item {
      height: 40px;
      overflow: hidden;
      transition: height 0.5s;
      border-bottom-style: solid;
      border-bottom-color: rgba(49,39,131,1);
      border-bottom-width: 1px;
    }

    .item-header { height: 45px; }

    .item-body {
      width: 90%;
      margin: auto;
      text-align: left;
      margin-top: 5px;
    }

    .item-body span {
      font-family: helvetica-neue;
      font-size: 18px;
      color: rgba(51,51,51,1);
      line-height: 1;
    }

    .item paper-icon-button {
      float: right;
      background-color: rgba(49,39,131,1);
      color: white;
    }

    .item-title {
      padding-left: 10px;
      margin-top: 13px;
      display: inline-block;
    }

    .item-title span {
      text-transform: uppercase;
      color: rgba(49,39,131,1);
      font-family: folio;
      font-size: 16px;
    }

    @media only screen and (max-width: 470px) {
      #political-infos {
        left: 5px;
        right: 0;
      }
      #political-infos .info div:last-child {
        font-size: 16px;
      }

      .item-title span {
        font-size: 12px;
      }

    }

    @media only screen and (max-width: 400px) {
      #political-infos .info div:first-child {
        width: 100%;
      }
      #political-infos .info #short {
        width: 75%;
      }
    }

    @media only screen and (max-width: 359px) {
      #political-infos .info div:first-child {
        font-size: 14px;
      }
      #political-infos .info iron-icon {
        width: 14px;
        height: 14px;
      }
    }

    @media only screen and (max-width: 320px) {
      .item-title span {
        font-size: 12px;
      }
      #political-infos .info div:first-child {
        font-size: 13px;
      }
    }

    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
