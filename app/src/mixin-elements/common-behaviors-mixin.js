import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/**
 * My Mixin
 * @polymer
 * @mixinFunction
 * @polymerMixin
 */
let behaviors = function(superClass) {
  return class extends superClass {

    insertDescriptionHtml(selector) {
      var element = this.shadowRoot.querySelector(selector);
      element.innerHTML = '';
      element.insertAdjacentHTML('afterbegin', this.mission.description);
    }

    insertRewardHtml(selector) {
      var element = this.shadowRoot.querySelector(selector);
      element.innerHTML = '';
      element.insertAdjacentHTML('afterbegin', this.mission.reward);
    }

    stripHtmlTags(html) {
      var tmp = document.createElement("div");
      tmp.innerHTML = html;
     return tmp.textContent || tmp.innerText || "";
    }

    hideLoading() {
      const loading = this.shadowRoot.querySelector("#loading");
      if(loading)
        loading.setAttribute("style", "display:none");
    }

    showLoading() {
      const loading = this.shadowRoot.querySelector("#loading");
        if(loading)
        loading.setAttribute("style", "display:block");
    }

    parseDisplayName(displayName) {
      if(displayName.indexOf(".") != -1) {
        return displayName.split(".")[1];
      } else {
        return displayName;
      }
    }

    getUser() { return JSON.parse(localStorage.getItem("user")); }
    resetUser() { localStorage.removeItem('user'); }
    saveUser(user) { localStorage.setItem("user", JSON.stringify(user)); }


  }
}

export const CommonBehaviorsMixin  = dedupingMixin(behaviors);
