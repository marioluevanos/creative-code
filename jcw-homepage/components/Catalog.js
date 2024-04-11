import { horizontalLoop } from "../utils.js";
import Button from "./Button.js";

const template = `
<section id="catalog" ref="root">
  <header class="header">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30.9 22.7">
      <path class="fill-1 lock" d="M13.9,16.1c0-0.9,0.8-1.7,1.7-1.7s1.7,0.8,1.7,1.7c0,0.9-0.8,1.7-1.7,1.7S13.9,17,13.9,16.1z"/>
      <path class="fill-1" d="M30.9,13.9v7.7c0,0.6-0.5,1.1-1.1,1.1H1.1c-0.6,0-1.1-0.5-1.1-1.1v-7.7h13.1v2.2c0,1.4,1.1,2.5,2.5,2.5 c1.4,0,2.5-1.1,2.5-2.5v-2.2H30.9z"/>
      <path class="fill-1" d="M26.3,4.4H5L0.2,9.3h30.5L26.3,4.4z"/>
      <path class="fill-1" d="M9.7,5.4L8.5,4.7c0,0,0.3-0.6,1.5-2.9C10.9,0.1,12,0,13,0h3.9v1.4H13c-0.7,0-1.2,0-1.7,1 C10.1,4.9,9.7,5.4,9.7,5.4z"/>
      <path class="fill-1" d="M21.8,5.4c0,0-0.3-0.6-1.6-3c-0.5-1-1-1-1.7-1h-3.9V0h3.9c1,0,2.1,0.1,2.9,1.8C22.7,4.2,23,4.7,23,4.7 L21.8,5.4L21.8,5.4z"/>
      <path class="fill-2" d="M30.9,10H0v0.7h30.9V10z"/>
      <path class="fill-2" d="M30.9,11.2H0v0.7h30.9V11.2z"/>
      <path class="fill-2" d="M30.9,12.5H0v0.7h30.9V12.5z"/>
    </svg>

    <h2 class="fs-h3 title">Catalog Throwback</h2>
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
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>arrow-sm-down</title><g fill="currentColor" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="10"><polyline fill="none" stroke="currentColor" stroke-width="2" points="16,10 12,14 8,10 " transform="translate(0, 0)"></polyline></g></svg>
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
    class="catalogs-grid"
    ref="catalogs-grid"
    id="catalogs-grid"
  >
    <figure
      class="item"
      v-for="(image, index) in catalogs.slice(0, maxGrid)"
      :key="image.src + index + image.keywords"
    >
      <img
        class="image"
        @click="onCatalogItemClick"
        :style="{ '--ar': image.width / image.height }"
        :src="image.src"
        :width="image.width"
        :height="image.height"
        :data-keywords="image.keywords"
        :data-id="image.id"
      />
      <figcaption>{{image.title}}</figcaption>
    </figure>
  </div>
  
</section>
<section
  id="catalog-view"
  ref="catalogView"
  class="catalog-view"
  :data-active="isCatalogView || undefined"
>
  <div class="overlay" @click="onCatalogItemClick"></div>
  <article class="modal">
    <div
      class="catalogs"
      :class="{ loops, static: !loops }"
      ref="catalogs"
      id="catalogs"
    >
      <figure
        class="item"
        v-for="(image, index) in catalogs"
        :key="image.src + index + image.keywords"
      >
        <img
          class="image"
          :style="{ '--ar': image.width / image.height }"
          :src="image.src"
          :width="image.width"
          :height="image.height"
          :data-keywords="image.keywords"
          :data-id="image.id"
        />
        <figcaption>{{image.title}}</figcaption>
      </figure>
    </div>
  </article>
</section>
`;

const Catalog = {
  template,
  components: {
    Button,
  },
  data() {
    return {
      filters: new Set(),
      images: [],
      isCatalogView: false,
      catalogIndex: 0,
      isFiltersActive: false,
      loop: undefined,
      isBusy: false,
      minCatalogs: 3,
      maxFilters: 7,
      maxGrid: 8,
    };
  },
  watch: {
    isCatalogView(n, o) {
      if (n && this.loop === undefined) {
        this.initDraggable(this.$refs.catalogs);
      } else {
        this.de;
      }
    },
  },
  computed: {
    loops() {
      return this.catalogs.length >= this.minCatalogs;
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
    catalogs() {
      return (
        Array.from(this.filters).length === 0
          ? this.images
          : this.filteredCatalogs
      ).map((catalog, index) => ({ ...catalog, id: index }));
    },
  },
  methods: {
    keywordStyle(keyword) {
      return { "--length": keyword.length };
    },
    killDraggable() {
      this.isBusy = true;

      const kill = () => {
        console.log("%cKILLING...", "color: white; background: red");
        if (this.loop) {
          this.loop.progress(0).revert().kill();
          Array.from(this.$refs.catalogs.children).forEach(
            (item) => (item.style = null)
          );
        }

        if (this.loop?.draggable) {
          this.loop.draggable.kill();
        }
      };

      return new Promise((resolve) => {
        kill();
        setTimeout(() => {
          this.enableDraggable();
          resolve(true);
          this.isBusy = false;
        }, 100);
      });
    },
    enableDraggable() {
      console.log("%cKILLED DRAGGABLE", "color: red");
      if (this.catalogs.length >= this.minCatalogs) {
        console.log("%cDRAGGABLE", "color: green");
        this.initDraggable(this.$refs.catalogs);
      } else {
        console.log("%cNO DRAG EXISTS", "color: gray");
        Array.from(this.$refs.catalogs?.children).forEach((item) =>
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
      Array.from(this.$refs.catalogs?.children).forEach((image) => {
        image.style.visibility = "visible";
      });
    },
    initDraggable(parentElement) {
      const els = Array.from(parentElement.children);

      this.loop = horizontalLoop(els, {
        paused: true,
        draggable: true,
        center: true,
        snap: true,
        onChange: (target) => {
          const parent = target.parentElement;
          if (!parent) return;

          Array.from(parent.children).forEach((el) => {
            el.classList.remove("active");
          });

          target.classList.add("active");
        },
      });

      this.loop.refresh(true);

      els.forEach((el, i) =>
        el.addEventListener("click", () =>
          this.loop.toIndex(i, {
            duration: 0.8,
            ease: "power1.inOut",
          })
        )
      );

      /**
       * Click the first element to center it
       * Add the "init" dataset to tell the handler
       * not to activate the modal
       */
      els[0].dataset.init = "true";
      els[0].click();
    },
    async getData() {
      const response = await fetch("/catalog.json");
      return response.json();
    },
  },
  mounted() {
    this.getData().then((data) => {
      this.images = data;
      this.$nextTick(() => {
        this.setCatalogItemsVisible();
      });
    });
  },
};

export default Catalog;
