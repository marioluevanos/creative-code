import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import Catalog from "./components/Catalog.js";
import Catalog2 from "./components/Catalog2.js";
import Magazine from "./components/Magazine.js";
import Loader from "./components/Loader.js";
import Header from "./components/Header.js";

const App = {
  components: {
    Loader,
    Header,
    Magazine,
    Catalog,
    Catalog2,
  },
  template: `
    <Loader/>
    <Header />
    <div style="height: 75vh"></div>
    <Magazine />
    <!-- <Catalog /> <div style="height: 75vh"></div> -->
    <Catalog2 />
    <div style="height: 100vh"></div>
  `,
};

createApp(App).mount("body");
