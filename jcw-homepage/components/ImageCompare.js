import Button from "./Button.js";

const template = `
<figure ref="root"
  :class="{ compare: true, isVisible: isVisible }"
  :style="{
    '--exposure': scrollProgress,
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
    :value="scrollProgress"
    min="0"
    max="100"
  />
  <span class="divider" :class="scrollProgress === 100 && 'done'"  />
</figure>
`;

const ImageCompare = {
  template,
  components: { Button },
  props: {
    scrollProgress: {
      type: Number,
    },
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
      default: 42,
    },
  },
  data() {
    return {
      isVisible: true,
      exposure: 0,
      imageSize: { w: 0, h: 0 },
    };
  },
  computed: {
    expPercent() {
      if (typeof this.scrollProgress === "number")
        return this.scrollProgress / 100;

      return this.exposure / 100;
    },
    offset() {
      return this.handleSize * this.expPercent;
    },
    dividerX() {
      return (
        (this.imageSize.w - this.handleSize) * this.expPercent +
        this.offset -
        this.handleSize / 2
      );
    },
  },
  methods: {
    onInput(event) {
      console.log(+event.target.value);
      this.exposure = +event.target.value;
    },
    setSize() {
      this.imageSize.w = this.$refs.root.clientWidth;
      this.imageSize.h = this.$refs.root.clientHeight;
    },
  },
  mounted() {
    imagesLoaded(".compare", () => {
      this.setSize();
    });

    ["(min-width: 768px)", "(min-width: 1024px)"].map((mq) => {
      const media = window.matchMedia(mq);
      if (media.matches) {
        this.setSize();
      }
    });

    const listener = () => this.setSize();
    window.addEventListener("resize", listener);
  },
};

export default ImageCompare;
