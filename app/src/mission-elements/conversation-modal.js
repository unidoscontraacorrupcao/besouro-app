import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class ConversationModal extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
      }

      confirmation-icon,
      .confirmation-text {
        margin: auto;
        text-align: center;
      }

      .confirmation-icon {
        width: 100%;
        text-align: center;
      }

      .modal-header {
        width: 100%;
      }

      .header-content {
        background-color: var(--secondary-text-color);
        height: 76px;
        position: absolute;
        top: 0;
        width: 100%;
      }

      #header-text {
        padding: 30px 10px 20px 10px;
        text-align: center;
      }

      #header-text span, #confirmation-text span {
        text-transform: uppercase;
        font-family: folio;
      }

      #header-text span {
        font-size: 24px;
        color: white;
      }

      #confirmation-text {
        margin: 115px auto 34px auto;
        width: 80%;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 16px;
      }

      #confirmation-text p {
        font-family: helvetica-neue;
        font-size: 20px;
        line-height: 1.3;
        color: #333333;
        margin: 34px auto 40px auto;
        width: 90%;
      }

      iron-icon {
        --iron-icon-width: 50%;
        --iron-icon-height: 50%;
      }

      .icon-header {
        position: absolute;
        top: -20px;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
      }

      .icon-header paper-icon-button { padding: 0; }
      .icon-header #closeModal {
        position: absolute;
        right: 0;
        top: -15px;
        color: white;
        padding: 10px;
      }

      paper-button {
        float: right;
        font-size: 15px;
        padding-bottom: 25px;
     }

    #comment {
      font-family: helvetica-neue;
      margin: 34px auto 30px auto;
      font-size: 18px;
    }

    #vote {
      display: flex;
    }

    .voteContainer {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    #comment-count {
      background-color: var(--secondary-text-color);
      height: 22px;
      color: white;
      text-align: center;
      font-family: folio;
    }

    </style>
    <app-besouro-api id="api"></app-besouro-api>

    <div class="modal-header">
      <div class="header-content">
        <div id="header-text"><span>queremos ouvir sua opinião</span></div>
        <div class="icon-header">
          <paper-icon-button slot="suffix" icon="app:opinion"></paper-icon-button>
          <paper-icon-button on-tap="_dismiss" id="closeModal" icon="app:closeModal"></paper-icon-button>
        </div>
      </div>
      <div id="confirmation-text">
      <span>
            Vote e nos ajude a identificar ideias e ações
            importantes para melhorar a campanha.
      </span>
      <div id="comment">
        {{currentComment.content}}
      </div>
      <div id="vote">
        <div class="voteContainer">
          <div>
            <paper-icon-button id="agree" icon="app:agree"></paper-icon-button>
          </div>
          <span>concordo</span>
        </div>
        <div class="voteContainer">
          <div>
            <paper-icon-button id="pass" icon="app:pass"></paper-icon-button>
          </div>
          <span>passo</span>
        </div>
        <div class="voteContainer">
          <div>
            <paper-icon-button id="disagree" icon="app:disagree"></paper-icon-button>
          </div>
          <span>discordo</span>
        </div>
      </div>
      </div>
    <div id="comment-count">
      <span>{{currentCommentIdx}}/{{comments.length}}</span>
    </div>
    </div>
`;
  }

  static get is() { return 'conversation-modal'; }
  static get properties() {
    return {
      missionId: String,
      redirectToMission: {
        type: Boolean,
        value: true
      },
      comments: {
        type: Array,
        observer: '_getComment'
      },
      currentCommentIdx: Number,
      currentComment: Object
    }
  }
  _goToMission() {
    if (this.redirectToMission)
      this.dispatchEvent(new CustomEvent('modal-show-mission',
        { detail: { mission: this.missionId }}));
    else
      this.dispatchEvent(new CustomEvent('close-modal',
        { detail: {}}));
  }

  getConversation(mission) {
    if (mission.conversations.length == 0) return;
    this.$.api.path = `missions/${mission.id}/conversations/${mission.conversations[0]}/comments`;
    this.$.api.request().then(function(ajax) {
      this.set("comments", ajax.response);
      this.set("currentCommentIdx", 1);
      this.set("currentComment", ajax.response[0]);
    }.bind(this));
  }

  _nextComment() {
    if (!this.comments) return;
    if (this.comments.length > (this.currentCommentIdx)) {
      this.currentCommentIdx += 1;
      this.set('currentComment', this.comments[this.currentCommentIdx - 1]);
    }
    else {
      //show final content.
    }
  }

  _dismiss() { this.dispatchEvent(new CustomEvent('close-modal')); }
}
window.customElements.define(ConversationModal.is, ConversationModal);
