import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-input/paper-textarea.js';
import '../app-elements/app-form-header.js';
import '../mission-elements/mission-modal.js';
import '../app-elements/app-icons.js';
import '../app-elements/app-besouro-api.js';
import '../app-elements/shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class MissionPage extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>

      :host {
        display: block;
        --app-form-header-background: #fff;
        --app-form-header-color: #000;
        background: var(--secondary-background-color);
        @apply --default-font;
        height: 100vh;
      }

      .action paper-icon-button {
          color: var(--secondary-text-color);
          width: 45px;
          height: 45px;
      }

      .form {
        width: 90%;
        margin: auto;
      }

      .file-upload {
        position: relative;
      }
      .file-upload input {
        position: absolute;
        opacity: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      .file-upload iron-icon {
        --iron-icon-fill-color: var(--dark-primary-color);
      }

      app-form-header {
        color: var(--default-primary-color);
        background: var(--accent-color);
        --app-form-header-background: var(--accent-color);
        --app-form-header-color: var(--default-primary-color);
        @apply --default-font-medium;
      }

      .sub-header {
        background-color: var(--primary-background-color);
        margin-top: -15px;
        text-align: center;
      }

      .sub-header-actions {
        padding-top: 10px;
      }

      .sub-header-title {
        width: 80%;
        margin: auto;
        padding-top: 15px;
        padding-bottom: 15px;
        border-color: var(--primary-background-color) var(--primary-background-color) var(--divider-color) var(--primary-background-color);
        border-style: solid;
        border-width: 1px;
      }
      .sub-header-title h2 {
        color: var(--dark-primary-color);
      }

      .sub-header-title span {
        color: var(--secondary-text-color);
        padding-bottom: 10px;
      }

      .action {
        display: block;
        margin-bottom: 5px;
      }

      .action span { color: var(--secondary-text-color); }

      .media-input { display: none; }

      .media-input paper-input {
        flex-grow: 2;
        text-align: initial;
      }

      .media-input #icon-bg, #choose-media, #mission-required { margin-top: 20px; }

      .media-input #icon-bg, #choose-media { margin-left: 10px; }

      #icon-bg paper-icon-button {
        color: white;
        text-align: center;
        margin-top: 5px;
      }

      #choose-media paper-button {
        border-style: none;
        color: var(--accent-color);
        text-decoration: underline;
      }


      #save {
        margin-top: 25px;
        margin-bottom: 25px;
        text-align: center;
      }

      #save paper-button {
        padding: 10px 25px;
      }

      #icon-bg {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        text-align: center;
        background: linear-gradient(to left, var(--light-accent-color), var(--accent-color));
      }

      paper-dropdown-menu {
        margin-top: 10px;
      }

    </style>


    <app-besouro-api id="api"></app-besouro-api>

    <app-dialog id="confirmation" opened="{{openedModal}}">
      <mission-modal id="modal" mission="{{sharedMission}}" modal-title="{{confirmationTitle}}" modal-description="{{confirmationDescription}}">
      </mission-modal>
    </app-dialog>


    <app-header-layout has-scrolling-region="">
      <app-form-header shadow="" slot="header">
          <paper-icon-button slot="arrow-back" icon="app:arrow-back" on-tap="_returnToInbox"></paper-icon-button>
          <span slot="main-title">{{missionFormTitle}}</span>
          <paper-icon-button slot="more-vert" icon="app:more-vert"></paper-icon-button>
      </app-form-header>
      <div class="sub-header">
        <div class="sub-header-title">
          <h2> Convença seus seguidores </h2>
          <span>
            Escolha entre fazer o upload de uma imagem, ou áudio ou simplesmente cole a URL
            de um vídeo do youtube e chame a atenção dos apoiadores.
          </span>

          <div id="choose-media">
            <paper-button on-tap="_showInput"> escolher arquivo </paper-button>
          </div>

          <div class="media-input">
            <paper-input error-message="formato da url invalida" id="genericInput" value="{{genericInputValue}}" label="Arquivo ou link"></paper-input>
            <div id="icon-bg">
              <paper-icon-button icon="app:cloud-upload" slot="prefix" on-tap="_openInput">
                <paper-input type="file" id="mediaFile"></paper-input>
              </paper-icon-button>
            </div>
          </div>
        </div>
      </div>
      <div class="form" id="form">
        <paper-input id="missionTitle" required="" error-message="Chamada da missão está em branco" value="{{mission.title}}" label="Título" char-counter="" maxlength="100"></paper-input>
        <paper-input id="missionDate" required="" error-message="Duração da missão está em branco" type="date" value="{{mission.endDate}}" label="Prazo da missão"></paper-input>
        <paper-textarea max-rows="2" type="text" id="missionDesc" required="" error-message="Descrição da missão está em branco" value="{{mission.description}}" label="Descrição" char-counter="" maxlength="1000"></paper-textarea>
        <div id="mission-required">
          <paper-toggle-button checked="{{mission.requiredReceipt}}">Comprovação obrigatória</paper-toggle-button>
        </div>

        <div id="save">
          <paper-button id="saveBtn" toggles="" raised="" class="accent">{{missionFormTitle}}</paper-button>
        </div>
      </div>
    </app-header-layout>
