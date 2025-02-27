import { debounce } from "../utils.js";
import Button from "./Button.js";
import InertiaPlugin from "../lib/InertiaPlugin.js";

const template = `
<section id="catalog3" ref="root">
  <header class="header" ref="header">
    <h2 class="fs-h2 title">Catalog Throwback</h2>
    <p class="fs-small">
      Step back in time with JC Whitney's vintage catalog gallery, showcasing decades of car parts & accessories that fueled automotive passions.
    </p>
    <Button class="white ghost">View Gallery</Button>
  </header>
  <div class="cards">
    <div class="center">
      <div class="items" ref="items">
        <div
          class="item"
          v-for="(image, index) in catalogs3"
          :key="image.src"
          :style="{ 'z-index': catalogs3.length - index }"
        >
          <figure class="card">
            <img
              class="image"
              :style="{ '--ar': image.width / image.height }"
              :src="image.src"
              :width="image.width"
              :height="image.height"
            />
            <img
              v-if="image.width / image.height > (8.8/11)"
              class="image bg"
              :src="image.src"
              :width="image.width"
              :height="image.height"
            />
          </figure>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const Catalog3 = {
  template,
  components: {
    Button,
  },
  data() {
    return {
      resizeFn: () => undefined,
      items: [],
      maxCatalogs: 10,
    };
  },
  computed: {
    degree() {
      return 360 / this.catalogs3.length;
    },
    breakpoint() {
      return {
        medium: window.innerWidth > 768,
      };
    },
    catalogs3() {
      return this.items
        .map((catalog, index) => ({ ...catalog, id: index }))
        .slice(0, this.maxCatalogs);
    },
  },
  methods: {
    createAnimationTimeline(options) {
      const timeline = gsap.timeline(options);
      const items = Array.from(this.$refs.items.children);
      const toY = getComputedStyle(this.$refs.root).getPropertyValue("--to-y");
      const header = document.querySelector("#catalog3 .header");
      const headerContent = Array.from(header.children);

      timeline.set(headerContent, {
        opacity: 0,
      });

      timeline.set("#catalog3 .center", {
        y: "-50%",
        rotation: 0,
      });

      items.forEach((image, index) => {
        timeline.from(
          image,
          {
            clipPath: "inset(0 0 100% 0)",
            ease: "expo.out",
            duration: 1,
          },
          0
        );

        timeline.addLabel("spread", 1);

        timeline.to(
          image,
          {
            transformOrigin: `center ${toY}`,
            rotation: index * this.degree,
            duration: 1,
            ease: "expo.inOut",
          },
          `spread+=${index * 0.01}`
        );
      });

      timeline.to(
        "#catalog3 .center",
        {
          y: 40,
          scale: 0.88,
          duration: 1,
          ease: "circ.inOut",
        },
        `spread`
      );

      timeline.fromTo(
        headerContent,
        {
          opacity: 0,
          y: -8,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "circ.inOut",
          stagger: 0.1,
        },
        `spread+=0.16`
      );

      return timeline;
    },
    createDraggable() {
      return Draggable.create("#catalog3 .items", {
        type: "rotation",
        inertia: true,
        dragResistance: 0.5,
      });
    },
    onResize() {
      if (this.breakpoint.medium) {
      }
    },
    async getData() {
      try {
        const response = await fetch("/catalog.json");
        return response.json();
      } catch (e) {
        console.log(e);
      }
    },
    onReady() {
      this.createScrollTimeline();
      this.createDraggable();
      this.onResize();
    },
    createScrollTimeline() {
      const animationTimeline = this.createAnimationTimeline({ paused: true });

      return ScrollTrigger.create({
        onEnter: () => animationTimeline.play(),
        trigger: "#catalog3",
        start: "top 50%",
      });
    },
  },
  mounted() {
    gsap.registerPlugin(InertiaPlugin);

    this.getData()
      .then((data) => (this.items = data))
      .then(this.onReady);

    this.resizeFn = debounce(this.onResize, 500);
    window.addEventListener("resize", this.resizeFn);
  },
};

export default Catalog3;
