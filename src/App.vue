<template>
  <GameView />
</template>

<script>
import GameView from "./components/GameView.vue";

export default {
  name: "App",
  components: {
    GameView,
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
</style>
