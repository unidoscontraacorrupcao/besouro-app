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

    #vote { display: flex; }

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

    #voteMore { display: none; }
    #voteMore a, #voteMore span { color: white; }
    #voteMore a { text-decoration: underline; }
    #voteMore span { text-transform: none; }

    </style>
    <app-besouro-api id="api"></app-besouro-api>

    <div class="modal-header">
      <div class="header-content">
        <div id="header-text"><span>{{headerText}}</span></div>
        <div class="icon-header">
          <paper-icon-button
            slot="suffix"
            icon="app:opinion">
          </paper-icon-button>

          <paper-icon-button
            on-tap="_dismiss"
            id="closeModal"
            icon="app:closeModal">
          </paper-icon-button>
        </div>
      </div>
      <div id="confirmation-text">
      <span>
          {{confirmationText}}
      </span>
      <div id="comment">
        {{currentComment.content}}
      </div>
      <div id="voteMore">
        <a on-tap="_voteMore"><span>vote em mais 3 opiniões</span></a>
      </div>
      <div id="vote">
        <div class="voteContainer">
          <div>
            <paper-icon-button
              id="agree"
              on-tap="_agreeVote"
              icon="app:agree">
            </paper-icon-button>
          </div>
          <span>concordo</span>
        </div>
        <div class="voteContainer">
          <div>
            <paper-icon-button
              id="skip"
              on-tap="_skipVote"
              icon="app:skip">
            </paper-icon-button>
          </div>
          <span>passo</span>
        </div>
        <div class="voteContainer">
          <div>
            <paper-icon-button
              id="disagree"
              on-tap="_disagreeVote"
              icon="app:disagree">
            </paper-icon-button>
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
      mission: Object,
      mission_id: String,
      conversation_id: String,
      redirectToMission: {
        type: Boolean,
        value: true
      },
      comments:  Array,
      currentCommentIdx: Number,
      currentComment: Object,
      headerText:{
        type: String,
        value: "queremos ouvir sua opinião"
      },
      confirmationText:{
        type: String,
        value: "Vote e nos ajude a identificar ideias e ações \
      importantes para melhorar a campanha."
      }
    }
  }

  getConversation(cid=false, mid=false) {
    this.$.api.method = "GET";
    if (cid && mid) {
      this.$.api.path = `missions/${mid}/conversations/${cid}/comments`;
      this.set("conversation_id", cid);
      this.set("mission_id", mid);
    }
    else {
      this.$.api.path = `missions/${this.mission_id}/conversations/${this.conversation_id}/comments`;
    }
    this._prepareConversationModal();
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
      this._finishConversation();
    }
  }

  _finishConversation() {
    this.dispatchEvent(new CustomEvent('change-modal-bg', { detail: {}}));
    this.headerText = "parabéns!";
    this.confirmationText = "";
    this.set("currentComment.content", "Suas opiniões são muito importantes \
      para identificar quais informações são de seu interesse, medir a \
      importância que o combate à corrupção tem no Brasil e melhorar as \
      estratégias da campanha!");
    this.$.voteMore.style.display = "block";
    this.$.comment.style.color = "white";
    this.$.vote.style.display = "none";
    this.shadowRoot.querySelector("#comment-count").style.display = "none";
    //if (this.mission.pending_conversations.length == 1) {
    //  this.$.voteMore.style.display = "none";
    //}
  }

    _prepareConversationModal() {
      this.dispatchEvent(new CustomEvent('restore-modal-bg', { detail: {}}));
      this.headerText = "queremos ouvir sua opinião";
      this.confirmationText = "Vote e nos ajude a identificar ideias e ações \
        importantes para melhorar a campanha.";
      this.$.voteMore.style.display = "none";
      this.$.comment.style.color = "rgba(51,51,51,1)";
      this.$.vote.style.display = "flex";
      this.shadowRoot.querySelector("#comment-count").style.display = "block";
    }

  _vote(choice) {
    var user = JSON.parse(localStorage.getItem("user"));
    this.$.api.body = {"comment": this.currentComment.id,
      "choice": choice, "author": user.uid};
    this.$.api.path = `votes/`;
    this.$.api.user = user;
    this.$.api.method = "POST";
    this.$.api.request().then(function (ajax) {
      this._nextComment();
    }.bind(this));
  }

  _agreeVote() { this._vote(1) };
  _disagreeVote() { this._vote(-1) };
  _skipVote() { this._vote(0) };
  _voteMore() { this.getConversation(); }
  _dismiss() { this.dispatchEvent(new CustomEvent('close-modal')); }
}
window.customElements.define(ConversationModal.is, ConversationModal);
