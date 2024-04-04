import Button from "./Button.js";

const template = `
<header id="header" class="header">
	<div class="container">
		<div class="flex-row">
			<a href="/" class="logo-primary">
				<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 530 200" style="enable-background:new 0 0 530 200" xml:space="preserve">
					<path class="type" d="M521.1 30.6v137.9l-257 21.8L9.6 168.5V30.6L264.1 8.7l257 21.9z"></path>
					<path class="shape" d="m263.6 19.6-244 21v118.8l244 21 246.7-21V40.6l-246.7-21zM79.2 118c-.1 11.2-7 19-19.1 19-11.8 0-18.9-7.2-18.9-18.4v-11.4h12.7v11.6c0 4.4 2.2 6.6 6.1 6.6s5.9-2.2 5.9-6.6V64.6h13.3V118zm49.4-28h-11.8v-8.5c0-4.2-2.3-7-7.1-7s-7.2 2.9-7.2 6.8v37.2c0 3.9 2.4 6.8 7.2 6.8s7.1-2.9 7.1-7v-8.5h11.8v8.6c0 10.7-6.5 18.6-19.1 18.6-12.7 0-20.4-8.5-20.4-19.5V82.4c0-10.9 7.8-19.5 20.4-19.5s19.1 7.9 19.1 18.5V90zm73.4 45.4h-11.8l-7.1-41.7-7.6 41.7h-11.7l-12.5-70.8h13.1l6.4 46.8 7.9-46.8h10.2l7.2 46.8 6.8-46.8h12.2L202 135.4zm62.5 0h-13.3v-29h-14.8v29h-13.2V64.6h13.2v30h14.8v-30h13.3v70.8zm24.3 0h-13.2V64.6h13.2v70.8zM338 76.3h-12.9v59.1h-13.3V76.3h-13.1V64.6H338v11.7zm51 59.1h-10.3L365 105.2l-5-11.3v41.5h-12.1V64.6h11.4l13.1 30.7 4.7 11.3v-42H389v70.8zM433.8 76h-20.6v17.5h14.2v10.4h-14.2v19.7h20.6v11.8H400V64.6h33.8V76zm38.8 30.5v28.9h-13.2v-28.9l-15.6-41.9h13.8l9.1 28.8 8.7-28.8h13.2l-16 41.9z"></path>
					<path style="fill:none" d="M0 0h529.9v200H0z"></path>
					<path class="shape" d="M521.4 21.9 264.4.1l-.8-.1-.8.1L8.4 21.9l-8.4.7v154.8l8.4.7 254.5 21.8.8.1.8-.1 257-21.8 8.4-.7V22.6l-8.5-.7zm-.7 147.1-257 21.8L9.2 169V31L263.7 9.2l257 21.8v138z"></path>
				</svg>
			</a>
			<nav class="primary-nav">
				<ul id="menu-menu-primary" class="menu"><li id="menu-item-325" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-325"><a href="https://www.jcwhitney.com/category/parts/">Parts</a></li>
					<li id="menu-item-326" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-326"><a href="https://www.jcwhitney.com/category/garage/">Garage</a></li>
					<li id="menu-item-328" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-328"><a href="https://www.jcwhitney.com/category/culture/">Culture</a></li>
					<li id="menu-item-327" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-327"><a href="https://www.jcwhitney.com/category/technology/">Technology</a></li>
					<li id="menu-item-431" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-431"><a href="https://www.jcwhitney.com/events/">Events</a></li>
					<li id="menu-item-1910" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1910"><a target="_blank" rel="noopener" href="https://jcwhitney.myshopify.com/products/jc-whitney-print-magazine-catalog-subscription">Get Magazine</a></li>
				</ul>
			</nav>
			<div class="menu-items">
				<div class="icon icon-search form-opener">
					<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"></path></svg>
				</div>
				<div class="icon icon-menu">
					<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"></path></svg>
				</div>
				<Button class="button small button-shop-jc-whitney">Shop JCW Parts</Button>
			</div>
		</div>
	</div>
</header>
`;

const Header = {
  template,
  components: {
    Button,
  },
  methods: {
    /*
     * Add class to header when it becomes sticky
     */
    onHeaderScrollAddSticky() {
      var header = document.getElementById("header");
      var sticky = header.offsetTop;

      function handleScroll() {
        if (window.scrollY > sticky) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }
      }

      window.addEventListener("scroll", handleScroll);
    },
  },
  mounted() {
    this.onHeaderScrollAddSticky();
  },
};

export default Header;
