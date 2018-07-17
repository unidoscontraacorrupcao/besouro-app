import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '../app-elements/app-constants.js';

class ApiUpdateProfile extends PolymerElement {
  static get template() {
    return html`
    <app-constants id="constants"></app-constants>
    <iron-ajax
      id="ajax"
      content-type="application/json"
      handle-as="json"
      method="PUT"
      url="{{_url}}"
      headers={{_headers}}
      body='{{_body}}'
      on-response="_onResponse"
      on-error="_onError"></iron-ajax>

    <iron-ajax
      id="imageAjax"
      method="PUT"
      url="{{_url}}"
      headers={{_imageHeaders}}
      on-response="_onResponse"
      on-error="_onError"></iron-ajax>
    `;
  }

  static get is() { return `api-update-profile`; }

  static get properties() {
    return {
      _url: String,
      _headers: Object,
      _body: Object,
      _imageHeaders: Object
    };
  }

  request(token, id, data) {
    let validation = this._validate(token, id, data);
    if(validation.isValid) {
      this._url = this.$.constants.api.profile.replace(`:profile_id`, id);
      this._headers = {
        'Authorization': `Token ${token}`
      };
      this._body = {
        race: data.race,
        gender: data.gender,
        gender_other: data.gender == 20 ? data.genderOther : ``,
        country: data.country,
        state: data.state,
        city: data.city,
        phone: data.phone,
        age: data.age
      };
      this.$.ajax.generateRequest();
    } else {
      this._dispatch(validation.errors);
    }
  }

  imageRequest(token, id, image) {
    let validation = this._validate(token, id);
    if(validation.isValid) {
      this._url = this.$.constants.api.profile.replace(`:profile_id`, id);
      this._imageHeaders = {
        'Authorization': `Token ${token}`,
        'Accept': `application/json`
      };
      let formData = new FormData();
      formData.append('image', image);
      this.$.imageAjax.body = formData;
      return this.$.imageAjax.generateRequest().completes;
    } else {
      this._dispatch(validation.errors);
    }
  }

  _validate(token, id, data) {
    // TODO: Create validation
    return { isValid: true };
  }

  _validateImage(token, id, image) {
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
      console.error(`api-update-profile`, `${data} not found`);
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
          image: response.image != null ? response.image : `/images/generic/avatar_default-perfil.png`
        }
      };
    } else {
      console.error(`api-update-profile`, response);
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
    console.error(`api-update-profile`, response);

    let result = {
      success: false,
      errors: {
        image: "image" in response ? response.image.join("\n") : ``
      }
    };

    this._dispatch(result);
  }
}

customElements.define(ApiUpdateProfile.is, ApiUpdateProfile);
