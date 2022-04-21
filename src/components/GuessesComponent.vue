<template>
  <div class="guessContainer">
    <div class="buttonContainer">
      <font-awesome-icon
        icon="angle-down"
        @click="this.open = !this.open"
        class="closeButton"
        :class="{ closed: !open }"
      />
    </div>
    <div class="guessList" :class="{ closed: !open }">
      <div class="guess title">
        <div class="guessNo">Nº</div>
        <div class="guessWord">Palabra</div>
        <div class="guessHits">Aciertos</div>
      </div>
      <div
        class="guess"
        v-for="(guess, i) in guessesReversed"
        :key="i"
        @click.stop="onClick(guess.word, $event)"
      >
        <div class="guessNo">{{ guess.number }}</div>
        <div class="guessWord">{{ guess.word }}</div>
        <div class="guessHits">{{ guess.hits }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuessesComponent",
  props: {
    guesses: Array,
  },
  data: function () {
    return {
      open: true,
    };
  },
  methods: {
    onClick: function (word, event) {
      this.$emit("guessClick", word);

      document
        .querySelectorAll(".guess")
        .forEach((e) => e.classList.remove("clicked"));

      event.currentTarget.classList.add("clicked");
    },
  },
  computed: {
    guessesReversed: function () {
      return this.guesses.slice().reverse();
    },
  },
};
</script>

<style scoped>
.buttonContainer {
  text-align: right;
  margin-bottom: 5px;
}

.closeButton {
  font-size: 1.5em;
  transition: 1s;
}

.closeButton.closed {
  transform: rotate(180deg);
}

.guessList {
  max-height: 20vh;
  transition: 1s;
  overflow-y: scroll;
}

.guessList.closed {
  max-height: 0;
  overflow-y: hidden;
}

.guess {
  display: flex;
  justify-content: left;
  margin: 0.25em 0;
}

.guessNo {
  flex-basis: 25%;
}

.guessWord {
  flex-basis: 55%;
}

.title {
  margin-bottom: 10px;
  border-bottom: 1px solid gray;
}

.guess:not(.title) {
  cursor: pointer;
}

.guess.clicked {
  background-color: rgb(194, 194, 194);
}
</style>
