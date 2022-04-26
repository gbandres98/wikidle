<template>
  <form class="input" @submit.prevent="onSubmit">
    <input type="text" :value="value" @keypress="inputText" />
    <button class="submitButton">Enviar</button>
  </form>
</template>

<script>
const charRegex = /^[a-zA-Z0-9áéíóú]$/;

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
    inputText: function (event) {
      let inputChar = String.fromCharCode(event.keyCode);
      if (!charRegex.test(inputChar)) event.preventDefault();
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
