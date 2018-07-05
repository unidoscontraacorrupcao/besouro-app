import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '../app-elements/app-constants.js';

class ApiUserTrophies extends PolymerElement {
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

  static get is() { return `api-user-trophies`; }

  static get properties() {
    return {
      _url: String,
      _headers: Object
    };
  }

  request(token, user_id) {
    let validation = this._validate(token, user_id);
    if(validation.isValid) {
      this._url = this.$.constants.api.userTrophies.replace(`:user_id`, user_id);
      this._headers = {
        'Authorization': `Token ${token}`
      };
      this.$.ajax.generateRequest();
    } else {
      this._dispatch(validation.errors);
    }
  }

  _validate(token, user_id) {
    // TODO: Create validation
    return { isValid: true };
  }

  _hasAllRequiredData(response) {
    return response.length > 0;
  }

  _hasRequiredData(response, data) {
    if (data in response) {
      return true;
    } else {
      console.error(`api-user-trophies`, `${data} not found`);
    }
  }

  _dispatch(result) {
    this.dispatchEvent(new CustomEvent(`result`, { detail: result }));
  }

  _onResponse(e) {
    let response = e.detail.xhr.response;

    let result = {};
    if(this._hasAllRequiredData(response)) {
      result = {
        success: true,
        data: response
      };
    } else {
      console.error(`api-user-trophies`, response);
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
    console.error(`api-user-trophies`, response);

    let result = {
      success: false,
      errors: {}
    };

    this._dispatch(result);
  }
}

customElements.define(ApiUserTrophies.is, ApiUserTrophies);
