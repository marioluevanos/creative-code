import { horizontalLoop } from "./utils.js";

const template = `
<section id="catalog" ref="root">
  <img
    class="logo"
    width="1804"
    height="562"
    src="https://www.jcwhitney.com/wp-content/uploads/2023/10/logo-heritage-white.png"
    alt=""
    decoding="async"
    srcset="https://www.jcwhitney.com/wp-content/uploads/2023/10/logo-heritage-white.png 1804w, https://www.jcwhitney.com/wp-content/uploads/2023/10/logo-heritage-white-300x93.png 300w, https://www.jcwhitney.com/wp-content/uploads/2023/10/logo-heritage-white-1024x319.png 1024w, https://www.jcwhitney.com/wp-content/uploads/2023/10/logo-heritage-white-768x239.png 768w, https://www.jcwhitney.com/wp-content/uploads/2023/10/logo-heritage-white-1536x479.png 1536w" sizes="(max-width: 1804px) 100vw, 1804px"
  />
  <div class="years" id="years" ref="years">
    <p
      class="year"
      :data-year="year"
      :data-index="i"
      v-for="(year, i) in years"
    >
      <span>{{year}}</span>
    </p>
  </div>
  <div class="items" ref="items" id="items">
    <figure
      @click="onClick"
      class="item"
      v-for="o in images"
      :key="o.src"
      style="visibility: hidden;"
      :data-years="o.years"
    >
      <img
        class="image"
        :style="{ '--ar': o.width / o.height }"
        :src="o.src"
        :width="o.width"
        :height="o.height"
      />
      <figcaption>{{o.title}}</figcaption>
    </figure>
  </div>
</section>
`;

