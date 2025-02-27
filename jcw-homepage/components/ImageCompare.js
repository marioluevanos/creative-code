import { debounce } from "../utils.js";
import Button from "./Button.js";

const template = `
<figure ref="root"
  @click="onClick"
  :class="{ image-compare: true, isVisible: isVisible }"
  :style="{
    '--exposure': exposure,
    '--image-w': imageSize.w,
    '--image-h': imageSize.h,
    '--divider-x': dividerX,
    '--handle-s': handleSize,
  }"
>
  <img
    :src="modified"
    :style="{ 'aspect-ratio': aspectRatio }"
    class="image"
  />
  <img
    :src="original"
    :style="{ 'aspect-ratio': aspectRatio }"
    class="image resizer"
  />
  <input
    class="input"
    @input="onInput"
    type="range"
    :value="exposure"
    min="0"
    max="100"
  />
  <span class="divider" :class="exposure === 100 && 'done'" />
</figure>
`;

const ImageCompare = {
  template,
  components: { Button },
  props: {
    original: {
      type: String,
      default: "",
    },
    modified: {
      type: String,
      default: "",
    },
    aspectRatio: {
      type: Number,
      default: 0.8,
    },
    handleSize: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isVisible: true,
      exposure: 100,
      resizeFn: () => undefined,
      imageSize: { w: 0, h: 0 },
    };
  },
  computed: {
    expPercent() {
      if (typeof this.exposure === "number") return this.exposure / 100;

      return this.exposure / 100;
    },
    offset() {
      return this.handleSize * this.expPercent - this.handleSize / 2;
    },
    dividerX() {
      return this.imageSize.w * this.expPercent;
    },
  },
  methods: {
    onInput(event) {
      this.exposure = +event.target.value;
    },
    onClick(event) {
      event.preventDefault();
      this.setSize();
      gsap.to(this, {
        exposure: this.exposure > 0 ? 0 : 100,
        ease: "expo.out",
        duration: 0.6,
      });
    },
    setSize() {
      const canvas = document.getElementById("canvas");
      const cw = parseInt(
        getComputedStyle(canvas).getPropertyValue("--canvas-w")
      );
      const arCss = getComputedStyle(canvas).getPropertyValue("--ar");
      const [arW, arH] = arCss.split("/");
      const ar = arW / arH;
      const ch = Math.floor(cw / ar);

      this.imageSize.w = `${cw}`;
      this.imageSize.h = `${ch}`;
    },
    onResize() {
      setTimeout(() => this.setSize(), 400);
      console.log("onResize");
    },
  },
  mounted() {
    imagesLoaded(".image-compare", () => setTimeout(() => this.onResize(), 0));

    this.resizeFn = debounce(this.onResize, 100);
    window.addEventListener("resize", this.resizeFn);
  },
};

export default ImageCompare;
