import Button from "./Button.js";

const template = `
<section class="banner banner-mechanic mt-5 mb-5">
  <div class="container">
    <div class="become-a-mechanic">
      <div class="image-cover">
        <img
          width="1200"
          height="709"
          src="https://www.jcwhitney.com/wp-content/uploads/2023/10/mechanic-in-blue-overalls-checking-serviceability-2022-01-18-23-33-30-utc.jpg"
          class="attachment-full size-full"
          alt=""
          decoding="async"
          srcset="
            https://www.jcwhitney.com/wp-content/uploads/2023/10/mechanic-in-blue-overalls-checking-serviceability-2022-01-18-23-33-30-utc.jpg          1200w,
            https://www.jcwhitney.com/wp-content/uploads/2023/10/mechanic-in-blue-overalls-checking-serviceability-2022-01-18-23-33-30-utc-300x177.jpg   300w,
            https://www.jcwhitney.com/wp-content/uploads/2023/10/mechanic-in-blue-overalls-checking-serviceability-2022-01-18-23-33-30-utc-1024x605.jpg 1024w,
            https://www.jcwhitney.com/wp-content/uploads/2023/10/mechanic-in-blue-overalls-checking-serviceability-2022-01-18-23-33-30-utc-768x454.jpg   768w
          "
          sizes="(max-width: 1200px) 100vw, 1200px"
          title="mechanic-in-blue-overalls-checking-serviceability-2022-01-18-23-33-30-utc - JC Whitney"
        />
      </div>

      <div class="text-block">
        <h3>Become A Preferred Mechanic</h3>
        <p>
          We're curating an elite directory of incredible mechanics in 2024. By
          submitting your details, you could be verified and prominently
          featured. Submit your shop to our list now.
        </p>
        <Button class="button white ghost">Sign up now</Button>
      </div>
    </div>
  </div>
</section>
`;

const Banner = {
  template,
  components: { Button },
};

export default Banner;
