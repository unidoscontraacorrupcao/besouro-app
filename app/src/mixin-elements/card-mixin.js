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
    this.$.api.body = {"user": user.uid, "candidate": this.candidate.id};
    return this.$.api.request();
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
    this.$.api.body = {"user": user.uid, "candidate": this.candidate.id};
    return this.$.api.request();
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

  _unselectCandidate() {
    var user = this.getUser();
    this.$.api.method = "POST";
    this.$.api.path = `users/${user.uid}/unselect-candidate/`;
    this.$.api.body = {"candidate": this.candidate.id};
    this.$.api.user = user;
    return this.$.api.request();
  }

  _supportCandidate() { window.open(this.candidate.crowdfunding_url); }

  _hideSocialMediaIcons() {
    var medias = this.shadowRoot.querySelector("#social-medias");
    medias.style.display = "block";
    if (this._invalidSocialMediaUrl('facebook_url')
      && this._invalidSocialMediaUrl('youtube_url')
      && this._invalidSocialMediaUrl('twitter_url')
      && this._invalidSocialMediaUrl('instagram_url')
      && this._invalidSocialMediaUrl('crowdfunding_url')) {
      medias.style.display = "none";
      this.shadowRoot.querySelector("#tse-data").style.marginTop = "20px";
    }
    else {
      if (this._invalidSocialMediaUrl('facebook_url'))
        this.$.facebookBtn.style.display = "none";
      if (this._invalidSocialMediaUrl('youtube_url'))
        this.$.youtubeBtn.style.display = "none";
      if (this._invalidSocialMediaUrl('twitter_url'))
        this.$.twitterBtn.style.display = "none";
      if (this._invalidSocialMediaUrl('instagram_url'))
        this.$.instagramBtn.style.display = "none";
      if (this._invalidSocialMediaUrl('crowdfunding_url'))
        this.$.crowdBtn.style.display = "none";
    }
  }

  _redirectToSocialLink(e) {
    var link = e.target.dataset.item;
    window.open(this.candidate[`${link}`], '_blank');
  }

  _invalidSocialMediaUrl(url) {
    if (!this.candidate[url]) return true;
    if (this.candidate[url] == "SEM INFORMAÇÕES") return true;
    if (this.candidate[url] == "não tenho") return true;
    if (/^www/.test(this.candidate[url])) {
      this.candidate[url] = 'http://' + this.candidate[url];
      return false;
    }
    return (!/http:\/\/|https:\/\//.test(this.candidate[url]))
  }

  }
}

export const CardMixin = dedupingMixin(Mixin);
