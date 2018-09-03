import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/**
 * My Mixin
 * @polymer
 * @mixinFunction
 * @polymerMixin
 */
let Mixin = function(superClass) {
  return class extends superClass {
    setCardImageGradient(colors, card=false, direction=false) {
      const cardAction = this.shadowRoot.querySelector(".card-action");
      if (cardAction)
        cardAction.setAttribute("style", "display: none;");
      if (card)
        card.setAttribute("style", "display: flex;");
      var image = this.shadowRoot.querySelector("#card-image iron-image");
      var sizedImgDiv = image.shadowRoot.querySelector("#sizedImgDiv")
      var backgroundImage = sizedImgDiv.style.backgroundImage;
      var imageAsArray = backgroundImage.split(",");
      if (imageAsArray.length == 1)
        sizedImgDiv.style.backgroundImage = this._linearGradient(colors, direction, imageAsArray[0])
      else {
        var imageArrayUrl = imageAsArray[imageAsArray.length - 1]
        sizedImgDiv.style.backgroundImage = this._linearGradient(colors, direction, imageArrayUrl);
      }
    }

    _linearGradient(colors, direction, imagePath) {
      if (!direction)
        direction = "to right";

      if (colors.length == 2)
        return `linear-gradient(${direction}, ${colors[0]}, ${colors[1]}), ${imagePath}`;
      return `linear-gradient(${direction}, ${colors[0]}, ${colors[1]}, ${colors[2]}), ${imagePath}`;

    }

  _selectCandidate() {
    var user = this.getUser();
    if (!user || Object.keys(user).length == 0) {
      this.dispatchEvent(new CustomEvent("unauthorized"));
      return;
    }
    this.$.api.method = "POST";
    this.$.api.path = "selected-candidates/";
    this.$.api.user = user;
    //TODO: replace 1 by the candidate id.
    this.$.api.body = {"user": user.uid, "candidate": this.candidate.id};
    this.$.api.request().then((ajax) => {
      this.dispatchEvent(new CustomEvent("selected-candidate"));
    });
  }

  _pressCandidate() {
    var user = this.getUser();
    if (!user || Object.keys(user).length == 0) {
      this.dispatchEvent(new CustomEvent("unauthorized"));
      return;
    }
    this.$.api.method = "POST";
    this.$.api.path = "pressed-candidates/";
    this.$.api.user = user;
    //TODO: replace 1 by the candidate id.
    this.$.api.body = {"user": user.uid, "candidate": this.candidate.id};
    this.$.api.request().then((ajax) => {
      this.dispatchEvent(new CustomEvent("pressed-candidate"));
    });
  }

  _ignoreCandidate() {
    var user = this.getUser();
    if (!user || Object.keys(user).length == 0) {
      this.dispatchEvent(new CustomEvent("unauthorized"));
      return;
    }
    this.$.api.method = "POST";
    this.$.api.path = "ignored-candidates/";
    this.$.api.user = user;
    //TODO: replace 1 by the candidate id.
    this.$.api.body = {"user": user.uid, "candidate": this.candidate.id};
    this.$.api.request().then((ajax) => {
      this.dispatchEvent(new CustomEvent("ignored-candidate"));
    });
  }

  }
}

export const CardMixin = dedupingMixin(Mixin);
