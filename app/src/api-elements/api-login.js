import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '../app-elements/app-constants.js';

class ApiLogin extends PolymerElement {
  static get template() {
    return html`
    <app-constants id="constants"></app-constants>
    <iron-ajax
      id="ajax"
      content-type="application/json"
      handle-as="json"
      method="POST"
      url="{{_url}}"
      body='{"username":"{{_username}}","password":"{{_password}}"}'
      on-response="_onResponse"
      on-error="_onError"></iron-ajax>
    `;
  }

  static get is() { return "api-login"; }

  static get properties() {
    return {
      _url: String,
      _username: String,
      _password: String
    };
  }

  ready() {
    super.ready();
    this._url = this.$.constants.api.login;
  }

  request(username, password) {
    let validation = this._validate(username, password);
    if(validation.isValid) {
      this._username = username;
      this._password = password;
      this.$.ajax.generateRequest();
    } else {
      this._dispatch(validation.errors);
    }
  }

  _validate(username, password) {
    // TODO: Create validation
    return { isValid: true };
  }

  _dispatch(result) {
    this.dispatchEvent(new CustomEvent('result', { detail: result }));
  }

  _onResponse(e) {
    let response = e.detail.xhr.response;

    let result = {};
    if("key" in response) {
      result = {
        success: true,
        data: {
          key: response.key
        }
      };
    } else {
      console.error("api-login", response);
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
    console.error("api-login", response);

    let result = {
      success: false,
      errors: {
        username: "",
        password: "",
        non_field_errors: ""
      }
    };

    for(let key in response) {
      if(key in result.errors) {
        result.errors[key] = response[key].join("\n");
      }
    }

    this._dispatch(result);
  }
}

customElements.define(ApiLogin.is, ApiLogin);
