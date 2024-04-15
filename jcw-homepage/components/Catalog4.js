import { debounce } from "../utils.js";
import Button from "./Button.js";

const template = `
<section id="catalog4" ref="root">
  <header class="header">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 48 48">
      <path fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" d="M36.4,43.7h2.5c2.3-0.1,4.1-2.1,4-4.4V8.1 c0.1-2.3-1.7-4.3-4-4.4h-2.5"/>
      <path class="s-cyan" fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" d="M32.1,20.7v6l-11.2,1l-11.1-1v-6l11.1-1 C20.9,19.7,32.1,20.7,32.1,20.7z"/>
      <path fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" d="M8.9,1.7h24c2.2,0,4,1.8,4,4v36c0,2.2-1.8,4-4,4h-24 c-2.2,0-4-1.8-4-4v-36C4.9,3.5,6.7,1.7,8.9,1.7z"/>
      <path class="f-cyan" d="M12.8,14.5c-0.4,0.5-1,0.8-1.9,0.8c-0.6,0-1.1-0.2-1.5-0.5C9,14.4,8.8,14,8.6,13.4l1.6-0.7c0,0.2,0.1,0.4,0.2,0.5 s0.3,0.2,0.4,0.2c0.3,0,0.4-0.1,0.5-0.3c0.1-0.2,0.1-0.5,0.1-0.9V6.6h1.9v5.8C13.4,13.3,13.2,14,12.8,14.5z"/>
      <path class="f-cyan" d="M32,40.8c-0.4,0.2-0.9,0.3-1.4,0.3c-0.5,0-0.9-0.1-1.3-0.3c-0.4-0.2-0.8-0.5-1-0.9c-0.3-0.4-0.5-0.9-0.7-1.4 s-0.2-1.1-0.2-1.8c0-0.7,0.1-1.3,0.2-1.8s0.4-1,0.7-1.4c0.3-0.4,0.6-0.7,1-0.9c0.4-0.2,0.9-0.3,1.3-0.3c0.6,0,1,0.1,1.4,0.3 s0.7,0.5,0.9,0.8l-1,1.4c-0.1-0.2-0.3-0.3-0.5-0.5C31.2,34,31,34,30.7,34c-0.3,0-0.5,0.1-0.7,0.2c-0.2,0.1-0.3,0.3-0.5,0.6 c-0.1,0.2-0.2,0.5-0.3,0.8s-0.1,0.7-0.1,1s0,0.7,0.1,1c0.1,0.3,0.2,0.6,0.3,0.8c0.1,0.2,0.3,0.4,0.5,0.6c0.2,0.1,0.4,0.2,0.7,0.2 s0.5-0.1,0.7-0.2c0.2-0.1,0.3-0.3,0.5-0.5l1.1,1.3C32.7,40.3,32.4,40.5,32,40.8z"/>
    </svg>
    <h2 class="fs-h2 title">Catalog Throwback</h2>
    <p class="fs-small">
      Step back in time with JC Whitney's vintage catalog gallery, showcasing decades of car parts & accessories that fueled automotive passions.
    </p>
  </header>
  <div
    class="catalogs4"
    ref="catalogs4"
    id="catalogs4"
  >
    <button
      class="item"
      v-for="(image, index) in catalogs4"
      :key="index"
      @click="onCardClick"
    >
      <div class="item-content front">
        <img
          class="item-image"
          :style="{ '--ar': image.new.width / image.new.height }"
          :src="image.new.src"
          :width="image.new.width"
          :height="image.new.height"
          :data-keywords="image.new.keywords"
        />
        <figcaption>
          <p class="item-title">{{image.new.title}}</p>
          <p class="item-description">{{image.new.description}}</p>
        </figcaption>
      </div>
      <div class="item-content back">
        <img
          class="item-image"
          :style="{ '--ar': image.old.width / image.old.height }"
          :src="image.old.src"
          :width="image.old.width"
          :height="image.old.height"
          :data-keywords="image.old.keywords"
        />
        <figcaption>
          <p class="item-title">{{image.old.title}}</p>
          <p class="item-description">{{image.old.description}}</p>
        </figcaption>
      </div>
    </button>
  </div>
  <Button class="white ghost cta">View Gallery</Button>
</section>
`;

const Catalog = {
  template,
  components: {
    Button,
  },
  data() {
    return {
      resizeFn: () => undefined,
      images: [],
      isBusy: false,
      maxCatalogs: 8,
    };
  },
  computed: {
    catalogs4() {
      return Object.entries(
        this.images
          .slice(0, this.maxCatalogs)
          .reduce((all, catalog, idx, arr) => {
            if (!all[catalog.title]) {
              all[catalog.title] = {
                new: catalog,
                old: arr[idx + 1],
              };
            }
            return all;
          }, {})
      ).reduce((all, [_k, value]) => {
        all.push(value);
        return all;
      }, []);
    },
  },
  methods: {
    onCardClick(event) {
      const card = event.target;
      const isNewest = card.classList.contains("newest");
      const rotationY = isNewest ? 180 : 0;

      gsap.to(card, {
        rotationY,
        ease: "circ.inOut",
        duration: 0.6,
        onComplete() {
          if (isNewest) card.classList.remove("newest");
          else card.classList.add("newest");
        },
      });
    },
    createScrollTimeline() {
      return ScrollTrigger.create({
        animation: this.createAnimationTimeline(),
        trigger: "#catalogs4",
        start: "top 25%",
        end: "bottom 75%",
      });
    },
    createAnimationTimeline() {
      const items = Array.from(this.$refs.catalogs4.children);
      const timeline = gsap.timeline();
      items.forEach((item, index) => {
        timeline.fromTo(
          item,
          {
            rotationY: 180,
          },
          {
            rotationY: 0,
            ease: "circ.inOut",
            duration: 0.6,
            onComplete() {
              item.classList.add("newest");
            },
          },
          index * 0.05
        );
      });

      return timeline;
    },
    async getData() {
      const response = await fetch("/catalog.json");
      return response.json();
    },
    onResize() {},
    onReady(data) {
      this.images = data;
      setTimeout(() => {
        this.onResize();
        this.scrollTimeline = this.createScrollTimeline();
      }, 100);
    },
  },
  mounted() {
    this.getData().then((data) => this.onReady(data));
    this.resizeFn = debounce(this.onResize, 500);
    window.addEventListener("resize", this.resizeFn);
  },
};

export default Catalog;
