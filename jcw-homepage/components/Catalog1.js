import { debounce, horizontalLoop } from "../utils.js";
import Button from "./Button.js";

const template = `
<section id="catalog1" ref="root">
  <div class="marker" ref="marker"></div>
  <header class="header">
    <h2 class="fs-h2 title">Catalog Throwback</h2>
    <p class="fs-small">
      Step back in time with JC Whitney's vintage catalog gallery, showcasing decades of car parts & accessories that fueled automotive passions.
    </p>
  </header>
  <!--
  <Button
    class="ghost filter small"
    :class="isFiltersActive ? 'active' : undefined"
    @click="onToggleFilterClick"
  >
    Filter Keywords
    <svg class="button-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>arrow-sm-down</title><g fill="currentColor" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="10"><polyline fill="none" stroke="currentColor" stroke-width="2" points="16,10 12,14 8,10 " transform="translate(0, 0)"></polyline></g></svg>
  </Button>
  <div class="keywords" id="keywords" ref="keywords" v-if="isFiltersActive">
    <Button
      v-for="([keyword, count], i) in keywords"
      class="keyword small ghost"
      :class="{ 'active': filters.has(keyword) }"
      :data-keyword="keyword"
      :style="keywordStyle(keyword, i)"
      :data-index="i"
      :data-count="count"
      :disabled="isBusy"
      @click="onKeywordClick"
      :animate="!filters.has(keyword)"
      :data-animate="!filters.has(keyword)"
    >
      {{keyword}}
    </Button>
  </div>
  -->
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
  <Button class="cta">View More</Button>
</section>
`;

