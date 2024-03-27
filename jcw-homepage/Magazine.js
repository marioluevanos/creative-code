import InertiaPlugin from "./InertiaPlugin.js";

export default {
  data() {
    return {
      images: [
        {
          src: "https://i.ibb.co/bXzNmhr/Untitled-2.png",
          width: 592,
          height: 842,
        },
        {
          src: "https://i.ebayimg.com/images/g/AaEAAOSwrcZembPp/s-l1600.jpg",
          width: 1296,
          height: 1600,
        },
        {
          src: "https://mr-magazine.com/cdn/shop/products/16531642-a630-5d23-9649-89215d765fa8_1024x1024.jpg?v=1587103359",
          width: 831,
          height: 1024,
        },
        {
          src: "https://mr-magazine.com/cdn/shop/products/6016b24e-d839-5f27-bad4-545b8565b5f2_1024x1024.jpg?v=1585277435",
          width: 843,
          height: 1024,
        },
        {
          src: "https://i.ibb.co/XZFDSXg/Screenshot-2024-03-26-at-3-18-30-PM.png",
          width: 854,
          height: 1042,
        },
        {
          src: "https://i.ebayimg.com/images/g/AH4AAOSwuvBgFCAK/s-l1600.jpg",
          width: 1316,
          height: 1600,
        },
        {
          src: "https://mr-magazine.com/cdn/shop/products/16531642-a630-5d23-9649-89215d765fa8_1024x1024.jpg?v=1587103359",
          width: 831,
          height: 1024,
        },
        {
          src: "http://www.jumpingfrog.com/images/epm19oct01/pap2700a.jpg",
          width: 678,
          height: 872,
        },
        {
          src: "https://forums.pelicanparts.com/uploads7/JC+Whitney+cover1143071959.jpg",
          width: 500,
          height: 667,
        },
        {
          src: "https://i0.wp.com/www.curbsideclassic.com/wp-content/uploads/2021/10/383Bcover.jpeg?ssl=1",
          width: 901,
          height: 1200,
        },
      ],
    };
  },
  computed: {
    degree() {
      return 360 / this.images.length;
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
        const rotationAngle = index * this.degree;
        const startAt = 0.15 * (total / 2 - 1) + 1;
        const mirrorAngle = -this.degree * (total - index);
        const rotation = index > total / 2 ? mirrorAngle : rotationAngle;

        gsap.set("#magazines .center", {
          y: "-8%",
        });

        gsap.set(image, {
          visibility: "visible",
          rotation: 0,
        });

        gsap.set(".center", {
          y: "50%",
          scale: 0.5,
          transformOrigin: "50% 50%",
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
            duration: 1,
            delay: 0.15 * Math.floor(index / 2),
          },
          0
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
            y: "0%",
            transformOrigin: "50% 50%",
            scale: 0.3,
            duration: 1,
            ease: "circ.inOut",
          },
          startAt + 0.6
        );

        // timeline.to(
        //   ".cta",
        //   {
        //     // top: "4rem",
        //     duration: 1,
        //     ease: "circ.inOut",
        //   },
        //   startAt + 0.6
        // );
      });

      timeline.set(".cta", {
        zIndex: 10,
      });
    },
    draggable() {
      const items = "#magazines .items";
      const degree = this.degree;
      let start = 0;
      Draggable.create(items, {
        type: "rotation",
        inertia: true,
        allowNativeTouchScrolling: true,
      });
    },
  },
  mounted() {
    gsap.registerPlugin(InertiaPlugin);

    const loader = imagesLoaded(this.$refs.items, () => {
      this.init();
      this.draggable();
    });

    let total = this.images.length;
    loader.on("progress", () => {
      total -= 1;
      if (total === 0) {
        console.log("Done loading");
      } else {
        console.log(total, " Remaining");
      }
    });
  },
  template: `
  <section id="magazines">
    <div class="cta">
      <img
        width="1804"
        height="562"
        src="https://www.jcwhitney.com/wp-content/uploads/2023/10/logo-heritage-white.png"
        class="logo"
        alt=""
      />
      <button>View Gallery</button>
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
  `,
};
