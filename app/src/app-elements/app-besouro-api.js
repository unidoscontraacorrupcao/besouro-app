import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-ajax/iron-request.js';

class AppBesouroApi extends PolymerElement {

  static get template() {
    return html`
    <iron-ajax
    id="ajax"
    url="{{baseUrl}}/api/v1/{{path}}"
    body='{{body}}'
    params={{params}}
    headers="{{getHeaders()}}"
    handle-as="json"
    content-type="{{contentType}}"
    method={{method}}
    loading
    withCredentials
    debounce-duration="300"></iron-ajax>

    <iron-ajax
    id="authAjax"
    url="{{authUrl}}"
    body='{{body}}'
    params={{params}}
    headers="{{getHeaders()}}"
    handle-as="json"
    content-type="{{contentType}}"
    method={{method}}
    loading
    withCredentials
    debounce-duration="300"></iron-ajax>

    <iron-request id="xhr"></iron-request>
    `
  }

  static get is() { return "app-besouro-api"; }
  static get properties() {
    return {
      baseUrl: {
        type: String,
        value: "http://localhost:8000"
      },
      authUrl: {
        type: String,
        value: ""
      },
      method: {
        type: String,
        value: "GET"
      },
      path: {
        type: String,
        value: ""
      },
      body: String,
      params: Object,
      contentType: {
        type: String,
        value: "application/json"
      },
      user: Object,
      xhrData: Object
  }
  }

  request() {
    this.$.ajax.headers = this.getHeaders();
    if (this.url == `${this.baseUrl}/reset/`)
      this.$.ajax.url = `${this.baseUrl}/reset/`;
    if (this.url == `${this.baseUrl}/rest-auth/facebook/`)
      this.$.ajax.url = `${this.baseUrl}/rest-auth/facebook/`;
    return this.$.ajax.generateRequest().completes;
  }

  authRequest() {
    this.$.authAjax.url = this.authUrl;
    this.$.authAjax.headers = this.getHeaders();
    return this.$.authAjax.generateRequest().completes;
  }

  xhrRequest() {
    this.xhrData["headers"] = this.getHeaders();
    return this.$.xhr.send(this.xhrData);
  }

  getHeaders() {
    // This token is from a ej_user.
    // I used this command to genenrate it: ./manage.py drf_create_token <username>
    if (!this.user) return {};
    return {"authorization": `Token ${this.user.key}`};
  }
}

customElements.define(AppBesouroApi.is, AppBesouroApi);
