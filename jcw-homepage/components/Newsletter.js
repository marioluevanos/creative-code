import Button from "./Button.js";

const template = `
<section class="newsletter-signup-banner">
  <div class="container">
    <h3 class="fs-h2">Join Our Community</h3>
    <form @submit="onSubmit">
      <label>
        <input
          type="text"
          placeholder="Email Address*"
        />
      </label>
      <Button type="submit" class="white">
        <Transition name="news" mode="out-in">
          <span v-if="!isBusy">Submit</span>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">  <g fill="currentColor" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="10" > <g class="nc-loop-dots-3-48-icon-o"> <circle cx="6" cy="24" fill="none" r="4" stroke="currentColor" stroke-width="2" ></circle> <circle cx="24" cy="24" fill="none" r="4" stroke="currentColor" stroke-width="2" ></circle> <circle cx="42" cy="24" fill="none" r="4" stroke="currentColor" stroke-width="2" ></circle> </g> </g></svg>
        </Transition>
      </Button>
    </form>
  </div>
</section>
`;

const Newsletter = {
  template,
  components: { Button },
  data() {
    return {
      isBusy: false,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.isBusy = true;

      setTimeout(() => {
        this.isBusy = false;
      }, 800);
    },
  },
};

export default Newsletter;
