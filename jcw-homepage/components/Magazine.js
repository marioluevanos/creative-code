import Button from "./Button.js";
import InertiaPlugin from "../InertiaPlugin.js";

const template = `
<section id="magazines">
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
        <div class="item" v-for="o in images" :key="o.src" style="visibility: hidden;">
          <figure class="magazine">
            <img
              class="image"
              :style="{ '--ar': o.width / o.height }"
              :src="o.src"
              :width="o.width"
              :height="o.height"
            />
          </figure>
        </div>
      </div>
    </div>
  </div>
  <div class="box c1">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><title>sports-fan</title><g fill="currentColor" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="10"><circle cx="24" cy="26" r="5" fill="none" stroke="currentColor" stroke-width="2"></circle> <path d="M44,23,30,36H18L4,23" fill="none" stroke="currentColor" stroke-width="2"></path> <line x1="18" y1="46" x2="18" y2="36" fill="none" stroke="currentColor" stroke-width="2"></line> <line x1="30" y1="36" x2="30" y2="46" fill="none" stroke="currentColor" stroke-width="2"></line> <path d="M4,15.842a53.977,53.977,0,0,1,40,0V5.692a56.017,56.017,0,0,0-40,0Z" fill="none" stroke="currentColor" stroke-width="2"></path></g></svg>
    <h3>Community</h3>
    <p>Read stories that'll make your heart race faster.</p>
  </div>
  <div class="box c2">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><title>books-46</title><g fill="currentColor" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="10"><line fill="none" stroke="currentColor" stroke-width="2" x1="9" y1="12" x2="17" y2="12"></line> <line fill="none" stroke="currentColor" stroke-width="2" x1="23" y1="24" x2="15" y2="24"></line> <line fill="none" stroke="currentColor" stroke-width="2" x1="9" y1="36" x2="17" y2="36"></line> <line fill="none" stroke="currentColor" stroke-width="2" x1="30" y1="6" x2="30" y2="18"></line> <line fill="none" stroke="currentColor" stroke-width="2" x1="36" y1="18" x2="36" y2="30"></line> <line fill="none" stroke="currentColor" stroke-width="2" x1="30" y1="30" x2="30" y2="42"></line> <rect x="2" y="6" fill="none" stroke="currentColor" stroke-width="2" width="38" height="12"></rect> <rect x="8" y="18" fill="none" stroke="currentColor" stroke-width="2" width="38" height="12"></rect> <rect x="2" y="30" fill="none" stroke="currentColor" stroke-width="2" width="38" height="12"></rect></g></svg>
    <h3>Annual Sub</h3>
    <p>Shipped in the Spring, Summer, Fall, and Winter.</p>
  </div>
  <div class="box c3">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><title>restaurant-menu</title><g fill="currentColor" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="10"><polygon points="38 46 6 43 6 5 38 2 38 46" fill="none" stroke="currentColor" stroke-width="2"></polygon> <line x1="44" y1="6" x2="44" y2="42" fill="none" stroke="currentColor" stroke-width="2"></line> <line x1="13" y1="29" x2="29" y2="29" fill="none" stroke="currentColor" stroke-width="2"></line> <line x1="13" y1="36" x2="29" y2="37" fill="none" stroke="currentColor" stroke-width="2"></line> <circle cx="21" cy="16" r="6" fill="none" stroke="currentColor" stroke-width="2"></circle></g></svg>
    <h3>100+ Pages</h3>
    <p>Unadulterated automotive awesomeness</p>
  </div>
  <div class="box c4">
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><title>brakes</title><g fill="currentColor" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="10"><path d="M40,27A19,19,0,1,1,21,8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="butt"></path> <circle cx="26.5" cy="8.5" r="1.5" fill="currentColor" data-stroke="none" stroke="none"></circle> <circle cx="39.5" cy="21.5" r="1.5" fill="currentColor" data-stroke="none" stroke="none"></circle> <circle cx="34.5" cy="13.5" r="1.5" fill="currentColor" data-stroke="none" stroke="none"></circle> <path d="M31.956,34A13,13,0,1,1,14,16.044" fill="none" stroke="currentColor" stroke-width="2"></path> <circle cx="21" cy="27" r="4" fill="none" stroke="currentColor" stroke-width="2"></circle> <path d="M34,27H46A25.028,25.028,0,0,0,21,2V14A13.015,13.015,0,0,1,34,27Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="butt"></path></g></svg>
    <h3>Catalog</h3>
    <p>Great deals on automotive parts.</p>
  </div>
  <Button class="button cta">Subscribe today</Button>
</section>
`;

