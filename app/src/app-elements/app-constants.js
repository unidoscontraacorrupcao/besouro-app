import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class AppConstants extends PolymerElement {
  static get template() { return html``; }
  static get is() { return "app-constants"; }
  static get properties() {
    return {
      api: {
        type: Object,
        readOnly: true,
        value: function() {
          // API Constants
          const HOSTNAME = "http://localhost:8000/";
          const V1_ENDPOINT = `${HOSTNAME}api/v1/`;
          const AUTH_ENDPOINT = `${HOSTNAME}rest-auth/`;

          const API_LOGIN = `${AUTH_ENDPOINT}login/`;
          const API_SIGN_UP = `${AUTH_ENDPOINT}registration/`;
          const API_LOGOUT = `${AUTH_ENDPOINT}logout/`;
          const API_AUTH_USER = `${AUTH_ENDPOINT}user/`;

          const API_USERS = `${V1_ENDPOINT}users/`;

          return {
            hostname: HOSTNAME,
            v1: V1_ENDPOINT,
            auth: AUTH_ENDPOINT,
            login: API_LOGIN,
            signUp: API_SIGN_UP,
            logout: API_LOGOUT,
            authUser: API_AUTH_USER,
            users: API_USERS
          }
        }
      }
    };
  }

}

customElements.define(AppConstants.is, AppConstants);