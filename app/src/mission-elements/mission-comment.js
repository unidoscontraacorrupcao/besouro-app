import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import '../app-elements/app-besouro-api.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import {CommonBehaviorsMixin} from '../mixin-elements/common-behaviors-mixin.js';
class MissionComment extends CommonBehaviorsMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
      }

      .mission-comment {
        padding: 0px;
        display: flex;
      }

      .user-image img {
        display: inline-block;
        width: 50px;
        height: 50px;
        overflow: hidden;
        margin: 10px;
      }
      .card-content {
        margin-top: -22px;
        display: flex;
        flex-direction: column;
      }
      .card-content h3 {
        color: rgba(51,51,51,1);
        font-family: Folio;
        margin-bottom: 10px;
      }

      .card-content p {
        margin-top: 0;
        font-size: 1em;
        line-height: 1;
        font-family: helvetica-light;
        color:rgba(51,51,51,1);
      }

      .author-photo iron-image {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        background-color: var(--dark-primary-color);
        margin-right: 10px;
      }

    </style>
    <app-besouro-api id="api"></app-besouro-api>

    <div class="card mission-comment">
        <div class="author-photo">
          <iron-image src="{{userPhoto}}" sizing="cover"></iron-image>
        </div>
      <div class="card-content">
        <h3> {{userName}} </h3>
        <p> {{comment.comment}} </p>
      </div>
    </div>
`;
  }

  static get is() { return 'mission-comment'; }
  static get properties() {
    return {
      comment: {
        type: Object,
        value: function() {},
        observer: '_commentChanged'
      },
      key: String,
      userPhoto: String,
      userName: String
    }
  }

  _setCommentInfos() {
    this.$.api.method = "GET";
    this.$.api.path = `profiles/${this.comment.user.profile_id}/`;
    this.$.api.request().then((ajax) => {
      if (ajax.response.image != null) {
        this.set("userPhoto", ajax.response.image);
      } else {
        this.set("userPhoto", '/images/generic/avatar_default-thumb.png');
      }
      this.set("userName", this.parseDisplayName(this.comment.user.display_name));
    });
  }

  _commentChanged() {
    if (!this.comment) return;
    if (!this.comment.user) return;
    this._setCommentInfos();
  }
}
customElements.define(MissionComment.is, MissionComment);
