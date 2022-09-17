import { IStore } from "./index";
import { Category, ICategory } from "./category";

export class Categories {
  public el: { [key: string]: HTMLElement };
  public observers: IntersectionObserver[];
  public categories: Category[];

  constructor(public data: ICategory[], public store: IStore) {
    this.observers = [];
    this.categories = [];
    this.el = {};
    this.el.wrapper = this.createWrapper();
    this.el.root = this.createCategories();
    this.updateActive();
  }

  get currentIndex() {
    const [state] = this.store;
    return state.currentIndex;
  }

  get wrapperWidth() {
    return this.el.wrapper.clientWidth || 0;
  }

  get gap() {
    return +getComputedStyle(this.el.root).getPropertyValue("--gap");
  }

  get categoryWidth() {
    return (
      +getComputedStyle(this.el.root).getPropertyValue("--category-w") +
      this.gap * 2
    );
  }

  updateActive() {
    const { categories, currentIndex } = this;
    categories.forEach((cat) => cat.el.classList.remove("active"));
    categories[currentIndex].el.classList.add("active");
  }

  setScrollLeft(left: number) {
    this.el.wrapper.scrollLeft = left;
  }

  ioCallback(entry: IntersectionObserverEntry) {
    /**
     * if a category has an x position of 314 then, it's in position one
     * first position: x: 314px
     */
    if (entry.isIntersecting) {
      // console.log("ioCallback", entry.boundingClientRect, entry.target);
    }
  }

  /**
   * Create stuff...
   * -----------------------------------------------------------------
   */

  createObserver() {
    const options = {
      root: this.el.wrapper,
      rootMargin: "0px",
      threshold: [0, 0.5, 1],
    };
    return new IntersectionObserver(
      ([entry]) => this.ioCallback(entry),
      options
    );
  }

  createWrapper() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    return wrapper;
  }

  createCategories() {
    const categories = document.createElement("div");
    categories.classList.add("categories");

    this.data.map((cat, index) => {
      const category = new Category(cat, index);
      this.el.wrapper.insertAdjacentElement("afterbegin", category.el);
      category.el.addEventListener("click", this.onClick.bind(this));

      // Remove conditional when 100% good
      if (index === this.currentIndex) {
        const io = this.createObserver();
        io.observe(category.el);
        this.observers.push(io);
      }

      this.categories.push(category);
      return category;
    });

    categories.appendChild(this.el.wrapper);

    return categories;
  }

  onClick(event: Event) {
    const [state, setState] = this.store;
    const target = event.target as HTMLElement;
    const { index } = target.dataset;

    setState((p) => Object.assign(p, { currentIndex: Number(index) }));
    // console.log("onClick", event, state);
    this.updateActive();
    // this.updateScrollPosition(String(target.dataset.index));
  }
}
