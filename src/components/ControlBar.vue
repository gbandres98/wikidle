<template>
  <div class="controls">
    <GuessesComponent :guesses="guesses" @guessClick="scrollToWord" />
    <InputComponent class="inputComponent" @submitGuess="onGuess" />
  </div>
</template>

<script>
import InputComponent from "@/components/InputComponent.vue";
import GuessesComponent from "@/components/GuessesComponent.vue";

export default {
  name: "ControlBar",
  components: {
    InputComponent,
    GuessesComponent,
  },
  props: {
    guesses: Array,
  },
  methods: {
    onGuess: function (word) {
      this.$emit("guess", word);
    },
    scrollToWord: function (word) {
      this.$emit("scrollToWord", word);
    },
  },
};
</script>

<style scoped>
.controls {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  background-color: rgb(240 240 240);
  position: fixed;
  bottom: 0;
}

.inputComponent {
  margin-top: 10px;
}
</style>
