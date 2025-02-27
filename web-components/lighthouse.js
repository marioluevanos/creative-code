class LighthouseChart extends HTMLElement {
  constructor() {
    super();
  }

  #getHSLValue(input) {
    const greenRange = 112;
    let hue = Math.abs(Math.max(greenRange, (360 - input) * 1) - 360);

    // If less than 50, exponetially reduce the score
    if (hue <= 50) hue = hue * 0.7;

    return 'hsl(' + hue.toFixed(2) + ', 100%, 50%)';
  }

  #getAverage(array) {
    return array.reduce((a, b) => a + b) / array.length;
  }

  connectedCallback() {
    const dScores = this.getAttribute('data-scores');
    const scores = !dScores ? [] : dScores.split(',').map((s) => Number(s));

    const title = document.createElement('h2');
    const titleValue = this.getAttribute('data-title');
    title.setAttribute('class', 'title');
    title.innerHTML = `${titleValue}`;

    const titleUrl = this.getAttribute('data-title-url');
    if (titleUrl) {
      const anchor = document.createElement('a');
      anchor.setAttribute('href', titleUrl);
      anchor.innerHTML = title.innerText;
      title.innerHTML = anchor.outerHTML;
    }

    const style = document.createElement('style');
    style.textContent = `
      .root {
        box-sizing: border-box;
        font-family: 'Source Sans Pro';
        padding: 1rem;
      }
      .root * {
        box-sizing: border-box;
      }
      .root .title {
        font-weight: 400;
        font-size: 1rem;
      }
      .root .bar {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0;
        font-weight: 600;
        margin: 0.25rem 0;
        position: relative;
        display: flex;
        align-items: center;
        padding: 1px;
      }
      .root a {
        color: currentColor;
        text-decoration: none;
      }
      .root .bar span {
        font-size: 0.75rem;
        font-weight: 700;
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;        
        height: 100%;
        background: rgba(255, 255, 255, 0.75);
        padding: 0 0.5rem;
        min-width: 4rem;
        text-align: right;
      }
      .root .average {
        font-weight: 700;
        font-size: 1.5rem;
      }
    `;

    const root = document.createElement('section');
    root.setAttribute('class', 'root');
    root.appendChild(title);

    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(style);
    shadow.appendChild(root);

    scores.forEach((s) => {
      const bar = document.createElement('p');
      bar.setAttribute('class', 'bar');
      bar.style.background = `linear-gradient(90deg, ${this.#getHSLValue(
        s
      )} ${s}%, hsl(0, 0%, 95%) ${s}%)`;
      bar.innerHTML = `<span>${s}%</span>`;

      root.insertAdjacentElement('beforeend', bar);
    });

    if (scores.length) {
      root.insertAdjacentHTML(
        'beforeend',
        `
      <p class="average">Average Score: ${this.#getAverage(scores).toFixed(
        2
      )}</p>
      `
      );
    }
  }
}

customElements.define('lighthouse-chart', LighthouseChart);
