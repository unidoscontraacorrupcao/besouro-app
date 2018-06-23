import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../app-elements/app-icons.js';
import '../app-elements/shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class MissionPlayer extends PolymerElement {
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
        background: rgba(0,0,0,0.3);
        --paper-icon-button-ink-color: var(--secondary-text-color);
      }

    </style>



    <dom-if if="{{mediaUrl}}">
      <template>
        <paper-icon-button class="play" id="play" icon="app:play-circle-outline" on-tap="play">
        </paper-icon-button>
      </template>
      <audio id="audio">
        <source src="{{mediaUrl}}" type="audio/ogg">
        <source src="{{mediaUrl}}" type="audio/mpeg">
        <source src="{{mediaUrl}}" type="audio/wav">
      </audio>
    </dom-if>
    <app-dialog id="dialog">
      <div id="fullscreen">
        <paper-icon-button icon="app:close" on-tap="stop" id="dismiss">
        </paper-icon-button>
      </div>
    </app-dialog>
`;
  }

  static get is() { return 'mission-player'; }

  static get properties() {
    return {
      mediaUrl: String,
      mediaType: {
        type: String,
        observer: 'setupMedia'
      },
      audioUrl: String,
      imageUrl: String,
      missionKey: String,
      mission: Object,
      allowedTypes: {
        type: Array,
        value() {
          return ['audio', 'video'];
        }
      },
      missionImage: {
        type: String,
        notify: true
      },
      playing: Boolean
    }
  }
  static get observers() { return ['_setMissionLayer(imageUrl, audioUrl, mission)']; }

  _setMissionLayer(imageUrl, audioUrl, mission) {
    let image = '';
    if(!mission) return;
    if(mission.video) {
      image = `https://img.youtube.com/vi/${mission.video}/0.jpg`;
      this.mediaUrl = mission.video;
      this.mediaType = 'video';
    } else if(mission.audioTitle) {
      image = `/images/audiowave.png`;
      this.mediaUrl = this.audioUrl;
      this.mediaType = 'audio';
    } else {
      this.mediaUrl = undefined;
      this.mediaType = undefined;
    }
    if(mission.imageTitle) image = this.imageUrl;
    this.missionImage = image;
  }

  setupMedia(mediaType) {
    this.allowedTypes.forEach(function(mt) {
      this.$[mt].style.display = (mt === mediaType) ? 'block' : 'none';
    }.bind(this));
  }

  stop() {
    if(!this.mediaType) return;
      this.playing = false;
    this.shadowRoot.querySelector('#play').icon = 'app:play-circle-outline';
    this.$[this.mediaType].pause();
    const exitFullScreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen;
    if(exitFullScreen && this.mediaType === 'video') {
      this.$.dialog.close();
      exitFullScreen.bind(document)();
    }
  }

  play(e) {
    if(!this.mediaType) return;
    if(!this.playing) {
      this.playing = true;
      this.shadowRoot.querySelector('#play').icon = 'app:pause-circle-outline';
      this.$.dialog.withBackdrop = false;
      const player = this.$[this.mediaType];
      if(player.load) player.load();
      player.play();
      const fs = this.$.fullscreen;
      const requestFullScreen = fs.requestFullScreen || fs.mozRequestFullScreen || fs.webkitRequestFullScreen;
      if (requestFullScreen && this.mediaType === 'video') {
        this.$.dialog.open();
        requestFullScreen.bind(fs)();
      }
    } else {
      this.stop();
    }
  }

  _setFirebasePaths(mission) {
    if(mission) {
      if (mission.imageTitle)
        this.$.storage.path = `/missions/${this.missionKey}/${mission.imageTitle}`;
      if (mission.audioTitle)
        this.$.audioStorage.path = `/missions/${this.missionKey}/${mission.audioTitle}`;
    } else {
      this.$.close.style.display = 'none';
      this.shadowRoot.querySelector('paper-tooltip[for="close"]').style.display = 'none';
      this.$.accept.style.display = 'block';
      this.shadowRoot.querySelector('paper-tooltip[for="accept"]').style.display = 'block';
    }
  }
}
customElements.define(MissionPlayer.is, MissionPlayer);