export default {
  template,
  components: {
    Button,
  },
  data() {
    const images = [
      {
        src: "https://i.ibb.co/y089Y01/16531642-a630-5d23-9649-89215d765fa8-1024x1024.jpg",
        width: 843,
        height: 1024,
      },
      {
        src: "https://i.ibb.co/XZFDSXg/Screenshot-2024-03-26-at-3-18-30-PM.png",
        width: 854,
        height: 1042,
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
        src: "https://i.ibb.co/wQBmfPx/s-l1600.jpg",
        width: 946,
        height: 1200,
      },
      {
        src: "https://i.ibb.co/nQC059L/s-l1600.jpg",
        width: 1316,
        height: 1600,
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
        src: "https://i.ibb.co/wQBmfPx/s-l1600.jpg",
        width: 946,
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
      totalDeg: 90,
      progress: images.length,
    };
  },
  computed: {
    degree() {
      return this.totalDeg / this.images.length;
    },
    loaderProgress() {
      return 1 - this.progress / this.images.length;
    },
  },
  methods: {
    init() {
      const images = Array.from(this.$refs.items.children);
      const canvasW = this.$refs.canvas.clientWidth;
      const canvasH = this.$refs.canvas.clientHeight;

      this.$refs.canvas.style.setProperty("--canvas-w", `${canvasW}px`);

      const timeline = gsap.timeline();

      timeline.set(
        ".center",
        {
          rotation: -this.totalDeg / 6,
        },
        0
      );

      images.forEach((image, index) => {
        gsap.set(image, {
          visibility: "visible",
          rotation: 0,
        });

        const stackDelay = 0.15;
        const stackDuration = 1;

        timeline.from(
          image,
          {
            x: () =>
              index % 2
                ? canvasW + image.clientWidth * 4
                : -canvasW - image.clientWidth * 4,
            y: () => canvasH - image.clientHeight,
            rotation: index % 2 ? 200 : -200,
            scale: 4,
            opacity: 1,
            ease: "power4.out",
            duration: stackDuration,
            delay: stackDelay * Math.floor(index / 2),
          },
          0.6
        );

        const startAt =
          stackDuration + stackDelay * Math.floor((this.images.length - 1) / 2);

        timeline.to(
          image,
          {
            scale: 1,
            duration: 0.6,
            ease: "circ.out",
          },
          startAt
        );

        timeline.to(
          image,
          {
            rotation: index * this.degree,
            duration: 1,
            ease: "circ.inOut",
          },
          startAt + 0.6
        );

        timeline.to(
          ".center",
          {
            transformOrigin: "50% 50%",
            duration: 1,
            ease: "circ.inOut",
          },
          startAt + 0.6
        );

        timeline.to(
          "#magazines header",
          {
            opacity: 1,
            duration: 1,
            ease: "circ.inOut",
          },
          startAt + 0.6
        );

        timeline.to(
          ".center",
          {
            rotation: -this.totalDeg * 0.66,
            ease: "circ.inOut",
            duration: 1,
          },
          startAt + 0.6
        );
      });

      timeline.set("#magazines header", {
        zIndex: 20,
      });
    },
    draggable() {
      const items = "#magazines .items";
      Draggable.create(items, {
        type: "rotation",
        inertia: true,
        dragResistance: 0.9,
        allowNativeTouchScrolling: true,
      });
    },
  },
  mounted() {
    gsap.registerPlugin(InertiaPlugin);

    this.init();
    this.draggable();
  },
};
