import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '../app-elements/app-constants.js';
import '../app-elements/app-besouro-api.js';

class ApiForgotPassword extends PolymerElement {
  static get template() {
    return html`
    <app-besouro-api id="api"></app-besouro-api>
    <app-constants id="constants"></app-constants>
    <iron-ajax
      id="ajax"
      content-type="application/json"
      handle-as="json"
      method="POST"
      url="{{_url}}"
      body='{"email":"{{_email}}"}'
      on-response="_onResponse"
      on-error="_onError"></iron-ajax>
    `;
  }

  static get is() { return `api-forgot-password`; }

  static get properties() {
    return {
      _url: String,
      _email: String
    };
  }

  request(email) {
    let validation = this._validate(email);
    if(validation.isValid) {
      let apiBaseUrl = this.$.api.baseUrl;
      this.$.api.authUrl = `${apiBaseUrl}/reset/`;
      this.$.api.authRequest().then((result) => {
        this._url = this.$.constants.api.forgotPassword;
        this._email = email;
        this.$.ajax.generateRequest();
      });
    } else {
      this._dispatch(validation.errors);
    }
  }

  _validate(token, id) {
    // TODO: Create validation
    return { isValid: true };
  }

  _hasAllRequiredData(response) {
    return this._hasRequiredData(response, `detail`);
  }

  _hasRequiredData(response, data) {
    if (data in response) {
      return true;
    } else {
      console.error(`api-forgot-password`, `${data} not found`);
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
        data: {
          message: `Se existe uma conta com este e-mail, um envio com instruções foi realizado.`
        }
      };
    } else {
      console.error(`api-forgot-password`, response);
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
    console.error(`api-forgot-password`, response);

    let result = {
      success: false,
      errors: {
        email: ``
      }
    };

    for(let key in response) {
      if(key in result.errors) {
        result.errors[key] = response[key].join(`\n`);
      }
    }

    this._dispatch(result);
  }
}

customElements.define(ApiForgotPassword.is, ApiForgotPassword);