const Catalog = {
  template,
  data() {
    const sinceYear = 1915;
    const totalYears = new Date().getFullYear() - sinceYear + 1;
    return {
      sinceYear,
      totalYears,
      images: [
        {
          src: "https://i.ibb.co/TcCqmmn/fiberglass-hoods.png",
          width: 980,
          height: 551,
          years: [1980, 1985],
          title:
            "Fiberglass hoods and continental rear to customize your Beetle",
        },
        {
          src: "https://hips.hearstapps.com/hmg-prod/images/jcw-1972-horns-donkey-horn-64eea85e75708.jpg?crop=1xw:1xh;center,top&resize=980:*",
          width: 980,
          height: 551,
          years: [1980, 1985],
          title: 'You\'ll get a real "Kick" out of this Electric Donkey Horn',
        },
        {
          src: "https://www.cartalk.com/sites/default/files/JC%20Whitney%20Louver%20Kit.JPG",
          width: 445,
          height: 600,
          years: [1980, 1985],
          title: "Form-A-Louver Cutting and Forming Tool Kit",
        },
        {
          src: "https://www.cartalk.com/sites/default/files/JC%20Whitney%20Left%20Foot.jpg",
          width: 624,
          height: 468,
          years: [1980, 1985],
          title: "Duplex left footer accelerator for new driving comfort!",
        },
        {
          src: "https://www.cartalk.com/sites/default/files/JC%20Whitney%20Pull%20Start.jpg",
          width: 637,
          height: 600,
          years: [1980, 1985],
          title: "Hand Starter to fit 49-73 Volkswagen & Karmann Ghia",
        },
        {
          src: "https://i.ibb.co/mFRz6pw/grip-king.png",
          width: 643,
          height: 394,
          years: [1980, 1985],
          title: "GRIP-KING automatic electronic road sander",
        },
        {
          src: "https://blog.bestride.com/wp-content/uploads/2016/03/JC-Whitney-Barefoot-Pedal-1.jpg",
          width: 576,
          height: 507,
          years: [1980, 1985],
          title: "Barefoot Accelarator Pedal",
        },
        {
          src: "https://www.jcwhitney.com/wp-content/uploads/2023/10/JCW-Throwback-Ocean-Liner-Blast-Horn.png",
          width: 821,
          height: 463,
          years: [1980, 1985],
          title: "Ocean Liner Blast Horn",
        },
        {
          src: "https://www.jcwhitney.com/wp-content/uploads/2023/10/JCW-Throwback-Love-Your-Car-scaled.webp",
          width: 2560,
          height: 1035,
          years: [1980, 1985],
          title: "Love your car? Doesn't everybody?",
        },
        {
          src: "https://www.jcwhitney.com/wp-content/uploads/2023/10/JCW-Throwback-White-Wall-Kit-SEPIA.png",
          width: 702,
          height: 528,
          years: [1980, 1985],
          title: "White Wall Kit",
        },
        {
          src: "https://www.jcwhitney.com/wp-content/uploads/2023/10/JCW-Throwback-Hollywood-Mufflers.png",
          width: 625,
          height: 369,
          years: [1980, 1985],
          title: "Hollywood Mufflers",
        },
        {
          src: "https://www.jcwhitney.com/wp-content/uploads/2023/10/JCW-Throwback-Hot-Rocket-Illuminated-Ornament.png",
          width: 821,
          height: 392,
          years: [1980, 1985],
          title: "Hot Rocket Illuminated Ornament",
        },
        {
          src: "https://www.jcwhitney.com/wp-content/uploads/2023/10/JCW-Throwback-In-The-Car-Coffee-Maker-Final.webp",
          width: 2020,
          height: 2000,
          years: [1980, 1985],
          title: "In-The-Car Coffee Maker Kit",
        },
      ],
      currentYear: sinceYear,
      years: Array.from(
        { length: totalYears },
        (_, i) => new Date().getFullYear() - i
      ).reverse(),
    };
  },
  methods: {
    onPointerup(event) {
      this.toggleSizeMarker(event);
    },
    onPointerdown(event) {
      this.toggleSizeMarker(event);
    },
    toggleSizeMarker(event) {
      this.$refs.toolTip.classList.toggle(
        "active",
        event.type === "pointerdown"
      );
    },
    onClick(event) {
      console.log(event.target.dataset.years);
    },
    init() {
      const images = Array.from(this.$refs.items.children);
      images.forEach((image) => {
        image.style.visibility = "visible";
      });
    },
    toggleClass(target) {
      Array.from(target.parentElement.children).forEach((y) => {
        y.classList.remove("active");
      });
      target.classList.add("active");
    },
    draggable(parentElement, options = {}) {
      const els = Array.from(parentElement.children);
      const { toggleClass } = this;

      if (options.loop) {
        const loop = horizontalLoop(els, {
          paused: true,
          draggable: true,
          center: true,
          onChange: (element) => {
            toggleClass(element);
          },
        });
        els.forEach((el, i) =>
          el.addEventListener("click", () =>
            loop.toIndex(i, { duration: 0.8, ease: "power1.inOut" })
          )
        );

        els[0].click();
      } else {
        const root = this.$refs.root;
        const gutter = parseInt(
          getComputedStyle(root).getPropertyValue("--item-gutter")
        );
        const liveSnapX = els.map((el) => -el.offsetLeft);
        const minX =
          els.reduce((t, el) => {
            t += el.clientWidth;
            return t;
          }, 0) +
          gutter -
          window.innerWidth;

        Draggable.create(parentElement, {
          bounds: { minX: -minX, maxX: 0 },
          inertia: true,
          type: "x",
          liveSnap: options.liveSnap ? { x: liveSnapX } : false,
          onClick(event) {
            toggleClass(event.target);
          },
          onDragEnd(event) {},
        });
      }
    },
  },
  mounted() {
    const loader = imagesLoaded(this.$refs.items, () => {
      this.init();
      this.draggable(this.$refs.years, { liveSnap: true });
      this.draggable(this.$refs.items, { loop: true });
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
};

export default Catalog;
