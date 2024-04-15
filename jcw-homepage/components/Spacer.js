import { h } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const Spacer = {
  props: {
    height: {
      type: String,
      default: "100vh",
    },
  },
  render() {
    return h(
      "div",
      {
        style: {
          height: this.height,
          display: "flex",
          background: "black",
          fontSize: "1.5rem",
          color: "var(--color-gray-medium)",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      this.$slots
    );
  },
};

export default Spacer;