`;
  }

  static get is() { return 'mission-page'; }

  static get properties() {
    return {
      route: {
        type: Object,
        notify: true
      },
      missionData: {
        type: Object,
        value: function() { return {}; }
      },
      mission: {
        type: Object,
        value: function() { return { requiredReceipt: true }; }
      },
      openedModal: {
        type: Boolean,
        observer: '_observeModal'
      },
      fileArray: {
        type: Array,
        value: []
      },
      missionId: {
        type: String
      },
      sharedMission: {
        type: Object
      },
      vidRegex: {
        type: Object,
        value() { return /https.*youtu.?be\/?(.*)/; }
      },
      fileName: {
        type: String,
        value: 'Nenhum arquivo de imagem selecionado'
      },
      uploadedFile: {
        type: Object,
        value: {}
      },
      userCampaigns: {
        type: Array,
        value: []
      },
      missionCampaign: String,
      user: {
        type: Object
      },
      missionFormTitle: {
        type: String,
        value: "Criar Missão"
      },
      saveMissionFunc: Function,
      editMissionFunc: Function,
      confirmationTitle: String,
      confirmationDescription: String
    }
  }

  static get observers() {
    return [
      'routePathChanged(route.path)'
    ]
  }

  constructor() {
    super();
  }

  _returnToInbox() {
    this.$.confirmation.dismiss();
    this.set('mission', {});
    this.set("route.data", {});
    this.set("missionFormTitle", "Criar Missão");
    const btn = this.$.saveBtn;
    btn.removeEventListener("tap", this.editMissionFunc, false);
    btn.removeEventListener("tap", this.saveMissionFunc, false);
    this.set('route.path', '/');
  }

  _saveMission(e) {
    if (this._validMission()) {
      var formData = new FormData();
      formData.append("title", this.mission.title);
      formData.append("description", this.mission.description);
      if (this.mission.coverFile)
        formData.append("coverFile", this.mission.coverFile);
      if (this.mission.audiofile)
        formData.append("audiofile", this.mission.audiofile);
      if (this.mission.video)
        formData.append("videoLink", this.mission.video);
      formData.append("owner", this.user.uid);
      var data = {method: "post",
        url: `${this.$.api.baseUrl}/api/v1/missions/`,
        body: formData};
      this.$.api.xhrRequest(data).then(function(response){
          this.$.confirmation.present();
      }.bind(this));
    }
  }

  _validMission() {
    let valid = true;
    if (!this.mission.title) {
      this.$.missionTitle.invalid = true;
      valid = false;
    }
    else
      this.$.missionTitle.invalid = false;

    if (!this.mission.endDate) {
      this.$.missionDate.invalid = true;
      valid = false;
    }
    else
      this.$.missionDate.invalid = false;

    if (!this.mission.description) {
      this.$.missionDesc.invalid = true;
      valid = false;
    }
    else
      this.$.missionDesc.invalid = false;


    if (!(this.input === undefined) && this.input.files.length > 0) {
      const imgFormats = ["png", "jpg"]
      const audioFormats = ["mp3", "wav", "ogg"]
      const _file = this.input.files[0];
      const fileName = this.input.files[0].name;
      const fileFormat = fileName.split('.').pop();
      /* is a image */
      if (imgFormats.includes(fileFormat)) {
        this.mission.coverFile = _file;
      }

      else if (audioFormats.includes(fileFormat)) {
        this.mission.audioFile = _file;
        this.$.genericInput.invalid = false;
      }
      else {
        this.$.genericInput.invalid = true;
        valid = false;
      }
    }
    else {
      this.mission.video = this.genericInputValue;
      if (!this._validVideo(this.mission.video)) {
        this.$.genericInput.invalid = true;
        valid = false;
      }
      else
        this.$.genericInput.invalid = false;
    }
    return valid;
  }

  _validVideo(video) {
    return !video || this.vidRegex.test(video);
  }

  _observeModal() {
    if (!this.openedModal)
      this._returnToInbox();
  }

  _openInput() {
    this.input = this.$.mediaFile.inputElement.inputElement;
    this.input.addEventListener('change', this._setFileName.bind(this));
    this.input.click();
  }

  _showInput() {
    this.shadowRoot.querySelector(".media-input").setAttribute("style", "display: flex !important");
  }


  _setFileName() {
    if(this.input.files.length === 0)
      this.$.mediaInput.value = 'Nenhum arquivo selecionado';
    else {
      this.$.genericInput.value = this.input.files[0].name;
    }
  }

  _onUserChanged() {
    this._getUserCampaigns();
  }

  _getUserCampaigns(){
  }

  routePathChanged(page) {
    const btn = this.$.saveBtn;
    btn.removeEventListener("tap", this.editMissionFunc, false);
    btn.removeEventListener("tap", this.saveMissionFunc, false);
    this.set('mission', {});
    this.set("missionFormTitle", "Criar Missão");
    if ((this.route.data != undefined) && (Object.keys(this.route.data).length > 0)) {
      const missionID = this.route.data.missionID;
      this.$.document.getStoredValue(`/missions/${missionID}`)
        .then(function(res) {
          this.set("mission", res.content);
          this.set("missionFormTitle", "Editar Missão");
          btn.addEventListener("tap", this.editMissionFunc);
        }.bind(this));
    }
    else {
      setTimeout(function() {
        btn.addEventListener("tap", this.saveMissionFunc)
      }.bind(this), 100);
    }

    if (page === "/mission")
      this._getUserCampaigns();
  }

  _editMission() {
    console.log(this._validMission());
    if (this._validMission()) {
      let vid = (this.mission.video) ? this.mission.video.match(this.vidRegex)[1] : '';
      if (vid && vid.includes('v=')) vid = vid.match(/.*v=(.*)&?/)[1];
      console.log(vid);
      if (vid) this.mission.video = vid;
      this.mission.cid = this.missionCampaign;
      this.$.document.data = this.mission;
      this.$.document.saveValue(`/missions/${this.route.data.missionID}/`, "content");
      if (this.input && this.input.files.length > 0) {
        this.set("uploadedFile",  this.input.files[0]);
      }
      this.set('mission', {});
      this.sharedMission = this.missionData[this.missionData.length - 1];
      this.set("confirmationTitle", "Missão editada com sucesso");
      this.$.confirmation.present();
    }
  }

  ready() {
    super.ready();
    this.set("editMissionFunc",  this._editMission.bind(this));
    this.set("saveMissionFunc",  this._saveMission.bind(this));
  }
}
customElements.define(MissionPage.is, MissionPage);
