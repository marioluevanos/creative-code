(function () {
	document.addEventListener('DOMContentLoaded', init);
	const id = 'pr-strip';

	async function init() {
		const [head] = document.getElementsByTagName('head');
		[
			{
				url: 'https://cdn.shopify.com/s/files/1/0075/0505/1719/files/fonts.css?v=1662656892',
				id: 'byte-fonts',
			},
			{
				url: "https://cdn.shopify.com/s/files/1/0075/0505/1719/files/global.css?v=1663029604",
				id: 'byte-global',
			},
		].forEach((css) => {
			const stylesheet = document.getElementById(css.id);
			if (!stylesheet) {
				head.insertAdjacentHTML(
					'beforeend',
					`<link id="${css.id}" rel="stylesheet" href="${css.url}"/>`
				);
			}
		});

		const data = await getData();
		const targets = document.querySelectorAll(`[data-component="${id}"]`);
		targets.forEach((t) => {
			t.insertAdjacentHTML('afterbegin', html(data));
			if (!document.getElementById(`${id}-css`)) {
				head.insertAdjacentHTML('beforeend', css());
			}
		});

		prStrip();
	}

	function prStrip() {
		document.querySelectorAll('.pr-strip').forEach((container) => {
			const interval = window.setInterval(swapQuote, 5000);

			container.querySelectorAll('[data-logo]').forEach((logo) => {
				logo.addEventListener('click', (ev) => {
					ev.preventDefault();
					window.clearInterval(interval);
					const nextIndex = parseInt(ev.currentTarget.dataset.index, 10);
					swapQuote(nextIndex);
				});
			});

			setTimeout(() => swapQuote(1), 500);

			function swapQuote(index) {
				// Handle index of active quote
				const activeQuote = container.querySelector('[data-quote].active');
				const activeLogo = container.querySelector('[data-logo].active');
				const activeIndex = parseInt(activeQuote.dataset.index, 10);
				activeQuote.classList.remove('active');
				activeLogo.classList.remove('active');
				activeQuote.setAttribute('aria-hidden', 'true');

				const nextIndex = activeIndex === 4 ? 1 : activeIndex + 1;
				const nextQuote = container.querySelector(
					`[data-quote][data-index="${index ? index : nextIndex}"]`
				);
				const nextLogo = container.querySelector(
					`[data-logo][data-index="${index ? index : nextIndex}"]`
				);
				nextQuote.classList.add('active');
				nextLogo.classList.add('active');
				nextQuote.removeAttribute('aria-hidden');

				activeQuote.parentElement.style.setProperty(
					'--min-h',
					`${nextQuote.clientHeight}px`
				);
			}
		});
	}

	function css() {
		return `
			<style id='${id}-css'>
			.pr-strip {
				padding: var(--v-space) 0;
				background: #ffffff;
				position: relative;
			}
			.pr-strip .pr-intro {
				text-align: center;
				display: -ms-flexbox;
				display: flex;
				-ms-flex-pack: center;
						justify-content: center;
			}
			.pr-strip .pr-title {
				margin-bottom: 0;
				color: #A4A5A9;
			}
			.pr-strip .pr-logos {
				max-width: 575px;
				display: -ms-flexbox;
				display: flex;
				margin: 36px auto;
				-ms-flex-pack: justify;
						justify-content: space-between;
				-ms-flex-align: center;
						align-items: center;
			}
			@media (min-width: 769px) {
				.pr-strip .pr-logos {
					margin: 56px auto;
				}
			}
			.pr-strip .pr-logos button {
				opacity: 0.2;
				display: -ms-flexbox;
				display: flex;
				margin: 0 9px;
				-ms-flex-pack: center;
						justify-content: center;
				transition: 0.3s opacity;
				border: 0px;
				background: none;
				cursor: pointer;
			}
			.pr-strip .pr-logos button.active {
				opacity: 1;
			}
			.pr-strip .pr-logos button:first-child {
				margin-left: 0;
			}
			.pr-strip .pr-logos button:last-child {
				margin-right: 0;
			}
			.pr-strip .pr-logos button[data-logo=hms] {
				width: 132px;
			}
			.pr-strip .pr-logos button[data-logo=forbes] {
				width: 98px;
			}
			.pr-strip .pr-logos button[data-logo=instyle] {
				margin-top: 3px;
			}
			.pr-strip .pr-logos button[data-logo=entrepreneur] {
				width: 120px;
			}
			.pr-strip .pr-logos button img {
				width: 100%;
				height: 1.5rem;
				-o-object-fit: contain;
					object-fit: contain;
				display: block;
			}
			.pr-strip .pr-quotes {
				margin: 0 auto;
				position: relative;
				min-height: var(--min-h);
				transition: min-height 0.3s ease-out;
			}
			.pr-strip .pr-quote {
				max-width: var(--ui-max-width-medium);
				text-align: center;
				margin: 0 auto;
				opacity: 0;
				font-size: var(--font-x-large);
				overflow: visible;
				line-height: 1.35;
				letter-spacing: -0.015em;
				color: #2F303A;
				transition: all 0.15s ease-in 0s;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				-webkit-user-select: none;
					-moz-user-select: none;
						-ms-user-select: none;
								user-select: none;
				pointer-events: none;
			}
			.pr-strip .pr-quote.active {
				opacity: 1;
				transition: all 0.6s ease-out 0.15s;
				-webkit-user-select: initial;
					-moz-user-select: initial;
						-ms-user-select: initial;
								user-select: initial;
				pointer-events: all;
			}
	<style>
	`;
	}

	function html(data) {
		if (!Array.isArray(data) && data.length === 0) return;
		
		return `
  	<section class="pr-strip">
			<div class="container">
				<div class="pr-intro">
					<h2 id="pr-intro" class="pr-title eyebrow-text">Featured In</h2>
				</div>
				<div class="pr-logos" role="tablist" aria-labelledby="pr-intro">
					${data.map((item, index) => {
						return `
							<button
								class="${index === 0 ? 'active' : ''}"
								target="_blank"
								data-index=${index + 1}
								data-logo="${item.Source}"
								aria-label="Click to view ${item.Source} quote"
								role="tab"
								id="tab-quote-${item.Source}"
								aria-controls="quote-${item.Source}"
							>
								<span class="svg-holder" aria-hidden="true">
									<img src="${item.Logo}"/>
								</span>
							</button>
						`
					}).join('')}
				</div>
				<div class="pr-quotes">
					${data.map((item, index) => {
						return `
							<p
								class="pr-quote ${index === 0 ? 'active' : ''}"
								data-index="${index + 1}"
								data-quote="${item.Source}"
								role="tabpanel"
								id="quote-${item.Source}"
								aria-hidden="true"
							>
								"${item.Quote}"
							</p>
						`;
					}).join('')}
				</div>
			</div>
		</section>
  `;
	}

	function getBackupData() {
		return [
			{
				"Quote": "The Company that's Changing the At-Home Dental Industry",
				"Source": "entrepreneur",
				"Logo": "https://cdn.shopify.com/s/files/1/0075/0505/1719/files/logo-entrepreneur.svg?v=1663022352"
			},
			{
				"Quote": "Warby Parker, Glossier, and Beats by Dre all rolled up into a dental",
				"Source": "forbes",
				"Logo": "https://cdn.shopify.com/s/files/1/0075/0505/1719/files/logo-forbes.svg?v=1663022431"
			},
			{
				"Quote": "Whenever you notice a celebrity's standout smile, there's a good chance Dr. Jon Marashi is the cosmetic dentist responsible for their incredible teeth",
				"Source": "instyle",
				"Logo": "https://cdn.shopify.com/s/files/1/0075/0505/1719/files/logo-instyle.svg?v=1663022489"
			},
			{
				"Quote": "Byte's clients are consistently satisfied.",
				"Source": "harvard",
				"Logo": "https://cdn.shopify.com/s/files/1/0075/0505/1719/files/logo-harvard.svg?v=1663022489"
			}
		]
	}

	async function getServerData() {
		try {
			const response = await fetch('https://us-central1-mario-luevanos.cloudfunctions.net/api/byte/components?table=pr-strip');
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
					Logo: record.Logo[0].url
				}
			});
		}

		console.warn('There is a problem fetching sever data for <CompareTable/>', data);
		return getBackupData();
	}
})();
