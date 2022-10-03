(function () {
  document.addEventListener("DOMContentLoaded", init);
  const id = "compare-table";

  async function init() {
    const [head] = document.getElementsByTagName("head");
    [
      {
        url: "https://cdn.shopify.com/s/files/1/0075/0505/1719/files/fonts.css?v=1662656892",
        id: "byte-fonts",
      },
      {
        url: "https://cdn.shopify.com/s/files/1/0075/0505/1719/files/global.css?v=1663015393",
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

    setTimeout(compareTable, 500);
  }

  function css() {
    return `
		<style id='${id}-css'>
			*{box-sizing:border-box}.compare-table-v2{padding:1rem 10px;position:relative;z-index:1}@media(min-width: 769px){.compare-table-v2{padding:3rem 10px}}.compare-table-v2 .h4{text-align:center;margin-bottom:16px}@media(min-width: 769px){.compare-table-v2 .h4{margin:2rem auto}}.compare-table-row{--radius: 4px;--margin: 10px;width:100%;max-width:700px;margin:0 auto var(--margin);padding-left:0;padding-right:0;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-select:none;position:relative;transition:opacity .3s cubic-bezier(0.39, 0.575, 0.565, 1)}.compare-table-row .cell-row{--col-w: 80px;--col-w-double: calc(var(--col-w) * 2);display:grid;border:1.5px solid #d1d9e0;min-height:52px;border-radius:var(--radius);background:#fff;grid-template-columns:1fr var(--col-w) var(--col-w);text-align:left;transition:background .3s cubic-bezier(0.39, 0.575, 0.565, 1)}@media(min-width: 769px){.compare-table-row .cell-row{min-height:58px;--col-w: 144px}}.compare-table-v2 .compare-table-row .cell{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:100%;height:100%;min-height:inherit;position:relative;box-sizing:border-box;border-color:initial;padding:initial}.compare-table-row.is-header{margin-bottom:0}.compare-table-row.is-header .cell-row{border:none;background:rgba(0,0,0,0);min-height:64px}@media(min-width: 769px){.compare-table-row.is-header .cell-row{min-height:80px}}@media(min-width: 769px){.compare-table-row.is-header .cell.perk{padding-left:0}}.compare-table-row.is-header .cell{-ms-flex-align:end;align-items:flex-end;padding-bottom:12px}@media(min-width: 769px){.compare-table-row.is-header .cell{padding-bottom:16px}}.compare-table-row.is-header .text-xlarge{margin:0}.compare-table-row.is-header .text-large{font-weight:700;margin:0}.compare-table-row .logo{width:100%;height:100%;max-height:32px;max-width:52px;position:relative;display:block}.compare-table-row .logo svg{width:100%}@media(min-width: 769px){.compare-table-row .logo{max-width:64px}}.compare-table-row .cell.perk{--padding: 16px;font-weight:600;padding-left:var(--padding);padding-right:var(--padding)}@media(min-width: 769px){.compare-table-row .cell.perk{--padding: 24px}}.compare-table-row .cell.perk>*{-ms-flex-pack:start;justify-content:flex-start;line-height:1.15}.compare-table-row .cell.perk .icon{margin:0 8px 0 0;color:#52657a;display:-ms-flexbox;display:flex}.compare-table-row .cell.perk .icon svg{width:12px;height:12px;transition:all .15s}.compare-table-row .icon .minus{display:none}.compare-table-row:not(.is-header) .cell.perk p{font-weight:600;transition:opacity .3s cubic-bezier(0.39, 0.575, 0.565, 1)}@media(max-width: 769px){.compare-table-row:not(.is-header) .cell.perk p{font-size:14px;margin:0}}@media(hover: hover){.compare-table-row.has-description .cell-row:hover p{opacity:.66}}.compare-table-row .cell.perk p.text-xlarge{font-weight:700}.compare-table-row.is-active .icon .plus{display:none}.compare-table-row.is-active .icon .minus{display:block}.compare-table-row .cell-icon{-ms-flex-pack:center;justify-content:center}.compare-table-row .icon{--size: 20px;width:var(--size);height:var(--size);border-radius:var(--size);overflow:hidden;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;box-sizing:border-box;position:relative}.compare-table-row .icon svg{--icon: 12px;stroke-width:2;width:var(--icon);height:var(--icon)}.compare-table-row .icon-check{background:#0da57f;color:#fff}.compare-table-row .icon-x{background:#a5a5a5;color:#fff}.compare-table-row .cell.highlight{width:100%;z-index:1}.compare-table-row .cell.highlight::before{content:"";position:absolute;top:0;left:-1.5px;width:calc(100% - 3px);height:calc(100% + var(--margin) + 3px);background:#f0f2f5;border-left:1.5px solid #d1d9e0;border-right:1.5px solid #d1d9e0;transition:height .3s cubic-bezier(0.445, 0.05, 0.55, 0.95),top .3s cubic-bezier(0.445, 0.05, 0.55, 0.95);z-index:0}.compare-table-row.is-active .cell.highlight::before{top:-1.5px}.compare-table-row.is-active:not(:last-of-type) .cell.highlight::before{top:-2px;height:calc(100% + 2px)}.compare-table-row.is-active+.compare-table-row.is-active:not(:last-of-type) .cell.highlight::before{top:0;height:100%}.compare-table-row.is-active+.compare-table-row.is-active:last-of-type .highlight::before{top:0}.compare-table-row.is-header .highlight::before,.compare-table-row.is-active .highlight::before,.compare-table-row:only-child .highlight::before{top:0;height:calc(100% + 0px);transition:height .3s cubic-bezier(0.39, 0.575, 0.565, 1)}.compare-table-row.is-header .highlight::before{height:calc(100% + 1.5px);border-top:1.5px solid #d1d9e0;border-radius:8px 8px 0 0;left:-3px}.compare-table-row:last-child:not(:only-child) .cell.highlight::before{height:calc(100% + var(--margin) + 4px);border-radius:0 0 var(--radius) var(--radius);border-bottom:1.5px solid #d1d9e0}.compare-table-row.has-description .cell-row{cursor:pointer}.compare-table-row .description{text-align:left;border-radius:0 0 12px 12px;border:1.5px solid #b2ded1;background:#e2f3ee;overflow:hidden;box-sizing:border-box;position:absolute;visibility:hidden;padding:24px;z-index:-1;transition:height .3s cubic-bezier(0.445, 0.05, 0.55, 0.95),padding-top .3s cubic-bezier(0.445, 0.05, 0.55, 0.95),padding-bottom .3s cubic-bezier(0.445, 0.05, 0.55, 0.95)}.compare-table-row .description.show{box-sizing:content-box;position:relative;visibility:visible;margin-top:-3px;height:var(--description-h, auto);-webkit-transform:translate3d(0, -3px, 0);transform:translate3d(0, -3px, 0)}.compare-table-row.is-collapsed .description{padding:0 24px}.compare-table-row .description>p{margin:0;opacity:0;-webkit-transform:translate3d(0, -8px, 0);transform:translate3d(0, -8px, 0);transition:opacity .15s cubic-bezier(0.445, 0.05, 0.55, 0.95) 0s,-webkit-transform .15s cubic-bezier(0.445, 0.05, 0.55, 0.95) 0s;transition:opacity .15s cubic-bezier(0.445, 0.05, 0.55, 0.95) 0s,transform .15s cubic-bezier(0.445, 0.05, 0.55, 0.95) 0s;transition:opacity .15s cubic-bezier(0.445, 0.05, 0.55, 0.95) 0s,transform .15s cubic-bezier(0.445, 0.05, 0.55, 0.95) 0s,-webkit-transform .15s cubic-bezier(0.445, 0.05, 0.55, 0.95) 0s}.compare-table-row.is-active .description>p{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);opacity:1;transition:opacity .15s cubic-bezier(0.39, 0.575, 0.565, 1) .15s,-webkit-transform .15s cubic-bezier(0.39, 0.575, 0.565, 1) .15s;transition:opacity .15s cubic-bezier(0.39, 0.575, 0.565, 1) .15s,transform .15s cubic-bezier(0.39, 0.575, 0.565, 1) .15s;transition:opacity .15s cubic-bezier(0.39, 0.575, 0.565, 1) .15s,transform .15s cubic-bezier(0.39, 0.575, 0.565, 1) .15s,-webkit-transform .15s cubic-bezier(0.39, 0.575, 0.565, 1) .15s}.compare-table-row.is-active .cell-row{position:relative;z-index:1}.compare-table-row.is-active:only-child .highlight::before{top:0;height:100%}
		<style>
		`;
  }

  function html(data) {
    return getTable(data);
  }

  /**
   * Create an instance for each row in the compare table to handle its state.
   */
  function compareTable() {
    const rows = document.querySelectorAll("[data-compare-table-row]");

    // This functionality is only needed if the compare row has a description node.
    Array.from(rows).forEach((row, i) => {
      if (row.classList.contains("has-description")) {
        const dd = new CompareTableRow(row);
				dd.row.dataset.index = i;
      }
    });
  }

  class CompareTableRow {
		constructor(row) {
			this.row = row;
      this.row.addEventListener("click", this.onRowClick.bind(this));
      this.isActive = false;
      this.description = this.row.lastElementChild;
      this.description.dataset.h = this.description.clientHeight;
			
      this.toggleDescription();
			
      window.setTimeout(() => this.description.classList.add("show"), 500);
			row.instance = this;
    }

    onRowClick() {
      this.isActive = !this.isActive;
      this.toggleDescription();
			this.closeSiblings()
    }

		closeSiblings() {
			Array.from(this.row.parentElement.children).forEach(s => {
				if (s.dataset.index !== this.row.dataset.index && s.instance) {
					s.instance.close();
				}
			});
		}

		close() {
			this.isActive = false;
			this.toggleDescription();
		}

    toggleDescription() {
      this.row.style.setProperty(
        "--description-h",
        this.isActive ? `${this.description.dataset.h}px` : "0"
      );
      this.row.classList.toggle("is-active", this.isActive);
      this.row.classList.toggle("is-collapsed", !this.isActive);
    }
  }

  function getTable(data) {
    return `
			<section class="compare-table-v2">
				<header class="product--header">
					<h2 class="h4">${getTitle()}</h2>
				</header>
	
				<div data-compare-table-row="" class="compare-table-row is-header">
					<div class="cell-row">
						<div class="cell perk">
							<p class="text-xlarge">The Perks</p>
						</div>
						<div class="cell cell-icon highlight">
							<span class="svg-holder logo" aria-hidden="true">
								${getLogo()}
							</span>
						</div>
						<div class="cell cell-icon">
							<p class="text-large">Braces</p>
						</div>
					</div>
				</div>
				${getRows(data)}
			</section>
		`;
  }

  function getRows(data = []) {
    if (!Array.isArray(data) && data.length === 0) return;

    return data
      .map((row) => {
        return `
				<div
					data-compare-table-row=""
					class="compare-table-row has-description is-collapsed"
				>
					<div class="cell-row">
						<div class="cell perk">
							<span class="icon">
								${iconPlus()}${iconMinus()}
							</span>
							${getPerk(row.Perk)}
						</div>
						<div class="cell cell-icon highlight">${row.Byte ? iconCheck() : iconX()}</div>
						<div class="cell cell-icon">${row.Braces ? iconCheck() : iconX()}</div>
					</div>
					<div class="description">${getDescription(row.Description)}</div>
				</div>
			`;
      })
      .join("");
  }

  function iconMinus() {
    return `
			<svg
				class="svg-icons minus"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
			>
				<line
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-miterlimit="10"
					x1="2"
					y1="8"
					x2="14"
					y2="8"
				></line>
			</svg>
		`;
  }

  function iconPlus() {
    return `
			<svg
				class="svg-icons plus"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
			>
				<line
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-miterlimit="10"
					x1="2"
					y1="8"
					x2="14"
					y2="8"
				></line>
				<line
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-miterlimit="10"
					x1="8"
					y1="2"
					x2="8"
					y2="14"
				></line>
			</svg>
		`;
  }

  function getLogo() {
    return `
			<svg
				viewBox="0 0 220 100"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				width="100"
			>
				<title>Byte logo</title>
				<path
					fill="#ED2524"
					d="M208.8,24.6c-0.9,0-1.8-0.2-2.5-0.5c-0.8-0.3-1.5-0.8-2.1-1.4c-0.6-0.6-1.1-1.3-1.4-2.2 c-0.3-0.8-0.5-1.8-0.5-2.8c0-1,0.2-1.9,0.5-2.8c0.3-0.8,0.8-1.6,1.4-2.2c0.6-0.6,1.3-1.1,2.1-1.4c0.8-0.3,1.6-0.5,2.5-0.5 c0.9,0,1.8,0.2,2.6,0.5c0.8,0.3,1.5,0.8,2.1,1.4c0.6,0.6,1.1,1.3,1.4,2.2c0.3,0.8,0.5,1.8,0.5,2.8c0,1-0.2,1.9-0.5,2.8 c-0.3,0.8-0.8,1.6-1.4,2.2c-0.6,0.6-1.3,1.1-2.1,1.4C210.6,24.4,209.7,24.6,208.8,24.6z M208.8,23.3c0.7,0,1.4-0.1,2-0.4 c0.6-0.3,1.2-0.6,1.7-1.1c0.5-0.5,0.8-1.1,1.1-1.8c0.3-0.7,0.4-1.4,0.4-2.3c0-0.8-0.1-1.6-0.4-2.2c-0.3-0.7-0.6-1.3-1.1-1.8 s-1-0.9-1.7-1.2c-0.6-0.3-1.3-0.4-2-0.4c-0.7,0-1.4,0.1-2.1,0.4c-0.6,0.3-1.2,0.7-1.6,1.2c-0.5,0.5-0.8,1.1-1.1,1.8 c-0.3,0.7-0.4,1.4-0.4,2.2c0,0.8,0.1,1.6,0.4,2.3c0.3,0.7,0.6,1.3,1.1,1.8c0.5,0.5,1,0.9,1.6,1.1C207.4,23.1,208.1,23.3,208.8,23.3 z M206.3,21.1v-7.1h2.6c0.7,0,1.4,0.2,1.9,0.5c0.5,0.3,0.8,0.9,0.8,1.8c0,0.4-0.1,0.8-0.3,1.2c-0.2,0.4-0.5,0.6-0.9,0.7l1.6,2.9 h-1.6l-1.2-2.4h-1.4v2.4H206.3z M207.7,17.6h0.9c1,0,1.5-0.4,1.5-1.2c0-0.3-0.1-0.6-0.3-0.8c-0.2-0.2-0.6-0.3-1.1-0.3h-1V17.6z"
				></path>
				<path
					fill="#ED2524"
					d="M187.3,55c-1.2,4.1-3.2,5.3-6.4,5.3c-3.9,0-6.1-2.4-6.1-6.9h27.5c1.4-2.8,2.2-7,2.2-10.5 c0-10-7.2-18.6-21.1-18.6c-17,0-29,10.8-29,29.7c0,13.6,9.6,21.9,23.7,21.9c13.8,0,21.2-4.9,25.2-13.9L187.3,55L187.3,55z M181.3,39.4c2.4,0,3.5,1.7,3.5,3.7c0,1.3-0.2,2-0.5,2.7h-8.5C176.7,41.2,178.7,39.4,181.3,39.4z"
				></path>
				<path
					fill="#ED2524"
					d="M142.7,41.3h10.5l2.8-15.7h-10.5l2.1-12.2l-21.4,1.8l-1.8,10.4h-5.6L116,41.3h5.5l-2,11.5 c-0.4,2.3-0.6,4.5-0.6,6.5c0,11.7,7.7,16.7,17.4,16.7c5.8,0,10.4-1.1,13.5-3.5l3.1-17.1c-2.2,1.3-4.7,2.6-8.1,2.6 c-2.6,0-4.2-0.9-4.2-3.6c0-0.6,0.2-1.8,0.3-2.4L142.7,41.3z"
				></path>
				<path
					fill="#ED2524"
					d="M95.7,25.5l-5.1,18.8c-1.6,5.7-2.4,13.5-2.4,13.5h-0.4c0,0-0.6-8.1-2-13.7l-4.6-18.6H58.3l17.1,51.1 c-1.1,2.6-2.9,3.9-5.7,3.9c-2.3,0-4.6-0.9-6.2-2.2l-4.2,15.5c2.7,1.5,6.7,2.9,13.2,2.9c13,0,22.4-7.2,28.2-24.9l16-46.3H95.7z"
				></path>
				<path
					fill="#ED2524"
					d="M55.5,30.6c-3.5-4.4-8.3-6.6-14.6-6.6c-3.6,0-6.7,0.9-9.3,2.8c-2.6,1.9-4.4,4.4-5.4,7.6V3.3H4.6v55 c4.3,0.7,7.8,4.1,8.5,8.5c1.9-2.1,4.6-3.4,7.7-3.4c5.2,0,9.5,3.8,10.2,8.8c1.9-2.1,4.6-3.4,7.6-3.4c4,0,7.5,2.3,9.2,5.7 c2.9-1.1,5.4-3,7.4-5.5c3.7-4.6,5.6-11.4,5.6-20.2C60.7,41.1,59,35,55.5,30.6z M37,57.7c-1,1.7-2.7,2.6-5.1,2.6 c-1.8,0-3.2-0.7-4.2-2.1c-1-1.4-1.5-3.4-1.5-6V49c0-2.6,0.6-4.7,1.7-6.1c1.1-1.5,2.6-2.2,4.5-2.2c4.1,0,6.1,3,6.1,9.1 C38.5,53.3,38,56,37,57.7z"
				></path>
			</svg>
		`;
  }

  function getTitle() {
    return `Why Byte is Better`;
  }

  function getPerk(perk) {
    return `<p>${perk}</p>`;
  }

  function getDescription(desc) {
    return `
			<p>
				${desc}
			</p>
		`;
  }

  function iconX() {
    return `
			<span class="icon icon-x">
				<svg
					class="svg-icons x"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
				>
					<line
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						x1="3.5"
						y1="12.5"
						x2="12.5"
						y2="3.5"
					></line>
					<line
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						x1="3.5"
						y1="3.5"
						x2="12.5"
						y2="12.5"
					></line>
				</svg>
			</span>
		`;
  }

  function iconCheck() {
    return `
			<span class="icon icon-check">
				<svg
					class="svg-icons check"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
				>
					<path
						d="M13.8,4.8c0,0.3-0.1,0.6-0.3,0.8L7,12c-0.2,0.2-0.5,0.3-0.8,0.3S5.7,12.2,5.5,12L2.6,9.1 C2.4,8.8,2.2,8.6,2.2,8.3s0.1-0.6,0.3-0.8c0.4-0.4,1.1-0.4,1.5,0l2.2,2.2L11.9,4c0.4-0.4,1.1-0.4,1.5,0C13.6,4.2,13.8,4.5,13.8,4.8 z"
					></path>
				</svg>
			</span>
		`;
  }

  function getBackupData() {
    return [
      {
        Perk: "HyperByte included",
        Byte: true,
        Braces: false,
        Description:
          "HyperByte, our exclusive high frequency vibration device, is included in every aligner kit. With just 5 minutes of use a day, the HyperByte can help seat your aligners for fast and comfortable treatment.<sup>4</sup>",
      },
      {
        Perk: "Doctor-prescribed",
        Byte: true,
        Braces: true,
        Description:
          "Your clinical team will use your impressions to design a personalized treatment plan and create clear aligners just for your teeth.",
      },
      {
        Perk: "Free retainer",
        Byte: true,
        Braces: false,
        Description:
          "You’ll receive a free set of retainers with your Byte aligners. If you’re enrolled in the Byte Protection Program, you’ll automatically get a new retainer every six months.",
      },
      {
        Perk: "Free whitening treatment",
        Byte: true,
        Braces: false,
        Description:
          "You get a bottle of BrightByte with your aligner purchase. BrightByte is a 3-in-1 foam cleanser, whitener, and breath freshener that works perfectly with your Byte aligners.",
      },
      {
        Perk: "4 month avg. treatment time",
        Byte: true,
        Braces: false,
        Description:
          "While traditional braces often take over a year, the average treatment plan for our All-Day aligners is about 4 months! Every smile is unique, so individual results may vary.",
      },
      {
        Perk: "No expensive office visits",
        Byte: true,
        Braces: false,
        Description:
          "No more inconvenient appointments! You can straighten your teeth from the comfort of your home with our easy-to-use app and access to your clinical team 7 days a week.",
      },
      {
        Perk: "Lifetime guarantee<sup>3</sup>",
        Byte: true,
        Braces: false,
        Description:
          "If your teeth move out of alignment after you complete your initial treatment, we’ll work with your clinical team to provide new aligners and help correct any misalignment issues at no additional cost.<sup>3</sup>",
      },
    ];
  }

  async function getServerData() {
    try {
      const response = await fetch(
        "https://us-central1-mario-luevanos.cloudfunctions.net/api/byte/components?table=compare-table"
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
