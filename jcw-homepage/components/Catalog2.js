import { debounce } from "../utils.js";
import Button from "./Button.js";

const template = `
<section id="catalog2" ref="root">
  <header class="header" ref="header">
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
    <Button class="white ghost">View Gallery</Button>
  </header>
  <div
    class="catalogs2"
    ref="catalogs2"
    id="catalogs2"
  >
    <figure
      class="item"
      v-for="(image, index) in catalogs2"
      :key="image.src + index + image.keywords"
      :style="{ '--index': index, '--z-index': catalogs2.length - index }"
      :data-index="index"
    >
      <div class="item-content">
        <img
          class="item-image"
          :style="{ '--ar': image.width / image.height }"
          :src="image.src"
          :width="image.width"
          :height="image.height"
          :data-keywords="image.keywords"
          :data-id="image.id"
        />
        <figcaption>
          <p class="item-title">{{image.title}}</p>
          <p class="item-description">{{image.description}}</p>
        </figcaption>
      </div>
    </figure>
  </div>
</section>
`;

const Catalog2 = {
  template,
  components: {
    Button,
  },
  data() {
    return {
      resizeFn: () => undefined,
      filters: new Set(),
      images: [],
      scrollTimeline: undefined,
      maxCatalogs: 8,
    };
  },
  computed: {
    keywords() {
      return Object.entries(
        this.images.reduce((keywords, item) => {
          item.keywords.forEach((w) => {
            if (!keywords[w]) keywords[w] = { count: 0 };
            if (keywords[w]) keywords[w]["count"] += 1;
          });
          return keywords;
        }, {})
      )
        .reduce((all, item) => {
          const [key, { count }] = item;
          all.push([key, count]);
          return all;
        }, [])
        .sort((a, b) => (a[1] > b[1] ? -1 : 1))
        .slice(0, this.maxFilters);
    },
    catalogs2() {
      return this.images
        .map((catalog, index) => ({ ...catalog, id: index }))
        .slice(0, this.maxCatalogs);
    },
  },
  methods: {
    async getData() {
      const response = await fetch("/catalog.json");
      return response.json();
    },
    createScrollTimeline() {
      return ScrollTrigger.create({
        animation: this.createAnimationTimeline(),
        trigger: "#catalogs2",
        scrub: true,
        start: "top 150%",
        end: "bottom 10%",
      });
    },
    createAnimationTimeline() {
      const items = Array.from(this.$refs.catalogs2.children);
      const tl = gsap.timeline();

      items.forEach((item, i) => {
        const idx = i + 1;
        const index = items.length - idx;
        tl.fromTo(
          item,
          {
            x: idx * 600,
            y: idx * -600,
            z: idx * -600,
            filter: "brightness(0.16) saturate(0) blur(6px)",
          },
          {
            x: index * -1,
            y: index * 1,
            z: index * 1,
            duration: items.length,
            filter: "brightness(0.66) saturate(0) blur(0px)",
          },
          idx
        );

        tl.to(item, {
          filter: "brightness(1) saturate(1) blur(0px)",
        });

        tl.to(item, {
          delay: 0.5,
          opacity: 0,
        });
      });

      return tl;
    },
    onReady() {
      this.scrollTimeline = this.createScrollTimeline();
      this.onResize();
    },
    onResize() {
      this.$refs.root.style.setProperty(
        "--item-w",
        `${this.$refs.header.clientWidth}px`
      );
    },
  },
  mounted() {
    this.getData()
      .then((data) => (this.images = data))
      .then(this.onReady);

    this.resizeFn = debounce(this.onResize, 500);
    window.addEventListener("resize", this.resizeFn);
  },
};

export default Catalog2;
