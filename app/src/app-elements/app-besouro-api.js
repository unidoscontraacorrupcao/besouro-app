import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-ajax/iron-request.js';

/**
  * Component to communicate with besouro api.
  */
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
    method={{method}}>
    </iron-ajax>

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

  /**
   * Send requests for api endpoints
   */
  request() {
    this.$.ajax.headers = this.getHeaders();
    return this.$.ajax.generateRequest().completes;
  }

  /**
   * Send requests for non api endpoints
   */
  authRequest() {
    this.$.authAjax.url = this.authUrl;
    this.$.authAjax.headers = this.getHeaders();
    return this.$.authAjax.generateRequest().completes;
  }

  /**
   * Send xhr requests for api endpoints. Usefull for send form Data objects.
   */
  xhrRequest() {
    // iron-request is not updating the XMLHttpRequest readyState attribute,
    // so we will always recreate the iron-request component.
    const xhrComponent = document.createElement("iron-request");
    this.xhrData["headers"] = this.getHeaders();
    return xhrComponent.send(this.xhrData);
  }

  /**
   * Get headers from the user attribute. For requests like POST/PUT/PATH
   * set the user attribute with the django api key
   */
  getHeaders() {
    // This token is from a ej_user.
    // I used this command to genenrate it: ./manage.py drf_create_token <username>
    if (!this.user) return {};
    return {"authorization": `Token ${this.user.key}`};
  }
}

customElements.define(AppBesouroApi.is, AppBesouroApi);
