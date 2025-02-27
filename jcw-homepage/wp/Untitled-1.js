import horizontalLoop from "./horizontalLoop.js?v=1";
import gsap from "https://marioluevanos.com/gsap/esm/index.js";
import debounce from "./debounce.js";
import Draggable from "https://marioluevanos.com/gsap/esm/Draggable.js";

const images = [
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/donkey.jpeg",
    width: 1080,
    height: 1350,
    keywords: ["Horns", "Animals", "New"],
    title: "Electric Donkey Horn",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/jcw-1972-horns-donkey-horn.webp",
    width: 906,
    height: 900,
    keywords: ["Horns", "Animals", "Vintage"],
    title: "Electric Donkey Horn",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/pipe-organ.jpeg",
    width: 1080,
    height: 1350,
    keywords: ["Horns", "Audio", "New"],
    title: "Pipe Organ Speakers",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/JCW-Pipe_Organ_Speakers.jpg",
    width: 475,
    height: 476,
    keywords: ["Horns", "Audio", "Vintage"],
    title: "Pipe Organ Speakers",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/barefoot.jpeg",
    width: 1080,
    height: 1350,
    keywords: ["Horns", "Audio", "New"],
    title: "Barefoot Accelerator",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/JC-Whitney-Barefoot-Pedal-1.webp",
    width: 576,
    height: 507,
    keywords: ["Pedals", "Interior", "Vintage"],
    title: "Barefoot Accelerator",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/white-cat.jpeg",
    width: 1080,
    height: 1350,
    keywords: ["Lights", "Animals", "New"],
    title: "The Winky White Cat",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/cat.png",
    width: 497,
    height: 621,
    keywords: ["Lights", "Animals", "Vintage"],
    title: "The Winky White Cat",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },

  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/mustang-horn.jpg",
    width: 980,
    height: 551,
    keywords: ["Horns", "Animals"],
    title: "Mustang Horn For All Cars & Trucks",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/valve-covers.jpg",
    width: 980,
    height: 551,
    keywords: ["Engine", "Valve Covers"],
    title: "Valve Covers",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/fiberglass-hoods.webp",
    width: 980,
    height: 551,
    keywords: ["Hoods", "Fiberglass", "Volkswagen"],
    title: "Fiberglass hoods and continental rear to customize your Beetle",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/hubcaps-racing.jpg",
    width: 980,
    height: 551,
    keywords: ["Tires", "Wheels"],
    title: "Racing Hub Style Custom Wheel Covers",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/Horn-Sale.jpeg",
    width: 980,
    height: 551,
    keywords: ["Electric", "Horns", "Accessories"],
    title: "Big Savings on Horns and Bells",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/Continental-Kit.jpg",
    width: 980,
    height: 551,
    keywords: ["Hoods", "Volkswagen"],
    title: "Rolls-Royce style Hood & Continental Style Rear",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/white-white-tires.webp",
    width: 980,
    height: 551,
    keywords: ["Wheels", "Tires"],
    title: "White Wall Kit",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/upholstery.jpeg",
    width: 980,
    height: 551,
    keywords: ["Upholstery", "Interior"],
    title: "The Denim Look",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/light.jpg",
    width: 980,
    height: 551,
    keywords: ["Lights"],
    title: "Tri-Beam Warning Light",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/emergency-light.jpg",
    width: 980,
    height: 551,
    keywords: ["Lights", "Magnetic"],
    title: "Flashing Emergency Light",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/magnetic-strobe.jpg",
    width: 980,
    height: 551,
    keywords: ["Lights", "Magnetic"],
    title: "Flashing Emergency Light",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/lights.jpg",
    width: 980,
    height: 551,
    keywords: ["Lights"],
    title: "All Lights",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/ckit.webp",
    width: 980,
    height: 551,
    keywords: ["Interior", "Tools"],
    title: "Continental Kit",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/magnetic-flashlight.png",
    width: 980,
    height: 551,
    keywords: ["Tools", "Lights", "Magnetic"],
    title: "Magnetic Flashlight",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/animals.jpeg",
    width: 980,
    height: 551,
    keywords: ["Electric", "Animals", "Interior"],
    title: "Winking Animals",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/horn.jpeg",
    width: 980,
    height: 551,
    keywords: ["Horns"],
    title: "Police, Fire Engine and Ambulance Sounds",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/tach.jpg",
    width: 980,
    height: 551,
    keywords: ["Interior", "Performance"],
    title: "Illuminated Extra-Wide Tachometer",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/JC-Whitney-Louver-Kit.webp",
    width: 445,
    height: 600,
    keywords: ["Tools", "Upholstery"],
    title: "Form-A-Louver Cutting and Forming Tool Kit",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/JC-Whitney-Left-Foot.webp",
    width: 624,
    height: 468,
    keywords: ["Interior", "Comfort", "Pedals"],
    title: "Duplex left footer accelerator for new driving comfort!",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/JC-Whitney-Pull-Start.webp",
    width: 637,
    height: 600,
    keywords: ["Starter", "Volkswagen"],
    title: "Hand Starter to fit 49-73 Volkswagen & Karmann Ghia",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/JCW-Throwback-Love-Your-Car-scaled.webp",
    width: 2560,
    height: 1035,
    keywords: ["Care", "Maintenance"],
    title: "Love your car? Doesn't everybody?",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/JCW-Throwback-Hollywood-Mufflers.webp",
    width: 625,
    height: 369,
    keywords: ["Mufflers", "Performance"],
    title: "Hollywood Mufflers",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/JCW-Throwback-Hot-Rocket-Illuminated-Ornament.webp",
    width: 821,
    height: 392,
    keywords: ["Lights"],
    title: "Hot Rocket Illuminated Ornament",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
  {
    src: "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/img/catalog/JCW-Throwback-In-The-Car-Coffee-Maker-Final.webp",
    width: 2020,
    height: 2000,
    keywords: ["Interior"],
    title: "In-The-Car Coffee Maker Kit",
    description:
      "Illuminate your automotive adventures with our versatile Magnetic Flashlight.",
  },
];

