/*
	GSAP Timeline Scrubber
	by Mary Mattern
	modeled after http://greensock.com/sequence-video
*/

var scrubberCount = 0,
	cssLoaded = false;

export default function scrubber(timeline, label) {
	scrubberCount++;

	var scrubberID = 'scrubber-wrapper-' + scrubberCount;
	timeline.eventCallback('onUpdate', function() { updateSlider(this, scrubberID); });

	injectScrubberCSS();
	injectScrubberHTML(timeline, scrubberID, label, this);
	addScrubberEvents(timeline, scrubberID);
}

function addScrubberEvents(timeline, scrubberID) {
	var scrubber = document.getElementById(scrubberID);

	scrubber.getElementsByClassName('play')[0].addEventListener('click',function() {
		if (timeline.progress() !== 1) {
			timeline.play();
		} else {
			timeline.restart();
		}
	});

	scrubber.getElementsByClassName('pause')[0].addEventListener(   'click', function() { timeline.pause();   });
	scrubber.getElementsByClassName('reverse')[0].addEventListener( 'click', function() { timeline.reverse(); });
	scrubber.getElementsByClassName('restart')[0].addEventListener( 'click', function() { timeline.restart(); });

	scrubber.getElementsByClassName('scrubber-slider')[0].addEventListener('input',function() {
		timeline.pause();
		timeline.progress( this.value/100 );
	});
}

function updateSlider(timeline, scrubberID) {
	var timelineProgress = (timeline.progress() * 100).toFixed();
	var currentScrubber = document.getElementById(scrubberID);

	if (!currentScrubber) return;

	currentScrubber.getElementsByClassName('scrubber-slider')[0].value = timelineProgress;
	currentScrubber.getElementsByClassName('progress')[0].innerHTML = timelineProgress;
	currentScrubber.getElementsByClassName('time')[0].innerHTML = timeline.time().toFixed(2);
}

function injectScrubberCSS() {
	if (!cssLoaded) {
		var scrubberCSS = `
			.scrubber-gui {
				z-index: 9999;
				position: relative;
			}
			[id*='scrubber-wrapper-'] {
				position: fixed;
				width: 50%;
				color: white;
				margin: auto;
				top: 30px;
				left: 0;
				right: 0;
				z-index: 1337;
				opacity: 0.2;
			}
			[id*='scrubber-wrapper-']:hover {
				opacity: 1;
			}
			[id*='scrubber-wrapper-'] .scrubber-slider {
				width: 100%;
				margin: 10px auto;
				display: block;
				border: none;
				height: 1px;
				background: white;
				-webkit-appearance: none;
			}
			[id*='scrubber-wrapper-'] .scrubber-gui {
				margin-top: 30px;
				display: flex;
				font-size: 0.85em;
				justify-content: space-between;
			}
			[id*='scrubber-wrapper-'] .scrubber-data, [id*='scrubber-wrapper-'] .scrubber-controls {
				display: flex;
				text-align: center;
			}
			[id*='scrubber-wrapper-'] .scrubber-data {
				font-size: inherit;
				text-align: right;
			}
			[id*='scrubber-wrapper-'] .scrubber-data div {
				margin-right: 20px;
				display: flex;
				height: 16px;
				position: relative;
			}
			[id*='scrubber-wrapper-'] .scrubber-data div span {
				margin-left: 5px;
			}
			[id*='scrubber-wrapper-'] .scrubber-controls {
				flex-wrap: wrap;
				width: 50%;
			}
			[id*='scrubber-wrapper-'] button {
				font-size: inherit;
				border-radius: 0;
				background: none;
				color: white;
				border: none;
				box-sizing: border-box;
				padding: 0 10px;
				position: relative;
				text-transform: uppercase;
			}
			[id*='scrubber-wrapper-'] svg {
				width: 16px;
				height: auto;
				fill: white;
			}
			[id*='scrubber-wrapper-'] .scrubber-label {
				font-size: 0.85em;
			}
			[id*='scrubber-wrapper-']:not(:last-of-type) {
				display: none;
			}
		`;
		var styles = document.createElement('style');
		styles.appendChild(document.createTextNode(scrubberCSS));
		document.head.appendChild(styles);
		cssLoaded = true;
	}
}

