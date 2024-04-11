import { horizontalLoop } from "../utils.js";
import Button from "./Button.js";

const template = `
<section id="catalog" ref="root">
  <Button class="ghost white filter" :class="isFiltersActive ? 'active' : undefined" @click="onToggleFilterClick">
    Filter Keywords
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>arrow-sm-down</title><g fill="currentColor" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="10"><polyline fill="none" stroke="currentColor" stroke-width="2" points="16,10 12,14 8,10 " transform="translate(0, 0)"></polyline></g></svg>
  </Button>
  <div class="keywords" id="keywords" ref="keywords" v-if="isFiltersActive">
    <Button
      v-for="([keyword, count], i) in keywords"
      class="keyword"
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
    class="catalogs"
    :class="{ loops: catalogs.length >= min }"
    ref="catalogs"
    id="catalogs"
  >
    <figure
      @click="onCatalogItemClick"
      class="item"
      v-for="(image, index) in catalogs"
      :key="image.src + index + image.keywords"
      :data-keywords="image.keywords"
      :data-id="image.id"
    >
      <img
        class="image"
        :style="{ '--ar': image.width / image.height }"
        :src="image.src"
        :width="image.width"
        :height="image.height"
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
  @click="onCatalogItemClick"
>

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
      loop: undefined,
      isFiltersActive: false,
      min: 3,
      isBusy: false,
    };
  },
  computed: {
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
        .slice(0, 7);
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

      return new Promise((resolve) => {
        if (this.loop?.draggable) {
          this.loop.draggable.kill();
        }

        if (this.loop) {
          this.loop.revert();
        }

        setTimeout(() => {
          this.isBusy = false;
          resolve(true);
        }, 0);
      });
    },
    onKeywordClick(event) {
      const { keyword } = event.target.dataset;
      if (!keyword || this.isBusy) return;

      if (this.filters.has(keyword)) {
        this.filters.delete(keyword);
      } else {
        this.filters.add(keyword);
      }

      console.log("KILLING DRAGGABLE...", this.loop);

      // this.killDraggable().then(() => {
      //   console.log("%cKILLED DRAGGABLE", "color: red", this.loop);
      //   if (this.catalogs.length >= this.min) {
      //     console.log("%cDRAGGABLE", "color: green", this.loop);
      //     this.initDraggable(this.$refs.catalogs);
      //   } else {
      //     Array.from(this.$refs.catalogs?.children).forEach((item) =>
      //       item.classList.add("active")
      //     );
      //   }
      // });
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
          Array.from(target.parentElement.children).forEach((el) => {
            el.classList.remove("active");
          });
          target.classList.add("active");
        },
      });

      els.forEach((el, i) =>
        el.addEventListener("click", () =>
          this.loop.toIndex(i, {
            duration: 0.8,
            ease: "power1.inOut",
          })
        )
      );

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
        this.initDraggable(this.$refs.catalogs);
      });
    });
  },
};

export default Catalog;
