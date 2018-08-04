import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/**
 * My Mixin
 * @polymer
 * @mixinFunction
 * @polymerMixin
 */
let Mixin = function(superClass) {
  return class extends superClass {
    getNextConversation(mid, uid) {
      this.$.api.path = `missions/${mid}/conversations/user/${uid}`;
      this.$.api.method = "GET";
      return this.$.api.request();
    }
  }
}

export const MissionMixin = dedupingMixin(Mixin);
