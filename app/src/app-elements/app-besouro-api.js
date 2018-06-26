import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-ajax/iron-request.js';

class AppBesouroApi extends PolymerElement {

  static get template() {
    return html`
    <iron-ajax
    id="ajax"
    url={{baseUrl}}/api/v1/{{path}}
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
        value: "http://192.168.0.22:8000"
      },
      method: {
        type: String
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
    if (this.method == "POST")
      this.$.ajax.headers = this.getHeaders();
    else
      this.$.ajax.headers = {};
    return this.$.ajax.generateRequest().completes;
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
