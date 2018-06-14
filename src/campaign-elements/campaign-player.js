import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../polymerfire/firebase-storage-ref.js';
import '../../../google-youtube/google-youtube.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class CampaignPlayer extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style>
      :host {
        display: block;
      }

      app-dialog {
        width: 100%;
        height: 222px;
        margin: 0;
        top: 0;
      }

      .play {
        display: block;
        margin: -65px auto 0;
        height: 80px;
        width: 80px;
      }

      #fullscreen {
        margin: 0;
        padding: 0;
      }

      #dismiss {
        position: absolute;
        top: 12px;
        left: 7px;
        color: white;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.3);
        --paper-icon-button-ink-color: var(--secondary-text-color);
      }
    </style>

    <firebase-storage-ref download-url="{{imageUrl}}" id="storage">
    </firebase-storage-ref>

    <dom-if if="{{mediaUrl}}">
      <template>
        <paper-icon-button class="play" id="play" icon="app:play-circle-outline" on-tap="play">
        </paper-icon-button>
      </template>
    </dom-if>
    <app-dialog id="dialog">
      <div id="fullscreen">
        <google-youtube id="video" chromeless="" video-id="{{mediaUrl}}" height="100vh" width="100vw">
        </google-youtube>
        <paper-icon-button icon="app:close" on-tap="stop" id="dismiss">
        </paper-icon-button>
      </div>
    </app-dialog>
`;
  }

  static get is() { return 'campaign-player'; }

  static get properties() {
    return {
      mediaUrl: String,
      campaign: Object,
      imageUrl: String,
      campaignKey: String,
      allowedTypes: {
        type: Array,
        value() {
          return ['audio', 'video'];
        }
      },
      campaignImage: {
        type: String,
        notify: true
      },
      playing: Boolean
    }
  }
  static get observers() { return ['_setCampaignLayer(imageUrl, campaign)']; }

  _setCampaignLayer(imageUrl, campaign) {
    let image = '';
    if (!campaign) return;
    if (campaign.coverImage) {
      this.$.storage.path = `/campaigns/${this.campaignKey}/${campaign.coverImage}`;
    }
    if (campaign.video) {
      image = `https://img.youtube.com/vi/${campaign.video}/0.jpg`;
      this.mediaUrl = campaign.video;
      this.campaignImage = image;
    } else {
      this.campaignImage = this.imageUrl;
      this.mediaUrl = "";
    }
  }

  stop() {
    if (!this.mediaUrl) return;
    this.playing = false;
    this.shadowRoot.querySelector('#play').icon = 'app:play-circle-outline';
    this.$.video.pause();
    const exitFullScreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen;
    if (exitFullScreen) {
      this.$.dialog.close();
      exitFullScreen.bind(document)();
    }
  }

  play(e) {
    if (!this.mediaUrl) return;
    if (!this.playing) {
      this.playing = true;
      this.shadowRoot.querySelector('#play').icon = 'app:pause-circle-outline';
      this.$.dialog.withBackdrop = false;
      const player = this.$.video;
      if (player.load) player.load();
      player.play();
      const fs = this.$.fullscreen;
      const requestFullScreen = fs.requestFullScreen || fs.mozRequestFullScreen || fs.webkitRequestFullScreen;
      if (requestFullScreen && this.mediaUrl) {
        this.$.dialog.open();
        requestFullScreen.bind(fs)();
      }
    } else {
      this.stop();
    }
  }
}
customElements.define(CampaignPlayer.is, CampaignPlayer);
