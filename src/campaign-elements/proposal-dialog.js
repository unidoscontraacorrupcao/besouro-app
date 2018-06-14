import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../../@polymer/paper-listbox/paper-listbox.js';
import '../../../@polymer/paper-item/paper-item.js';
import '../../../@polymer/neon-animation/web-animations.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class ProposalDialog extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
        height: 100vh;
      }
      paper-dropdown-menu {
        width: 100%;
      }
      .submit {
        text-align: right;
        margin-top: 10px;
      }
      .submit paper-button {
        color: var(--accent-color);
        border-radius: unset;
      }
    </style>
      <paper-input label="Titulo" placeholder="Nome da proposta" value="{{proposal.title}}" required="" auto-validate="" error-message="O título da proposta não pode estar em branco!"></paper-input>
      <paper-dropdown-menu label="Categoria" required="" value="{{proposal.category}}">
        <paper-listbox slot="dropdown-content" class="dropdown-content" selected="0">
          <template id="statesList" is="dom-repeat" items="{{categories}}" as="category">
            <paper-item>{{category}}</paper-item>
          </template>
        </paper-listbox>
      </paper-dropdown-menu>
      <paper-textarea label="Descrição" placeholder="Uma descrição da proposta que pode ser escrita aqui" char-counter="" rows="2" maxlength="1000" value="{{proposal.description}}"></paper-textarea>
      <div class="file-upload">
        <paper-input label="Imagem ilustrativa" placeholder="Selecione uma imagem" value="{{proposal.image}}">
          <iron-icon icon="app:cloud-upload" slot="suffix"></iron-icon>
        </paper-input>
        <input id="image" type="file" on-change="getFileName" accept=".jpg, .jpeg, .png">
      </div>
      <div class="submit">
        <paper-button on-tap="_saveProposal">Criar proposta</paper-button>
      </div>
`;
  }

  static get is() { return 'proposal-dialog'; }
  static get properties() {
    return {
      proposal: {
        type: Object,
        value: function () { return {}; }
      },
      proposals: {
        type: Array,
        value: [],
        notify: true
      },
      categories: {
        type: Array,
        value: ["Educação", "Gestão Pública e Economia", "Democracia de Alta Intensidade", "Infraestrutura", "Segurança Pública", "Pacto Federativo e Municipalismo", "Utilização dos recursos naturais", "Trabalho no campo a na cidade", "Esportes e cidades"]
      }
    };
  }
  static get observers() { return ['_validateProposal(proposal.*)']; }

  _validateProposal(proposal) {
    let valid = true;
  
    if (!this.proposal.title) {
      valid = false;
    }
    if (!this.proposal.category) {
      valid = false;
    }
    if (!this.proposal.description) {
      valid = false;
    }

    if(!valid) {
      this.shadowRoot.querySelector('paper-button').disabled = true;
    } else {
      this.shadowRoot.querySelector('paper-button').disabled = false;
    }
  }

  _saveProposal() {
    const proposal = JSON.parse(JSON.stringify(this.proposal));
    this.dispatchEvent(new CustomEvent('create-proposal', { detail: { proposal }}));
    this.proposal = {};
  }

  getFileName(e) {
    let filename = e.target.files[0].name;
    const input = this.shadowRoot.querySelector('.file-upload paper-input');
    input.value = filename;
  }
}
window.customElements.define(ProposalDialog.is, ProposalDialog);
