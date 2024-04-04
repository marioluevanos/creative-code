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
      loaderComplete: false,
    };
  },
  methods: {
    onLoaderComplete() {
      console.log("onLoaderComplete");
      this.loaderComplete = true;
    },
  },
  template: `
    <template v-if="loaderComplete">
      <div class="announcement-bar">
        <div class="container">
          <a href="#">
            🔥 Hot Off The Press! Get Our NEW JC Whitney Magazine &amp; Catalog
          </a>
        </div>
      </div>
      <Header />
      <!-- <div style="height: 25vh"></div> -->
      <!-- <Grid/> -->
      <!-- <Newsletter/> -->
      <!-- <Catalog/> -->
      <Magazine/>
      <Banner/>
    </template>
    <Loader v-else :onComplete="onLoaderComplete" />
  `,
};

export default function app() {
  return createApp(App).mount("body");
}
