import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

class AppBesouroApi extends PolymerElement {

  static get template() {
    return html`
    <iron-ajax
    id="ajax"
    auto
    url={{baseUrl}}/{{path}}/
    body='{{body}}'
    params={{params}}
    handle-as="json"
    content-type="application/json"
    method={{method}}
    on-response="handleResponse"
    debounce-duration="300"></iron-ajax>
    `
  }

  static get is() { return "app-besouro-api"; }
  static get properties() {
    return {
      baseUrl: {
        type: String,
        value: "http://127.0.0.1:8000/api/v1"
      },
      method: {
        type: String
      },
      path: {
        type: String,
        value: ""
      },
      body: String,
      params: Object
    }
  }

  request() {
    this.$.ajax.generateRequest();
  }

  response() {
    this.$.ajax.lastResponse;
  }
}

customElements.define(AppBesouroApi.is, AppBesouroApi);

