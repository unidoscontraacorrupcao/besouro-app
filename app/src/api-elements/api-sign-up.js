import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '../app-elements/app-constants.js';

class ApiSignUp extends PolymerElement {
  static get template() {
    return html`
    <app-constants id="constants"></app-constants>
    <iron-ajax
      id="ajax"
      content-type="application/json"
      handle-as="json"
      method="POST"
      url="{{_url}}"
      body='{"username":"{{_email}}","email":"{{_email}}","password1":"{{_password}}","password2":"{{_password}}"}'
      on-response="_onResponse"
      on-error="_onError"></iron-ajax>
    `;
  }

  static get is() { return "api-sign-up"; }

  static get properties() {
    return {
      _url: String,
      _email: String,
      _password: String
    };
  }

  ready() {
    super.ready();
    this._url = this.$.constants.api.signUp;
  }

  request(email, password) {
    let validation = this._validate(email, password);
    if(validation.isValid) {
      this._email = email;
      this._password = password;
      this.$.ajax.generateRequest();
    } else {
      this._dispatch(validation.errors);
    }
  }

  _validate(email, password) {
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
      console.error("api-sign-up", response);
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
    console.error("api-sign-up", response);

    let result = {
      success: false,
      errors: {
        email: "",
        password1: ""
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

customElements.define(ApiSignUp.is, ApiSignUp);
