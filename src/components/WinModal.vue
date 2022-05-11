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
    </div>
  </vue-final-modal>
</template>

<script>
import { mapState } from "vuex";

export default {
  inheritAttrs: false,
  data() {
    return {
      shareUrl: "https://wikidle.gbandres.com",
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
    shareTitle: function () {
      return `Wikidle ${this.articleDayFormatted}`;
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
</style>
