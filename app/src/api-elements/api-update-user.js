import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '../app-elements/app-constants.js';

class ApiUpdateUser extends PolymerElement {
  static get template() {
    return html`
    <app-constants id="constants"></app-constants>
    <iron-ajax
      id="ajax"
      content-type="application/json"
      handle-as="json"
      method="PATCH"
      url="{{_url}}"
      headers={{_headers}}
      body='{"display_name":"{{_displayName}}"}'
      on-response="_onResponse"
      on-error="_onError"></iron-ajax>
    `;
  }

  static get is() { return "api-update-user"; }

  static get properties() {
    return {
      _url: String,
      _headers: Object,
      _displayName: String
    };
  }

  request(token, id, displayName) {
    let validation = this._validate(token, id, displayName);
    if(validation.isValid) {
      this._url = `${this.$.constants.api.users}${id}/`;
      this._headers = {
        "authorization": `Token ${token}`
      };
      this._displayName = `${displayName}`;
      this.$.ajax.generateRequest();
    } else {
      this._dispatch(validation.errors);
    }
  }

  _validate(token, id, displayName) {
    // TODO: Create validation
    return { isValid: true };
  }

  _dispatch(result) {
    this.dispatchEvent(new CustomEvent('result', { detail: result }));
  }

  _parseDisplayName(displayName) {
    if(displayName.indexOf(".") != -1) {
      return displayName.split(".")[1];
    } else {
      return displayName;
    }
  }

  _onResponse(e) {
    let response = e.detail.xhr.response;

    let result = {};
    if("id" in response) {
      result = {
        success: true,
        data: {
          email: response.email,
          displayName: this._parseDisplayName(response.display_name),
          isAdmin: response.is_superuser || response.is_staff
        }
      };
    } else {
      console.error("api-update-user", response);
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
    console.error("api-update-user", response);

    let result = {
      success: false,
      errors: {
        display_name: ""
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

customElements.define(ApiUpdateUser.is, ApiUpdateUser);
