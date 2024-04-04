import Button from "./Button.js";
import ImageCompare from "./ImageCompare.js";
import InertiaPlugin from "../lib/InertiaPlugin.js";

const template = `
<section id="magazines" ref="root">
  <header class="header">
    <h2 class="fs-h2 title">Get the Magazine</h2>
    <p class="fs-normal">
      We've launched the inaugural edition of our new JC Whitney
      magazine! Sign up today to join the wait list.
    </p>
  </header>
  <div class="canvas" ref="canvas">
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
            :scrollProgress="scrollProgress"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="box c1">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><title>sports-fan</title><g fill="currentColor" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="10"><circle cx="24" cy="26" r="5" fill="none" stroke="currentColor" stroke-width="2"></circle> <path d="M44,23,30,36H18L4,23" fill="none" stroke="currentColor" stroke-width="2"></path> <line x1="18" y1="46" x2="18" y2="36" fill="none" stroke="currentColor" stroke-width="2"></line> <line x1="30" y1="36" x2="30" y2="46" fill="none" stroke="currentColor" stroke-width="2"></line> <path class="s-cyan" d="M4,15.842a53.977,53.977,0,0,1,40,0V5.692a56.017,56.017,0,0,0-40,0Z" fill="none" stroke="currentColor" stroke-width="2"></path></g></svg>
    <h3>Community</h3>
    <p>Read stories that'll make your heart race faster.</p>
  </div>
  <div class="box c2">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="currentColor" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="10"><line  class="s-cyan" fill="none" stroke="currentColor" stroke-width="2" x1="9" y1="12" x2="17" y2="12"></line> <line class="s-cyan" fill="none" stroke="currentColor" stroke-width="2" x1="23" y1="24" x2="15" y2="24"></line> <line class="s-cyan" fill="none" stroke="currentColor" stroke-width="2" x1="9" y1="36" x2="17" y2="36"></line> <line fill="none" stroke="currentColor" stroke-width="2" x1="30" y1="6" x2="30" y2="18"></line> <line fill="none" stroke="currentColor" stroke-width="2" x1="36" y1="18" x2="36" y2="30"></line> <line fill="none" stroke="currentColor" stroke-width="2" x1="30" y1="30" x2="30" y2="42"></line> <rect x="2" y="6" fill="none" stroke="currentColor" stroke-width="2" width="38" height="12"></rect> <rect x="8" y="18" fill="none" stroke="currentColor" stroke-width="2" width="38" height="12"></rect> <rect x="2" y="30" fill="none" stroke="currentColor" stroke-width="2" width="38" height="12"></rect></g></svg>
    <h3>Quarterly</h3>
    <p>Shipped in the Spring, Summer, Fall, and Winter.</p>
  </div>
  <div class="box c3">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><title>restaurant-menu</title><g fill="currentColor" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="10"><polygon points="38 46 6 43 6 5 38 2 38 46" fill="none" stroke="currentColor" stroke-width="2"></polygon> <line  x1="44" y1="6" x2="44" y2="42" fill="none" stroke="currentColor" stroke-width="2"></line> <line class="s-cyan" x1="13" y1="29" x2="29" y2="29" fill="none" stroke="currentColor" stroke-width="2"></line> <line class="s-cyan" x1="13" y1="36" x2="29" y2="37" fill="none" stroke="currentColor" stroke-width="2"></line> <circle class="s-cyan" cx="21" cy="16" r="6" fill="none" stroke="currentColor" stroke-width="2"></circle></g></svg>
    <h3>100+ Pages</h3>
    <p>Unadulterated automotive awesomeness</p>
  </div>
  <div class="box c4">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><title>brakes</title><g fill="currentColor" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="10"><path d="M40,27A19,19,0,1,1,21,8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="butt"></path> <circle class="f-cyan" cx="26.5" cy="8.5" r="1.5" fill="currentColor" data-stroke="none" stroke="none"></circle> <circle class="f-cyan" cx="39.5" cy="21.5" r="1.5" fill="currentColor" data-stroke="none" stroke="none"></circle> <circle class="f-cyan" cx="34.5" cy="13.5" r="1.5" fill="currentColor" data-stroke="none" stroke="none"></circle> <path class="s-cyan" d="M31.956,34A13,13,0,1,1,14,16.044" fill="none" stroke="currentColor" stroke-width="2"></path> <circle cx="21" cy="27" r="4" fill="none" stroke="currentColor" stroke-width="2"></circle> <path d="M34,27H46A25.028,25.028,0,0,0,21,2V14A13.015,13.015,0,0,1,34,27Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="butt"></path></g></svg>
    <h3>Parts Catalog</h3>
    <p>Great deals on automotive parts.</p>
  </div>
  <Button class="button cta">Subscribe today</Button>
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
        src: "https://i.ibb.co/wQBmfPx/s-l1600.jpg",
        width: 946,
        height: 1200,
      },
      {
        src: "https://i.ibb.co/xHJchsC/6016b24e-d839-5f27-bad4-545b8565b5f2-1024x1024.jpg",
        width: 831,
        height: 1024,
      },
      {
        src: "https://i.ibb.co/NxCB1W8/pap2700a.jpg",
        width: 678,
        height: 872,
      },
      {
        src: "https://i.ibb.co/9VCg72m/JC-Whitney-cover1143071959.jpg",
        width: 500,
        height: 667,
      },
      {
        src: "https://i.ibb.co/rdQKH7W/383-Bcover.jpg",
        width: 901,
        height: 1200,
      },
      {
        src: "https://i.ibb.co/bXzNmhr/Untitled-2.png",
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
    };
  },
  computed: {
    degree() {
      return this.totalDeg / this.images.length;
    },
  },
  methods: {
    init() {
      this.$refs.root.classList.add("ass");
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

      this.$refs.canvas.style.setProperty("--canvas-w", `${canvasW}px`);

      const timeline = gsap.timeline({
        paused: true,
      });

      timeline.set(
        ".center",
        {
          rotation: -this.totalDeg / 6,
        },
        0
      );

      timeline.fromTo(
        ["#magazines .header h2", "#magazines .header p"],
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
          ".center",
          {
            rotation: -finalRot,
            transformOrigin: "50% 50%",
            ease: "circ.inOut",
            duration: 1,
          },
          0
        );

        const startAt = 1.6;
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
          ["#magazines .box.c1", "#magazines .box.c2"],
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
          ["#magazines .box.c3", "#magazines .box.c4"],
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
          startAt + 0.5
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

      timeline.set("#magazines header", {
        zIndex: 20,
      });

      return timeline;
    },
    draggable() {
      const items = "#magazines .item";
      Draggable.create(items, {
        type: "x, y",
        bounds: this.$refs.canvas,
        inertia: true,
        dragResistance: 0.9,
        allowNativeTouchScrolling: true,
      });
    },
  },
  mounted() {
    gsap.registerPlugin(InertiaPlugin, ScrollTrigger);
    this.animation = this.init();
    this.draggable();

    const onEnter = () => {
      this.animation.play();
    };

    // GSDevTools.create({ animation: this.animation });
    const small = window.innerWidth <= 768;
    const start = small ? "top 75%" : "top 67%";
    const end = small ? "bottom 150%" : "bottom 67%";

    ScrollTrigger.create({
      trigger: "#magazines",
      start,
      end,
      onEnter,
      onUpdate: (self) => {
        this.scrollProgress = self.progress * 100;
      },
      onLeaveBack: ({ progress, direction, isActive }) =>
        console.log({ progress, direction, isActive }),
      onLeave: ({ progress, direction, isActive }) =>
        console.log({ progress, direction, isActive }),
      markers: true,
    });
  },
};
