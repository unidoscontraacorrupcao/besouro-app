import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '../app-elements/app-constants.js';
import {CommonBehaviorsMixin} from '../mixin-elements/common-behaviors-mixin.js';

class ApiUser extends CommonBehaviorsMixin(PolymerElement) {
  static get template() {
    return html`
    <app-constants id="constants"></app-constants>
    <iron-ajax
      id="ajax"
      content-type="application/json"
      handle-as="json"
      method="GET"
      url="{{_url}}"
      headers={{_headers}}
      on-response="_onResponse"
      on-error="_onError"></iron-ajax>
    `;
  }

  static get is() { return `api-user`; }

  static get properties() {
    return {
      _url: String,
      _headers: Object
    };
  }

  request(token, id) {
    let validation = this._validate(token, id);
    if(validation.isValid) {
      this._url = this.$.constants.api.user.replace(':user_id', id);
      this._headers = {
        'authorization': `Token ${token}`
      };
      this.$.ajax.generateRequest();
    } else {
      this._dispatch(validation.errors);
    }
  }

  _validate(token, id) {
    // TODO: Create validation
    return { isValid: true };
  }

  _dispatch(result) {
    this.dispatchEvent(new CustomEvent('result', { detail: result }));
  }

  _onResponse(e) {
    let response = e.detail.xhr.response;

    let result = {};
    if(`id` in response) {
      result = {
        success: true,
        data: {
          email: response.email,
          displayName: this.parseDisplayName(response.display_name),
          isAdmin: response.is_superuser || response.is_staff
        }
      };
    } else {
      console.error(`api-user`, response);
      result = {
        success: false,
        errors: {
          notFound: true
        }
      };
    }
    this._dispatch(result);
  }

  _onError(e, iron) {
    let response = iron.request.xhr.response;
    console.error(`api-user`, response);

    let result = {
      success: false,
      errors: {}
    };

    this._dispatch(result);
  }
}

customElements.define(ApiUser.is, ApiUser);
