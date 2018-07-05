import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class AppConstants extends PolymerElement {
  static get template() { return html``; }
  static get is() { return `app-constants`; }
  static get properties() {
    return {
      api: {
        type: Object,
        readOnly: true,
        value: function() {
          // API Constants
          const HOSTNAME = `http://localhost:8000/`;
          const V1_ENDPOINT = `${HOSTNAME}api/v1/`;
          const AUTH_ENDPOINT = `${HOSTNAME}rest-auth/`;

          const API_LOGIN = `${AUTH_ENDPOINT}login/`;
          const API_SIGN_UP = `${AUTH_ENDPOINT}registration/`;
          const API_LOGOUT = `${AUTH_ENDPOINT}logout/`;
          const API_AUTH_USER = `${AUTH_ENDPOINT}user/`;
          const API_FORGOT_PASSWORD = `${AUTH_ENDPOINT}password/reset/`;
          const API_NEW_PASSWORD = `${API_FORGOT_PASSWORD}confirm/`;

          const API_USERS = `${V1_ENDPOINT}users/`;
          const API_USER = `${API_USERS}:user_id/`;
          const API_USER_PROFILE = `${API_USER}profile/`;
          const API_USER_TROPHIES= `${API_USER}trophies/`;
          const API_USER_TROPHY = `${API_USER_TROPHIES}?trophy=:trophy_key`;

          const API_PROFILES = `${V1_ENDPOINT}profiles/`;
          const API_PROFILE = `${API_PROFILES}:profile_id/`;

          const API_TROPHIES = `${V1_ENDPOINT}trophies/`;
          const API_TROPHY = `${V1_ENDPOINT}:trophy_key/`;

          return {
            hostname: HOSTNAME,
            v1: V1_ENDPOINT,
            auth: AUTH_ENDPOINT,
            login: API_LOGIN,
            signUp: API_SIGN_UP,
            logout: API_LOGOUT,
            authUser: API_AUTH_USER,
            forgotPassword: API_FORGOT_PASSWORD,
            newPassword: API_NEW_PASSWORD,
            users: API_USERS,
            user: API_USER,
            userProfile: API_USER_PROFILE,
            userTrophies: API_USER_TROPHIES,
            userTrophy: API_USER_TROPHY,
            profile: API_PROFILE,
            trophies: API_TROPHIES,
            trophy: API_TROPHY
          }
        }
      }
    };
  }

}

customElements.define(AppConstants.is, AppConstants);
