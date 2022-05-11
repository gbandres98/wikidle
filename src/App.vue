<template>
  <ModalsContainer />
  <GameView />
</template>

<script>
import GameView from "./components/GameView.vue";
import { ModalsContainer } from "vue-final-modal";

export default {
  name: "App",
  components: {
    GameView,
    ModalsContainer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
  overflow-x: hidden;
}

input {
  box-sizing: border-box;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid gray;
}

button {
  padding: 5px 15px;
}
</style>
