import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '../app-elements/app-constants.js';

class ApiUserProfile extends PolymerElement {
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

  static get is() { return `api-user-profile`; }

  static get properties() {
    return {
      _url: String,
      _headers: Object
    };
  }

  request(token, id) {
    let validation = this._validate(token, id);
    if(validation.isValid) {
      this._url = this.$.constants.api.userProfile.replace(`:user_id`, id);
      this._headers = {
        'Authorization': `Token ${token}`
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

  _hasAllRequiredData(response) {
    return this._hasRequiredData(response, `city`) &&
      this._hasRequiredData(response, `state`) &&
      this._hasRequiredData(response, `country`) &&
      this._hasRequiredData(response, `gender`) &&
      this._hasRequiredData(response, `gender_other`) &&
      this._hasRequiredData(response, `race`) &&
      this._hasRequiredData(response, `phone`) &&
      this._hasRequiredData(response, `age`) &&
      this._hasRequiredData(response, `image`);
  }

  _hasRequiredData(response, data) {
    if (data in response) {
      return true;
    } else {
      console.error(`api-user-profile`, `${data} not found`);
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
          city: response.city,
          state: response.state,
          country: response.country,
          gender: response.gender,
          genderOther: response.gender_other,
          race: response.race,
          phone: response.phone,
          age: response.age,
          image: response.image != null ? response.image : `/images/default_avatar.png`
        }
      };
    } else {
      console.error(`api-user-profile`, response);
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
    console.error(`api-user-profile`, response);

    let result = {
      success: false,
      errors: {}
    };

    this._dispatch(result);
  }
}

customElements.define(ApiUserProfile.is, ApiUserProfile);
