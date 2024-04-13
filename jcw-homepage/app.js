import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import Catalog1 from "./components/Catalog1.js";
import Catalog2 from "./components/Catalog2.js";
import Magazine from "./components/Magazine.js";
import Loader from "./components/Loader.js";
import Header from "./components/Header.js";
import Spacer from "./components/Spacer.js";

const App = {
  components: {
    Loader,
    Header,
    Magazine,
    Catalog1,
    Catalog2,
    Spacer,
  },
  template: `
    <Loader/>
    <Header />
    <Spacer>Magazine 1</Spacer>
    <Magazine />
    <Spacer>Catalog 1</Spacer>
    <Catalog1 /> 
    <Spacer>Catalog 2</Spacer>
    <Catalog2 />
    <Spacer/>
  `,
};

createApp(App).mount("body");
