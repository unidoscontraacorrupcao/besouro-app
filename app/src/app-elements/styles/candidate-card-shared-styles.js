import '@polymer/polymer/polymer-legacy.js';
import './card-shared-styles.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="candidate-card-shared-styles">
  <template>
  <style include="card-shared-styles"></style>
  <style>
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
      margin-top: 25px;
      width: 95%;
    }

    #candidate-infos div {
      float: left;
      margin-right: 10px;
    }
    #candidate-infos #candidacy,
    #candidate-infos #urn,
    #candidate-infos #party-uf{
      display: flex;
      flex-direction: column;
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
    }

      .card-footer {
        height: 128px;
        position: relative;
        display: flex;
      }

      .card-footer paper-button {
        height: 80px;
        width: 128px;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
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
        margin: auto auto 10px auto;
      }

      #card-image { position: relative; }

      #political-infos {
        position: absolute;
        bottom: 8px;
        height: 57px;
        left: 20px;
        right: 20px;
        display: flex;
        color: white;
      }

      #political-infos .info {
        margin-left: 7px;
        display: flex;
        flex-direction: column;
      }

      #political-infos .info div:first-child {
        font-family: helvetica-neue;
        text-align: center;
        line-height: 0.9;
      }

      #political-infos .info div:last-child {
        font-family: folio;
        text-align: center;
        text-transform: uppercase;
        font-size: 20px;
      }


    #close {
      position: absolute;
      top: -8px;
      right: 22px;
      background-color: var(--accent-color);
      height: 29px;
      width: 69px;
    }

    #close div {
      margin: 10px 10px 10px 17px;
      font-family: folio;
      color: white;
      position: relative;
    }
    
    #close div div:first-child {
      position: absolute;
      top: -19px;
      left: -35px;
      bottom: 0;
      right: 0;
    }

    #close paper-icon-button {
      width: 26px;
      height: auto;
    }

    #close span { margin: 8px 8px 8px 10px; }

    @media only screen and (max-width: 360px) {
      #political-infos {
        left: 0;
        right: 0;
      }
    }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