function injectScrubberHTML(timeline, scrubberID, label) {
	label = label || 'Timeline';
	var duration = timeline.endTime();

	var scrubberHTML = `
			<span class="scrubber-label" for="scrubber-slider">${label}</span>
			<div class="scrubber-input"><input type="range" class="scrubber-slider" min="0" max="100" value="0"></div>
			<div class="scrubber-gui">
				<div class="scrubber-controls"> 
					<button class="play">
						<svg viewBox="0 0 16 16">
							<path d="M13.6,7.2l-10-7C2.9-0.3,2,0.2,2,1v14c0,0.8,0.9,1.3,1.6,0.8l10-7C14.1,8.4,14.1,7.6,13.6,7.2z"></path>
						</svg>
					</button>
					<button class="pause">
						<svg viewBox="0 0 16 16">
							<path d="M5,1H2C1.4,1,1,1.4,1,2v12c0,0.6,0.4,1,1,1h3c0.6,0,1-0.4,1-1V2C6,1.4,5.6,1,5,1z"></path>
							<path d="M14,1h-3c-0.6,0-1,0.4-1,1v12c0,0.6,0.4,1,1,1h3c0.6,0,1-0.4,1-1V2C15,1.4,14.6,1,14,1z"></path>
						</svg>
					</button>
					<button class="reverse">
						<svg viewBox="0 0 16 16">
							<path d="M15.4,0.1C15-0.1,14.6,0,14.3,0.3L9,5.6V1c0-0.4-0.2-0.8-0.6-0.9C8-0.1,7.6,0,7.3,0.3l-7,7 c-0.4,0.4-0.4,1,0,1.4l7,7C7.5,15.9,7.7,16,8,16c0.1,0,0.3,0,0.4-0.1C8.8,15.8,9,15.4,9,15v-4.6l5.3,5.3c0.2,0.2,0.4,0.3,0.7,0.3 c0.1,0,0.3,0,0.4-0.1c0.4-0.2,0.6-0.5,0.6-0.9V1C16,0.6,15.8,0.2,15.4,0.1z M7,12.6L2.4,8L7,3.4V12.6z M14,12.6L9.4,8L14,3.4V12.6z"></path>
						</svg>
					</button>
					<button class="restart">
						<svg viewBox="0 0 16 16">
							<circle data-color="color-2" fill="#444444" cx="3.5" cy="12.5" r="2.5"></circle>
							<path d="M8,1C6.127,1,4.35,1.758,3.052,3.052L0.9,0.9L0.2,7.3l6.4-0.7L4.465,4.465C5.393,3.542,6.662,3,8,3 c2.757,0,5,2.243,5,5s-2.243,5-5,5v2c3.859,0,7-3.14,7-7S11.859,1,8,1z"></path>
						</svg>
					</button>
				</div> 
				<div class="scrubber-data"> 
					<div>
						<svg viewBox="0 0 16 16">
							<path d="M15,0H2C1.4,0,1,0.4,1,1v7h2V2h11v10H4v-2l-4,3l4,3v-2h11c0.6,0,1-0.4,1-1V1C16,0.4,15.6,0,15,0z"></path>
							<polygon points="7,4 7,8 11,8 11,6 9,6 9,4 "></polygon>
						</svg>
						<span class="progress">0</span>%
					</div>
					<div>
						<svg viewBox="0 0 16 16">
							<path d="M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M8,14c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6 S11.3,14,8,14z"></path>
							<polygon points="9,4 7,4 7,9 12,9 12,7 9,7 "></polygon>
						</svg>
						<span class="time">0.00</span>s
					</div>
					<div>
						<svg viewBox="0 0 16 16">
							<path d="M15,2c0.6,0,1-0.4,1-1s-0.4-1-1-1H1C0.4,0,0,0.4,0,1s0.4,1,1,1h1c0.1,2.4,0.8,4.5,2,6c-1.2,1.4-2,3.6-2,6H1 c-0.6,0-1,0.4-1,1s0.4,1,1,1h14c0.6,0,1-0.4,1-1s-0.4-1-1-1h-1c-0.1-2.5-0.8-4.6-2-6c1.3-1.5,2-3.6,2-6H15z M9.9,7.3L9,8.1l1,0.7 c1.2,0.9,2,2.9,2.1,5.2H4c0.1-2.3,0.9-4.3,2.1-5.2l1-0.7L6.1,7.3C4.8,6.1,4.1,4.2,4,2h8C11.9,4.2,11.2,6.1,9.9,7.3z"></path>
						</svg>
						<span class="duration">${duration.toFixed(2)}</span>s
					</div>
				</div> 
			</div>`;
	var scrubberWrapper = document.createElement('div');
	scrubberWrapper.setAttribute('id', scrubberID);
	scrubberWrapper.innerHTML = scrubberHTML;
	document.body.appendChild(scrubberWrapper);
}