export default {
  template: `
  <section id="catalog1" ref="root">
    <header class="header">
      <h2 class="fs-h2 title">Catalog Throwback</h2>
      <p class="fs-small">
        Step back in time with JC Whitney's vintage catalog gallery,
        showcasing decades of car parts & accessories that fueled
        utomotive passions.
      </p>
    </header>
    <div
      class="catalogs1"
      ref="catalogs1"
      id="catalogs1"
    >
      <figure
        class="item"
        v-for="(image, index) in catalogs1"
        :key="image.src + index + image.keywords"
        :class="image.keywords.map(w => slugify(w)).join(' ')"
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
          <img
            class="item-image bg"
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
    <a class="cta button" href="/vintage-jc-whitney-catalog-gallery/">
      View More
    </a>
  </section>
  `,
  data() {
    return {
      resizeFn: () => undefined,
      images,
      maxCatalogs: 24,
    };
  },
  computed: {
    catalogs1() {
      return this.images
        .map((catalog, index) => ({ ...catalog, id: index }))
        .slice(0, this.maxCatalogs);
    },
  },
  methods: {
    slugify(text = "") {
      return !text
        ? ""
        : text
            .toLowerCase()
            .replace(/'|’/, "")
            .replace(/['¿’~`!@#$%’”“‘^&*()_\-+=}\]{[|\\"':;?/>.<,'"`]/g, " ")
            .replace(/^-|-$/, "")
            .replace(/[ ]/g, "-")
            .replace(/_/g, "-")
            .replace(/^-{2,}/, "-")
            .replace(/-{2,}/, "-")
            .replace(/^-/, "")
            .replace(/-$/, "");
    },
    setCatalogItemsVisible() {
      Array.from(this.$refs.catalogs1?.children).forEach((image) => {
        image.style.visibility = "visible";
      });
    },
    initDraggable() {
      const boxes = gsap.utils.toArray("#catalogs1 .item");

      let activeElement;

      const loop = horizontalLoop(boxes, {
        paused: true,
        draggable: true,
        center: true,
        draggable: Draggable,
        onChange: (element) => {
          activeElement && activeElement.classList.remove("active");
          element.classList.add("active");
          activeElement = element;
        },
      });

      boxes.forEach((box, i) =>
        box.addEventListener("click", () =>
          loop.toIndex(i, { duration: 0.8, ease: "power1.inOut" })
        )
      );
    },
    onResize() {},
  },
  mounted() {
    this.$nextTick(() => {
      this.setCatalogItemsVisible();
      this.initDraggable();
    });

    this.resizeFn = debounce(this.onResize, 500);
    window.addEventListener("resize", this.resizeFn);
  },
};
