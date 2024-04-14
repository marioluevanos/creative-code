import { debounce } from "../utils.js";
import Button from "./Button.js";

const template = `
<section id="catalog1" ref="root">
  <header class="header">
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
  <div
    class="catalogs1"
    :class="{ loops: draggable, static: !draggable }"
    ref="catalogs1"
    id="catalogs1"
  >
    <figure
      class="item"
      v-for="(image, index) in catalogs1"
      :key="image.src + index + image.keywords"
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
        <figcaption>
          <p class="item-title">{{image.title}}</p>
          <p class="item-description">{{image.description}}</p>
        </figcaption>
      </div>
    </figure>
  </div>
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
      maxCatalogs: 8,
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

      const isLargeScreen = window.innerWidth > 768;
      const minX = isLargeScreen ? 0 : header.offsetLeft + 24;
      const maxX = -(totalW - headerOffset) - window.innerWidth * 0.33;

      return {
        minX,
        maxX,
      };
    },
    initDraggable(parentElement) {
      const children = Array.from(this.$refs.catalogs1.children);
      const bounds = this.getBounds();
      const [draggable] = Draggable.create(parentElement, {
        type: "x",
        bounds,
        inertia: true,
        edgeResistance: 0.86,
        onPressInit() {
          gsap.to(children, {
            scale: 0.96,
            ease: "expo.out",
            duration: 0.6,
            delay: 0.08,
          });
        },
        onPress(event) {
          console.log(event);
        },
        onRelease() {
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
      this.draggable.applyBounds(this.getBounds());
    },
  },
  mounted() {
    this.getData().then((data) => {
      this.images = data;
      this.$nextTick(() => {
        this.setCatalogItemsVisible();
        this.initDraggable(this.$refs.catalogs1);
      });
    });

    this.resizeFn = debounce(this.onResize, 500);
    window.addEventListener("resize", this.resizeFn);
  },
};

export default Catalog;
