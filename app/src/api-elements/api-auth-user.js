import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '../app-elements/app-constants.js';

class ApiAuthUser extends PolymerElement {
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

  static get is() { return "api-auth-user"; }

  static get properties() {
    return {
      _url: String,
      _headers: Object
    };
  }

  ready() {
    super.ready();
    this._url = this.$.constants.api.authUser;
  }

  request(token) {
    let validation = this._validate(token);
    if(validation.isValid) {
      this._headers = {
        "authorization": `Token ${token}`
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
    let response = e.detail.xhr.response;

    let result = {};
    if("pk" in response) {
      result = {
        success: true,
        data: {
          id: response.pk
        }
      };
    } else {
      console.error("api-auth-user", response);
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
    console.error("api-auth-user", response);

    let result = {
      success: false,
      errors: {}
    };

    this._dispatch(result);
  }
}

customElements.define(ApiAuthUser.is, ApiAuthUser);
