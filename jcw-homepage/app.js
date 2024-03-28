import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import Catalog from "./Catalog.js";
import Magazine from "./Magazine.js";

const App = {
  components: {
    Catalog,
    Magazine,
  },
  template: `

  <Magazine/>
  `,
};

export default function app() {
  return createApp(App).mount("#app");
}
