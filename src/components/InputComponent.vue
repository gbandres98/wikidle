<template>
  <form class="input" @submit.prevent="onSubmit">
    <input type="text" v-model="value" />
    <button class="submitButton">Enviar</button>
  </form>
</template>

<script>
export default {
  name: "InputComponent",
  data: function () {
    return {
      value: "",
    };
  },
  methods: {
    onSubmit: function () {
      this.$emit("submitGuess", this.value);
      this.value = "";
    },
  },
};
</script>

<style scoped>
.input {
  text-align: center;
}

.submitButton {
  margin-left: 10px;
}
</style>
