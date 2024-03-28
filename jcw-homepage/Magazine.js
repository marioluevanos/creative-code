import InertiaPlugin from "./InertiaPlugin.js";

const template = `
<section id="magazines">
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 530 200">
    <path
      fill="white"
      d="M521.1 30.6v137.9l-257 21.8L9.6 168.5V30.6L264.1 8.7l257 21.9z"
    ></path>
    <path
      fill="#0f3080"
      d="m263.6 19.6-244 21v118.8l244 21 246.7-21V40.6l-246.7-21zM79.2 118c-.1 11.2-7 19-19.1 19-11.8 0-18.9-7.2-18.9-18.4v-11.4h12.7v11.6c0 4.4 2.2 6.6 6.1 6.6s5.9-2.2 5.9-6.6V64.6h13.3V118zm49.4-28h-11.8v-8.5c0-4.2-2.3-7-7.1-7s-7.2 2.9-7.2 6.8v37.2c0 3.9 2.4 6.8 7.2 6.8s7.1-2.9 7.1-7v-8.5h11.8v8.6c0 10.7-6.5 18.6-19.1 18.6-12.7 0-20.4-8.5-20.4-19.5V82.4c0-10.9 7.8-19.5 20.4-19.5s19.1 7.9 19.1 18.5V90zm73.4 45.4h-11.8l-7.1-41.7-7.6 41.7h-11.7l-12.5-70.8h13.1l6.4 46.8 7.9-46.8h10.2l7.2 46.8 6.8-46.8h12.2L202 135.4zm62.5 0h-13.3v-29h-14.8v29h-13.2V64.6h13.2v30h14.8v-30h13.3v70.8zm24.3 0h-13.2V64.6h13.2v70.8zM338 76.3h-12.9v59.1h-13.3V76.3h-13.1V64.6H338v11.7zm51 59.1h-10.3L365 105.2l-5-11.3v41.5h-12.1V64.6h11.4l13.1 30.7 4.7 11.3v-42H389v70.8zM433.8 76h-20.6v17.5h14.2v10.4h-14.2v19.7h20.6v11.8H400V64.6h33.8V76zm38.8 30.5v28.9h-13.2v-28.9l-15.6-41.9h13.8l9.1 28.8 8.7-28.8h13.2l-16 41.9z"
    ></path>
    <path
      fill="#0f3080"
      d="M521.4 21.9 264.4.1l-.8-.1-.8.1L8.4 21.9l-8.4.7v154.8l8.4.7 254.5 21.8.8.1.8-.1 257-21.8 8.4-.7V22.6l-8.5-.7zm-.7 147.1-257 21.8L9.2 169V31L263.7 9.2l257 21.8v138z"
    ></path>
  </svg>
  <div class="loading" :style="{ '--progress': loaderProgress }"/>
  <div class="cta" ref="cta">
    <h2 class="fs-h2">Get the Magazine</h2>
    <p class="fs-normal">
      We've launched the inaugural edition of our new JC Whitney
      magazine! Sign up today to join the wait list.
    </p>
    <a class="button" href="#" target="_blank">Subscribe today</a>
  </div>
  <div class="container">
    <div class="center">
      <div class="items" ref="items">
        <div class="item" v-for="o in images" :key="o.src" style="visibility: hidden;">
          <figure class="card">
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

</section>
`;

export default {
  template,
  data() {
    const images = [
      {
        src: "https://i.ibb.co/bXzNmhr/Untitled-2.png",
        width: 592,
        height: 842,
      },
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
    ];
    return {
      images,
      progress: images.length,
    };
  },
  computed: {
    degree() {
      return 360 / this.images.length;
    },
    loaderProgress() {
      return 1 - this.progress / this.images.length;
    },
  },
  methods: {
    init() {
      const timeline = gsap.timeline();
      const toY = getComputedStyle(document.documentElement).getPropertyValue(
        "--to-y"
      );
      const total = this.images.length;
      const images = Array.from(this.$refs.items.children);

      images.forEach((image, index) => {
        gsap.set(image, {
          visibility: "visible",
          rotation: 0,
        });

        timeline.to(
          "#logo",
          {
            opacity: 0,
            duration: 0.6,
            scale: 0.8,
            transformOrigin: "50% 50%",
            ease: "power4.in",
          },
          0
        );

        const stackDelay = 0.15;
        const stackDuration = 1;

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

        timeline.to(
          ".center",
          {
            y: "+=66%",
            transformOrigin: "50% 50%",
            duration: 1,
            ease: "circ.inOut",
          },
          startAt + 0.6
        );

        const ctaY = this.$refs.cta.clientHeight / 2 + 16;

        timeline.to(
          ".cta",
          {
            opacity: 1,
            y: `-${ctaY}px`,
            transformOrigin: "50% 0",
            duration: 1,
            ease: "circ.inOut",
          },
          startAt + 0.6
        );
      });

      timeline.set(".cta", {
        zIndex: 20,
      });
    },
    draggable() {
      const items = "#magazines .items";
      Draggable.create(items, {
        type: "rotation",
        inertia: true,
        dragResistance: 0.666,
        allowNativeTouchScrolling: true,
      });
    },
    onLoaderProgress() {
      this.progress -= 1;
      if (this.progress === 0) {
        console.log("Done loading");
      } else {
        console.log(this.progress, " Remaining");
      }
    },
  },
  mounted() {
    gsap.registerPlugin(InertiaPlugin);

    const loader = imagesLoaded(this.$refs.items, () => {
      this.init();
      this.draggable();
    });

    loader.on("progress", this.onLoaderProgress.bind(this));
  },
};
