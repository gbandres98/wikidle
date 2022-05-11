<template>
  <div class="game">
    <div class="game-main">
      <NavbarComponent />
      <ArticleText :article="article" :words="words" @click="clearHighlights" />
    </div>
    <ControlBar
      :guesses="guesses"
      @guess="guess"
      @scrollToWord="scrollToWord"
      @scrollTop="scrollTop"
    />
  </div>
</template>

<script>
import { getArticle } from "@/game/wikipediaClient";
import { parseArticle } from "@/game/parse";
import {
  obfuscate,
  revealWords,
  revealCommonWords,
  revealAll,
} from "@/game/obfuscate";
import { normalize, isValid, pluralize } from "@/game/words";
import { saveLocalData, loadLocalGameData } from "@/game/localData";
import commonWords from "@/game/commonWords";
import ArticleText from "@/components/ArticleText.vue";
import ControlBar from "@/components/ControlBar.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";

export default {
  name: "GameView",
  components: { ArticleText, ControlBar, NavbarComponent },
  data() {
    return {
      article: {},
      articleTitle: "",
      articleDay: "",
      words: [],
      guesses: [],
      guessNumber: 1,
      lastScrolledWord: "",
      scrollIndex: 0,
      finished: false,
    };
  },
  beforeMount() {
    getArticle("Cinchona_officinalis").then((res) => {
      this.articleTitle = res.title;
      this.articleDay = res.day;
      const article = parseArticle(res);
      this.words = obfuscate(article);
      this.article = article;

      revealCommonWords(this.article, this.words);

      const gameData = loadLocalGameData(res.day);
      if (!gameData) return;

      gameData.guesses.forEach((guess) => this.guess(guess.word));
      this.finished = gameData.finished;
    });
  },
  methods: {
    guess: function (word) {
      if (this.finished) return;

      if (word === "") return;

      word = normalize(word);

      if (!isValid(word, this.guesses)) return;

      const words = pluralize(word);

      words.forEach((w) => {
        const hits = revealWords(w, this.article, this.words);
        this.guesses.push({
          word: w,
          hits: hits,
          number: this.guessNumber,
        });
      });

      this.checkWin();

      saveLocalData(
        this.articleDay,
        this.guesses,
        this.guessNumber,
        this.finished
      );

      this.guessNumber++;
    },
    scrollToWord: function (word) {
      this.clearHighlights();

      if (word !== this.lastScrolledWord) this.scrollIndex = 0;

      this.lastScrolledWord = word;

      const matches = this.words.filter((w) => w.wordNormalized === word);

      if (matches.length === 0) return;

      if (this.scrollIndex >= matches.length) this.scrollIndex = 0;

      matches.forEach((match, i) => {
        const wordIndex = this.words.indexOf(match);
        const wordElement = document.querySelectorAll(".word")[wordIndex];
        wordElement.classList.add("highlight");

        if (i === this.scrollIndex)
          wordElement.scrollIntoView({
            block: "center",
          });
      });

      this.scrollIndex++;
    },
    scrollTop: function () {
      window.scrollTo(0, 0);
      this.scrollIndex = 0;
      this.clearHighlights();
    },
    clearHighlights: function () {
      document
        .querySelectorAll(".highlight")
        .forEach((e) => e.classList.remove("highlight"));
    },
    checkWin: function () {
      const finished = this.articleTitle.split(/[ -.,]/).every((word) => {
        word = normalize(word);
        if (commonWords.map((cw) => normalize(cw)).includes(word)) return true;
        return this.guesses.some((guess) => guess.word === word);
      });

      if (finished) {
        this.finished = true;
        revealAll(this.article, this.words);
        alert(
          "Felicidades! Has averiguado el artículo en " +
            this.guessNumber +
            " palabras"
        );
      }
    },
  },
};
</script>

<style>
@media (orientation: landscape) {
  .game {
    display: flex;
    flex-direction: row;
  }

  .controls {
    flex: 0 0 450px;
  }

  .game-main {
    flex: 0 0 calc(100vw - 500px);
  }
}
</style>
