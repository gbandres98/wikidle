<template>
  <form class="input" @submit.prevent="onSubmit">
    <input type="text" v-model="value" />
    <button class="submitButton">Revelar</button>
  </form>
</template>

<script>
const charRegex = /^[a-zA-Z0-9áéíóú]$/;
const filterRegex = /[^a-zA-Z0-9áéíóú]/g;

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
    filterText: function () {
      this.value = this.value.replace(filterRegex, "");
    },
  },
  watch: {
    value() {
      this.filterText();
    },
  },
};
</script>

<style scoped>
.input {
  text-align: right;
}

.submitButton {
  margin-left: 10px;
}
</style>
