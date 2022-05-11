import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faSpinner,
  faCircleQuestion,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { vfmPlugin } from "vue-final-modal";
import InfoModal from "@/components/InfoModal.vue";
import WinModal from "@/components/WinModal.vue";
import store from "./store";

library.add(faAngleDown);
library.add(faSpinner);
library.add(faCircleQuestion);
library.add(faX);

createApp(App)
  .use(store)
  .use(vfmPlugin)
  .component("InfoModal", InfoModal)
  .component("WinModal", WinModal)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
