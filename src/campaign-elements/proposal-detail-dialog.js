import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../polymerfire/firebase-storage-ref.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class ProposalDetailDialog extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
        height: 100vh;
      }
      iron-image{
        width: calc(100% + 48px);
        height: 200px;
        margin: 0 -24px;
      }
      p {
        margin-bottom: 20px;
      }

    </style>

    <firebase-storage-ref metadata="{{metadata}}" storage-uri="{{gsUri}}" download-url="{{downloadUrl}}" id="storage">
    </firebase-storage-ref>
    <template is="dom-if" if="{{downloadUrl}}">
      <iron-image sizing="cover" preload="" fade="" src="{{downloadUrl}}"></iron-image>
    </template>
    <div class="content">
      <h1>{{proposal.content.title}}</h1>
      <p>{{proposal.content.description}}</p>
    </div>
`;
  }

  static get is() { return 'proposal-detail-dialog'; }
  static get properties() {
    return {
      proposal: {
        type: Object,
        observer: '_setProposal'
      },
      data: Object
    };
  }

  _setProposal() {
    if(this.proposal && this.proposal.content.image) {
      this.$.storage.path = `proposals/${this.data.key}/${this.proposal.content.image}`;
    }
  }

  _dismiss(e) {
    this.dispatchEvent(new CustomEvent('close-dialog'));
  }
}
window.customElements.define(ProposalDetailDialog.is, ProposalDetailDialog);
