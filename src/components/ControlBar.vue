<template>
  <div class="controls">
    <GuessesComponent
      :guesses="guesses"
      @guessClick="scrollToWord"
      @scrollTop="scrollTop"
    />
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
    scrollTop: function () {
      this.$emit("scrollTop");
    },
  },
};
</script>

<style>
@media (max-width: 960px) {
  .controls {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}

@media (min-width: 961px) {
  .controls {
    position: fixed;
    right: 0;
    width: 400px;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 50px !important;
  }
}

.controls {
  box-sizing: border-box;
  padding: 10px 20px;
  background-color: rgb(240 240 240);
}

.inputComponent {
  margin-top: 10px;
}
</style>
