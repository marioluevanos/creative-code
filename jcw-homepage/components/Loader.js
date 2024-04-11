const template = `
<section id="loader">
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 530 200">
    <path
      fill="white"
      d="M521.1 30.6v137.9l-257 21.8L9.6 168.5V30.6L264.1 8.7l257 21.9z"
    ></path>
    <path
      fill="#0f3080"
      d="m263.6 19.6-244 21v118.8l244 21 246.7-21V40.6l-246.7-21zM79.2 118c-.1 11.2-7 19-19.1 19-11.8 0-18.9-7.2-18.9-18.4v-11.4h12.7v11.6c0 4.4 2.2 6.6 6.1 6.6s5.9-2.2 5.9-6.6V64.6h13.3V118zm49.4-28h-11.8v-8.5c0-4.2-2.3-7-7.1-7s-7.2 2.9-7.2 6.8v37.2c0 3.9 2.4 6.8 7.2 6.8s7.1-2.9 7.1-7v-8.5h11.8v8.6c0 10.7-6.5 18.6-19.1 18.6-12.7 0-20.4-8.5-20.4-19.5V82.4c0-10.9 7.8-19.5 20.4-19.5s19.1 7.9 19.1 18.5V90zm73.4 45.4h-11.8l-7.1-41.7-7.6 41.7h-11.7l-12.5-70.8h13.1l6.4 46.8 7.9-46.8h10.2l7.2 46.8 6.8-46.8h12.2L202 135.4zm62.5 0h-13.3v-29h-14.8v29h-13.2V64.6h13.2v30h14.8v-30h13.3v70.8zm24.3 0h-13.2V64.6h13.2v70.8zM338 76.3h-12.9v59.1h-13.3V76.3h-13.1V64.6H338v11.7zm51 59.1h-10.3L365 105.2l-5-11.3v41.5h-12.1V64.6h11.4l13.1 30.7 4.7 11.3v-42H389v70.8zM433.8 76h-20.6v17.5h14.2v10.4h-14.2v19.7h20.6v11.8H400V64.6h33.8V76zm38.8 30.5v28.9h-13.2v-28.9l-15.6-41.9h13.8l9.1 28.8 8.7-28.8h13.2l-16 41.9z"
    ></path>
    <path
      fill="#0f3080"
      d="M521.4 21.9 264.4.1l-.8-.1-.8.1L8.4 21.9l-8.4.7v154.8l8.4.7 254.5 21.8.8.1.8-.1 257-21.8 8.4-.7V22.6l-8.5-.7zm-.7 147.1-257 21.8L9.2 169V31L263.7 9.2l257 21.8v138z"
    ></path>
  </svg>
  <div class="isBusy" :style="{ '--progress': loaderProgress }"/>
</section>
`;

export default {
  template,
  props: {
    onComplete: {
      type: Function,
      default: () => undefined,
    },
  },
  data() {
    return {
      images: [],
      progress: 0,
    };
  },
  computed: {
    loaderProgress() {
      return this.progress / this.images.length;
    },
  },
  watch: {
    loaderProgress(val) {},
  },
  methods: {
    moveLogo() {
      const hLogo = document.querySelector(".logo-primary svg");
      const { top, left, width } = hLogo.getClientRects()[0];
      const timeline = gsap.timeline({
        onComplete() {
          document.getElementById("loader").remove();
        },
      });
      timeline.to("#logo", {
        width,
        top,
        left,
        position: "fixed",
        ease: "expo.inOut",
        duration: 0.6,
      });

      timeline.to(
        "#loader",
        {
          opacity: 0,
          ease: "power2.in",
          duration: 0.3,
          delay: 1,
        },
        "-=0.3"
      );

      return timeline;
    },
    onLoaderProgress() {
      this.progress -= 1;
      if (this.progress === 0) this.moveLogo();
    },
  },
  mounted() {
    this.images = [
      ...Array.from(document.querySelectorAll("#magazines img")),
      ...Array.from(document.querySelectorAll("#catalog img")),
    ];
    this.progress = this.images.length;

    const loader = imagesLoaded("img", this.onComplete);
    loader.on("progress", this.onLoaderProgress.bind(this));
  },
};
