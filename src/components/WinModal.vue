<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
  >
    <button class="modal__close" @click="close">
      <font-awesome-icon icon="x" />
    </button>
    <span class="modal__title">Wikidle {{ articleDayFormatted }}</span>
    <div class="modal__content">
      <p>Felicidades!</p>
      <p>
        Has averiguado
        <a :href="'https://es.wikipedia.org/wiki/' + articleId" target="_blank"
          >el artículo de hoy</a
        >
        en {{ guessNumber }} palabras.
      </p>
      <div class="share-button-container">
        <button class="share-button" @click="share">Compartir resultado</button>
      </div>
      <div class="media-buttons">
        <a class="media-link" :href="twitterShareLink" target="_blank"
          ><img
            class="media-icon twitter-share-button"
            src="https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg"
        /></a>
        <a class="media-link" :href="whatsappShareLink" target="_blank"
          ><img
            class="media-icon"
            src="https://cdn.cdnlogo.com/logos/w/29/whatsapp-icon.svg"
        /></a>
        <a class="media-link" :href="telegramShareLink" target="_blank"
          ><img
            class="media-icon"
            src="https://cdn.cdnlogo.com/logos/t/84/telegram.svg"
        /></a>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { mapState } from "vuex";

export default {
  inheritAttrs: false,
  data() {
    return {
      shareUrl: "wikidle.gbandres.com",
    };
  },
  computed: {
    ...mapState(["articleDay", "guessNumber", "articleId"]),
    articleDayFormatted: function () {
      if (this.articleDay) {
        const [year, month, day] = this.articleDay.split("-");
        return `${day}/${month}/${year}`;
      } else return "";
    },
    shareText: function () {
      return `He adivinado el Wikidle de hoy en ${this.guessNumber} palabras!`;
    },
    shareTextEncoded: function () {
      return encodeURIComponent(this.shareText);
    },
    shareTitle: function () {
      return `Wikidle ${this.articleDayFormatted}`;
    },
    twitterShareLink: function () {
      return `https://twitter.com/intent/tweet?text=${this.shareTextEncoded}&url=${this.shareUrl}`;
    },
    whatsappShareLink: function () {
      return `https://wa.me/?text=${this.shareTextEncoded}%0A${this.shareUrl}`;
    },
    telegramShareLink: function () {
      return `https://t.me/share/url?url=${this.shareUrl}&text=${this.shareTextEncoded}`;
    },
  },
  methods: {
    share: function () {
      navigator.share({
        title: this.shareTitle,
        url: this.shareUrl,
        text: this.shareText,
      });
    },
  },
};
</script>

<style scoped>
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.2rem;
}
</style>

<style scoped>
.dark-mode div::v-deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>

<style scoped>
.share-button-container {
  text-align: center;
}

.share-button {
  background-color: #eeeeee;
  border: 1px solid black;
  border-radius: 3px;
  padding: 10px 20px;
}

.media-buttons {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.media-link {
  height: 2rem;
  margin: 0 0.5rem;
}

.media-icon {
  max-height: 100%;
}
</style>
