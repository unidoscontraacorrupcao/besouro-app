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
      this.shadowRoot.querySelector("#loading").setAttribute("style", "display:none");
    }

    showLoading() {
      this.shadowRoot.querySelector("#loading").setAttribute("style", "display:block");
    }

    parseDisplayName(displayName) {
      if(displayName.indexOf(".") != -1) {
        return displayName.split(".")[1];
      } else {
        return displayName;
      }
    }
  }
}

export const CommonBehaviorsMixin  = dedupingMixin(behaviors);
