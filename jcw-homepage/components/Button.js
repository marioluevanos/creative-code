import { cssToRgb, rgbToHsl } from "../utils.js";

const template = `
<button @click="onClick" class="button">
  <slot/>
</button>
`;

const Button = {
  template,
  data() {
    return {
      size: 0,
      opacity: 0.25,
    };
  },
  methods: {
    onClick(event) {
      const offset = event.target.getBoundingClientRect();
      const newX = event.clientX - offset.left;
      const newY = event.clientY - offset.top;
      const bg = getComputedStyle(event.target).backgroundColor;

      let size = 0,
        opacity = 0.5;

      function iterate() {
        size += 8;
        opacity -= 0.008;

        const background = `${bg}
          radial-gradient(
            circle at ${newX}px ${newY}px,
            hsla(var(--h), var(--s), var(--l), ${opacity}) ${size}%,
            transparent ${size + 2}%
          ) no-repeat
        `;

        event.target.style.background = background;

        if (size <= 300) {
          requestAnimationFrame(iterate);
        } else {
          event.target.style.background = "";
        }
      }

      iterate();
    },
  },
  mounted() {},
};

export default Button;
