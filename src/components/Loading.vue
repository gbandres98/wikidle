<template>
  <div class="loader" v-show="show">
    <font-awesome-icon icon="spinner" />
    <div>Cargando artículo...</div>
  </div>
</template>

<script>
export default {
  name: "ArticleText",
  props: {
    show: Boolean,
  },
};
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loader {
  width: 100%;
  margin-top: 40vh;
  display: flex;
  flex-direction: column;
}

.loader svg {
  font-size: 3rem;
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.loader div {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 20px;
}
</style>
