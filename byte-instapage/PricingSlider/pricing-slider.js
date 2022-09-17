(function () {
  document.addEventListener("DOMContentLoaded", init);
  const id = "pricing-slider";

  async function init() {
    const [head] = document.getElementsByTagName("head");
    [
      {
        url: "https://cdn.shopify.com/s/files/1/0075/0505/1719/files/fonts.css?v=1662656892",
        id: "byte-fonts",
      },
      {
        url: "https://cdn.shopify.com/s/files/1/0075/0505/1719/files/global.css?v=1663029604",
        id: "byte-global",
      },
      {
        url: "https://cdn.shopify.com/s/files/1/0075/0505/1719/files/splide-default.min.css?v=1662668616",
        id: "byte-splide-css",
      },
    ].forEach(linkStylesheet.bind(head));
    [
      {
        url: "https://cdn.shopify.com/s/files/1/0075/0505/1719/files/splide.min.js?v=1662665530",
        id: "byte-splide-js",
        onload: pricingSlider.bind(head),
      },
    ].forEach(loadScript.bind(head));
  }

  async function insertComponent(data) {
    const targets = document.querySelectorAll(`[data-component="${id}"]`);
    targets.forEach((t) => {
      t.insertAdjacentHTML("afterbegin", html(data));
      if (!document.getElementById(`${id}-css`)) {
        this.insertAdjacentHTML("beforeend", css());
      }
    });
  }

  async function pricingSlider() {
    const data = await getData();
    insertComponent.call(this, data);

    const breakPoint = 768;
    const largeBreakPoint = 1360;
    const isLargeDisplay = window.innerWidth >= largeBreakPoint;
    const slides = document.querySelectorAll(".hypothetical-card");
    const slideContainer = document.querySelector("[data-hypothetical-cards]");
    let splide;

    if (isLargeDisplay) {
      setActiveCard();
      onMediaChange();
      clickToEnlarge();
      return;
    }

    if (window.innerWidth > breakPoint) clickToEnlarge();

    if (!slideContainer || !window.Splide) return;

    if (data.length < 4 && window.innerWidth > breakPoint) {
      clickToEnlarge();
      return;
    }

    splide = new window.Splide(slideContainer, splideOptions()).mount();

    onMediaChange();
    bindEvents();

    function splideOptions() {
      const isSmallDisplay = window.innerWidth <= breakPoint;

      const options = {
        perMove: 1,
        pagination: true,
        accessibility: true,
        arrows: false,
        perPage: isSmallDisplay ? 1 : 4,
        padding: isSmallDisplay ? 47 : "10%",
        focus: "center",
        start: isSmallDisplay ? 0 : 2,
        fixedWidth: 300,
        type: isSmallDisplay ? "slide" : "loop",
        slideFocus: true,
      };

      if (isSmallDisplay) {
      } else {
        options.trimSpace = "move";
      }

      return options;
    }

    /**
     * Watch for device width changes and update Splide.
     */
    function onMediaChange() {
      const mediaQuery = window.matchMedia(`(max-width: ${largeBreakPoint}px)`);

      mediaQuery.addEventListener("change", updateSplide);

      updateSplide(mediaQuery);
    }

    /**
     * Adjusting the UI for responsiveness.
     * Destory for desktop. Activate for mobile views.
     */
    function updateSplide({ matches }) {
      const isSplide = splide && Boolean(splide instanceof window.Splide);
      if (matches) {
        if (!isSplide) {
          splide = new Splide(slideContainer, splideOptions())
            .mount()
            .refresh();
          onMediaChange();
          bindEvents();
        }
      } else {
        // When it is a desktop view, destroy the splide instance.
        if (isSplide) {
          splide.destroy(true);
          splide = {};
          setActiveCard();
          clickToEnlarge();
        }
      }
    }

    function bindEvents() {
      splide.on("click", function (e) {
        splide.go(e.index);
      });
    }

    function setActiveCard() {
      if (slides && slides.length)
        slides[Math.floor(slides.length / 2)].classList.add("is-active");
    }

    function clickToEnlarge() {
      if (slides && slides.length)
        slides.forEach(function (slide) {
          slide.addEventListener("click", function () {
            slides.forEach((slide) => slide.classList.remove("is-active"));
            slide.classList.add("is-active");
          });
        });
    }
  }

  function css() {
    return `
		<style id='${id}-css'>
			body{margin:0}.pricing-real-people{background:#e0e5eb;padding:64px 0}@media(min-width: 769px){.pricing-real-people{padding:4rem 0}}.pricing-real-people .pricing__header{margin:0;padding:0 47px;text-align:center}.pricing-real-people>p{font-size:16px;line-height:24px;font-weight:400;margin:1.5rem 0 4rem;padding:0 47px}.pricing-real-people .splide{visibility:visible}.pricing-real-people .splide__track{overflow:visible}.pricing-real-people .splide__pagination{padding:0;margin-top:24px}@media(min-width: 480px){.pricing-real-people>p{text-align:center}}@media(min-width: 769px){.pricing-real-people{padding:80px 0}}.pricing-real-people .splide__list.hypothetical-card-container{height:auto}@media(min-width: 480px){.pricing-real-people .splide__list.hypothetical-card-container{margin:3rem auto}}@media(min-width: 1440px){.pricing-real-people .splide__list.hypothetical-card-container{display:-ms-flexbox !important;display:flex !important;-ms-flex-pack:center;justify-content:center}}.pricing-real-people .splide__list.hypothetical-card-container:not([style]){display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}.pricing-real-people .hypothetical-card{cursor:pointer;text-align:left;min-width:280px;height:483px;border-radius:16px;padding:25px;background:#fff;transition:all .2s ease;position:relative;margin-right:16px}@media(min-width: 480px){.pricing-real-people .hypothetical-card{-webkit-transform:scale(0.95);transform:scale(0.95);margin:0 8px}.pricing-real-people .hypothetical-card.is-active{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:scale(1.15);transform:scale(1.15);margin:0 30px !important}}.pricing-real-people .hypothetical-card *{pointer-events:none}.pricing-real-people .hypothetical-card strong em{font-family:"National",helvetica,arial,sans-serif;font-size:28px;line-height:1;font-weight:900;margin:0}.pricing-real-people .hypothetical-card .demographic{color:#52657a;font-weight:400;font-size:14px;line-height:18px;margin:0 0 26px}.pricing-real-people .hypothetical-card hr{border:1px solid #e0e5eb}.pricing-real-people .hypothetical-card ul{padding:0}.pricing-real-people .hypothetical-card li{list-style:none;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.pricing-real-people .hypothetical-card li p{margin:8px 0}.pricing-real-people .hypothetical-card p{font-size:14px;line-height:20px;font-weight:400}.pricing-real-people .hypothetical-card p svg{display:inline;position:relative;top:2px;margin-right:2px}.pricing-real-people .hypothetical-card p.subtotal{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;margin-top:24px;font-size:18px;line-height:26px}.pricing-real-people .hypothetical-card-footer{text-align:right;position:absolute;bottom:25px;right:25px}.pricing-real-people .hypothetical-card .uppercase{font-weight:600;text-transform:uppercase;font-size:13px;line-height:16px;letter-spacing:1px;color:#52657a;margin:0}.pricing-real-people .hypothetical-card .big-text{font-family:"National",helvetica,arial,sans-serif;font-size:30px;line-height:1;font-weight:900;line-height:38px}.pricing-real-people .hypothetical-card .disclaimer{font-size:12px;line-height:18px;font-weight:400;margin:0}.pricing-real-people .hypothetical-card .disclaimer .title{font-weight:700}.pricing-real-people .splide__pagination,.pricing-real-people .page-controls{margin-top:2em;position:relative;text-align:center;display:block;bottom:0}@media(min-width: 480px){.pricing-real-people .splide__pagination,.pricing-real-people .page-controls{margin-top:5em}}@media(min-width: 1440px){.pricing-real-people .splide__pagination,.pricing-real-people .page-controls{display:none}}.pricing-real-people .splide__pagination .splide__pagination__page,.pricing-real-people .splide__pagination .page-control,.pricing-real-people .page-controls .splide__pagination__page,.pricing-real-people .page-controls .page-control{display:inline-block;padding:0;margin:0 6px;border:none;background:rgba(0,0,0,0);border:1px solid #758ca3;border-radius:9px;width:9px;height:9px}.pricing-real-people .splide__pagination .splide__pagination__page.is-active,.pricing-real-people .splide__pagination .page-control.is-active,.pricing-real-people .page-controls .splide__pagination__page.is-active,.pricing-real-people .page-controls .page-control.is-active{background:#758ca3;border-color:#758ca3;-webkit-transform:none;transform:none}
		<style>
		`;
  }

  function html(data) {
    if (!Array.isArray(data) && data.length === 0) return;

    return `
		<div class="pricing-real-people">
			<h2 class="pricing__header text-center">Real pricing for real people</h2>
			<p>Check out how our pricing options and partner discounts can help customers just like you. </p>
			<div class="splide" data-hypothetical-cards="">
				<div class="splide__track">
					<div class="hypothetical-card-container splide__list">
						${data
              .map((example) => {
                return `
								<div class="hypothetical-card splide__slide">
									<strong><em>${example.Name}</em></strong>
									<p class="demographic">${example.Demographic}</p>
									<hr>
									<ul class="pricing-line-items">
										<li>
											<p>
												${getIcon(example.Plan)}
												${example.Plan}
											</p>
											<p>${getPlanCost()}</p>
										</li>
										<li>
											<p>${example.Insurance}</p>
											<p>${example.InsuranceValue}</p>
										</li>
										<li>
											<p>${example.DiscountType}</p>
											<p>${example.DiscountValue}</p>
										</li>
									</ul>
									<hr>
									<p class="subtotal"><strong>Subtotal</strong><strong>${
                    example.Subtotal
                  }</strong></p>
									<div class="hypothetical-card-footer">
										<p class="uppercase">Out-of-pocket cost</p>
										<strong class="big-text">${example.Cost}</strong>
										<p class="disclaimer">${example.Terms} <br>financed with <span class="title">${
                  example.Financier
                }</span></p>
									</div>
								</div>
							`;
              })
              .join("")}
					</div>
				</div>
			</div>
		</div>
		`;

    function getPlanCost(plan) {
      switch (plan) {
        case "At-Night Plan":
          return "$2,399";
        default:
          return "$1,999";
      }
    }

    function getIcon(plan) {
      switch (plan) {
        case "At-Night Plan":
          return `
						<svg class="svg-icons moon " viewBox="0 0 16 16" width="16" height="16" shape-rendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
							<style>.moon-stars { opacity: 0; }</style>
							<path d="M14.2,7.9c-0.2-0.1-0.5-0.1-0.7,0c-0.2,0.2-0.5,0.3-0.7,0.4 c-0.2,0.1-0.4,0.2-0.7,0.2c-0.1,0-0.2,0-0.3,0.1c-0.1,0-0.2,0-0.3,0c-0.2,0-0.4,0-0.6,0C9.9,8.7,9,8.3,8.4,7.6 C7.7,7,7.3,6.1,7.2,5.2C7.2,4.2,7.4,3.3,8,2.5c0.1-0.2,0.2-0.5,0-0.7C7.9,1.6,7.7,1.5,7.4,1.5C6.2,1.6,5,2.1,4,2.8 C3,3.6,2.3,4.6,1.9,5.8C1.5,6.9,1.4,8.2,1.7,9.4c0.3,1.2,0.9,2.3,1.7,3.2c0.9,0.9,2,1.5,3.2,1.8c1.2,0.3,2.5,0.2,3.6-0.2 c0.5-0.2,1-0.4,1.5-0.7c0,0,0.1,0,0.1-0.1c0.2-0.1,0.3-0.2,0.5-0.4c0.1-0.1,0.2-0.2,0.3-0.3c0.2-0.2,0.4-0.4,0.6-0.7 c0.3-0.4,0.5-0.8,0.7-1.2c0.1-0.3,0.2-0.6,0.3-0.8c0.1-0.4,0.2-0.9,0.3-1.4C14.5,8.3,14.4,8.1,14.2,7.9z M12.1,11.2 c-0.2,0.2-0.4,0.4-0.6,0.6c-0.5,0.5-1.1,0.9-1.8,1.1c-0.9,0.3-1.9,0.4-2.9,0.2c-1-0.2-1.8-0.7-2.5-1.4C3.6,11,3.1,10.1,2.9,9.1 c-0.2-1-0.2-2,0.2-2.9C3.4,5.3,4,4.5,4.8,3.9c0.4-0.3,0.9-0.6,1.4-0.8C6,3.8,5.9,4.5,5.9,5.3C6,6.5,6.6,7.7,7.5,8.5 c0.9,0.9,2.1,1.4,3.3,1.5c0.2,0,0.5,0,0.7,0c0.5,0,1-0.1,1.4-0.3C12.7,10.3,12.5,10.7,12.1,11.2z"></path>
							<path class="moon-stars" d="M11.1,1.4h-0.3V1.1c0-0.3-0.2-0.5-0.5-0.5S9.8,0.8,9.8,1.1v0.3H9.5C9.3,1.4,9,1.6,9,1.9s0.2,0.5,0.5,0.5h0.3v0.3 c0,0.3,0.2,0.5,0.5,0.5s0.5-0.2,0.5-0.5V2.4h0.3c0.3,0,0.5-0.2,0.5-0.5S11.4,1.4,11.1,1.4z"></path>
							<path class="moon-stars" d="M14.1,5.1h-0.3V4.8c0-0.3-0.2-0.5-0.5-0.5s-0.5,0.2-0.5,0.5v0.3h-0.3c-0.3,0-0.5,0.2-0.5,0.5s0.2,0.5,0.5,0.5h0.3v0.3 c0,0.3,0.2,0.5,0.5,0.5s0.5-0.2,0.5-0.5V6.1h0.3c0.3,0,0.5-0.2,0.5-0.5S14.3,5.1,14.1,5.1z"></path>
						</svg>
					`;
        default:
          return `
						<svg class="svg-icons sun " viewBox="0 0 16 16" width="16" height="16" shape-rendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
							<path d="M8,5.3C6.5,5.3,5.3,6.5,5.3,8s1.2,2.7,2.7,2.7s2.7-1.2,2.7-2.7 S9.5,5.3,8,5.3z M4,8c0-2.2,1.8-4,4-4c2.2,0,4,1.8,4,4c0,2.2-1.8,4-4,4C5.8,12,4,10.2,4,8z"></path>
							<path d="M8,0c0.4,0,0.7,0.3,0.7,0.7V2c0,0.4-0.3,0.7-0.7,0.7 S7.3,2.4,7.3,2V0.7C7.3,0.3,7.6,0,8,0z"></path>
							<path d="M8,13.3c0.4,0,0.7,0.3,0.7,0.7v1.3C8.7,15.7,8.4,16,8,16 s-0.7-0.3-0.7-0.7V14C7.3,13.6,7.6,13.3,8,13.3z"></path>
							<path d="M2.3,2.3c0.3-0.3,0.7-0.3,0.9,0l0.9,0.9c0.3,0.3,0.3,0.7,0,0.9 C4,4.5,3.5,4.5,3.3,4.2L2.3,3.3C2.1,3,2.1,2.6,2.3,2.3z"></path>
							<path d="M11.8,11.8c0.3-0.3,0.7-0.3,0.9,0l0.9,0.9 c0.3,0.3,0.3,0.7,0,0.9c-0.3,0.3-0.7,0.3-0.9,0l-0.9-0.9C11.5,12.5,11.5,12,11.8,11.8z"></path>
							<path d="M0,8c0-0.4,0.3-0.7,0.7-0.7H2c0.4,0,0.7,0.3,0.7,0.7 S2.4,8.7,2,8.7H0.7C0.3,8.7,0,8.4,0,8z"></path>
							<path d="M13.3,8c0-0.4,0.3-0.7,0.7-0.7h1.3C15.7,7.3,16,7.6,16,8 s-0.3,0.7-0.7,0.7H14C13.6,8.7,13.3,8.4,13.3,8z"></path>
							<path d="M4.2,11.8c0.3,0.3,0.3,0.7,0,0.9l-0.9,0.9 c-0.3,0.3-0.7,0.3-0.9,0c-0.3-0.3-0.3-0.7,0-0.9l0.9-0.9C3.5,11.5,4,11.5,4.2,11.8z"></path>
							<path d="M13.7,2.3c0.3,0.3,0.3,0.7,0,0.9l-0.9,0.9 c-0.3,0.3-0.7,0.3-0.9,0c-0.3-0.3-0.3-0.7,0-0.9l0.9-0.9C13,2.1,13.4,2.1,13.7,2.3z"></path>
						</svg>
					`;
      }
    }
  }

  function getBackupData() {
    return [
      {
        Name: "Michelle S.",
        Demographic: "Salem, OR",
        Insurance: "Orthodontic Insurance",
        InsuranceValue: "-$0",
        Plan: " At-Night Plan",
        DiscountType: "Payment from HSA",
        DiscountValue: "-$500",
        Subtotal: "$1,899",
        Terms: "for 48 months",
        Financier: "CareCredit",
        Cost: "$44/month",
      },
      {
        Name: "Trevor M.",
        Demographic: "Grand Rapids, MI",
        Insurance: "Orthodontic Insurance",
        InsuranceValue: "-$900",
        Plan: " All-Day Plan",
        DiscountType: "Insurance Partner Benefit",
        DiscountValue: "-$300",
        Subtotal: "$550",
        Terms: "One-Time Payment",
        Cost: "$550",
      },
      {
        Name: "Lisa G.",
        Demographic: "Brockton, MA",
        Insurance: "Orthodontic Insurance",
        InsuranceValue: "-$0",
        Plan: " All-Day Plan",
        DiscountType: "Byte Protection Plan",
        DiscountValue: "$449 (40% off)",
        Subtotal: "$2,448",
        Terms: "for 36 months with $249 down",
        Financier: "BytePay",
        Cost: "$88/month",
      },
      {
        Name: "James W.",
        Demographic: "Lubbock, TX",
        Insurance: "Orthodontic Insurance",
        InsuranceValue: "-$0",
        Plan: " At-Night Plan",
        DiscountType: "Military Discount",
        DiscountValue: "-$150",
        Subtotal: "$2,249",
        Terms: "for 24 months",
        Financier: "Splitit",
        Cost: "$94/month",
      },
      {
        Name: "Chloe T.",
        Demographic: "Pawnee, IN",
        Insurance: "Orthodontic Insurance",
        InsuranceValue: "-$0",
        Plan: " All-Day Plan",
        DiscountType: "Student Discount",
        DiscountValue: "-$100",
        Subtotal: "$1,899",
        Terms: "for 12 months",
        Financier: "Splitit",
        Cost: "$159/month",
      },
    ];
  }

  async function getServerData() {
    try {
      const response = await fetch(
        "https://us-central1-mario-luevanos.cloudfunctions.net/api/byte/components?table=pricing-slider"
      );
      if (response.ok) {
        return await response.json();
      }
      return Promise.resolve([]);
    } catch (error) {
      return Promise.reject([]);
    }
  }

  async function getData() {
    const data = await getServerData();
    if (Array.isArray(data)) {
      return data;
    }

    console.warn(
      "There is a problem fetching sever data for <CompareTable/>",
      data
    );
    return getBackupData();
  }
})();

function linkStylesheet(css) {
  const stylesheet = document.getElementById(css.id);
  if (!stylesheet) {
    this.insertAdjacentHTML(
      "beforeend",
      `<link id="${css.id}" rel="stylesheet" type="text/css" href="${css.url}"/>`
    );
  }
}

function loadScript(script) {
  const js = document.getElementById(script.id);

  if (!js && script) {
    const s = document.createElement("script");
    s.onload = script.onload;
    s.id = script.id;
    s.src = script.url;

    this.insertAdjacentElement("beforeend", s);
  }
}
