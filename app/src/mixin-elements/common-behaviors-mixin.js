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
  }
}

export const CommonBehaviorsMixin  = dedupingMixin(behaviors);
