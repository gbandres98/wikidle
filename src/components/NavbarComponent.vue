<template>
  <div class="navbar">
    <span class="title">Wikidle</span>
    <div class="navbar-button" @click="openWinModal" v-show="finished">
      <font-awesome-icon icon="trophy" />
    </div>
    <div class="navbar-button" @click="openInfoModal">
      <font-awesome-icon icon="circle-question" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavbarComponent",
  methods: {
    openInfoModal: function () {
      this.$vfm.show({
        component: "InfoModal",
      });
    },
    openWinModal: function () {
      this.$vfm.show({
        component: "WinModal",
      });
    },
  },
  computed: mapState(["finished"]),
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 1.5rem;
  margin-right: auto;
}

.navbar-button {
  width: 60px;
  height: 100%;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.navbar-button:hover {
  box-shadow: 0 0 2px gray inset;
}
</style>
