import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '../app-elements/app-constants.js';

class ApiLogout extends PolymerElement {
  static get template() {
    return html`
    <app-constants id="constants"></app-constants>
    <iron-ajax
      id="ajax"
      content-type="application/json"
      handle-as="json"
      method="POST"
      url="{{_url}}"
      headers={{_headers}}
      on-response="_onResponse"
      on-error="_onError"></iron-ajax>
    `;
  }

  static get is() { return `api-logout`; }

  static get properties() {
    return {
      _url: String,
      _headers: String
    };
  }

  ready() {
    super.ready();
    this._url = this.$.constants.api.logout;
  }

  request(token) {
    let validation = this._validate(token);
    if(validation.isValid) {
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

  _dispatch(result) {
    this.dispatchEvent(new CustomEvent('result', { detail: result }));
  }

  _onResponse(e) {
    this._dispatch({success: true});
  }

  _onError(e, iron) {
    let response = iron.request.xhr.response;
    console.error(`api-logout`, response);

    let result = {
      success: false,
      errors: {}
    };

    this._dispatch(result);
  }
}

customElements.define(ApiLogout.is, ApiLogout);
