function lerp(previous, current, ease) {
  return (1 - ease) * previous + ease * current;
}

function clamp(a, min = 0, max = 1) {
  return Math.min(max, Math.max(min, a));
}

function invlerp(x, y, a) {
  return clamp((a - x) / (y - x));
}

const images = [
  {
    src: "https://hips.hearstapps.com/hmg-prod/images/jcw-1972-horns-donkey-horn-64eea85e75708.jpg?crop=1xw:1xh;center,top&resize=980:*",
    width: 980,
    height: 551,
    years: [1980, 1985],
  },
  {
    src: "https://www.cartalk.com/sites/default/files/JC%20Whitney%20Louver%20Kit.JPG",
    width: 445,
    height: 600,
    years: [1980, 1985],
  },
  {
    src: "https://www.cartalk.com/sites/default/files/JC%20Whitney%20Left%20Foot.jpg",
    width: 624,
    height: 468,
    years: [1980, 1985],
  },
  {
    src: "https://www.cartalk.com/sites/default/files/JC%20Whitney%20Pull%20Start.jpg",
    width: 637,
    height: 600,
    years: [1980, 1985],
  },
  {
    src: "https://www.cartalk.com/sites/default/files/JC%20Whitney%20Grip%20King%20Sander_0.jpg",
    width: 643,
    height: 394,
    years: [1980, 1985],
  },
  {
    src: "https://blog.bestride.com/wp-content/uploads/2016/03/JC-Whitney-Barefoot-Pedal-1.jpg",
    width: 576,
    height: 507,
    years: [1980, 1985],
  },
  {
    src: "https://www.jcwhitney.com/wp-content/uploads/2023/10/JCW-Throwback-Ocean-Liner-Blast-Horn.png",
    width: 821,
    height: 463,
    years: [1980, 1985],
  },
  {
    src: "https://www.jcwhitney.com/wp-content/uploads/2023/10/JCW-Throwback-Love-Your-Car-scaled.webp",
    width: 2560,
    height: 1035,
    years: [1980, 1985],
  },
  {
    src: "https://www.jcwhitney.com/wp-content/uploads/2023/10/JCW-Throwback-White-Wall-Kit-SEPIA.png",
    width: 702,
    height: 528,
    years: [1980, 1985],
  },
  {
    src: "https://www.jcwhitney.com/wp-content/uploads/2023/10/JCW-Throwback-Hollywood-Mufflers.png",
    width: 625,
    height: 369,
    years: [1980, 1985],
  },
  {
    src: "https://www.jcwhitney.com/wp-content/uploads/2023/10/JCW-Throwback-Hot-Rocket-Illuminated-Ornament.png",
    width: 821,
    height: 392,
    years: [1980, 1985],
  },
  {
    src: "https://www.jcwhitney.com/wp-content/uploads/2023/10/JCW-Throwback-In-The-Car-Coffee-Maker-Final.webp",
    width: 2020,
    height: 2000,
    years: [1980, 1985],
  },
];

const template = `
<section id="catalog">
  <img class="logo" width="1804" height="562" src="https://www.jcwhitney.com/wp-content/uploads/2023/10/logo-heritage-white.png"  alt="" decoding="async" srcset="https://www.jcwhitney.com/wp-content/uploads/2023/10/logo-heritage-white.png 1804w, https://www.jcwhitney.com/wp-content/uploads/2023/10/logo-heritage-white-300x93.png 300w, https://www.jcwhitney.com/wp-content/uploads/2023/10/logo-heritage-white-1024x319.png 1024w, https://www.jcwhitney.com/wp-content/uploads/2023/10/logo-heritage-white-768x239.png 768w, https://www.jcwhitney.com/wp-content/uploads/2023/10/logo-heritage-white-1536x479.png 1536w" sizes="(max-width: 1804px) 100vw, 1804px"/>
  <div class="header" id="catalog-header">
    <div class="years" id="years" ref="years">
      <p
        class="year"
        :data-year="year"
        :data-index="i"
        v-for="(year, i) in years"
      >
        {{year}}
      </p>
    </div>
    <input
      ref="input"
      @input="onInput"
      @change="onChange"
      @pointerdown="onPointerdown"
      @pointerup="onPointerup"
      value="1915"
      type="range"
      step="1"
      min="1915"
      :max="(new Date()).getFullYear()" />
    <span ref="toolTip" class='value-display'></span>
  </div>
  <div class="items" ref="items">
    <figure
      @click="onClick"
      class="item"
      v-for="o in images"
      :key="o.src"
      style="visibility: hidden;"
    >
      <img
        class="image"
        :style="{ '--ar': o.width / o.height }"
        :src="o.src"
        :width="o.width"
        :height="o.height"
      />
    </figure>
  </div>
</section>
`;

const totalYears = new Date().getFullYear() - 1915 + 1;
const Catalog = {
  template,
  data() {
    return {
      images,
      currentYear: 1915,
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
      console.log(event.target.dataset.year);
    },
    moveLabel(input) {
      const toolTip = this.$refs.toolTip;
      const p = input.value / 100;
      const min = parseInt(input.min);
      const max = parseInt(input.max);
      const progress = invlerp(min, max, p * 100);

      const xPosition = () => {
        const w = input.clientWidth * progress;
        return w + "px";
      };

      const leftPosition = () => {
        const w = toolTip.clientWidth;
        const total = lerp(0, -w, progress);
        const t = 8 * progress;
        return `${total + t}px`;
      };

      toolTip.innerHTML = this.currentYear;
      toolTip.style.left = leftPosition();
      toolTip.style.transform = "translate(" + xPosition() + ", -50%)";
    },
    init() {
      const images = Array.from(this.$refs.items.children);
      images.forEach((image, index) => {
        image.style.visibility = "visible";
      });
    },
    onInput(event) {
      this.currentYear = event.target.value;
      this.moveLabel(event.target);
    },
    onChange(event) {
      //
    },
    draggable() {
      const years = Array.from(this.$refs.years.children);
      const liveSnapX = years.map((el) => -el.offsetLeft);
      const minX = years.reduce((t, el) => {
        t += el.clientWidth;
        return t;
      }, 0);

      Draggable.create("#years", {
        bounds: { minX: `-${minX}`, maxX: 0 },
        inertia: true,
        type: "x",
        liveSnap: { x: liveSnapX },
        // onRelease() {
        //   console.log("onRelease", this);

        // },
        onClick(event) {
          // Array.from(event.target.parentElement.children).forEach((y) => {
          //   y.classList.remove("active");
          // });
          // event.target.classList.add("active");
        },
        onDragEnd(event) {
          // console.log("drag ended", event);
          // console.log("clicked", event.target.dataset.index, liveSnapX);
          // Array.from(event.target.parentElement.children).forEach((y) => {
          //   y.classList.remove("active");
          // });
          // event.target.classList.add("active");
          // gsap.to("#years", {
          //   x: -event.target.offsetLeft + window.innerWidth,
          // });
        },
      });
    },
  },
  mounted() {
    const loader = imagesLoaded(this.$refs.items, () => {
      this.init();
      this.draggable();
    });

    let total = this.images.length;
    loader.on("progress", () => {
      total -= 1;
      if (total === 0) {
        console.log("Done loading");
        this.moveLabel(this.$refs.input);
      } else {
        console.log(total, " Remaining");
      }
    });
  },
};

export default Catalog;
