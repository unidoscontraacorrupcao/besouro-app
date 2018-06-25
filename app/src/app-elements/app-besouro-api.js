import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-ajax/iron-request.js';

class AppBesouroApi extends PolymerElement {

  static get template() {
    return html`
    <iron-ajax
    id="ajax"
    url={{baseUrl}}/{{path}}
    body='{{body}}'
    params={{params}}
    headers={{headers}}
    handle-as="json"
    content-type="{{contentType}}"
    method={{method}}
    loading
    debounce-duration="300"></iron-ajax>

    <iron-request id="xhr"></iron-request>
    `
  }

  static get is() { return "app-besouro-api"; }
  static get properties() {
    return {
      baseUrl: {
        type: String,
        value: "http://localhost:8000/api/v1"
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
      headers: {
        type: Object,
        value: {}
    }
  }
  }

  request() {
    return this.$.ajax.generateRequest().completes;
  }

  xhrRequest(args) {
    return this.$.xhr.send(args);
  }
}

customElements.define(AppBesouroApi.is, AppBesouroApi);
