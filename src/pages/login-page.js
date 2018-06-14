import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../app-elements/shared-styles.js';
import '../app-elements/app-dialog.js';
import '../login-elements/login-modal.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class LoginPage extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
      }
    </style>

    <app-dialog id="dialog" modal="" animated="">
      <login-modal id="login" shared-mission="{{sharedMissionID}}" user="{{user}}" status-known="{{statusKnown}}"></login-modal>
    </app-dialog>
`;
  }

  static get is() { return 'login-page'; }
  static get properties() {
    return {
      selected: Boolean,
      statusKnown: Boolean,
      user: {
        type: Object,
        notify: true
      },
      route: Object,
      data: Object,
      publicRoutes: {
        type: Array,
        value() {
          return [
            'campaigns',
            'show-campaign',
            'show-mission',
            'not-found'
          ];
        }
      },
      sharedMissionID: Boolean
    };
  }
  static get observers() {
    return ['_routeChanged(route.path, user, statusKnown)'];
  }

  _routeChanged(path, user, statusKnown) {
    if(!this.statusKnown) return;
    if(this.user) {
      if(this.selected) this.set('route.path', '/');
      this.$.dialog.dismiss();
    } else {
      const reducer = (isPublic, pub) => isPublic || path.includes(pub);
      if(this.publicRoutes.reduce(reducer, false)) {
        this.$.dialog.dismiss();
      } else {
        if (this.route.shared) {
          this.set("sharedMissionID", this.route.shared);
        }
        this.$.dialog.present();
      }
    }
  }

  toggleDialog(e) {
    if (e.detail.value) {

    }
  }

  open() {
    this.$.dialog.open();
  }

  signOut() {
    this.$.login.$.auth.signOut();
  }

  ready() {
    super.ready();
    this.$.login.addEventListener('returnToMission', function(e) {
      this.set("route.shared", {});
      this.set("route.path", `/show-mission/${e.detail.mission}`);
    }.bind(this));
  }
}

window.customElements.define(LoginPage.is, LoginPage);
