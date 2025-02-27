import Button from "./Button.js";
import ImageCompare from "./ImageCompare.js";
import InertiaPlugin from "../lib/InertiaPlugin.js";
import { debounce } from "../utils.js";

const template = `
<section id="magazines" ref="root">
  <header class="header">
    <h2 class="fs-h2 title">Get the Magazine</h2>
    <p class="fs-normal">
      We've launched the inaugural edition of our new JC Whitney
      magazine! Sign up today to join the wait list.
    </p>
  </header>
  <div class="box">
    <h3>Quarterly Issues</h3>
    <h3>100+ Pages</h3>
    <h3>Parts Catalog</h3>
  </div>
  <Button class="button cta">Subscribe today</Button>
  <div class="canvas" ref="canvas" id="canvas">
    <div class="center">
      <div class="items" ref="items">
        <div class="item" v-for="(o, i) in images" :key="o.src" style="visibility: hidden;">
          <figure class="magazine" v-if="i !== images.length - 1">
            <img
              class="image"
              :style="{ '--ar': o.width / o.height }"
              :src="o.src"
              :width="o.width"
              :height="o.height"
            />
          </figure>
          <ImageCompare
            v-else
            class="magazine"
            :aspectRatio="o.width / o.height"
            :original="images[0].src"
            :modified="o.src"
          />
        </div>
      </div>
    </div>
  </div>
</section>
`;

export default {
  template,
  components: {
    Button,
    ImageCompare,
  },
  data() {
    const images = [
      {
        src: "assets/magazine/s-l1600.webp",
        width: 946,
        height: 1200,
      },
      {
        src: "assets/magazine/1024x1024.webp",
        width: 831,
        height: 1024,
      },
      {
        src: "assets/magazine/pap2700a.webp",
        width: 678,
        height: 872,
      },
      {
        src: "assets/magazine/JC-Whitney-cover1143071959.webp",
        width: 500,
        height: 667,
      },
      {
        src: "assets/magazine/383-Bcover.webp",
        width: 901,
        height: 1200,
      },
      {
        src: "assets/magazine/Untitled-2.webp",
        width: 592,
        height: 842,
      },
    ];
    return {
      images,
      totalDeg: 45,
      progress: images.length,
      animation: null,
      scrollProgress: 0,
      resizeFn: undefined,
    };
  },
  computed: {
    degree() {
      return this.totalDeg / this.images.length;
    },
  },
  methods: {
    createAnimation(options) {
      const timeline = gsap.timeline(options);

      gsap.set(
        [
          "#magazines .header h2",
          "#magazines .header p",
          "#magazines .box",
          "#magazines .cta",
        ],
        {
          opacity: 0,
        }
      );

      const images = Array.from(this.$refs.items.children);
      const canvasW = this.$refs.canvas.clientWidth;
      const canvasH = this.$refs.canvas.clientHeight;

      this.onResize();

      timeline.set(
        "#magazines .center",
        {
          rotation: -this.totalDeg / 6,
        },
        0
      );

      timeline.fromTo(
        "#magazines .header h2",
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "circ.out",
          stagger: 0.15,
        },
        0
      );

      timeline.fromTo(
        "#magazines .header p",
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 0.66,
          y: 0,
          duration: 1,
          ease: "circ.out",
          stagger: 0.15,
        },
        0
      );

      images.forEach((image, index) => {
        const finalRot = (index * this.degree) / 3;
        gsap.set(image, {
          visibility: "visible",
          rotation: 0,
          rotation: finalRot,
        });

        const stackDelay = 0.15;
        const stackDuration = 1;

        timeline.from(
          image,
          {
            x: () => (index % 2 ? -canvasW * 0.25 : canvasW * 0.25),
            y: () => canvasH,
            rotation: index % 2 ? -this.totalDeg : this.totalDeg,
            scale: 2,
            opacity: 0,
            ease: "expo.out",
            duration: stackDuration,
            delay: stackDelay * Math.floor(index / 2),
            zIndex: index,
          },
          0.6
        );

        timeline.to(
          "#magazines .center",
          {
            rotation: -finalRot,
            transformOrigin: "50% 50%",
            ease: "circ.inOut",
            duration: 1,
          },
          0
        );

        const startAt = 1.3;
        timeline.to(
          image,
          {
            scale: 1,
            duration: 0.6,
            rotation: finalRot,
            duration: 1,
            ease: "circ.inOut",
          },
          startAt
        );

        timeline.fromTo(
          "#magazines .box",
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            ease: "circ.out",
            duration: 1,
          },
          startAt + 0.4
        );

        timeline.fromTo(
          "#magazines .cta",
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            ease: "circ.out",
            duration: 1,
          },
          startAt + 0.6
        );
      });

      return timeline;
    },
    getCanvasWidth() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const ar = w / h;
      const isPortrait = ar < 1;
      const isLandscape = ar > 1;

      if (w <= 320) return 240;
      if (w < 460) return 300;
      if (w >= 1280) return 500;
      if (isLandscape) return w * 0.5;
      if (isPortrait) return w * 0.7;

      return w * 0.5; // square ratio
    },
    onResize() {
      const canvasW = this.getCanvasWidth();
      this.$refs.canvas.style.setProperty(
        "--canvas-w",
        `${Math.floor(canvasW)}px`
      );
    },
    createScrollTrigger() {
      const small = window.innerWidth <= 768;
      const start = small ? "top 75%" : "top 67%";
      const end = small ? "bottom 125%" : "bottom 67%";
      const animation = this.createAnimation({ paused: true });

      return ScrollTrigger.create({
        start,
        end,
        trigger: "#magazines",
        onEnter: () => animation.play(),
        onUpdate: (self) => (this.scrollProgress = self.progress * 100),
        animation,
      });
    },
  },
  mounted() {
    gsap.registerPlugin(InertiaPlugin, ScrollTrigger);

    this.createScrollTrigger();

    this.resizeFn = debounce(this.onResize, 500);
    window.addEventListener("resize", this.resizeFn);
    // GSDevTools.create({ animation: this.animation });
  },
};
