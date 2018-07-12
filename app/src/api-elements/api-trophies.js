import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '../app-elements/app-constants.js';

class ApiTrophies extends PolymerElement {
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

  static get is() { return `api-trophies`; }

  static get properties() {
    return {
      _url: String,
      _headers: Object
    };
  }

  request(token, user_id) {
    let validation = this._validate(token);
    if(validation.isValid) {
      this._url = this.$.constants.api.trophies;
      this._headers = {
        'Authorization': `Token ${token}`
      };
      this.$.ajax.generateRequest();
    } else {
      this._dispatch(validation.errors);
    }
  }

  _validate(token) {
    // TODO: Create validation
    return { isValid: true };
  }

  _hasAllRequiredData(response) {
    return response.results.length > 0;
  }

  _hasRequiredData(response, data) {
    if (data in response) {
      return true;
    } else {
      console.error(`api-trophies`, `${data} not found`);
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
        data: response.results
      };
    }
    this._dispatch(result);
  }

  _onError(e, iron) {
    let response = iron.request.xhr.response;
    console.error(`api-trophies`, response);

    let result = {
      success: false,
      errors: {}
    };

    this._dispatch(result);
  }
}

customElements.define(ApiTrophies.is, ApiTrophies);
