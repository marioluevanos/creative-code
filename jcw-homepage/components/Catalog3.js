import { debounce } from "../utils.js";
import Button from "./Button.js";
import InertiaPlugin from "../lib/InertiaPlugin.js";

const template = `
<section id="catalog3" ref="root">
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
  </header>
  <div class="cards">
    <div class="center">
      <div class="items" ref="items">
        <div class="item" v-for="image in catalogs3" :key="image.src" style="visibility: hidden;">
          <figure class="card">
            <img
              class="image"
              :style="{ '--ar': image.width / image.height }"
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
      scrollTimeline: undefined,
      animationTimeline: undefined,
      maxCatalogs: 8,
    };
  },
  computed: {
    degree() {
      return 360 / this.catalogs3.length;
    },
    catalogs3() {
      return this.items
        .map((catalog, index) => ({ ...catalog, id: index }))
        .slice(0, this.maxCatalogs);
    },
  },
  methods: {
    createAnimationTimeline() {
      const timeline = gsap.timeline({ paused: true });
      const total = this.catalogs3.length;
      const items = Array.from(this.$refs.items.children);
      const [item] = items;
      const stackDelay = 0.15;
      const stackDuration = 1;
      const startAt =
        stackDuration +
        stackDelay * Math.floor((this.catalogs3.length - 1) / 2);
      const toY = getComputedStyle(this.$refs.root).getPropertyValue("--to-y");

      items.forEach((image, index) => {
        gsap.set(image, {
          visibility: "visible",
          rotation: 0,
        });

        timeline.from(
          image,
          {
            x: () =>
              index % 2
                ? window.innerWidth + image.clientWidth * 4
                : -window.innerWidth - image.clientWidth * 4,
            y: () => window.innerHeight - image.clientHeight,
            rotation: index % 2 ? 200 : -200,
            scale: 4,
            opacity: 1,
            ease: "power4.out",
            duration: stackDuration,
            delay: stackDelay * Math.floor(index / 2),
          },
          0.6
        );

        timeline.to(
          image,
          {
            scale: 1,
            duration: 0.6,
            ease: "circ.out",
          },
          startAt
        );

        const rotationAngle = index * this.degree;
        const mirrorAngle = -this.degree * (total - index);
        const rotation = index > total / 2 ? mirrorAngle : rotationAngle;

        timeline.to(
          image,
          {
            transformOrigin: `center ${toY}`,
            rotation,
            duration: 1,
            ease: "circ.inOut",
          },
          startAt + 0.6
        );
      });

      const toCenterY =
        window.innerWidth > 768
          ? `-${item.clientHeight / 2}px`
          : `-${item.clientHeight / 4}px`;

      timeline.to(
        "#catalog3 .center",
        {
          y: toCenterY,
          scale: 0.5,
          duration: 1,
          ease: "circ.inOut",
        },
        startAt + 0.6
      );

      return timeline;
    },
    draggable() {
      return Draggable.create("#catalog3 .items", {
        type: "rotation",
        inertia: true,
        dragResistance: 0.5,
      });
    },
    onReady() {
      this.scrollTimeline = this.createScrollTimeline();
      this.animationTimeline = this.createAnimationTimeline();
      this.draggable();
      this.onResize();
    },
    onResize() {
      if (window.innerWidth > 768) {
        this.$refs.root.style.setProperty(
          "--item-w",
          `${this.$refs.header.clientWidth}px`
        );
      }
    },
    async getData() {
      const response = await fetch("/catalog.json");
      return response.json();
    },
    createScrollTimeline() {
      return ScrollTrigger.create({
        animation: this.createAnimationTimeline(),
        // markers: true,
        start: "top 100%",
        end: "bottom 100%",
        trigger: "#catalog3",
        scrub: true,
        // onToggle: (self) => {
        //   console.log(self.isActive, self.progress);
        //   if (self.isActive) {
        //     this.animationTimeline.play();
        //   } else {
        //     // this.animationTimeline.restart();
        //   }
        // },
        // pin: "#catalog3",
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
