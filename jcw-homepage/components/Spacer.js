import { h } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const Spacer = {
  props: {
    height: {
      type: String,
      default: "75vh",
    },
  },
  render() {
    return h(
      "div",
      {
        style: {
          height: this.height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      this.$slots
    );
  },
};

export default Spacer;
