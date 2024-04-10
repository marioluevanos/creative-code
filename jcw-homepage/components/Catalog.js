import { horizontalLoop } from "../utils.js";

const template = `
<section id="catalog" ref="root">
  <div class="keywords" id="keywords" ref="keywords">
    <button
      v-for="(keyword, i) in keywords"
      class="keyword"
      :class="{ 'active': this.filters.has(keyword) }"
      :data-keyword="keyword"
      :style="keywordStyle(keyword, i)"
      :data-index="i"
      :disabled="loading"
      @click="onKeywordClick"
    >
      {{keyword}}
    </button>
  </div>
  <div
    class="catalogs"
    :class="{ loops: catalogs.length >= min }"
    ref="catalogs"
    id="catalogs"
  >
    <figure
      @click="onImageClick"
      class="item"
      v-for="(image, index) in catalogs"
      :key="image.title + index"
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
`;

const Catalog = {
  template,
  data() {
    return {
      filters: new Set(),
      images: [],
      loop: undefined,
      isDetailView: false,
      prevLength: 0,
      min: 3,
      loading: false,
    };
  },
  computed: {
    keywords() {
      return Array.from(
        this.images.reduce((keywords, item) => {
          item.keywords.forEach((w) => keywords.add(w));
          return keywords;
        }, new Set())
      ).reverse();
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
  watch: {
    catalogs: {
      handler(_nv, ov) {
        this.prevLength = ov.length;
      },
      deep: true,
    },
  },
  methods: {
    keywordStyle(keyword) {
      return { "--length": keyword.length };
    },
    onImageClick(event) {
      this.openCatalogView(event.target.dataset);
    },
    killDraggable() {
      this.loading = true;
      console.log("KILL DRAGGABLE");
      return new Promise((resolve) => {
        if (this.loop?.draggable) {
          this.loop.draggable.kill();
        }

        if (this.loop) {
          this.loop.kill();
        }

        setTimeout(() => {
          resolve(true);
          this.loop = undefined;
          this.loading = false;
        }, 500);
      });
    },
    onKeywordClick(event) {
      const { keyword } = event.target.dataset;
      if (!keyword) return;

      if (this.filters.has(keyword)) {
        this.filters.delete(keyword);
      } else {
        this.filters.add(keyword);
      }

      this.killDraggable().then(() => {
        if (this.catalogs.length >= this.min) {
          this.initDraggable(this.$refs.catalogs);
        } else {
          Array.from(this.$refs.catalogs?.children).forEach((item) =>
            item.classList.add("active")
          );
        }
      });
    },
    openCatalogView(dataset) {
      console.log({ dataset });
      this.isDetailView = true;
    },
    setCatalogItemsVisible() {
      Array.from(this.$refs.catalogs?.children).forEach((image) => {
        image.style.visibility = "visible";
      });
    },
    initDraggable(parentElement) {
      const els = Array.from(parentElement.children);

      console.log({ els });
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
          this.loop.toIndex(i, { duration: 0.8, ease: "power1.inOut" })
        )
      );
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
