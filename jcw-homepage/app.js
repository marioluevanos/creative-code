import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import Newsletter from "./components/Newsletter.js";
import Catalog from "./components/Catalog.js";
import Magazine from "./components/Magazine.js";
import Banner from "./components/Banner.js";
import Loader from "./components/Loader.js";
import Header from "./components/Header.js";
import Grid from "./components/Grid.js";

const App = {
  components: {
    Header,
    Loader,
    Newsletter,
    Catalog,
    Magazine,
    Banner,
    Grid,
  },
  data() {
    return {
      showui: false,
    };
  },
  template: `
    <Loader/>
    <div v-if="showui" class="announcement-bar">
      <div class="container">
        <a href="#">
          🔥 Hot Off The Press! Get Our NEW JC Whitney Magazine &amp; Catalog
        </a>
      </div>
    </div>
    <Header />
    <Grid v-if="showui"/>
    <div style="height: 80vh; text-align: center; padding: 0 1rem 0; display: flex; align-items: center; justify-content: center;">
      Scroll
    </div>
    <Newsletter v-if="showui" />
    <Magazine />
    <Catalog />
    <Banner v-if="showui" />
    <div style="height: 25vh; text-align: center; padding: 0 1rem 0; display: flex; align-items: center; justify-content: center;">
      End
    </div>
  `,
};

export default function app() {
  return createApp(App).mount("body");
}