const Catalog = {
  template,
  components: {
    Button,
  },
  data() {
    return {
      resizeFn: () => undefined,
      filters: new Set(),
      images: [],
      isCatalogView: false,
      catalogIndex: 0,
      isFiltersActive: false,
      isBusy: false,
      maxFilters: 7,
      minCatalogs: 2,
      maxCatalogs: 100,
      draggable: undefined,
    };
  },
  watch: {
    isCatalogView(n, o) {
      if (n && this.draggable === undefined) {
      } else {
      }
    },
  },
  computed: {
    loops() {
      return this.catalogs1.length >= this.minCatalogs;
    },
    keywords() {
      return Object.entries(
        this.images.reduce((keywords, item) => {
          item.keywords.forEach((w) => {
            if (!keywords[w]) keywords[w] = { count: 0 };
            if (keywords[w]) keywords[w]["count"] += 1;
          });
          return keywords;
        }, {})
      )
        .reduce((all, item) => {
          const [key, { count }] = item;
          all.push([key, count]);
          return all;
        }, [])
        .sort((a, b) => (a[1] > b[1] ? -1 : 1))
        .slice(0, this.maxFilters);
    },
    filteredCatalogs() {
      const filters = Array.from(this.filters);
      return this.images.reduce((all, img) => {
        filters.forEach((f) => {
          const contain = all.find((item) => item.src === img.src);
          if (img.keywords.includes(f) && !contain) {
            all.push(img);
          }
        });
        return all;
      }, []);
    },
    catalogs1() {
      return (
        Array.from(this.filters).length === 0
          ? this.images
          : this.filteredCatalogs
      )
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
    keywordStyle(keyword) {
      return { "--length": keyword.length };
    },
    killDraggable() {
      this.isBusy = true;

      return new Promise((resolve) => {
        console.log("%cKILLING...", "color: white; background: red");
        if (this.draggable) {
          this.draggable.kill();
          Array.from(this.$refs.catalogs1.children).forEach(
            (item) => (item.style = null)
          );
        }

        setTimeout(() => {
          this.enableDraggable();
          resolve(true);
          this.isBusy = false;
        }, 100);
      });
    },
    enableDraggable() {
      console.log("%cKILLED DRAGGABLE", "color: red");
      if (this.catalogs1.length >= this.minCatalogs) {
        console.log("%cDRAGGABLE", "color: green");
        this.initDraggable(this.$refs.catalogs1);
      } else {
        console.log("%cNO DRAG EXISTS", "color: gray");
        Array.from(this.$refs.catalogs1?.children).forEach((item) =>
          item.classList.add("active")
        );
      }
    },
    onKeywordClick(event) {
      const { keyword } = event.target.dataset;
      if (!keyword || this.isBusy) return;

      if (this.filters.has(keyword)) {
        this.filters.delete(keyword);
      } else {
        this.filters.add(keyword);
      }

      this.killDraggable();
    },
    onToggleFilterClick(event) {
      event.preventDefault();
      this.isFiltersActive = !this.isFiltersActive;
    },
    onCatalogItemClick(event) {
      if (event.target.dataset.init) {
        delete event.target.dataset.init;
        return;
      }
      this.catalogIndex = +event.target.dataset.index || 0;
      this.isCatalogView = !this.isCatalogView;
    },
    setCatalogItemsVisible() {
      Array.from(this.$refs.catalogs1?.children).forEach((image) => {
        image.style.visibility = "visible";
      });
    },
    getBounds() {
      const totalW = Array.from(this.$refs.catalogs1.children).reduce(
        (t, el) => {
          t += el.clientWidth;
          return t;
        },
        0
      );
      const header = document.querySelector("#header .container");
      const headerOffset = header.clientWidth - header.offsetLeft * 2;
      const { left: minX } = this.$refs.marker.getBoundingClientRect();
      const maxX = -(totalW - headerOffset) - window.innerWidth * 0.33;

      return {
        minX,
        maxX,
      };
    },
    initDraggable(parentElement) {
      const { catalogs1, marker } = this.$refs;
      const children = Array.from(catalogs1.children);
      const bounds = this.getBounds();
      const [draggable] = Draggable.create(parentElement, {
        type: "x",
        bounds,
        inertia: true,
        edgeResistance: 0.86,
        onPressInit() {
          gsap.to(children, {
            scale: 0.99,
            ease: "expo.out",
            duration: 0.6,
            delay: 0.08,
          });
        },
        onDragEnd(event) {
          console.log("%conDragEnd", "color: red", event.target);

          const closest = children.reduce((all, c) => {
            // if (all.length === 1) return all;
            const { left, width } = c.getBoundingClientRect();
            const center = left + width / 2;

            console.log({
              left,
              center,
              markerOffsetLeft: marker.offsetLeft,
              markerWidth: marker.clientWidth,
            });

            if (left <= marker.offsetLeft) {
              all.push(c);
            }
            return all;
          }, []);

          console.log({ closest });
        },
        onMove(event) {},
        onRelease(event) {
          console.log("%conRelease", "color: orange", event.target);
          gsap.to(children, {
            scale: 1,
            ease: "expo.out",
            duration: 0.6,
          });
        },
      });

      this.draggable = draggable;
      gsap.set(parentElement, { x: bounds.minX });
    },
    async getData() {
      const response = await fetch("/catalog.json");
      return response.json();
    },
    onResize() {
      // this.draggable.applyBounds(this.getBounds());
    },
  },
  mounted() {
    this.getData().then((data) => {
      this.images = data;

      this.$nextTick(() => {
        this.setCatalogItemsVisible();
        // this.initDraggable(this.$refs.catalogs1);

        const boxes = gsap.utils.toArray("#catalogs1 .item");
        let activeElement;
        const loop = horizontalLoop(boxes, {
          paused: true,
          draggable: true, // make it draggable
          center: true, // active element is the one in the center of the container rather than th left edge
          onChange: (element, index) => {
            // when the active element changes, this function gets called.
            activeElement && activeElement.classList.remove("active");
            element.classList.add("active");
            activeElement = element;
          },
        });

        // this.draggable = loop.draggable;

        boxes.forEach((box, i) =>
          box.addEventListener("click", () =>
            loop.toIndex(i, { duration: 0.8, ease: "power1.inOut" })
          )
        );
      });
    });

    this.resizeFn = debounce(this.onResize, 500);
    window.addEventListener("resize", this.resizeFn);
  },
};

export default Catalog;
