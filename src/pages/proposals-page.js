import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../polymerfire/firebase-document.js';
import '../../../polymerfire/firebase-storage-ref.js';
import '../../../polymerfire/firebase-query.js';
import '../../../@polymer/paper-spinner/paper-spinner.js';
import '../app-elements/shared-styles.js';
import '../campaign-elements/proposal-card.js';
import '../app-elements/app-form-header.js';
import '../app-elements/app-scrollable-dialog.js';
import '../campaign-elements/proposal-detail-dialog.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class ProposalsPage extends PolymerElement {
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
      .fill {
        padding: 20px;
        color: var(--secondary-text-color);
      }
      .spinner {
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%);
      }
     
    </style>

    <app-scrollable-dialog id="detail" modal="">
      <app-form-header slot="header" shadow="">
        <paper-icon-button slot="arrow-back" icon="app:close" on-tap="closeProposalDialog"></paper-icon-button>
        <span slot="main-title">{{proposal.content.title}}</span>
      </app-form-header>
      <proposal-detail-dialog proposal="{{proposal}}" data="{{data}}" on-close-dialog="_dismiss"></proposal-detail-dialog>
    </app-scrollable-dialog>

    <app-route route="{{route}}" pattern="/proposals/:key" data="{{data}}">
    </app-route>

    <firebase-query id="query" path="/proposals/{{data.key}}" data="{{proposals}}">
    </firebase-query>

    <firebase-document id="document" path="/campaigns/{{data.key}}" data="{{campaign}}">
    </firebase-document>

    <app-header-layout has-scrolling-region="">
      <app-form-header slot="header" shadow="">
        <paper-icon-button slot="arrow-back" icon="app:back" on-tap="_returnToCampaign"></paper-icon-button>
        <span slot="main-title">Propostas</span>
        <paper-icon-button slot="more-vert" icon="app:more-vert"></paper-icon-button>
      </app-form-header>
      <dom-if if="{{proposals.length}}">
        <template>
          <div class="fill">
            <template id="proposalsList" is="dom-repeat" items="{{proposals}}" as="proposal">
              <proposal-card proposal="{{proposal}}" key="{{proposal.key}}" on-open-detail="openProposalDetail"></proposal-card>
            </template>
          </div>
        </template>
      </dom-if>
    </app-header-layout>

    <dom-if if="{{!proposals.length}}">
      <template>
        <div class="spinner">
          <paper-spinner active=""></paper-spinner>
        </div>
      </template>
    </dom-if>
`;
  }

  static get is() { return 'proposals-page'; }
  static get properties() {
    return {
      route: {
        type: Object,
        notify: true
      },
      data: Object,
      proposals: {
        type: Array
      },
      proposal: Object,
      campaign: {
        type: Object
      }
    };
  }

  openProposalDetail(e) {
    const data = e.model.get('proposal');
    this.proposal = data;
    this.$.detail.present();
  }

  _returnToCampaign() {
    this.set('route.path', `/show-campaign/${this.data.key}`);
  }

  _dismiss() {
    this.$.detail.dismiss();
  }

  closeProposalDialog() {
    this.$.detail.close();
  }
}

window.customElements.define(ProposalsPage.is, ProposalsPage);
