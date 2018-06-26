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
        value: "http://localhost:8000"
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
      }
  }
  }

  request() {
    return this.$.ajax.generateRequest().completes;
  }

  xhrRequest(args) {
    let data = args;
    data["headers"] = this.getHeaders();
    return this.$.xhr.send(data);
  }

  getHeaders() {
    // This token is from a ej_user.
    // I used this command to genenrate it:/manage.py drf_create_token <username>
    return {"authorization": "Token f9561452ed1c1c8575b81f5e02b58c7906c849ee"};
  }
}

customElements.define(AppBesouroApi.is, AppBesouroApi);
