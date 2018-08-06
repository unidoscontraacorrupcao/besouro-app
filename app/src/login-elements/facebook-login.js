import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

import '../app-elements/app-besouro-api.js';
import '../app-elements/app-constants.js';
class FacebookLogin extends PolymerElement {
  static get template() {
    return html`
      <style></style>
      <app-besouro-api id="api"></app-besouro-api>
      <app-constants id="constants"></app-constants>
    `;
  }

  static get is() { return `facebook-login`; }

  static get properties() {
    return {
      _toastMessage: String,
      _login: Object,
      _signUp: Object,
      _forgotPassword: Object,
      _user: {
        type: Object,
        value: {}
      }
    };
  }

  constructor() { super(); }

  login() {
    // get user fb authorization
    var userToken;
    var user_id;
    var profile_id;
    var fbProfileData;
    var profile;
    window.FB.login(function(response) {
      if (response.authResponse) {
        let accessToken = response.authResponse.accessToken;
        // get user fb data
        window.FB.api('/v3.0/me', function(response) {
          var fbProfileData = response;
          let apiBaseUrl = this.$.api.baseUrl;
          this.$.api.authUrl = `${apiBaseUrl}/reset/`;
          this.$.api.authRequest().then((ajax) => {  return {};
          }).then(() => {
            return this._sendOauthToken(apiBaseUrl, accessToken);
          }).catch((error) => {
            var errors = {"email": "email do facebook já cadastrado na plataforma."};
            this.dispatchEvent(new CustomEvent(`error`, { detail: errors } ));
          }).then((ajax) => {
            userToken = ajax.response.key;
            return this._getUserIdFromToken(userToken);
          }).then((ajax) => {
            user_id = ajax.response.pk;
            return this._getProfileIdFromUserId(user_id, userToken);
          }).then((ajax) => {
            profile = ajax.response;
            profile_id = this._getProfileFromUrl(ajax.response.links.self);
            return this._getFBProfilePhoto(fbProfileData);
          }).then((blob) => {
            return this._postFbData(blob, userToken, profile_id);
          }).then(() => {
            return this._updateUserData(fbProfileData, userToken, user_id, profile, profile_id);
          }).then(() => {
            this._checkUserChannels(this._user);
            this.dispatchEvent(new CustomEvent(`success`, { detail: this._user } ));
          });
        }.bind(this), {fields: "picture, email, name"});
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }.bind(this), {"scope": "email,public_profile"});
  }

  /**
   * Send facebook access token to django auth middleware.
   *
   * @param {string} baseUrl The api base url (localhost:8000/)
   * @param {string} accessToken facebook access token
   * @returns {string} django api access token.
   */
  _sendOauthToken(baseUrl, accessToken) {
    this.$.api.authUrl = `${baseUrl}/rest-auth/facebook/`;
    this.$.api.method = "POST";
    this.$.api.body = {"access_token":accessToken};
    return this.$.api.authRequest();
  }

  _getUserIdFromToken(accessToken) {
    this.$.api.authUrl = this.$.constants.api.authUser;
    this.$.api.method = "GET";
    this.$.api.user ={"key": accessToken};
    return this.$.api.authRequest();
  }

  _getProfileIdFromUserId(id, accessToken) {
    this.$.api.authUrl = this.$.constants.api.userProfile.replace(`:user_id`, id);
    this.$.api.method = "GET";
    this.$.api.user = {"key": accessToken};
    return this.$.api.authRequest();
  }

  _getFBProfilePhoto(fbProfileData) {
    var fbApiUrl = "https://graph.facebook.com";
    let _fbPhotoUrl = `${fbApiUrl}/${fbProfileData.id}/picture?type=large`;
    this._user.photoURL = _fbPhotoUrl;
    return fetch(_fbPhotoUrl).then(function(response){
      return response.blob();
    });
  }

  _postFbData(blob, userToken, profile_id) {
    var fbPhoto = new File([blob], "facebook_photo.jpeg");
    var formData = new FormData();
    formData.append("image", fbPhoto);
    this.$.api.user = {"key": userToken};
    this.$.api.xhrData = { method: "put",
      url: `${this.$.api.baseUrl}/api/v1/profiles/${profile_id}/`,
      body: formData };
    return this.$.api.xhrRequest();
  }

  _getProfileFromUrl(profile_url) {
    return profile_url.split("/")[profile_url.split("/").length - 2]
  }

  _updateUserData(fbProfileData, userToken, user_id, profile, profile_id) {
    this._user.email = fbProfileData.email;
    this._user.city = profile.city;
    this._user.state = profile.state;
    this._user.country = profile.country;
    this._user.gender = profile.gender;
    this._user.genderOther = profile.genderOther;
    this._user.race = profile.race;
    this._user.phone = profile.phone;
    this._user.age = profile.age;
    this._user.displayName = `${fbProfileData.name}`;
    this._user.key = userToken;
    this._user.uid = user_id;
    this._user.profile_id = profile_id;
    this.$.api.user = {"key": userToken};
    this.$.api.method = "PATCH";
    this.$.api.body = {"email": fbProfileData.email,
      "display_name": `.${fbProfileData.name}`};
    this.$.api.path = `users/${user_id}/`;
    this.$.api.url = `${this.$.api.baseUrl}/api/v1/${this.$.api.path}`;
    return this.$.api.request();
  }

  _initializeFBSDK() {
    window.fbAsyncInit = function() {
      FB.init({
        appId            : '270821273677451',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v3.0'
      });
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  ready() {
    super.ready();
    this._initializeFBSDK();
  }

  _checkUserChannels(user) {
    this.$.api.method = "PUT";
    this.$.api.path = `channels/check-user-channels/${user.uid}/`;
    this.$.api.user = {"key": user.key};
    this.$.api.body = {};
    this.$.api.request().then((ajax) => {
     console.log(ajax.response);
    }, (error) => {
      console.log(error);
    });
  }
}

window.customElements.define(FacebookLogin.is, FacebookLogin);
