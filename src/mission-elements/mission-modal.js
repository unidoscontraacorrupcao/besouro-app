import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../vaadin-date-picker/vaadin-date-picker.js';
import '../../../share-menu/share-menu.js';
import '../app-elements/app-icons.js';
import '../app-elements/app-dialog.js';
import '../app-elements/shared-styles.js';
import '../app-elements/app-confirmation-icon.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class MissionModal extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
      }

      .confirmation-icon, .confirmation-text {
        margin: auto;
        text-align: center;
      }

      .confirmation-icon { width: 50%; }

      .confirmation-text { width: 80%; }

      .modal-header { width: 100%; }


    iron-icon {
        --iron-icon-width: 50%;
        --iron-icon-height: 50%;
    }

    </style>
      <div class="modal-header">
      <app-confirmation-icon>Missão criada com sucesso</app-confirmation-icon>
      <div class="confirmation-text">
        <p>Quanto mais pessoas souberem da sua missão maiores são as chances de alcançarmos nosso objetivo por isso não perca tempo e compartilhe em suas redes sociais </p>
      <div class="buttons">
        <paper-button class="accent block" on-tap="_shareMision">Compartilhar</paper-button>
        <share-menu id="shareMenu" title="{{mission.content.title}}" text="{{mission.content.description}}" url="{{address}}/{{mission.\$key}}" enabled-services="[&quot;telegram&quot;, &quot;facebook&quot;, &quot;whatsapp&quot;, &quot;email&quot;, &quot;clipboard&quot;]"></share-menu>
      </div>
      </div>
      </div>
`;
  }

  static get is() { return 'mission-modal'; }

  static get properties() {
    return {
      mission: {
        type: Object,
        value: function() {}
      },
      address: {
        type: String,
        value: function() {return window.location.origin.concat('/show-mission')}
      },
      modalTitle: {
        type: String,
        value: "Missão criada com sucesso"
      },
      modalDescription: {
        type: String,
        value: "Quanto mais pessoas souberem da sua missão maiores são as chances de alcançarmos nosso objetivo por isso não perca tempo e compartilhe em suas redes sociais"
      }
    }
  }

  _shareMision(e) {
    document.body.appendChild(this.$.shareMenu);
    this.$.shareMenu.share();
  }

  constructor() {
    super();
  }

  ready() {
    super.ready();
    this.$.shareMenu.addEventListener('iron-overlay-closed', function() {
      this.dispatchEvent(new CustomEvent('finished', {}));
    });
  }
}
customElements.define(MissionModal.is, MissionModal);
