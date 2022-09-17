(function () {
  document.addEventListener("DOMContentLoaded", init);
  const id = "how-byte-works";

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
    ].forEach((css) => {
      const stylesheet = document.getElementById(css.id);
      if (!stylesheet) {
        head.insertAdjacentHTML(
          "beforeend",
          `<link id="${css.id}" rel="stylesheet" href="${css.url}"/>`
        );
      }
    });

    const data = await getData();
    const targets = document.querySelectorAll(`[data-component="${id}"]`);
    targets.forEach((t) => {
      t.insertAdjacentHTML("afterbegin", html(data));
      if (!document.getElementById(`${id}-css`)) {
        head.insertAdjacentHTML("beforeend", css());
      }
    });
  }

  function css() {
    return `
		<style id='${id}-css'>
			#how-byte-works{padding:3rem 0;text-align:center}@media(min-width: 769px){#how-byte-works{padding:3rem 0}}#how-byte-works .numbered-section{max-width:1200px}#how-byte-works .responsive-image__wrapper{margin:0 auto}@media(min-width: 769px){#how-byte-works .responsive-image__wrapper[data-image-id=temp_doc]{margin-top:-17px}}#how-byte-works .responsive-image__wrapper[data-image-id=hyperbyte_icon]{position:relative;right:-3px}#how-byte-works .row{-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center}@media(min-width: 1024px){#how-byte-works .row{-ms-flex-direction:row;flex-direction:row;-ms-flex-align:start;align-items:flex-start}}#how-byte-works .row>div{margin-top:30px}@media(min-width: 1024px){#how-byte-works .row>div{margin-top:0px}}#how-byte-works h2{padding-bottom:0px}@media(min-width: 1024px){#how-byte-works h2{padding-bottom:30px;margin-bottom:30px}}#how-byte-works .svg-holder{max-width:250px}#how-byte-works h3{font-family:"SourceSansPro",helvetica,arial,sans-serif;font-size:22px;line-height:1;margin-bottom:10px}#how-byte-works h3 span{display:inline;color:#e72323}#how-byte-works p{padding:0 15px;margin:auto;max-width:420px}#how-byte-works .illustration{max-width:128px}
		<style>
		`;
  }

  function html(data) {
    return `
			<section id="how-byte-works">
				<div class="container">
					<h2 class="title h2" aria-label="How Byte works.">
						How By<i>t</i>e<sup class="reg-symbol">®</sup> works.
					</h2>
				</div>
				<div class="container numbered-section">
					<div class="row">
						${getItems(data)}
					</div>
				</div>
			</section>
		`;
  }

  function getItems(data = []) {
    if (!Array.isArray(data) && data.length === 0) return;

    return data
      .map((row, i) => {
        return `
				<div class="col-xs-12 col-lg-4">
					<img class="illustration responsive-image__image" src="${row.Icon}"/>
					<h3><span>${i + 1}.</span> ${row.SubTitle}</h3>
					<p>‍‍${row.Description}</p>
				</div>
			`;
      })
      .join("");
  }

  function getBackupData() {
    return [
      {
        Icon: "https://cdn.shopify.com/s/files/1/0075/0505/1719/files/illustration-ik.svg?v=1663018369",
        SubTitle: "At-home impressions.",
        Description:
          "Shipped straight to you. With easy instructions, it only takes a few minutes. Free return shipping.",
      },
      {
        Icon: "https://cdn.shopify.com/s/files/1/0075/0505/1719/files/illustration-dentist.svg?v=1663018887",
        SubTitle: "Doctor prescribed.",
        Description:
          "Your impressions are used to design a personalized treatment plan with clear aligners approved by a licensed dentist or orthodontist.",
      },
      {
        Icon: "https://cdn.shopify.com/s/files/1/0075/0505/1719/files/illustration-teeth-progress.svg?v=1663018887",
        SubTitle: "Track your progress.",
        Description:
          "Watch your smile transform with digital access to your doctor-directed treatment plan.",
      },
    ];
  }

  async function getServerData() {
    try {
      const response = await fetch(
        "https://us-central1-mario-luevanos.cloudfunctions.net/api/byte/components?table=how-byte-works"
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
      return data.map(record => {
				return {
					...record,
					Icon: record.Icon[0].url
				}
			});
    }

    console.warn(
      "There is a problem fetching sever data for <CompareTable/>",
      data
    );
    return getBackupData();
  }
})();
