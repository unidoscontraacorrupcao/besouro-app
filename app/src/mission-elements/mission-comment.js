import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class MissionComment extends PolymerElement {
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
        flex: 1;
        margin-top: -22px;
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
    <div class="card mission-comment">
        <div class="author-photo">
          <iron-image src="{{comment.ownerPhoto}}" sizing="cover"></iron-image>
        </div>
      <div class="card-content">
        <h3> {{userName()}} </h3>
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
        value: function() {}
      },
      key: String,
      userPhoto: String
    }
  }

  userName() {
    var name = this.comment.user.display_name.split(".")[1];
    if (name != undefined)
      return this.comment.user.display_name.split(".")[1];
    else
      return this.comment.user.name;
  }
}
customElements.define(MissionComment.is, MissionComment);
