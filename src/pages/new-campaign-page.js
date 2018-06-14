import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/app-layout/app-header/app-header.js';
import '../../../@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/paper-input/paper-textarea.js';
import '../../../@polymer/paper-fab/paper-fab.js';
import '../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../@polymer/paper-card/paper-card.js';
import '../../../@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../../@polymer/paper-listbox/paper-listbox.js';
import '../../../@polymer/paper-item/paper-item.js';
import '../../../@polymer/neon-animation/web-animations.js';
import '../../../paper-stepper/paper-stepper.js';
import '../../../paper-stepper/paper-step.js';
import '../../../polymerfire/firebase-query.js';
import '../../../polymerfire/firebase-document.js';
import '../../../polymerfire/firebase-storage-multiupload.js';
import '../../../polymerfire/firebase-storage-ref.js';
import '../campaign-elements/proposal-dialog.js';
import '../campaign-elements/social-dialog.js';
import '../campaign-elements/create-campaign-dialog.js';
import '../campaign-elements/edit-campaign-dialog.js';
import '../app-elements/app-dialog.js';
import '../app-elements/app-scrollable-dialog.js';
import '../app-elements/app-form-header.js';
import '../app-elements/shared-styles.js';
import '../app-elements/app-icons.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class NewCampaignPage extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
        background: var(--secondary-background-color);
        height: 100vh;
        @apply --default-font;
      }
      app-form-header {
        color: var(--default-primary-color);
        background: var(--accent-color);
        --app-form-header-background: var(--accent-color);
        --app-form-header-color: var(--default-primary-color);
        @apply --default-font-medium;
      }
      paper-stepper {
        position: fixed;
        bottom: 0;
        padding: 5px 0;
        width: 100%;
        background-color: var(--primary-background-color);  
      }
      .fill {
        flex: 1;
      }
      .step {
        padding: 0 20px;
        margin-bottom: 60px;
      }
      .step h1 {
        color: var(--secondary-text-color);
      }
      #step2 h1 {
        line-height: 22px;
        margin-bottom: 0;
        padding-bottom: 25px;
      }
      #step2 paper-fab {
        display: inline-block;
        position: absolute;
        right: 5%;
        top: 13%;
        background: var(--accent-color);
        color: var(--default-primary-color);
      }
      .input-file {
        background: var(--divider-color);
        margin: 30px 0 20px 0;
        padding: 10px 10px 20px 10px;
        border: 1px dashed var(--secondary-text-color);
        text-align: center;
      }
      .input-file iron-icon {
        --iron-icon-fill-color: var(--dark-primary-color);
        --iron-icon-height: 60px;
        --iron-icon-width: 60px;
        margin: 5px 0;
      }
      .input-file span {
        display: block;
        color: var(--secondary-text-color);
        font-size: 600;
      }
      .input-file .file {
        text-transform: uppercase;
        color: var(--accent-color);
      }
      .upload-button {
        position: relative;
      }
      .filename {
        font-size: 14px;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .filename paper-icon-button {
        width: 30px;
        height: 30px;
      }
      label {
        color: var(--paper-input-container-color);
      }
      .links {
        margin-top: 5px;
      }
      .row {
        flex: 1;
      }
      .row span {
        display: inline-block;
        position: relative;
        background-color: white;
        width: calc(100% - 25px);
        height: 30px;
        margin: 5px 0;
        padding: 5px 10px;
        color: var(--secondary-text-color);
      }
      .row paper-icon-button {
        width: 35px;
        height: 35px;
        position: absolute;
        right: 0;
        top: 0;
      }
      paper-card {
        width: 100%;
        margin: 5px 0;
      }
      .card-title {
        padding: 10px;
        display: flex;
      }
      .card-title span {
        display: inline-block;
        line-height: 2.1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .card-title .space {
        flex: 1;
      }
      .about {
        background-color: var(--accent-color);
        @apply --default-font-medium;
        color: var(--default-primary-color);
        height: 150px;
        position: relative;
        margin: 0 -20px;
      }
      .about h1 {
        padding: 10px 20px;;
        color: var(--default-primary-color);
        margin-top: 0;
        position: absolute;
        top: 0;
        left: 0;
      }
      .about .candidate-img {
        overflow: hidden;
        display: block;
        border-radius: 50%;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%);
        height: 120px;
        width: 120px;
        background-color: var(--default-primary-color);
        border: 2px solid var(--accent-color);
      }
      .about .candidate-img input {
        position: absolute;
        opacity: 0;
        top: 0;
        left: 50%;
        transform: translate(-50%);
        width: 100%;
        height: 100%;
      }
      .about .candidate-img iron-image,
      .about iron-image {
        width: 100%;
        height: 100%;
      }
      .about .candidate-img iron-icon {
        position: absolute;
        bottom: 0;
        right: 50%;
        transform: translate(50%);
        --iron-icon-fill-color: var(--secondary-text-color);
      }
      .about .cover-img iron-icon {
        position: absolute;
        right: 5px;
        bottom: 5px;
      }
      .about .cover-img input {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 15%;
        opacity: 0;
        height: 30%;
        overflow: hidden;
      }
      .candidate {
        margin-top: 80px;
      }
      .candidate paper-dropdown-menu {
        width: 100%;
      }
      @media screen and (max-width: 640px) {
        paper-stepper {
          max-width: 100% !important;
        }
      }
      @media screen and (max-width: 960px) {
        paper-stepper {
          max-width: calc(100% - 256px);
        }
      }
      @media screen and (min-width: 961px) {
        paper-stepper {
          max-width: 704px;
        }
      }

    </style>

    <app-dialog id="confirm" opened="{{openedModal}}">
      <create-campaign-dialog></create-campaign-dialog>
    </app-dialog>

    <app-dialog id="confirmEdit" opened="{{openedEdit}}">
      <edit-campaign-dialog></edit-campaign-dialog>
    </app-dialog>

    <app-scrollable-dialog id="dialog" modal="">
      <app-form-header slot="header" shadow="">
        <paper-icon-button slot="arrow-back" icon="app:close" on-tap="closeProposalDialog"></paper-icon-button>
        <span slot="main-title">Nova Proposta</span>
      </app-form-header>
      <proposal-dialog id="proposalDialog" proposals="{{proposals}}" on-create-proposal="_saveProposal"></proposal-dialog>
    </app-scrollable-dialog>

    <app-dialog id="social">
      <social-dialog on-save-social="_saveSocialLink"></social-dialog>
    </app-dialog>

    <app-route route="{{route}}" query-params="{{params}}" pattern="/:page/:key" data="{{data}}">
    </app-route>

    <firebase-document id="document" data="{{campaignData}}">
    </firebase-document>

    <firebase-query id="proposal" path="/proposals/[[campaignId]]" data="{{proposalData}}">
    </firebase-query>

    <firebase-storage-multiupload path="/campaigns/[[campaignId]]" files="[[fileArray]]" upload-tasks="{{uploadTasks}}" id="storage">
    </firebase-storage-multiupload>

    <firebase-storage-multiupload path="/campaigns/[[campaignId]]/attachments" files="[[attachmentsArray]]" upload-tasks="{{uploadTasks}}" id="attachmentsStorage">
    </firebase-storage-multiupload>

    <firebase-storage-multiupload path="/proposals/[[campaignId]]" files="[[proposalArray]]" upload-tasks="{{uploadTasks}}" id="proposalStorage">
    </firebase-storage-multiupload>
    
    <app-header-layout has-scrolling-region="">
      <app-form-header slot="header" shadow="">
        <paper-icon-button slot="arrow-back" icon="app:back" on-tap="_returnToInbox"></paper-icon-button>
        <span slot="main-title">Criar Campanha</span>
        <paper-icon-button slot="more-vert" icon="app:more-vert"></paper-icon-button>
      </app-form-header>
      <div class="fill">
        <iron-pages selected="[[selection]]">
          <div class="step" id="step1">
            <div class="about">
              <iron-image sizing="cover" id="coverImage"></iron-image>
              <h1>Sobre o candidato</h1>
              <span class="cover-img">
                <iron-icon icon="app:add"></iron-icon>
                <input id="coverPhoto" type="file" on-change="getCoverPhoto" accept=".jpg, .jpeg, .png">
              </span>
              <span class="candidate-img">
                <iron-image sizing="cover" id="candidateImage"></iron-image>
                <iron-icon icon="app:add"></iron-icon>
                <input id="candidatePhoto" type="file" on-change="getCandidatePhoto" accept=".jpg, .jpeg, .png">
              </span>
            </div>
            <div class="candidate">
              <paper-input label="Nome do candidato" placeholder="Nome do candidato" required="" auto-validate="" error-message="O campo não pode estar em branco!" value="{{campaign.candidateName}}"></paper-input>
              <paper-dropdown-menu label="Cargo que irá disputar" required="" value="{{campaign.role}}">
                <paper-listbox slot="dropdown-content" class="dropdown-content" selected="0">
                  <paper-item>Presidente</paper-item>
                  <paper-item>Governador</paper-item>
                  <paper-item>Senador</paper-item>
                  <paper-item>Deputado Federal</paper-item>
                  <paper-item>Deputado Estadual</paper-item>
                  <paper-item>Deputado Distrital</paper-item>
                </paper-listbox>
              </paper-dropdown-menu>
              <paper-dropdown-menu label="Estado" value="{{campaign.state}}">
                <paper-listbox slot="dropdown-content" class="dropdown-content" selected="0">
                  <template id="statesList" is="dom-repeat" items="{{states}}" as="state">
                    <paper-item>{{state}}</paper-item>
                  </template>
                </paper-listbox>
              </paper-dropdown-menu>
              <paper-input label="Cidade" placeholder="Digite o nome da cidade" value="{{campaign.city}}" required="" auto-validate="" error-message="Digite uma cidade para a campanha!"></paper-input>
              <paper-input label="Título de eleitor" placeholder="XXXXXX-XXX" value="{{campaign.voter}}"></paper-input>
              <paper-dropdown-menu label="Escolha o partido" value="{{campaign.party}}">
                <paper-listbox slot="dropdown-content" class="dropdown-content" selected="0">
                  <paper-item>Rede</paper-item>
                  <paper-item>Outro</paper-item>
                </paper-listbox>
              </paper-dropdown-menu>
              <paper-input label="Número de filiação do partido" placeholder="XXXXXX-XXX" value="{{campaign.membership}}"></paper-input>
              <paper-input label="Video de apresentação" placeholder="Link do vídeo de apresentação" value="{{campaign.video}}"></paper-input>
            </div>
          </div>
          <div class="step" id="step2">
            <h1>Propostas
              <paper-fab mini="" icon="app:add" on-tap="open"></paper-fab>
            </h1>
            <template is="dom-repeat" items="{{proposalData}}">
              <paper-card>
                <div class="card-title">
                  <span>{{item.content.title}}</span>
                  <div class="space"></div>
                  <paper-icon-button icon="app:close" on-tap="removeProposal"></paper-icon-button>
                </div>
              </paper-card>
            </template>
          </div>
          <div class="step" id="step3">
            <h1>Dados da campanha</h1>
            <div class="fields">
              <paper-input value="{{campaign.name}}" label="Titulo" placeholder="Nome da campanha" required="" auto-validate="" error-message="O nome da campanha não pode estar em branco"></paper-input>
              <paper-textarea value="{{campaign.description}}" label="Descrição" placeholder="Uma breve descrição da campanha" char-counter="" maxlength="500" required="" auto-validate="" error-message="Descrição da campanha não pode estar em branco"></paper-textarea>
              <div class="input-file">
                <iron-icon icon="app:cloud-upload"></iron-icon>
                <span>Faça o upload de imagens, vídeos ou aúdios que apoiem a sua descrição de campanha.</span>
                <div class="upload-button">
                  <span class="file">Selecionar arquivo</span>
                  <input id="campaignAttachments" type="file" multiple="" on-change="getAttachments">
                </div>
              </div>
              <template is="dom-if" if="{{campaign.attachments}}">
                <template is="dom-repeat" items="{{campaign.attachments}}" as="file" restamp="">
                  <div class="filename">
                    <paper-icon-button icon="app:close" on-tap="_removeAttachment"></paper-icon-button>
                    <span>{{file}}</span>
                  </div>
                </template>
              </template>
              <paper-input value="{{campaign.calling}}" label="Rótulo do botão de chamada" placeholder="Vamos fazer juntos a diferença?"></paper-input>
              <label>Links externos</label>
              <div class="links">
                <div class="row">
                  <span>Website: {{campaign.website}}
                    <paper-icon-button icon="app:edit" on-tap="openSocial" name="website"></paper-icon-button>
                  </span>
                  <span>Facebook: {{campaign.facebook}}
                    <paper-icon-button icon="app:edit" on-tap="openSocial" name="facebook"></paper-icon-button>
                  </span>
                </div>
                <div class="row">
                  <span>Instagram: {{campaign.instagram}}
                    <paper-icon-button icon="app:edit" on-tap="openSocial" name="instagram"></paper-icon-button>
                  </span>
                  <span>Twitter: {{campaign.twitter}}
                    <paper-icon-button icon="app:edit" on-tap="openSocial" name="twitter"></paper-icon-button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </iron-pages>
        <paper-stepper selected="{{selection}}" progress-bar="" back-label="Voltar" next-label="{{nextLabel}}" id="stepper">
          <paper-step></paper-step>
          <paper-step></paper-step>
          <paper-step></paper-step>
          <paper-step></paper-step>
        </paper-stepper>
      </div>
    </app-header-layout>
`;
  }

  static get is() { return 'new-campaign-page'; }
  static get properties() {
    return {
      route: {
        type: Object,
        notify: true
      },
      selected: {
        observer: '_selectedChanged'
      },
      campaign: {
        type: Object,
        value: function () { return {}; }
      },
      campaignData: {
        type: Object,
        value: function () { return {}; }
      },
      selection: {
        type: Number,
        observer: '_setCreateCampaign'
      },
      nextLabel: {
        type: String,
        value: 'Próximo'
      },
      openedModal: {
        type: Boolean,
        observer: '_observeModal'
      },
      openedEdit: {
        type: Boolean,
        observer: '_observeEditModal'
      },
      fileArray: {
        type: Array,
        value: []
      },
      proposalArray: {
        type: Array,
        value: []
      },
      attachmentsArray: {
        type: Array,
        value: []
      },
      uploadTasks: {
        type: Array,
        value: []
      },
      campaignId: {
        type: String
      },
      proposals: {
        type: Array
      },
      vidRegex: {
        type: Object,
        value() { return /https.*youtu.?be\/?(.*)/; }
      },
      states: {
        type: Array,
        value: ["Acre", "Alagoas", "Amapá	", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"]
      }
    };
  }

  static get observers() { return ['_validateCampaign(campaign.*, proposalData.*)', '_setEditCampaign(data.key)']; }

  _selectedChanged(selected) {
    if (!selected) return;
  }

  _returnToInbox() {
    this.set('route.path', '/');
  }

  open() {
    this.$.dialog.present();
  }

  closeProposalDialog() {
    this.$.dialog.close();
    this.$.proposalDialog.proposal = {};
    this.proposalArray = [];
  }

  openSocial(e) {
    this.$.social.present();
    this.$.social.socialMedia = e.target.getAttribute('name');
  }

  _saveSocialLink(e) {
    const data = e.detail;
    this.set(`campaign.${this.$.social.socialMedia}`, data.link);
    this.$.social.dismiss();
  }

  getCandidatePhoto(e) {
    let photo = e.target.files[0];
    if(photo) {
      let reader = new FileReader();
      const img = this.$.candidateImage;
      reader.onload = function (e) {
        img.src = e.target.result;
      }
      reader.readAsDataURL(photo);
    }
  }

  getCoverPhoto(e) {
    let photo = e.target.files[0];
    if (photo) {
      let reader = new FileReader();
      const img = this.$.coverImage;
      reader.onload = function (e) {
        img.src = e.target.result;
      }
      reader.readAsDataURL(photo);
    }
  }

  getAttachments(e) {
    this.campaign.attachments = this.campaign.attachments || [];
    let files = Array.from(e.target.files);
    files.forEach(file => {
      this.push('attachmentsArray', file);
      this.push('campaign.attachments', file.name);
    });
    if(this.$.campaignAttachments.files) {
      this.$.attachmentsStorage.upload();
    }
    this._saveCampaign();
  }

  _removeAttachment(e) {
    const file = e.model.get('file');
    const array = this.campaign.attachments;
    this.set('campaign.attachments', array.filter(i => i !== file));
    this.$.attachmentsStorage.ref.child(file).delete();
    this._saveCampaign();
  }

  _setEditCampaign(key) {
    if(key) {
      this.$.document.db.ref(`/campaigns/${key}`).once("value").then(function(result) {
        const campaign = JSON.parse(JSON.stringify(result.val().content));
        this.campaign = campaign;
        this.campaignId = key;
      }.bind(this));
    }
  }

  _setCampaignDate() {
    const currentDate = Date.now();
    this.campaign.createdAt = currentDate;
  }

  _validateCampaign(campaign, proposalData) {
    let valid = true;
    //validation of first step
    if(this.selection === 0) {
      if(!this.campaign.candidateName) {
        valid = false;
      }
      if(!this.campaign.city) {
        valid = false;
      }
    }
    //validation of second step
    if(this.selection === 1) {
      if(this.proposalData.length <= 0) {
        valid = false;
      }
    }
    //validation of third step
    if(this.selection === 2) {
      if(!this.campaign.name) {
        valid = false;
      }
      if(!this.campaign.description) {
        valid = false;
      }
    }
    //disable next button
    if(!valid) {
      this.$.stepper.disableNext = true;
    } else {
      this.$.stepper.disableNext = false;
    }

  }

  _saveCampaign(e) {
    this.campaign.uid = this.user.uid;
    let vid = (this.campaign.video && this.campaign.video.includes('http')) ? this.campaign.video.match(this.vidRegex)[1] : '';
    if (vid && vid.includes('v=')) vid = vid.match(/.*v=(.*)&?/)[1];
    if (vid) this.campaign.video = vid;
    //save campaign
    if(this.campaignId) {
      this.$.document.path = `/campaigns/${this.campaignId}`;
      this.campaignData = { content: this.campaign };
    } else {
      this._setCampaignDate();
      this.campaignData = { content: this.campaign };
      this.campaignData.content["usersFollow"] = [this.user.uid];
      this.$.document.saveValue('/campaigns').then(function() {
        this.campaignId = this.$.document.path.match(/\/.*\/(.*)/)[1];
      }.bind(this));
    }
    //upload images
    if(this.selection === 1) {
      this._uploadImages();
    }
  }

  _uploadImages() {
    if(this.$.coverPhoto.files[0]) {
      if(this.campaign.coverImage) {
        this.$.storage.ref.child(this.campaign.coverImage).delete();
      }
      this.campaign.coverImage = this.$.coverPhoto.files[0].name;
      this.fileArray.push(this.$.coverPhoto.files[0]);
    }
    
    if(this.$.candidatePhoto.files[0]) {
      if(this.campaign.candidateImage) {
        this.$.storage.ref.child(this.campaign.candidateImage).delete();
      }
      this.campaign.candidateImage = this.$.candidatePhoto.files[0].name;
      this.fileArray.push(this.$.candidatePhoto.files[0]);
    }

    if(this.campaignId) {
      this.$.storage.upload();
    }
  }

  _saveProposal(e) {
    const proposal = this.$.proposalDialog.proposal;
    const categories = this.campaign.categories || {};
    categories[proposal.category] = true;
    this.campaign.categories = categories;
    this.$.proposal.ref.push({ content: proposal });
    //upload images
    if(this.$.proposalDialog.shadowRoot.querySelector('#image').files[0]) {
      this.proposalArray.push(this.$.proposalDialog.shadowRoot.querySelector('#image').files[0]);
      this.$.proposalStorage.upload();
    }
    this.closeProposalDialog();
    this.$.proposalDialog.proposal = {};
    this.proposalArray = [];
  }

  removeProposal(e) {
    const data = e.model.get('item');
    const key = data.$key;
    if(data.content.image) {
      this.$.proposalStorage.ref.child(data.content.image).delete();
    }
    this.$.proposal.ref.child(key).remove();
  }

  _setCreateCampaign(selection) {
    if(!selection) return;
    this._saveCampaign();
    if(selection === 0 || selection === 1 || selection === 2) {
      this._validateCampaign(this.campaign);
    }
    if(selection === 2) {
      this.nextLabel = 'Concluir';
    } else if(selection === 3) {
      if(this.data.key) {
        this.$.confirmEdit.present();
      } else {
        this.$.confirm.present();
      }
    } else {
      this.nextLabel = 'Próximo';
    }
  }

  _observeModal() {
    if (!this.openedModal) {
      this._returnToInbox();
      this.selection = 0;
      this.campaign = {};
      this.campaignId = undefined;
      this.fileArray = [];
      this.attachmentsArray = [];
      this.proposalArray = [];
      this.$.candidateImage.src = '';
      this.$.coverImage.src = '';
      this.nextLabel = 'Próximo';
      this.data.key = undefined;
    }
  }

  _observeEditModal() {
    if (!this.openedEdit) {
      this._returnToInbox();
      this.selection = 0;
      this.campaign = {};
      this.campaignId = undefined;
      this.fileArray = [];
      this.attachmentsArray = [];
      this.proposalArray = [];
      this.$.candidateImage.src = '';
      this.$.coverImage.src = '';
      this.nextLabel = 'Próximo';
      this.data.key = undefined;
    }
  }
}
window.customElements.define(NewCampaignPage.is, NewCampaignPage);
