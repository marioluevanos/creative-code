class RatingStars extends HTMLElement {
  static observedAttributes = [
    "total",
    "size",
    "average",
    "stagger",
    "filled",
    "background",
    "color",
  ];

  constructor() {
    super();
    this.stars = this.createStars();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(this.createStyle());
    shadow.appendChild(this.stars);
    this.restart();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attributeChangedCallback", { name }, this.el);
    this.stars = this.createStars();

    const prev = this?.shadowRoot?.querySelector(".rating-stars");
    if (prev) {
      this.stars = this.createStars();
      prev.insertAdjacentElement("afterend", this.stars);
      prev.remove();
    }

    this.restart();
  }

  createStyle() {
    const style = document.createElement("style");
    const color = this.getAttribute("color") || "#ffe34d";
    const emptyColor = "#d0d8e0";

    style.textContent = `
      @keyframes star-animation {
        0% {
          fill: ${emptyColor};
          stroke: ${emptyColor};
          stroke-width: 2;
          transform: scale(1) rotate(-72deg);
          opacity: 1;
        }
        50% {
          transform: scale(1.25);
        }
        65% {
          transform: scale(0.5);
        }
        80% {
          stroke: ${color};
          transform: scale(1.1) rotate(-3deg);
        }
        100% {
          fill: ${color};
          stroke: ${color};
          transform: scale(1) rotate(0deg);
        }
      }
      @keyframes circle-animation {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        30% {
          transform: scale(1.25);
          opacity: 0.3;
        }
        60% {
          transform: scale(1.75);
          opacity: 0.3;
        }
        100% {
          transform: scale(3);
          opacity: 0;
        }
      }
      .rating-stars {
        --size: ${this.getAttribute("size") || 16}px;
        position: relative;
        display: flex;
        align-items: center;
        grid-gap: 0 calc(var(--size) / 2);
        justify-content: center;
        background: ${this.getAttribute("background") || "white"};
        border-radius: 100px;
        padding: calc(var(--size) * 0.5) calc(var(--size) * 1);
      }

      svg.rating-star {
        width: var(--size);
        height: var(--size);
        display: block;
        overflow: visible;
      }
      svg.rating-star * {
        pointer-events: none;
      }
      svg.rating-star path.star {
        stroke: transparent;
        stroke-width: 0;
      }
      svg.rating-star path.star.on {
        fill: ${color};
        opacity: 0;
      }
      svg.rating-star path.star.off {
        fill: ${emptyColor};
      }
      svg.rating-star circle {
        transform: scale(2);
        transform-origin: center;
        opacity: 0;
      }
      svg.rating-star * {
        transform-origin: center;
      }

      .loading-skeleton .rating-star {
        fill: ${emptyColor};
      }

      svg.rating-star.animate-star .star.on {
        -webkit-animation: 0.6s star-animation ease-out;
                animation: 0.6s star-animation ease-out;
        -webkit-animation-delay: var(--delay, 0s);
                animation-delay: var(--delay, 0s);
        fill: ${color};
        stroke: none;
        transform: rotate(0deg) scale(1);
        opacity: 1;
      }
      svg.rating-star.animate-star .star.on + circle {
        stroke: none;
        fill: ${color};
        -webkit-animation: circle-animation 0.6s cubic-bezier(0.47, 0, 0.745, 0.715) 0.25s;
                animation: circle-animation 0.6s cubic-bezier(0.47, 0, 0.745, 0.715) 0.25s;
      }
      svg.rating-star.filled .star.on {
        opacity: 1;
        transition: none;
      }
    `;
    return style;
  }

  get ratingsSplit() {
    const average = +this.getAttribute("average") || 3.5;
    const [integer, percent] = average.toFixed(2).split(".");
    return [Number(integer || 0), Number(percent || 0)];
  }

  createStars() {
    const total = +this.getAttribute("total") || 5;
    const stars = document.createElement("div");
    const [nthChild, percent] = this.ratingsSplit;
    for (let idx = 0; idx < total; idx++) {
      const cropStar = `clip-path: inset(0 ${100 - Number(percent)}% 0 0)`;
      const isNthStar = nthChild === idx;
      const styles = isNthStar ? cropStar : "";
      const isAfterNth = !Boolean(nthChild < idx);

      stars.innerHTML += this.oneStarHTML(styles, idx, isAfterNth);
    }

    stars.classList.add("rating-stars");

    return stars;
  }

  oneStarHTML(styles, idx, isAfterNth) {
    const starPath =
      "M8,0.4c0.3,0,0.5,0.2,0.7,0.4L10.7,5l4.6,0.7c0.3,0,0.5,0.2,0.6,0.5c0.1,0.3,0,0.6-0.2,0.7l-3.4,3.3l0.8,4.6 c0,0.3-0.1,0.5-0.3,0.7c-0.2,0.2-0.5,0.2-0.8,0.1L8,13.4l-4.2,2.2c-0.2,0.1-0.5,0.1-0.8-0.1c-0.2-0.2-0.3-0.4-0.3-0.7l0.8-4.6 L0.2,6.9C0,6.7,0,6.4,0,6.1c0.1-0.3,0.3-0.5,0.6-0.5L5.3,5l2.1-4.2C7.5,0.5,7.7,0.4,8,0.4z";
    const filled = typeof this.getAttribute("filled") === "string";
    return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="rating-star ${filled ? "filled" : ""}"
        data-rating-star="${idx}"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path
          class="star off"
          d="${starPath}"
        />
        <path
          class="star ${isAfterNth ? "on" : "off"}"
          style="${styles}"
          d="${starPath}"
        />
        <circle
          cx="8"
          cy="8"
          r="7.5"
        />
      </svg>
    `;
  }

  async animate() {
    if (this.filled) {
      return Promise.resolve(0);
    }

    let duration = 0;
    const stars = Array.from(this.stars.children);
    const stagger = this.getAttribute("stagger") || 0.005;

    return new Promise((resolve) => {
      stars.forEach((star, idx) => {
        const delay = this.stars.children.length * idx * stagger * 1000;
        setTimeout(() => star.classList.add("animate-star"), delay);
        duration = delay;
      });
      setTimeout(() => resolve(duration), duration);
    });
  }

  async restart() {
    const children = this.stars.children;
    Array.from(children).forEach((star, idx) =>
      star.classList.remove("animate-star")
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        this.animate().then((d) => resolve(d));
      }, 250);
    });
  }
}

customElements.define("rating-stars", RatingStars);
