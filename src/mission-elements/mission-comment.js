import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../vaadin-date-picker/vaadin-date-picker.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
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
      }
      .card-content h3 {
        margin: 5px 0;
      }
      .card-content p {
        margin-top: 0;
        font-size: 1em;
        line-height: 1;
      }
    </style>
    <div class="card mission-comment">
      <div class="user-image">
        <img src="{{userPhoto}}">
      </div>
      <div class="card-content">
        <h3> {{comment.username}} </h3>
        <p> {{comment.text}} </p>
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
}
customElements.define(MissionComment.is, MissionComment);
