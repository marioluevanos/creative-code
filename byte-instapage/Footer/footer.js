(function () {
	document.addEventListener('DOMContentLoaded', init);
	const id = 'footer';

	function init() {
		const [head] = document.getElementsByTagName('head');
		[
			{
				url: 'https://cdn.shopify.com/s/files/1/0075/0505/1719/files/fonts.css?v=1662656892',
				id: 'byte-fonts',
			},
			{
				url: 'https://cdn.shopify.com/s/files/1/0075/0505/1719/files/global.css?v=1663374011',
				id: 'byte-global',
			},
		].forEach(linkStylesheet.bind(head));

		[
			{
				url: 'https://cdn.shopify.com/s/files/1/0075/0505/1719/files/badger-accordion.min.js?v=1662677958',
				id: 'byte-badgeraccordion-js',
				onload: footer,
			},
		].forEach(loadScript.bind(head));

		insertComponent.call(head);
	}

	function footer() {
		const accordionSections = document.querySelectorAll('.js-badger-accordion');
		Array.from(accordionSections).map(
			(section) =>
				section && new BadgerAccordion(section, { openMultiplePanels: true })
		);
	}

	async function insertComponent() {
		const target = document.querySelector(`[data-component="${id}"]`);
		const data = await getData(target.dataset.table);
		target.insertAdjacentHTML('afterbegin', html(data));
		if (!document.getElementById(`${id}-css`)) {
			this.insertAdjacentHTML('beforeend', css());
		}
	}

	function linkStylesheet(css) {
		const stylesheet = document.getElementById(css.id);
		if (!stylesheet) {
			this.insertAdjacentHTML(
				'beforeend',
				`<link id="${css.id}" rel="stylesheet" type="text/css" href="${css.url}"/>`
			);
		}
	}

	function loadScript(script) {
		const js = document.getElementById(script.id);

		if (!js && script) {
			const s = document.createElement('script');
			s.onload = script.onload;
			s.id = script.id;
			s.src = script.url;

			this.insertAdjacentElement('beforeend', s);
		}
	}

	function css() {
		return `
		<style id='${id}-css'>
		* {
			box-sizing: border-box;
		}
		
		body {
			margin: 0;
		}
		
		footer .container {
			width: 100%;
		}
		footer .footer-links {
			background: #292C3D;
			padding: 60px 0 40px;
			color: white;
		}
		@media (min-width: 480px) {
			footer .footer-links {
				padding: 80px 0;
			}
		}
		footer .footer-links .featured-link-list a {
			letter-spacing: 1px;
			font-weight: 600;
			font-size: 15px;
			text-transform: uppercase;
			margin-bottom: 40px;
			margin-top: 0;
		}
		footer .footer-links .featured-link-list a:last-child {
			margin-bottom: 20px;
		}
		@media (min-width: 769px) {
			footer .footer-links .featured-link-list a:last-child {
				margin-bottom: 30px;
			}
		}
		footer .footer-legal {
			background: #1C1E29;
			padding: 40px 0 120px;
		}
		@media (min-width: 480px) {
			footer .footer-legal {
				padding: 80px 0;
			}
		}
		footer .footer-legal a, footer .footer-legal span {
			color: white;
			text-decoration: none;
		}
		footer .footer-legal--links {
			display: -ms-flexbox;
			display: flex;
		}
		footer .footer-legal--links a {
			font-weight: 700;
			font-size: 16px;
			color: white !important;
		}
		@media (min-width: 480px) {
			footer .footer-legal--links a {
				font-size: 16px;
			}
		}
		footer .footer-legal--links span {
			margin: 0 1.5rem;
			color: #52657A;
		}
		footer .footer-legal .footer-byte .svg-holder {
			max-width: 80px;
		}
		footer .footer-legal .footer-byte .svg-holder path {
			fill: #E72323;
		}
		footer .footer-legal .footer-bbb .svg-holder {
			max-width: 200px;
		}
		footer .footer-legal .footer-atda {
			margin-top: 1.5rem;
			height: 125px;
		}
		footer .footer-legal .footer-atda svg {
			width: 150px;
			height: 60px;
		}
		footer .footer-legal .footer-atda svg .cls-3 {
			fill: #ffffff;
		}
		@media (min-width: 769px) {
			footer .footer-legal {
				text-align: left;
			}
		}
		footer .footer-legal p, footer .footer-legal b {
			color: #ffffff;
		}
		footer .footer-legal .small.rights-reserved {
			margin: 32px 0;
		}
		footer .footer-legal .small.asterisk {
			font-size: 12px;
			margin-bottom: 0.25rem;
			margin-top: 0.25rem;
			position: relative;
			-webkit-font-smoothing: antialiased;
			padding-left: 0.75rem;
		}
		footer .footer-legal .small.asterisk sup {
			left: 0;
			top: 0.5rem;
			position: absolute;
			vertical-align: baseline;
			margin-right: 0.25rem;
		}
		footer .footer-legal .small.asterisk sup::after {
			content: ".";
		}
		footer .footer-legal .approved-partner {
			text-transform: uppercase;
			letter-spacing: 0.03em;
			font-weight: 400;
			font-size: 13px;
			color: white;
			margin-top: 16px;
		}
		@media (min-width: 769px) {
			footer .footer-legal .approved-partner {
				text-align: left;
			}
		}
		footer .footer-legal .responsive-image__wrapper {
			margin: 10px 0 20px;
		}
		@media (min-width: 769px) {
			footer .footer-legal .responsive-image__wrapper {
				margin-left: 0;
			}
		}
		footer .footer-columns {
			display: -ms-flexbox;
			display: flex;
			-ms-flex-pack: space-evenly;
					justify-content: space-evenly;
			-ms-flex-direction: column;
					flex-direction: column;
		}
		footer .footer-columns .js-badger-accordion {
			width: 100%;
		}
		@media (min-width: 480px) {
			footer .footer-columns .js-badger-accordion {
				width: 100%;
			}
		}
		@media (min-width: 769px) {
			footer .footer-columns .js-badger-accordion {
				width: auto;
			}
		}
		@media (min-width: 769px) {
			footer .footer-columns {
				-ms-flex-direction: row;
						flex-direction: row;
				text-align: left;
			}
		}
		@media (min-width: 1440px) {
			footer .footer-columns {
				-ms-flex-pack: distribute;
						justify-content: space-around;
			}
		}
		footer .js-badger-accordion {
			-webkit-margin-before: 0;
							margin-block-start: 0;
			border-bottom: 1px solid #A2B1C1;
			margin-bottom: 0;
		}
		@media (min-width: 769px) {
			footer .js-badger-accordion {
				border-bottom: none;
			}
		}
		footer .js-badger-accordion .badger-accordion__panel {
			margin: 0;
		}
		@media (min-width: 769px) {
			footer .js-badger-accordion .badger-accordion__panel {
				max-height: unset;
				visibility: visible;
				overflow: visible;
			}
		}
		footer .js-badger-accordion .badger-accordion__panel.-ba-is-active {
			margin-bottom: 20px;
		}
		footer .js-badger-accordion .js-badger-accordion-header {
			background: none;
			border: none;
			padding: 0;
			width: 100%;
			text-align: left;
		}
		@media (min-width: 769px) {
			footer .js-badger-accordion .js-badger-accordion-header {
				pointer-events: none;
			}
		}
		@media (min-width: 769px) {
			footer .js-badger-accordion .js-badger-accordion-icon {
				display: none;
			}
		}
		footer .js-badger-accordion .js-badger-accordion-icon .svg-holder * {
			stroke: #ffffff;
		}
		footer .stay-updated {
			display: -ms-flexbox;
			display: flex;
			-ms-flex-direction: column-reverse;
					flex-direction: column-reverse;
		}
		@media (min-width: 769px) {
			footer .stay-updated {
				display: block;
				text-align: left;
				min-height: 335px;
			}
		}
		footer h3.h5 {
			font-family: "SourceSansPro", helvetica, arial, sans-serif;
			font-size: 18px;
			font-weight: 700;
			margin: 0;
			line-height: 65px;
			color: #ffffff;
		}
		@media (min-width: 769px) {
			footer h3.h5 {
				color: #A2B1C1;
				line-height: 1.2;
				margin-bottom: 25px;
			}
		}
		footer ul.social-links {
			margin: 0;
			padding: 0;
			margin-bottom: 30px;
		}
		footer ul.social-links li {
			list-style-type: none;
			display: inline-block;
			margin-right: 10px;
		}
		footer ul.social-links li:last-child {
			margin-right: 0px;
		}
		footer ul.social-links li a {
			width: 25px;
			display: inline-block;
		}
		footer ul.social-links li a.larger {
			width: 30px;
		}
		footer ul.social-links li a:hover {
			color: #E72323;
		}
		footer ul.social-links svg path {
			fill: #B2DED1;
		}
		footer .footer-link-list a {
			display: block;
			font-weight: 500;
			text-decoration: none;
			margin: 0 0 15px;
			position: relative;
			color: white !important;
			font-size: 15px;
			line-height: 30px;
		}
		footer .footer-lower {
			font-size: 1.4rem;
			display: -ms-flexbox;
			display: flex;
			-ms-flex-pack: justify;
					justify-content: space-between;
			margin-top: 7rem;
		}
		footer .organized-list {
			color: white;
			font-size: 14px;
		}
		footer .organized-list li:before {
			font-size: 14px;
			font-weight: 100;
			font-family: "SourceSansPro", helvetica, arial, sans-serif;
			color: white;
		}
		footer .organized-list a {
			text-decoration: underline;
		}
		footer .organized-list p {
			margin: 0;
		}
		footer p:empty {
			display: none;
		}
		<style>
		`;
	}

	function html(data) {
		return `
			<footer>
				<div class="footer-links">
					<div class="container">
						<div class="row between-sm">
							<div class="col-xs-12 col-md-3 col-lg-3 footer-column stay-updated">
								<div class="footer-link-list featured-link-list">
									<a href="https://byte.com/pages/quiz-assessment">Am I a Candidate?</a>
									<a href="https://byte.com/products/impression-kit">Start Your Journey</a>
									<a class="referral" href="https://byte.com/pages/loyalty"
										>Refer friends, get $100</a
									>
								</div>
								<ul class="social-links">
									<li>
										<a
											href="https://www.facebook.com/byteofficial"
											target="_blank"
											title="byte on Facebook"
										>
											<span class="svg-holder" aria-hidden="true">
												<canvas width="20" height="20"></canvas>
												<svg
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
													xmlns:xlink="http://www.w3.org/1999/xlink"
												>
													<title>Logo Facebook</title>
													<path
														d="M18.05.811q.439 0 .744.305t.305.744v16.637q0 .439-.305.744t-.744.305h-4.732v-7.221h2.415l.342-2.854h-2.757v-1.83q0-.659.293-1t1.073-.342h1.488V3.762q-.976-.098-2.171-.098-1.634 0-2.635.964t-1 2.72V9.47H7.951v2.854h2.415v7.221H1.413q-.439 0-.744-.305t-.305-.744V1.859q0-.439.305-.744T1.413.81H18.05z"
													></path>
												</svg>
											</span>
			
											<span class="visually-hidden">Facebook</span>
										</a>
									</li>
									<li>
										<a
											href="https://www.instagram.com/byteofficial"
											target="_blank"
											title="byte on Instagram"
										>
											<span class="svg-holder" aria-hidden="true">
												<canvas width="20" height="20"></canvas>
												<svg
													viewBox="0 0 512 512"
													xmlns="http://www.w3.org/2000/svg"
													xmlns:xlink="http://www.w3.org/1999/xlink"
												>
													<title>Logo Instagram</title>
													<path
														d="M256 49.5c67.3 0 75.2.3 101.8 1.5 24.6 1.1 37.9 5.2 46.8 8.7 11.8 4.6 20.2 10 29 18.8s14.3 17.2 18.8 29c3.4 8.9 7.6 22.2 8.7 46.8 1.2 26.6 1.5 34.5 1.5 101.8s-.3 75.2-1.5 101.8c-1.1 24.6-5.2 37.9-8.7 46.8-4.6 11.8-10 20.2-18.8 29s-17.2 14.3-29 18.8c-8.9 3.4-22.2 7.6-46.8 8.7-26.6 1.2-34.5 1.5-101.8 1.5s-75.2-.3-101.8-1.5c-24.6-1.1-37.9-5.2-46.8-8.7-11.8-4.6-20.2-10-29-18.8s-14.3-17.2-18.8-29c-3.4-8.9-7.6-22.2-8.7-46.8-1.2-26.6-1.5-34.5-1.5-101.8s.3-75.2 1.5-101.8c1.1-24.6 5.2-37.9 8.7-46.8 4.6-11.8 10-20.2 18.8-29s17.2-14.3 29-18.8c8.9-3.4 22.2-7.6 46.8-8.7 26.6-1.3 34.5-1.5 101.8-1.5m0-45.4c-68.4 0-77 .3-103.9 1.5C125.3 6.8 107 11.1 91 17.3c-16.6 6.4-30.6 15.1-44.6 29.1-14 14-22.6 28.1-29.1 44.6-6.2 16-10.5 34.3-11.7 61.2C4.4 179 4.1 187.6 4.1 256s.3 77 1.5 103.9c1.2 26.8 5.5 45.1 11.7 61.2 6.4 16.6 15.1 30.6 29.1 44.6 14 14 28.1 22.6 44.6 29.1 16 6.2 34.3 10.5 61.2 11.7 26.9 1.2 35.4 1.5 103.9 1.5s77-.3 103.9-1.5c26.8-1.2 45.1-5.5 61.2-11.7 16.6-6.4 30.6-15.1 44.6-29.1 14-14 22.6-28.1 29.1-44.6 6.2-16 10.5-34.3 11.7-61.2 1.2-26.9 1.5-35.4 1.5-103.9s-.3-77-1.5-103.9c-1.2-26.8-5.5-45.1-11.7-61.2-6.4-16.6-15.1-30.6-29.1-44.6-14-14-28.1-22.6-44.6-29.1-16-6.2-34.3-10.5-61.2-11.7-27-1.1-35.6-1.4-104-1.4z"
													></path>
													<path
														d="M256 126.6c-71.4 0-129.4 57.9-129.4 129.4s58 129.4 129.4 129.4 129.4-58 129.4-129.4-58-129.4-129.4-129.4zm0 213.4c-46.4 0-84-37.6-84-84s37.6-84 84-84 84 37.6 84 84-37.6 84-84 84z"
													></path>
													<circle cx="390.5" cy="121.5" r="30.2"></circle>
												</svg>
											</span>
			
											<span class="visually-hidden">Instagram</span>
										</a>
									</li>
									<li>
										<a
											href="https://www.tiktok.com/@byteofficial"
											target="_blank"
											title="Byte on TikTok"
										>
											<span class="svg-holder" aria-hidden="true">
												<canvas width="20" height="20"></canvas>
												<svg
													viewBox="4 4 42 42"
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
												>
													<title>Logo Tiktok</title>
													<path
														d="M41 4H9C6.243 4 4 6.243 4 9v32c0 2.757 2.243 5 5 5h32c2.757 0 5-2.243 5-5V9c0-2.757-2.243-5-5-5m-3.994 18.323a7.482 7.482 0 0 1-.69.035 7.492 7.492 0 0 1-6.269-3.388v11.537a8.527 8.527 0 1 1-8.527-8.527c.178 0 .352.016.527.027v4.202c-.175-.021-.347-.053-.527-.053a4.351 4.351 0 1 0 0 8.704c2.404 0 4.527-1.894 4.527-4.298l.042-19.594h4.02a7.488 7.488 0 0 0 6.901 6.685v4.67"
													></path>
												</svg>
											</span>
			
											<span class="visually-hidden">TikTok</span>
										</a>
									</li>
									<li>
										<a
											href="https://twitter.com/talktobyte"
											target="_blank"
											title="byte on Twitter"
										>
											<span class="svg-holder" aria-hidden="true">
												<canvas width="20" height="20"></canvas>
												<svg
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
													xmlns:xlink="http://www.w3.org/1999/xlink"
												>
													<title>Logo Twitter</title>
													<path
														d="M19.551 4.208q-.815 1.202-1.956 2.038 0 .082.02.255t.02.255q0 1.589-.469 3.179t-1.426 3.036-2.272 2.567-3.158 1.793-3.963.672q-3.301 0-6.031-1.773.571.041.937.041 2.751 0 4.911-1.671-1.284-.02-2.292-.784T2.456 11.85q.346.082.754.082.55 0 1.039-.163-1.365-.285-2.262-1.365T1.09 7.918v-.041q.774.408 1.773.448-.795-.53-1.263-1.396t-.469-1.864q0-1.019.509-1.997 1.487 1.854 3.596 2.924T9.81 7.184q-.143-.509-.143-.897 0-1.63 1.161-2.781t2.832-1.151q.815 0 1.569.326t1.284.917q1.345-.265 2.506-.958-.428 1.386-1.732 2.18 1.243-.163 2.262-.611z"
													></path>
												</svg>
											</span>
			
											<span class="visually-hidden">Twitter</span>
										</a>
									</li>
								</ul>
							</div>
							<div class="col-xs-12 col-md-9 col-lg-9">
								<div class="footer-columns">
									<dl class="js-badger-accordion">
										<dt id="footer-get-help">
											<button
												data-button-id="footer-get-help"
												class="js-badger-accordion-header"
											>
												<h3 class="h5">Get Help</h3>
			
												<span class="js-badger-accordion-icon">
													<span class="svg-holder icon-plus icon" aria-hidden="true">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
														>
															<title>Icon Plus</title>
															<g
																stroke-linecap="square"
																stroke-linejoin="miter"
																stroke-width="2"
																fill="none"
																stroke="#1C1E28"
																stroke-miterlimit="10"
															>
																<line x1="12" y1="7" x2="12" y2="17"></line>
																<line x1="17" y1="12" x2="7" y2="12"></line>
															</g>
														</svg>
													</span>
			
													<span class="svg-holder icon-minus icon" aria-hidden="true">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
														>
															<title>Icon Minus</title>
															<line
																stroke-linecap="square"
																stroke-linejoin="miter"
																stroke-width="2"
																fill="none"
																stroke="#1C1E28"
																stroke-miterlimit="10"
																x1="17"
																y1="12"
																x2="7"
																y2="12"
															></line>
														</svg>
													</span>
												</span>
											</button>
										</dt>
										<dd
											class="badger-accordion__panel js-badger-accordion-panel footer-get-help"
										>
											<div class="js-badger-accordion-panel-inner" tabindex="0">
												<div class="footer-link-list">
													<a href="https://patient.byte.com/support" target="_blank"
														>Request Support</a
													>
													<a href="tel:866-765-2327" class="footerlink2"
														>866-765-2327</a
													>
													<a href="https://byte.com/pages/contact" class="footerlink2">Contact Us</a>
													<a
														href="https://byteme.force.com/helpcenter/s/"
														target="_blank"
														class="footerlink2"
														>Help Center</a
													>
													<a href="https://byte.com/pages/faq" class="footerlink2">FAQs</a>
												</div>
											</div>
										</dd>
									</dl>
									<dl class="js-badger-accordion">
										<dt id="footer-get-help">
											<button
												data-button-id="footer-get-help"
												class="js-badger-accordion-header"
											>
												<h3 class="h5">Shop</h3>
			
												<span class="js-badger-accordion-icon">
													<span class="svg-holder icon-plus icon" aria-hidden="true">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
														>
															<title>Icon Plus</title>
															<g
																stroke-linecap="square"
																stroke-linejoin="miter"
																stroke-width="2"
																fill="none"
																stroke="#1C1E28"
																stroke-miterlimit="10"
															>
																<line x1="12" y1="7" x2="12" y2="17"></line>
																<line x1="17" y1="12" x2="7" y2="12"></line>
															</g>
														</svg>
													</span>
			
													<span class="svg-holder icon-minus icon" aria-hidden="true">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
														>
															<title>Icon Minus</title>
															<line
																stroke-linecap="square"
																stroke-linejoin="miter"
																stroke-width="2"
																fill="none"
																stroke="#1C1E28"
																stroke-miterlimit="10"
																x1="17"
																y1="12"
																x2="7"
																y2="12"
															></line>
														</svg>
													</span>
												</span>
											</button>
										</dt>
										<dd
											class="badger-accordion__panel js-badger-accordion-panel footer-get-help"
										>
											<div class="js-badger-accordion-panel-inner" tabindex="0">
												<div class="footer-link-list">
													<a href="https://byte.com/products/impression-kit" class="footerlink2"
														>Impression Kit</a
													>
													<a href="https://byte.com/products/brightbyte" class="footerlink2"
														>BrightByte</a
													>
													<a href="https://byte.com/pages/hyperbyte" class="footerlink2"
														>HyperByte®</a
													>
													<a href="https://byte.com/pages/shop" class="footerlink2">All Products</a>
													<a href="https://byte.com/pages/pricing" class="footerlink2"
														>Aligner Pricing</a
													>
			
													<a href="https://byte.com/pages/military" class="footerlink2"
														>Military Discount</a
													>
												</div>
											</div>
										</dd>
									</dl>
									<dl class="js-badger-accordion">
										<dt id="footer-get-help">
											<button
												data-button-id="footer-get-help"
												class="js-badger-accordion-header"
											>
												<h3 class="h5">Explore &amp; Learn</h3>
			
												<span class="js-badger-accordion-icon">
													<span class="svg-holder icon-plus icon" aria-hidden="true">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
														>
															<title>Icon Plus</title>
															<g
																stroke-linecap="square"
																stroke-linejoin="miter"
																stroke-width="2"
																fill="none"
																stroke="#1C1E28"
																stroke-miterlimit="10"
															>
																<line x1="12" y1="7" x2="12" y2="17"></line>
																<line x1="17" y1="12" x2="7" y2="12"></line>
															</g>
														</svg>
													</span>
			
													<span class="svg-holder icon-minus icon" aria-hidden="true">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
														>
															<title>Icon Minus</title>
															<line
																stroke-linecap="square"
																stroke-linejoin="miter"
																stroke-width="2"
																fill="none"
																stroke="#1C1E28"
																stroke-miterlimit="10"
																x1="17"
																y1="12"
																x2="7"
																y2="12"
															></line>
														</svg>
													</span>
												</span>
											</button>
										</dt>
										<dd
											class="badger-accordion__panel js-badger-accordion-panel footer-get-help"
										>
											<div class="js-badger-accordion-panel-inner" tabindex="0">
												<div class="footer-link-list">
													<a href="https://byte.com/pages/plans" class="footerlink2">Plans</a>
													<a href="https://byte.com/pages/results" class="footerlink2">Results</a>
													<a href="https://byte.com/pages/app" class="footerlink2">My Byte App</a>
													<a href="https://byte.com/pages/doctor-directed-care" class="footerlink2"
														>Expert Dental Network</a
													>
													<a href="https://byte.com/pages/guarantees" class="footerlink2"
														>Guarantees</a
													>
													<a href="https://byte.com/pages/blog" class="footerlink2">Blog</a>
			
													<a href="https://byte.com/community/resources/" class="footerlink2"
														>Resources</a
													>
												</div>
											</div>
										</dd>
									</dl>
									<dl class="js-badger-accordion">
										<dt id="footer-get-help">
											<button
												data-button-id="footer-get-help"
												class="js-badger-accordion-header"
											>
												<h3 class="h5">About Us</h3>
			
												<span class="js-badger-accordion-icon">
													<span class="svg-holder icon-plus icon" aria-hidden="true">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
														>
															<title>Icon Plus</title>
															<g
																stroke-linecap="square"
																stroke-linejoin="miter"
																stroke-width="2"
																fill="none"
																stroke="#1C1E28"
																stroke-miterlimit="10"
															>
																<line x1="12" y1="7" x2="12" y2="17"></line>
																<line x1="17" y1="12" x2="7" y2="12"></line>
															</g>
														</svg>
													</span>
			
													<span class="svg-holder icon-minus icon" aria-hidden="true">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
														>
															<title>Icon Minus</title>
															<line
																stroke-linecap="square"
																stroke-linejoin="miter"
																stroke-width="2"
																fill="none"
																stroke="#1C1E28"
																stroke-miterlimit="10"
																x1="17"
																y1="12"
																x2="7"
																y2="12"
															></line>
														</svg>
													</span>
												</span>
											</button>
										</dt>
										<dd
											class="badger-accordion__panel js-badger-accordion-panel footer-get-help"
										>
											<div class="js-badger-accordion-panel-inner" tabindex="0">
												<div class="footer-link-list">
													<a href="https://byte.com/pages/about-us" class="footerlink2">Who We Are</a>
													<a
														href="https://news.byteme.com/bytecares"
														class="footerlink2"
														>ByteCares</a
													>
													<a
														href="https://byte.com/blogs/blog-posts/welcome-to-the-byte-fam-kerry"
														class="footerlink2"
														>Kerry Washington</a
													>
													<a href="https://byte.com/pages/press" class="footerlink2">Press</a>
													<a href="https://byte.com/pages/careers" class="footerlink2">Careers</a>
												</div>
											</div>
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="footer-legal" id="footer-legal">
					<div class="container">
						<div class="row between-sm">
							<div class="col-xs-12 col-md-4">
								<div class="footer-bbb" tabindex="0">
									<span class="svg-holder" aria-hidden="true">
										<canvas width="200" height="57"></canvas>
										<svg
											viewBox="0 0 200 57"
											xmlns="http://www.w3.org/2000/svg"
											xmlns:xlink="http://www.w3.org/1999/xlink"
										>
											<title>Logo Better Business Bureau</title>
											<rect
												stroke="#007E9B"
												fill="#007E9B"
												x=".5"
												y=".5"
												width="199"
												height="56"
												rx="10"
											></rect>
											<rect
												stroke="#007E9B"
												stroke-width="2"
												fill="#FFF"
												x="1"
												y="1"
												width="52"
												height="55"
												rx="10"
											></rect>
											<path
												d="M64.198 28l.588-1.582h4.004L69.378 28h2.254l-3.598-9.338h-2.492L61.944 28h2.254zm4.046-3.332h-2.912l1.456-4.018 1.456 4.018zm8.2657432 3.5c2.044 0 3.234-1.134 3.892-2.296l-1.708-.826c-.392.756-1.232 1.358-2.184 1.358-1.708 0-2.94-1.302-2.94-3.066 0-1.764 1.232-3.066 2.94-3.066.952 0 1.792.602 2.184 1.358l1.708-.84c-.658-1.176-1.848-2.282-3.892-2.282-2.814 0-4.984 1.946-4.984 4.83 0 2.87 2.17 4.83 4.984 4.83zm9.5677433 0c2.044 0 3.234-1.134 3.892-2.296l-1.708-.826c-.392.756-1.232 1.358-2.184 1.358-1.708 0-2.94-1.302-2.94-3.066 0-1.764 1.232-3.066 2.94-3.066.952 0 1.792.602 2.184 1.358l1.708-.84c-.658-1.176-1.848-2.282-3.892-2.282-2.814 0-4.984 1.946-4.984 4.83 0 2.87 2.17 4.83 4.984 4.83zM93.0972297 28v-3.318h1.456l1.834 3.318h2.296l-2.114-3.556c1.008-.238 2.058-1.134 2.058-2.772 0-1.736-1.204-3.01-3.15-3.01h-4.368V28h1.988zm2.1-5.068h-2.1v-2.52h2.1c.784 0 1.386.476 1.386 1.246 0 .798-.602 1.274-1.386 1.274zM106.668973 28v-1.75h-4.62v-2.128h4.522v-1.75h-4.522v-1.96h4.62v-1.75h-6.608V28h6.608zm5.199743 0c2.912 0 4.942-1.848 4.942-4.676 0-2.8-2.03-4.662-4.956-4.662h-3.682V28h3.696zm-.014-1.75h-1.694v-5.838h1.708c1.904 0 2.912 1.274 2.912 2.912 0 1.596-1.078 2.926-2.926 2.926zm8.307743 1.75v-9.338h-1.988V28h1.988zm5.955744 0v-7.588h2.716v-1.75h-7.448v1.75h2.73V28h2.002zm10.547743 0v-1.75h-4.62v-2.128h4.522v-1.75h-4.522v-1.96h4.62v-1.75h-6.608V28h6.608zm5.199743 0c2.912 0 4.942-1.848 4.942-4.676 0-2.8-2.03-4.662-4.956-4.662h-3.682V28h3.696zm-.014-1.75h-1.694v-5.838h1.708c1.904 0 2.912 1.274 2.912 2.912 0 1.596-1.078 2.926-2.926 2.926zM66.992 41c1.792 0 2.716-1.12 2.716-2.534 0-1.162-.784-2.128-1.792-2.282.882-.182 1.61-.98 1.61-2.142 0-1.246-.91-2.38-2.688-2.38h-4.914V41h5.068zm-.588-5.628h-2.492v-1.96h2.492c.672 0 1.092.406 1.092.98 0 .602-.42.98-1.092.98zm.084 3.878h-2.576v-2.128h2.576c.77 0 1.19.476 1.19 1.064 0 .672-.448 1.064-1.19 1.064zm8.8817432 1.918c2.842 0 4.214-1.596 4.214-3.906v-5.6h-2.03v5.544c0 1.302-.742 2.198-2.184 2.198-1.442 0-2.198-.896-2.198-2.198v-5.544h-2.016v5.6c0 2.31 1.372 3.906 4.214 3.906zm9.3437433 0c2.506 0 3.738-1.288 3.738-2.996 0-3.486-5.362-2.492-5.362-3.962 0-.56.476-.924 1.316-.924.952 0 1.96.322 2.716 1.022l1.106-1.484c-.924-.854-2.156-1.302-3.64-1.302-2.198 0-3.542 1.288-3.542 2.842 0 3.514 5.376 2.38 5.376 4.004 0 .546-.518 1.036-1.624 1.036-1.288 0-2.31-.588-2.968-1.274l-1.092 1.554c.882.882 2.17 1.484 3.976 1.484zM91.7192297 41v-9.338h-1.988V41h1.988zm3.7857432 0v-6.09l4.452 6.09h1.9180001v-9.338h-1.9880001v5.866l-4.326-5.866h-2.044V41h1.988zm14.7757431 0v-1.75h-4.62v-2.128h4.522v-1.75h-4.522v-1.96h4.62v-1.75h-6.608V41h6.608zm4.835743.168c2.506 0 3.738-1.288 3.738-2.996 0-3.486-5.362-2.492-5.362-3.962 0-.56.476-.924 1.316-.924.952 0 1.96.322 2.716 1.022l1.106-1.484c-.924-.854-2.156-1.302-3.64-1.302-2.198 0-3.542 1.288-3.542 2.842 0 3.514 5.376 2.38 5.376 4.004 0 .546-.518 1.036-1.624 1.036-1.288 0-2.31-.588-2.968-1.274l-1.092 1.554c.882.882 2.17 1.484 3.976 1.484zm8.349744 0c2.506 0 3.738-1.288 3.738-2.996 0-3.486-5.362-2.492-5.362-3.962 0-.56.476-.924 1.316-.924.952 0 1.96.322 2.716 1.022l1.106-1.484c-.924-.854-2.156-1.302-3.64-1.302-2.198 0-3.542 1.288-3.542 2.842 0 3.514 5.376 2.38 5.376 4.004 0 .546-.518 1.036-1.624 1.036-1.288 0-2.31-.588-2.968-1.274l-1.092 1.554c.882.882 2.17 1.484 3.976 1.484z"
												fill="#FFF"
												fill-rule="nonzero"
											></path>
											<path
												d="M21.8594581 19.3181684c-1.03670402 2.7672346-6.27962389 5.9518522.71933 9.6248607 1.6251245.9477759 3.7077597 2.1334376 3.4838101 3.8679505-.0868886.2211226.1166845.2520119.2712386.072703 2.3037014-2.5971547 4.0391667-6.2918235 1.2133647-8.7808654-1.4751839-1.4005688-4.9699512-2.164327-5.3453792-4.5558038.0851585-.3277286-.2935374-.358618-.3440942-.2271498l.00173-.0016952zm4.395756-14.31420443c.2079944-.0318311.53325.12883123.375428.5000686-.2556678.51946861-.4592409 1.17643255-.2746987 1.6309205.9530834 2.3498515 5.7336867 3.97304966 8.0687218 6.4464586 4.1054865 4.38101523-.7698869 9.76084923-3.7677359 13.16188063-.1351387.1115031-.2775822.1519983-.3727368.1312798-.1787752.0312661-.2935373-.0791069-.1651267-.2998528 2.0920545-4.1909703-2.010164-5.2730397-4.4557322-7.050873-8.87167249-6.33815746-1.6772192-10.3266518.3423641-14.43870358l.0015379-.00169515c.0388307-.06724086.1414823-.09436323.2479785-.0794836zM34.212776 35.0577008L34.2277906 35 35 37.111444l-.7564345.0105415v.0258914h-3.9406816l-.990397 2.8264166L21.7295162 40l-1.07763412-2.8521231h-3.900009v-.0260763L16 37.111444 16.77201933 35l.01501465.0577008zM13.30215221 41.0016116L13.30522815 41h-.00307594.00307594l3.77918231.0346488c1.87767187-.0529805 3.31356121 3.4556177.88837122 5.3405549 3.23454792.9474041 2.0670347 5.53898-.52540977 5.5472393l-4.1121533.0682904V52H11V41.0016116h2.30215221zm10.08448399 0L23.3897122 41h-.0032682.0032682l3.77899.0346488c1.8776719-.0529805 3.3135613 3.4556177.8883713 5.3405549 3.2347401.9474041 2.0670347 5.53898-.5254098 5.5472393l-4.1121533.0682904V52h-2.3352186V41.0016116h2.3023444zm9.975288 0L33.3650002 41h-.003076.003076l3.7791823.0346488c1.8776719-.0529805 3.3135612 3.4556177.8883712 5.3405549 3.2345479.9474041 2.0670347 5.53898-.5254098 5.5472393l-4.1121533.0682904V52H31.059772V41.0016116h2.3021522zm-20.02670559 6.4360223v2.5609926l3.32317354.0290083c1.26075275.037872 1.3411118-2.6290816.0330664-2.6538595l-3.35623994.0638586zm20.05977199 0v2.5609926l3.3231736.0290083c1.2607527.037872 1.3411118-2.6290816.0330664-2.6538595l-3.35624.0638586zm-9.9754802 0v2.5609926l3.3231735.0290083c1.2607528.037872 1.3411118-2.6290816.0330664-2.6538595l-3.3562399.0638586zm-10.08429179-4.5351708v2.4739676h2.8623586c1.48318199.0646644 1.0225593-2.4139364.03306641-2.4123248l-2.89542501-.0616428zm20.05977199 0v2.4739676h2.8623586c1.483182.0646644 1.0225593-2.4139364.0330664-2.4123248l-2.895425-.0616428zm-9.9754802 0v2.4739676h2.8623586c1.483182.0646644 1.0225593-2.4139364.0332586-2.4123248l-2.8956172-.0616428z"
												fill="#007E9B"
											></path>
											<circle fill="#00708B" cx="174.5" cy="28.5" r="19.5"></circle>
											<path
												d="M166.983 34l.798-2.147h5.434l.779 2.147h3.078l-4.883-12.673h-3.382L163.905 34h3.078zm5.491-4.522h-3.952l1.976-5.453 1.976 5.453zM181.947 31.252v-3.667h3.192V25.59h-3.192v-3.515h-2.204v3.515h-3.192v1.995h3.192v3.667z"
												fill="#FFF"
												fill-rule="nonzero"
											></path>
											<g transform="translate(41 46)">
												<path
													d="M2.19335938 4.35V3.07851563h.43945312c.09765625 0 .16796875.00455729.2109375.01367187.05859375.01432292.11621094.03971354.17285156.07617188.05664063.03645833.12076823.10026041.19238282.19140625.07161458.09114583.16276041.22265625.2734375.39453125L3.86132812 4.35h.4765625l-.49804687-.77929687c-.09895833-.15234375-.20377604-.27929688-.31445313-.38085938-.05208333-.046875-.1282552-.09440104-.22851562-.14257812.27473958-.03776042.47786458-.12630209.609375-.265625.13151042-.13932292.19726562-.31054688.19726562-.51367188 0-.15755208-.03971354-.30143229-.11914062-.43164062-.07942708-.13020834-.18554688-.22102865-.31835938-.27246094-.1328125-.05143229-.32682291-.07714844-.58203124-.07714844H1.81445312V4.35h.37890626zm.81445312-1.59960937h-.81445312V1.803125h.90625c.21223958 0 .36751302.04361979.46582031.13085938.09830729.08723958.14746093.1985677.14746093.33398437 0 .09244792-.02539062.1780599-.07617187.25683594-.05078125.07877604-.125.13606771-.22265625.171875-.09765625.03580729-.23307292.05371094-.40625.05371094z"
													fill="#007E9B"
													fill-rule="nonzero"
												></path>
												<circle
													fill="none"
													stroke="#007E9B"
													stroke-width=".5"
													cx="3"
													cy="3"
													r="2.75"
												></circle>
											</g>
										</svg>
									</span>
								</div>
								<br />
								<div
									tabindex="0"
									class="approved-partner"
									aria-label="American TeleDentistry Association is a Byte corporate partner"
								>
									Corporate Partner
								</div>
								<div class="footer-atda" tabindex="0">
									<span class="svg-holder" aria-hidden="true">
										<svg
											id="layer"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 600.1 240"
										>
											<defs>
												<style>
													.cls-1 {
														fill: #f72b52;
													}
													.cls-2 {
														fill: #fff;
													}
													.cls-3 {
														fill: #06174f;
													}
												</style>
											</defs>
											<path
												id="a"
												class="cls-1"
												d="M218.9,21.1C238.1,38.9,239.3,79.4,240,120c-.7,40.5-1.9,81.1-21.1,98.9-17.8,19.2-58.3,20.4-98.9,21.1-40.5-.7-81.1-1.9-98.9-21.1C1.8,201.1.8,160.5,0,120,.7,79.5,1.8,38.9,21.1,21.1,38.9,1.9,79.5.8,120,0,160.6.8,201.1,1.9,218.9,21.1Z"
											></path>
											<path
												class="cls-2"
												d="M99.5,97.2a2.84,2.84,0,0,1-1.1,2.3,3.61,3.61,0,0,1-4.4.4,3.15,3.15,0,0,1-1.3-1.7L89.1,90H67.6l-3.7,8.2a3.71,3.71,0,0,1-1.3,1.7,3.79,3.79,0,0,1-4.5-.5A2.89,2.89,0,0,1,57,97a3.53,3.53,0,0,1,.4-1.7l17-36.2a3.89,3.89,0,0,1,1.7-1.9,4.6,4.6,0,0,1,4.8,0,4.51,4.51,0,0,1,1.7,1.9L99.4,95.5A9.7,9.7,0,0,0,99.5,97.2ZM70.1,84H86.3l-8-18.2Zm87.4,15.1a4.3,4.3,0,0,1-1.1-2.8l.1-33H145.4c-2.4,0-3.7-1.1-3.7-3.3s1.2-3.2,3.7-3.2l30.2.1c2.4,0,3.7,1.1,3.7,3.3s-1.2,3.3-3.7,3.2H164.5l-.1,32.9a3.55,3.55,0,0,1-1.1,2.8,3.74,3.74,0,0,1-2.8,1,3.22,3.22,0,0,1-3-1ZM58.4,179.4l.1-35.7a3.78,3.78,0,0,1,1-2.7,4.19,4.19,0,0,1,2.8-1H74.4c7.1,0,12.5,1.9,16.4,5.7s5.8,9.1,5.8,15.9-2,12.1-5.9,15.9-9.4,5.6-16.4,5.6H62.2a4.19,4.19,0,0,1-2.8-1,3.78,3.78,0,0,1-1-2.7Zm15.4-2.6c9.9,0,14.9-5,15-15.1S84,146.6,74,146.5H66.5l-.1,30.3Zm109,3.7a3.19,3.19,0,0,1-1.1,2.4,4,4,0,0,1-2.6,1,3.48,3.48,0,0,1-3.2-2.2l-3.6-8.2-21.5-.1-3.7,8.2a3.71,3.71,0,0,1-1.3,1.7,4,4,0,0,1-4.5-.5,2.77,2.77,0,0,1-1.1-2.4,3.53,3.53,0,0,1,.4-1.7l17-36.2a3.32,3.32,0,0,1,1.7-1.8,5.1,5.1,0,0,1,4.8,0,4.51,4.51,0,0,1,1.7,1.9L182.6,179a6.8,6.8,0,0,1,.2,1.5Zm-29.4-13.2h16.2l-8-18.2Z"
											></path>
											<path
												class="cls-3"
												d="M318.7,79.7a3.23,3.23,0,0,1-2.1.8,2.82,2.82,0,0,1-1.5-.4,2.76,2.76,0,0,1-1.1-1.3l-2.9-6.7H293.7l-3,6.7a2.76,2.76,0,0,1-1.1,1.3,3,3,0,0,1-3.6-.4,2.32,2.32,0,0,1-.9-1.9,3.08,3.08,0,0,1,.3-1.3l13.8-29.4a4,4,0,0,1,1.4-1.5,3.88,3.88,0,0,1,3.9,0,3.39,3.39,0,0,1,1.4,1.5l13.6,29.4a3.08,3.08,0,0,1,.3,1.3,3.68,3.68,0,0,1-1.1,1.9ZM295.8,67.1h13.1l-6.5-14.7Zm64.1-9.6c1.4,1.6,2.1,4.1,2.1,7.6V77.3a2.74,2.74,0,0,1-.9,2.2,3.57,3.57,0,0,1-2.3.8,3.89,3.89,0,0,1-2.3-.7,2.65,2.65,0,0,1-.8-2.2V65.2a5.78,5.78,0,0,0-.8-3.9,4,4,0,0,0-2.9-1.2,4.6,4.6,0,0,0-3.9,1.7,6.8,6.8,0,0,0-1.5,4.5v11a3.1,3.1,0,0,1-.9,2.2,2.93,2.93,0,0,1-2.2.7,3,3,0,0,1-2.2-.8,3.1,3.1,0,0,1-.9-2.2V65a6.63,6.63,0,0,0-.9-3.9,3.52,3.52,0,0,0-2.9-1.2,4.3,4.3,0,0,0-3.8,1.7,6.71,6.71,0,0,0-1.4,4.5v11a3.1,3.1,0,0,1-.9,2.2,2.93,2.93,0,0,1-2.2.7,3,3,0,0,1-2.2-.8,3.1,3.1,0,0,1-.9-2.2l.1-19.2a2.72,2.72,0,0,1,.9-2.1,2.93,2.93,0,0,1,2.2-.7,3.14,3.14,0,0,1,2.1.7,2.35,2.35,0,0,1,.8,2.1V59a7.47,7.47,0,0,1,3.1-3,8.39,8.39,0,0,1,4.4-1,7.08,7.08,0,0,1,7.3,4.6,7.84,7.84,0,0,1,3.2-3.3,10.05,10.05,0,0,1,4.8-1.2,7.56,7.56,0,0,1,5.8,2.4Zm30.7,18a3.28,3.28,0,0,1-1.8,2.6,16.17,16.17,0,0,1-7.8,2,12.48,12.48,0,0,1-9.2-3.3,12.48,12.48,0,0,1-3.3-9.2A15.17,15.17,0,0,1,370,61a12,12,0,0,1,16-4.6,9.76,9.76,0,0,1,3.7,4.1,13.05,13.05,0,0,1,1.3,6.2c0,1.4-.6,2.1-1.9,2.1H374.5a7.78,7.78,0,0,0,1.9,5,6.38,6.38,0,0,0,4.7,1.7,9,9,0,0,0,2.8-.4,21.76,21.76,0,0,0,2.7-1.1,5.84,5.84,0,0,1,2.2-.8,1.61,1.61,0,0,1,1.3.6,2.16,2.16,0,0,1,.5,1.7ZM376.2,61a7.72,7.72,0,0,0-1.8,4.5h11.2a6.81,6.81,0,0,0-1.4-4.6,4.8,4.8,0,0,0-3.9-1.6,5.66,5.66,0,0,0-4.1,1.7Zm36-3.7a2.28,2.28,0,0,1,.7,1.9,3,3,0,0,1-.6,2,4,4,0,0,1-2.3.8l-1.5.1a6,6,0,0,0-4.3,2,7.06,7.06,0,0,0-1.4,4.2V78.7a2.74,2.74,0,0,1-.9,2.2,3.43,3.43,0,0,1-4.4,0,2.65,2.65,0,0,1-.8-2.2V59.5a2.72,2.72,0,0,1,.9-2.1,3.41,3.41,0,0,1,2.2-.7,3.14,3.14,0,0,1,2.1.7,3,3,0,0,1,.8,2v2a6.94,6.94,0,0,1,2.8-3.3,9,9,0,0,1,4.1-1.3h.7a2.24,2.24,0,0,1,1.9.5Zm5.4-6.6a4.19,4.19,0,0,0,2.7.9,3.85,3.85,0,0,0,2.7-.9,3.38,3.38,0,0,0,0-4.8,4.35,4.35,0,0,0-5.3,0,3.1,3.1,0,0,0-1,2.4A3,3,0,0,0,417.6,50.7Zm.4,29.5a3.23,3.23,0,0,0,2.1.8,3.41,3.41,0,0,0,2.2-.7,2.94,2.94,0,0,0,.9-2.2l.1-19.1a2.74,2.74,0,0,0-.9-2.2,2.93,2.93,0,0,0-2.2-.7,3.41,3.41,0,0,0-2.2.7,2.79,2.79,0,0,0-.9,2.2V78a2.79,2.79,0,0,0,.9,2.2Zm16,.2a9.93,9.93,0,0,1-4.2-4.4,14.18,14.18,0,0,1-1.4-6.7,14.38,14.38,0,0,1,1.6-6.7,11.2,11.2,0,0,1,4.4-4.5,12.23,12.23,0,0,1,6.5-1.5,17.37,17.37,0,0,1,3.9.5,10.39,10.39,0,0,1,3.4,1.5,2.88,2.88,0,0,1,1.6,2.6,3.09,3.09,0,0,1-.5,1.8,1.45,1.45,0,0,1-1.4.6,3.59,3.59,0,0,1-1.1-.2l-1.2-.6a10.24,10.24,0,0,0-2.1-1,5.87,5.87,0,0,0-2.3-.4,5.69,5.69,0,0,0-4.7,2,9.21,9.21,0,0,0-1.7,5.8,8.93,8.93,0,0,0,1.7,5.7,5.77,5.77,0,0,0,4.7,2.1,5.38,5.38,0,0,0,2.2-.4,13.55,13.55,0,0,0,2.1-1c.4-.2.9-.5,1.3-.7a3.59,3.59,0,0,1,1.1-.2,1.71,1.71,0,0,1,1.3.7,2.62,2.62,0,0,1,.5,1.7,2.82,2.82,0,0,1-.4,1.5,3.18,3.18,0,0,1-1.2,1.1,11.45,11.45,0,0,1-3.6,1.5,14,14,0,0,1-4.1.5,11.07,11.07,0,0,1-6.4-1.3Zm42.4-13.6V78.9a2.78,2.78,0,0,1-.8,2.1,2.93,2.93,0,0,1-2.2.7,2.78,2.78,0,0,1-2.9-2.6V77.7a6.36,6.36,0,0,1-2.6,3,8.77,8.77,0,0,1-4.2,1.1,9.76,9.76,0,0,1-4.4-1,8.12,8.12,0,0,1-3.1-2.7,6.59,6.59,0,0,1-1.1-3.9,6,6,0,0,1,1.4-4.2,7.72,7.72,0,0,1,4.4-2.2,39.61,39.61,0,0,1,8.4-.6h1.2V66.1a4.84,4.84,0,0,0-1-3.5,4.43,4.43,0,0,0-3.3-1.1,9.25,9.25,0,0,0-2.9.4,20.63,20.63,0,0,0-3.5,1.2,6,6,0,0,1-1.9.6,1.68,1.68,0,0,1-1.4-.6,2.72,2.72,0,0,1-.6-1.7,2.82,2.82,0,0,1,.4-1.5,3,3,0,0,1,1.4-1.1,15.57,15.57,0,0,1,4.1-1.5,25,25,0,0,1,4.7-.5,10.35,10.35,0,0,1,7.4,2.4A10.47,10.47,0,0,1,476.4,66.8Zm-7.5,8.9a6.21,6.21,0,0,0,1.6-4.3v-1h-.9a29.11,29.11,0,0,0-5.1.3,4.9,4.9,0,0,0-2.6,1,3,3,0,0,0-.8,2,3.63,3.63,0,0,0,1.1,2.6,3.94,3.94,0,0,0,2.7,1,5.14,5.14,0,0,0,4-1.6Zm35-16.5a11.17,11.17,0,0,1,2.1,7.5V78.9a2.77,2.77,0,0,1-3,3,3.41,3.41,0,0,1-2.3-.8,2.65,2.65,0,0,1-.8-2.2V67a6.46,6.46,0,0,0-1-4.1,4.22,4.22,0,0,0-3.3-1.3,5.38,5.38,0,0,0-4.3,1.7,6.62,6.62,0,0,0-1.7,4.5v11a3.05,3.05,0,1,1-6.1,0l.1-19.2a3.23,3.23,0,0,1,.8-2.1,3.57,3.57,0,0,1,2.3-.8,2.78,2.78,0,0,1,2.1.8,3,3,0,0,1,.8,2v1.3a8.91,8.91,0,0,1,3.3-3.1,11.16,11.16,0,0,1,4.7-1.1A8.17,8.17,0,0,1,503.9,59.2Z"
											></path>
											<path
												class="cls-3"
												d="M296.1,136a2.74,2.74,0,0,1-.8-2.3l.1-26.7h-9c-2,0-3-.9-3-2.6s1-2.6,3-2.6l24.4.1c2,0,3,.9,2.9,2.6s-1,2.6-3,2.6h-9l-.1,26.7a3.33,3.33,0,1,1-4.4,5,3.48,3.48,0,0,1-1.1-2.8Zm35.7-5.5a2.62,2.62,0,0,1,.5,1.7,3.28,3.28,0,0,1-1.8,2.6,16.55,16.55,0,0,1-7.9,2,11.45,11.45,0,0,1-12.5-12.5,15.17,15.17,0,0,1,1.5-6.6,11.12,11.12,0,0,1,4.2-4.4,12.1,12.1,0,0,1,6.1-1.6,11.29,11.29,0,0,1,5.7,1.5,9.76,9.76,0,0,1,3.7,4.1,13.05,13.05,0,0,1,1.3,6.2c0,1.4-.6,2.1-1.9,2.1H316.1a7.78,7.78,0,0,0,1.9,5,6.38,6.38,0,0,0,4.7,1.7,9,9,0,0,0,2.8-.4,21.76,21.76,0,0,0,2.7-1.1,5.84,5.84,0,0,1,2.2-.8,1.62,1.62,0,0,1,1.4.5ZM316,122.1h11.2a6.89,6.89,0,0,0-1.5-4.6,5.13,5.13,0,0,0-3.9-1.6,5,5,0,0,0-4,1.6,9.09,9.09,0,0,0-1.8,4.6Zm23.2,14.2a3.1,3.1,0,0,1-.9-2.2l.1-29.6a3.1,3.1,0,0,1,.9-2.2,3.81,3.81,0,0,1,4.4,0,3.1,3.1,0,0,1,.9,2.2l-.1,29.6a3.1,3.1,0,0,1-.9,2.2,3.49,3.49,0,0,1-2.2.8A2.65,2.65,0,0,1,339.2,136.3Zm34.3-5.7a2.62,2.62,0,0,1,.5,1.7,3.28,3.28,0,0,1-1.8,2.6,16.55,16.55,0,0,1-7.9,2,11.45,11.45,0,0,1-12.5-12.5,15.6,15.6,0,0,1,1.5-6.7,11.12,11.12,0,0,1,4.2-4.4,12.1,12.1,0,0,1,6.1-1.6,11.29,11.29,0,0,1,5.7,1.5,9.76,9.76,0,0,1,3.7,4.1,13.05,13.05,0,0,1,1.3,6.2c0,1.4-.6,2.1-1.9,2.1H357.8a7.78,7.78,0,0,0,1.9,5,6.38,6.38,0,0,0,4.7,1.7,9,9,0,0,0,2.8-.4,21.76,21.76,0,0,0,2.7-1.1,5.84,5.84,0,0,1,2.2-.8,1.45,1.45,0,0,1,1.4.6Zm-15.8-8.4h11.2a6.89,6.89,0,0,0-1.5-4.6,5.17,5.17,0,0,0-3.8-1.7,5.44,5.44,0,0,0-4,1.7A8.43,8.43,0,0,0,357.7,122.2ZM380,133.5l.1-28.9a2.77,2.77,0,0,1,3-3h9.8c5.7,0,10.1,1.6,13.3,4.6s4.7,7.3,4.7,12.9-1.7,9.8-4.8,12.9-7.6,4.5-13.3,4.5H383a2.86,2.86,0,0,1-2.3-.8A2.68,2.68,0,0,1,380,133.5Zm12.5-2.1c8,0,12-4.1,12.1-12.2s-3.9-12.2-12-12.3h-6.1l-.1,24.5Zm46.5,2.5a3.28,3.28,0,0,1-1.8,2.6,16.55,16.55,0,0,1-7.9,2A11.45,11.45,0,0,1,416.8,126a15.6,15.6,0,0,1,1.5-6.7,10.86,10.86,0,0,1,4.2-4.3,12.1,12.1,0,0,1,6.1-1.6,11.29,11.29,0,0,1,5.7,1.5A9.76,9.76,0,0,1,438,119a13.05,13.05,0,0,1,1.3,6.2c0,1.4-.6,2.1-1.9,2.1H422.8a7.78,7.78,0,0,0,1.9,5,6.38,6.38,0,0,0,4.7,1.7,9,9,0,0,0,2.8-.4,21.76,21.76,0,0,0,2.7-1.1,5.84,5.84,0,0,1,2.2-.8,1.61,1.61,0,0,1,1.3.6,2.27,2.27,0,0,1,.6,1.6Zm-16.3-10.1h11.2a6.89,6.89,0,0,0-1.5-4.6,5.13,5.13,0,0,0-3.9-1.6,5,5,0,0,0-4,1.6,7.75,7.75,0,0,0-1.8,4.6Zm42.9-8a11.17,11.17,0,0,1,2.1,7.5v12.2a3,3,0,0,1-.8,2.2,3.48,3.48,0,0,1-4.5,0,2.65,2.65,0,0,1-.8-2.2V123.7a6.61,6.61,0,0,0-1-4.1,4.22,4.22,0,0,0-3.3-1.3A5.38,5.38,0,0,0,453,120a6.62,6.62,0,0,0-1.7,4.5v11a3.49,3.49,0,0,1-.8,2.2,3.57,3.57,0,0,1-2.3.8,3,3,0,0,1-2.2-.8,2.65,2.65,0,0,1-.8-2.2l.1-19.2a3.23,3.23,0,0,1,.8-2.1,3.78,3.78,0,0,1,2.3-.8,3.23,3.23,0,0,1,2.1.8,2.79,2.79,0,0,1,.8,2v1.3a8.91,8.91,0,0,1,3.3-3.1,11.16,11.16,0,0,1,4.7-1.1,8.59,8.59,0,0,1,6.3,2.5Zm24.7,20.5a2,2,0,0,1-1,1.8,4.25,4.25,0,0,1-2.7.5l-1.3-.1c-5.5-.4-8.3-3.4-8.3-8.9V118.8h-2.5a3.94,3.94,0,0,1-2.1-.6,2.06,2.06,0,0,1-.7-1.7,2.34,2.34,0,0,1,.7-1.7,3.7,3.7,0,0,1,2.1-.6H477v-4.7a3,3,0,0,1,.8-2.1,3.78,3.78,0,0,1,2.3-.8,3,3,0,0,1,2.2.8,2.46,2.46,0,0,1,.8,2.1v4.6h4.3a3.38,3.38,0,0,1,2,.6,2.06,2.06,0,0,1,.7,1.7,2.34,2.34,0,0,1-.7,1.7,3.7,3.7,0,0,1-2.1.6h-4.2v11.2a3.33,3.33,0,0,0,3.3,4l1.3.1c1.8.2,2.6.9,2.6,2.3Zm8.4-28a3.85,3.85,0,0,0,2.7-.9,3.49,3.49,0,0,0,1-2.4,3.19,3.19,0,0,0-1.1-2.4,4.35,4.35,0,0,0-5.3,0,3.38,3.38,0,0,0,0,4.8A4.19,4.19,0,0,0,498.7,108.3Zm-2.4,28.6a3.6,3.6,0,0,0,4.4,0,2.94,2.94,0,0,0,.9-2.2V115.6a2.46,2.46,0,0,0-.9-2.2,2.93,2.93,0,0,0-2.2-.7,3.41,3.41,0,0,0-2.2.7,2.94,2.94,0,0,0-.9,2.2l-.1,19.1a3.72,3.72,0,0,0,1,2.2Zm11.9-.5a3,3,0,0,1-1.6-2.7,3.37,3.37,0,0,1,.5-1.7,1.61,1.61,0,0,1,1.3-.6,6.31,6.31,0,0,1,2.3.8,24.88,24.88,0,0,0,2.9,1.1,12.42,12.42,0,0,0,3.3.4,6,6,0,0,0,3.2-.7,2.24,2.24,0,0,0,1.2-1.9,1.54,1.54,0,0,0-.5-1.3,5.56,5.56,0,0,0-1.7-.9c-1.2-.4-2.4-.7-3.7-1a14.42,14.42,0,0,1-6.3-2.5,5.51,5.51,0,0,1-1.9-4.5,6.76,6.76,0,0,1,1.3-3.9,8,8,0,0,1,3.6-2.7,12.78,12.78,0,0,1,5.1-.9,17.52,17.52,0,0,1,4,.5,12,12,0,0,1,3.5,1.5,2.88,2.88,0,0,1,1.6,2.6,3.37,3.37,0,0,1-.5,1.7,1.37,1.37,0,0,1-1.3.6,4.25,4.25,0,0,1-1.1-.2,8.26,8.26,0,0,1-1.3-.7,18.89,18.89,0,0,0-2.5-1.1,7.46,7.46,0,0,0-2.6-.4,5,5,0,0,0-2.9.7,2.31,2.31,0,0,0-1.1,2,2.14,2.14,0,0,0,1.1,1.9,14.68,14.68,0,0,0,4.2,1.3,19.8,19.8,0,0,1,5.2,1.7,6.43,6.43,0,0,1,2.7,2.2,7,7,0,0,1-2,8.8,12.19,12.19,0,0,1-7.4,2,14.69,14.69,0,0,1-8.6-2.1Zm40.4-.1a2,2,0,0,1-1,1.8,4.25,4.25,0,0,1-2.7.5l-1.3-.1c-5.5-.4-8.3-3.4-8.3-8.9V118.8h-2.5a2.81,2.81,0,0,1-2-.6,2.06,2.06,0,0,1-.7-1.7,2.34,2.34,0,0,1,.7-1.7,3.61,3.61,0,0,1,2-.6h2.5v-4.7a3,3,0,0,1,.8-2.1,3.57,3.57,0,0,1,2.3-.8,3,3,0,0,1,2.2.8,2.46,2.46,0,0,1,.8,2.1V114h4.2a3.61,3.61,0,0,1,2,.6,2.19,2.19,0,0,1,.7,1.7,2.34,2.34,0,0,1-.7,1.7,3.7,3.7,0,0,1-2.1.6h-4.2V130a3.33,3.33,0,0,0,3.3,4l1.3.1c1.9.1,2.7.8,2.7,2.2Zm21.9-22.4a2.28,2.28,0,0,1,.7,1.9,3,3,0,0,1-.6,2,4,4,0,0,1-2.3.8l-1.5.1a5.91,5.91,0,0,0-4.3,1.9,7.06,7.06,0,0,0-1.4,4.2v10.4a3.1,3.1,0,0,1-.9,2.2,2.93,2.93,0,0,1-2.2.7,3,3,0,0,1-2.2-.8,2.65,2.65,0,0,1-.8-2.2l.1-19.2a2.72,2.72,0,0,1,.9-2.1,2.93,2.93,0,0,1,2.2-.7,3.14,3.14,0,0,1,2.1.7,3,3,0,0,1,.8,2.1v2a7.54,7.54,0,0,1,2.8-3.3,9,9,0,0,1,4.1-1.3h.7a3.85,3.85,0,0,1,1.8.6Zm25.2-.1a2.41,2.41,0,0,1,1.5-.4,3,3,0,0,1,2,.8,2.46,2.46,0,0,1,.9,1.9,2,2,0,0,1-.3,1.1l-13.6,28.3a2.87,2.87,0,0,1-2.6,1.7,3.06,3.06,0,0,1-2-.7,1.84,1.84,0,0,1-.8-1.8,2.66,2.66,0,0,1,.3-1.2l3.3-7.1-9.1-19.2a2.15,2.15,0,0,1-.2-1.1,2.42,2.42,0,0,1,1-1.9,3.35,3.35,0,0,1,3.7-.4,2.76,2.76,0,0,1,1.1,1.3l6.9,15.3,6.9-15.2a2.07,2.07,0,0,1,1-1.4Z"
											></path>
											<path
												class="cls-3"
												d="M317,193a3.23,3.23,0,0,1-2.1.8,2.82,2.82,0,0,1-1.5-.4,2.76,2.76,0,0,1-1.1-1.3l-2.9-6.7-17.4-.1-3,6.7a2.76,2.76,0,0,1-1.1,1.3,2.82,2.82,0,0,1-1.5.4,3.23,3.23,0,0,1-2.1-.8,2.46,2.46,0,0,1-.9-1.9,3.08,3.08,0,0,1,.3-1.3l13.8-29.3a3.39,3.39,0,0,1,1.4-1.5,3.88,3.88,0,0,1,3.9,0,3.39,3.39,0,0,1,1.4,1.5l13.6,29.5a2.54,2.54,0,0,1,.2,1.2,2.58,2.58,0,0,1-1,1.9Zm-22.8-12.6h13.1l-6.5-14.7Zm30.7,11a3,3,0,0,1-1.6-2.7,3.37,3.37,0,0,1,.5-1.7,1.61,1.61,0,0,1,1.3-.6,6.31,6.31,0,0,1,2.3.8,24.88,24.88,0,0,0,2.9,1.1,12.42,12.42,0,0,0,3.3.4,6,6,0,0,0,3.2-.7,2.24,2.24,0,0,0,1.2-1.9,1.54,1.54,0,0,0-.5-1.3,5.56,5.56,0,0,0-1.7-.9c-1.2-.4-2.4-.7-3.7-1a14.42,14.42,0,0,1-6.3-2.5,5.51,5.51,0,0,1-1.9-4.5,6.12,6.12,0,0,1,1.3-3.9,8.49,8.49,0,0,1,3.5-2.7,11.25,11.25,0,0,1,5.1-.9,18.25,18.25,0,0,1,4,.5,12,12,0,0,1,3.5,1.5,2.88,2.88,0,0,1,1.6,2.6,3.37,3.37,0,0,1-.5,1.7,1.71,1.71,0,0,1-1.3.7,4.25,4.25,0,0,1-1.1-.2,5.39,5.39,0,0,1-1.3-.7,18.89,18.89,0,0,0-2.5-1.1,7.46,7.46,0,0,0-2.6-.4,5,5,0,0,0-2.9.7,2.31,2.31,0,0,0-1.1,2,2.14,2.14,0,0,0,1.1,1.9,15.73,15.73,0,0,0,4.2,1.3,24.33,24.33,0,0,1,5.2,1.7,6.43,6.43,0,0,1,2.7,2.2,7.64,7.64,0,0,1,.8,3.3,6.38,6.38,0,0,1-2.8,5.4,11.67,11.67,0,0,1-7.5,2,16.37,16.37,0,0,1-8.4-2.1Zm25.1,0a3,3,0,0,1-1.7-2.7,3.37,3.37,0,0,1,.5-1.7,1.61,1.61,0,0,1,1.3-.6,6.31,6.31,0,0,1,2.3.8,24.88,24.88,0,0,0,2.9,1.1,12.42,12.42,0,0,0,3.3.4,5.2,5.2,0,0,0,3.2-.7,2.24,2.24,0,0,0,1.2-1.9,1.54,1.54,0,0,0-.5-1.3,3.5,3.5,0,0,0-1.7-.9,34.35,34.35,0,0,0-3.7-1,14,14,0,0,1-6.3-2.5,5.51,5.51,0,0,1-1.9-4.5,6.12,6.12,0,0,1,1.3-3.9,8.49,8.49,0,0,1,3.5-2.7,11.25,11.25,0,0,1,5.1-.9,18.25,18.25,0,0,1,4,.5,10.39,10.39,0,0,1,3.4,1.5,2.88,2.88,0,0,1,1.6,2.6,3.37,3.37,0,0,1-.5,1.7,1.71,1.71,0,0,1-1.3.7,3,3,0,0,1-1-.2,5.39,5.39,0,0,1-1.3-.7,18.89,18.89,0,0,0-2.5-1.1,7.46,7.46,0,0,0-2.6-.4,5,5,0,0,0-2.9.7,2.31,2.31,0,0,0-1.1,2,2.14,2.14,0,0,0,1.1,1.9,14.68,14.68,0,0,0,4.2,1.3,19.8,19.8,0,0,1,5.2,1.7,6.31,6.31,0,0,1,.7,10.9,13,13,0,0,1-7.5,2A15.79,15.79,0,0,1,350,191.4Zm29.1,2.2a11.36,11.36,0,0,1-4.3-4.4,13.16,13.16,0,0,1-1.5-6.7,14.38,14.38,0,0,1,1.6-6.7,10.73,10.73,0,0,1,4.3-4.4,14.83,14.83,0,0,1,13,0,10.73,10.73,0,0,1,4.3,4.4,15.49,15.49,0,0,1,0,13.3,10.73,10.73,0,0,1-4.3,4.4,14.11,14.11,0,0,1-13.1.1Zm11.1-5.2a9.39,9.39,0,0,0,1.7-5.8,8.56,8.56,0,0,0-1.6-5.8,5.31,5.31,0,0,0-4.5-2,5.38,5.38,0,0,0-4.6,2,11.65,11.65,0,0,0,0,11.7,5.31,5.31,0,0,0,4.5,2A5.55,5.55,0,0,0,390.2,188.4Zm17.1,5.2a9.93,9.93,0,0,1-4.2-4.4,13.54,13.54,0,0,1-1.4-6.6,14.49,14.49,0,0,1,1.7-6.7,11.2,11.2,0,0,1,4.4-4.5,13.32,13.32,0,0,1,6.5-1.6,13.48,13.48,0,0,1,7.3,2.1,3,3,0,0,1,1.2,4.1.35.35,0,0,1-.1.2,1.75,1.75,0,0,1-1.4.7,3.59,3.59,0,0,1-1.1-.2l-1.2-.6a13.55,13.55,0,0,0-2.1-1,8.52,8.52,0,0,0-2.3-.4,5.69,5.69,0,0,0-4.7,2,10.84,10.84,0,0,0,0,11.5,5.69,5.69,0,0,0,4.7,2,5.38,5.38,0,0,0,2.2-.4,13.55,13.55,0,0,0,2.1-1,5.17,5.17,0,0,1,1.3-.6,3.59,3.59,0,0,1,1.1-.2,1.71,1.71,0,0,1,1.3.7,3.31,3.31,0,0,1,.2,3.2,3.18,3.18,0,0,1-1.2,1.1,14.86,14.86,0,0,1-7.7,2.1,12.58,12.58,0,0,1-6.6-1.5Zm22-29.6a3.7,3.7,0,0,0,2.7.9,4.39,4.39,0,0,0,2.7-.9,3.1,3.1,0,0,0,1-2.4,2.8,2.8,0,0,0-1-2.4,3.61,3.61,0,0,0-2.6-.9,3.85,3.85,0,0,0-2.7.9,3.1,3.1,0,0,0-1,2.4,2.72,2.72,0,0,0,.9,2.4Zm.3,29.5a3.78,3.78,0,0,0,2.3.8,3,3,0,0,0,2.2-.8,2.74,2.74,0,0,0,.9-2.2V172.2a2.74,2.74,0,0,0-.9-2.2,2.93,2.93,0,0,0-2.2-.7,3.41,3.41,0,0,0-2.2.7,2.79,2.79,0,0,0-.9,2.2l-.1,19.1a2.79,2.79,0,0,0,.9,2.2Zm29.4-21a10.11,10.11,0,0,1,2.4,7.6v12.1a2.78,2.78,0,0,1-.8,2.1,3.49,3.49,0,0,1-2.2.8,2.75,2.75,0,0,1-2.9-2.9v-1.1a6.57,6.57,0,0,1-2.7,3,8.77,8.77,0,0,1-4.2,1.1,9.76,9.76,0,0,1-4.4-1,8.12,8.12,0,0,1-3.1-2.7,7.65,7.65,0,0,1-1.1-3.9,6,6,0,0,1,1.4-4.2,8.38,8.38,0,0,1,4.4-2.2,40.11,40.11,0,0,1,8.5-.7h1.2v-1.1a4.84,4.84,0,0,0-1-3.5,4.43,4.43,0,0,0-3.3-1.1,9.25,9.25,0,0,0-2.9.4c-1,.3-2.2.7-3.5,1.2a6,6,0,0,1-1.9.6,1.82,1.82,0,0,1-1.4-.6,2.72,2.72,0,0,1-.6-1.7,2.82,2.82,0,0,1,.4-1.5,3.6,3.6,0,0,1,1.4-1.1,21,21,0,0,1,8.9-2,9.78,9.78,0,0,1,7.4,2.4Zm-5,16.6a6.21,6.21,0,0,0,1.6-4.3v-1h-.9a29.11,29.11,0,0,0-5.1.3,4.61,4.61,0,0,0-2.6,1,3,3,0,0,0-.8,2,3.63,3.63,0,0,0,1.1,2.6,3.94,3.94,0,0,0,2.7,1,5.27,5.27,0,0,0,4-1.6Zm29.6,3.9a2,2,0,0,1-1,1.8,5.21,5.21,0,0,1-2.8.5l-1.3-.1c-5.5-.4-8.3-3.4-8.3-8.9V175.5h-2.5a3.61,3.61,0,0,1-2-.6,2.61,2.61,0,0,1,0-3.5,3.7,3.7,0,0,1,2.1-.6h2.5v-4.6a3,3,0,0,1,.8-2.1,3.48,3.48,0,0,1,4.5,0,2.35,2.35,0,0,1,.8,2.1v4.5h4.2a2.42,2.42,0,0,1,2,.6,2.06,2.06,0,0,1,.7,1.7,2.34,2.34,0,0,1-.7,1.7,3.61,3.61,0,0,1-2,.6h-4.2v11.2a3.3,3.3,0,0,0,3.3,3.9l1.3.1C482.8,190.8,483.6,191.6,483.6,193Zm7.4-29a3.7,3.7,0,0,0,2.7.9,4.39,4.39,0,0,0,2.7-.9,3.38,3.38,0,0,0,0-4.8,4.35,4.35,0,0,0-5.3,0,3.1,3.1,0,0,0-1,2.4,2.49,2.49,0,0,0,.9,2.4Zm.3,29.6a3.78,3.78,0,0,0,2.3.8,3.41,3.41,0,0,0,2.2-.7,3.1,3.1,0,0,0,.9-2.2V172.4a2.74,2.74,0,0,0-.9-2.2,2.93,2.93,0,0,0-2.2-.7,3.41,3.41,0,0,0-2.2.7,2.79,2.79,0,0,0-.9,2.2l-.1,19.1a3,3,0,0,0,.9,2.1Zm16.2,0a9.64,9.64,0,0,1-4.3-4.4,15.26,15.26,0,0,1,.1-13.4,11.36,11.36,0,0,1,4.3-4.4,14.74,14.74,0,0,1,6.5-1.5,14.43,14.43,0,0,1,6.5,1.5,10.73,10.73,0,0,1,4.3,4.4,15.71,15.71,0,0,1,0,13.4,10.73,10.73,0,0,1-4.3,4.4,13.23,13.23,0,0,1-6.5,1.5,12.36,12.36,0,0,1-6.6-1.5Zm11-5.2a9.39,9.39,0,0,0,1.7-5.8,8.56,8.56,0,0,0-1.6-5.8,6.19,6.19,0,0,0-8.8-.3l-.3.3a9.21,9.21,0,0,0-1.7,5.8,9.06,9.06,0,0,0,1.5,5.8,6.31,6.31,0,0,0,8.9.3q.3-.15.3-.3Zm32.1-15.9a11.17,11.17,0,0,1,2.1,7.5v12.2a3,3,0,0,1-.8,2.2,3.57,3.57,0,0,1-2.3.8,3.41,3.41,0,0,1-2.3-.8,2.65,2.65,0,0,1-.8-2.2V180.4a7.16,7.16,0,0,0-1-4.1,4.22,4.22,0,0,0-3.3-1.3,5.38,5.38,0,0,0-4.3,1.7,6.62,6.62,0,0,0-1.7,4.5v11a3.49,3.49,0,0,1-.8,2.2,3.57,3.57,0,0,1-2.3.8,3,3,0,0,1-2.2-.8,2.65,2.65,0,0,1-.8-2.2l.1-19.2a3.23,3.23,0,0,1,.8-2.1,3.78,3.78,0,0,1,2.3-.8,3.23,3.23,0,0,1,2.1.8,3,3,0,0,1,.8,2v1.3a8.91,8.91,0,0,1,3.3-3.1,11.16,11.16,0,0,1,4.7-1.1,8.15,8.15,0,0,1,6.4,2.5Z"
											></path>
										</svg>
									</span>
			
									<span class="visually-hidden"
										>Approved Partner: American TeleDentistry Association</span
									>
								</div>
							</div>
							<div class="col-xs-12 col-md-8">
								<div class="footer-legal--links">
									<a href="https://byte.com/pages/accessibility-statement" class="footerlink2"
										>Accessibility</a
									>
									<span>|</span>
									<a href="https://byte.com/pages/privacy-policy" class="footerlink2"
										>Privacy Policy</a
									>
									<span>|</span>
									<a href="https://byte.com/pages/terms-of-use" class="footerlink2">Terms of Use</a>
								</div>
								<p class="small rights-reserved">©2022 Byte. All rights reserved.</p>
								<p class="small asterisk">
									<sup>1</sup> Based on initial treatment plans for all-day aligners
									purchased in last 12 months excluding any touch ups. Individual
									results may vary.
								</p>
								<p class="small asterisk">
									<sup>2</sup> Based on initial treatment plans for Byte at Night
									aligners purchased in last 12 months excluding any touch ups.
									Individual results may vary.
								</p>
								<p class="small asterisk">
									<sup>3</sup> Lifetime Guarantee based on post treatment compliance.
									See
									<a aria-label="Go to guarantees page" href="https://byte.com/pages/guarantees"
										>Guarantees</a
									>
									for more details.
								</p>
								<p class="small asterisk">
									<sup>4</sup> Preliminary clinical studies of small groups of users
									have shown that daily recommended use of a high-frequency seating
									device functionally equivalent to HyperByte with clear aligners may
									accelerate tooth movement. Individual results may vary.
								</p>
								${data.map((note, i) => {
									console.log(note)
									return note && note.Footnote && note.Footnote.length > 0 ? `<p class="small asterisk"><sup>${i + 5}</sup>${note.Footnote}</p>` : ''
								}).join('')}
							</div>
						</div>
					</div>
				</div>
			</footer>
		`;
	}

	/** COMPONENT */
	function getBackupData() {
    return [
      {},
    ];
  }

  async function getServerData(tableId) {
    try {
      const response = await fetch(
        `https://us-central1-mario-luevanos.cloudfunctions.net/api/byte/components?table=${tableId}`
      );
      if (response.ok) {
        return await response.json();
      }
      return Promise.resolve([]);
    } catch (error) {
      return Promise.reject([]);
    }
  }

  async function getData(tableId) {
    const data = await getServerData(tableId);
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
