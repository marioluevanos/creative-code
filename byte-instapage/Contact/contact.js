(function () {
  document.addEventListener("DOMContentLoaded", init);
  const id = "contact";

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
    *{box-sizing:border-box}.contact-methods{padding:32px 0;text-align:center}@media(min-width: 769px){.contact-methods{padding:42px 0 0}}.contact-methods .container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;padding:0}@media(min-width: 480px){.contact-methods .container{display:grid;grid-template-columns:1fr 1fr;border:none}}@media(min-width: 769px){.contact-methods .container{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row}}.contact-methods .contact-method{width:100%;background:#fff;-ms-flex-align:center;align-items:center;padding:0 24px 2rem}@media(min-width: 769px){.contact-methods .contact-method{padding:24px}}.contact-methods .contact-method .text-large{margin:0}@media(min-width: 769px){.contact-methods .contact-method .text-large{margin-top:1rem}}.contact-methods .contact-method a{font-weight:700;display:block;color:#e72323;text-decoration:none;text-transform:uppercase;letter-spacing:.01em}@media(min-width: 1024px){.contact-methods .contact-method a{font-size:18px}}.contact-methods .svg-illustration{--size: 3.5rem;width:var(--size);height:var(--size);margin:auto}@media(min-width: 769px){.contact-methods .svg-illustration{--size: 5rem}}section.contact{padding:3rem 0}@media(min-width: 769px){section.contact{padding:6rem 0}}section.contact .contact-title{margin:0 0 2.5rem;text-align:center}@media(min-width: 769px){section.contact .contact-title br{display:none}}section.contact .contact-methods{padding-top:0;padding-bottom:0;max-width:1000px;margin:auto}
    <style>
    `;
  }

  function html(data) {
    if (!Array.isArray(data)) return;
    const [REACT_OUT, TEXT_US, CALL_US, MESSAGE_US] = data.map(c => `<a href="${c['Link URL']}">${c['Link Text']}</a>`)
    return `
    <section class="contact">
      <header class="product--header">
        <h3 class="h3 contact-title">Want to know more? <br />Let’s talk.</h3>
      </header>
      <div class="contact-methods">
        <div class="container">
          <div class="contact-method">
            <svg
              class="svg-illustration svg-reach-out"
              viewBox="0 0 128 128"
              width="128"
              height="128"
              shape-rendering="geometricPrecision"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.51,10.59l92.86-5a8.54,8.54,0,0,1,9,8.05l.26,4.85a8.51,8.51,0,0,1-8,9l-92.86,5a8.55,8.55,0,0,1-9-8.06l-.26-4.84A8.51,8.51,0,0,1,20.51,10.59Z"
                fill="#b2ded1"
              ></path>
              <path
                d="M123.28,80.9l-.72-.23-2.84-.9-2.86-.91-9.16-3H95.89L74,79.66l6.91,21.09-32.34,1.74L23,103.86a8.49,8.49,0,0,1-9-8L13,77.74a8.32,8.32,0,0,1,1-4.46,8.54,8.54,0,0,1,2.44-2.84,8.43,8.43,0,0,1,4.63-1.68L42.63,67.6l71.17-3.82a8.54,8.54,0,0,1,9,8Z"
                fill="#e72323"
              ></path>
              <path
                d="M20.18,37.87l18.88-1.24a8.54,8.54,0,0,1,9.07,7.94l.09,1.36A8.51,8.51,0,0,1,40.28,55L21.4,56.23a8.53,8.53,0,0,1-9.07-7.94l-.09-1.36A8.51,8.51,0,0,1,20.18,37.87Z"
                fill="#b2ded1"
              ></path>
              <path
                d="M70.29,38.77l44.41-2.92a8.55,8.55,0,0,1,9.07,7.95l.09,1.36a8.51,8.51,0,0,1-7.94,9.06l-44.4,2.91a8.53,8.53,0,0,1-9.07-7.94l-.09-1.36A8.5,8.5,0,0,1,70.29,38.77Z"
                fill="#b2ded1"
              ></path>
              <path
                d="M37.29,59.85H12.53A8.55,8.55,0,0,1,4,51.32V46.47A8.53,8.53,0,0,1,12.53,38H37.3a8.54,8.54,0,0,1,8.52,8.53v4.85a8.52,8.52,0,0,1-8.53,8.52ZM12.53,43.63a2.84,2.84,0,0,0-2.84,2.84v4.85a2.84,2.84,0,0,0,2.84,2.84H37.29a2.85,2.85,0,0,0,2.85-2.84V46.47a2.85,2.85,0,0,0-2.84-2.84Z"
              ></path>
              <path
                d="M114.05,30.22h0l-101.51,0A8.53,8.53,0,0,1,4,21.67V16.82A8.53,8.53,0,0,1,12.53,8.3l101.52,0a8.53,8.53,0,0,1,8.52,8.52V21.7a8.54,8.54,0,0,1-8.52,8.52ZM12.53,14a2.84,2.84,0,0,0-2.84,2.84v4.85a2.84,2.84,0,0,0,2.84,2.84l101.51,0h0a2.85,2.85,0,0,0,2.84-2.83V16.84A2.84,2.84,0,0,0,114.05,14Z"
              ></path>
              <path
                d="M114,59.86H62.62a8.53,8.53,0,0,1-8.52-8.52V46.48A8.53,8.53,0,0,1,62.62,38H114a8.53,8.53,0,0,1,8.52,8.52v4.86A8.5,8.5,0,0,1,114,59.86ZM62.62,43.64a2.84,2.84,0,0,0-2.84,2.84v4.85a2.84,2.84,0,0,0,2.84,2.84H114a2.83,2.83,0,0,0,2.84-2.84V46.49A2.84,2.84,0,0,0,114,43.65Z"
              ></path>
              <path
                d="M114,67.62l-101.51,0A8.53,8.53,0,0,0,4,76.12V99.64a8.53,8.53,0,0,0,8.51,8.53H83.28l-1.86-5.68-68.91,0a2.83,2.83,0,0,1-2.82-2.84V76.13a2.84,2.84,0,0,1,2.83-2.85L114,73.3a2.85,2.85,0,0,1,2.83,2.58v3l2.86.91,2.84.9V76.15A8.53,8.53,0,0,0,114,67.62Z"
              ></path>
              <path
                d="M89.74,82.48l-1.48.46-.47,1.5.25.07A1.57,1.57,0,0,0,89.74,82.48ZM85.4,83.84l2.86-.9.86-2.84A3,3,0,0,0,85.4,83.84ZM98.83,116.7l-2.85.9a3,3,0,0,0,4.94,1.21Zm-1.1-1.11,1.1,1.11,1.48-.47A1.56,1.56,0,0,0,97.73,115.59Zm7.57-7.52,2.11,2.11,2.09-2.11A3,3,0,0,0,105.3,108.07Zm2.11,2.11-1.1,1.12a1.54,1.54,0,0,0,2.19,0Zm11.34,9.27-2.12,2.11a3,3,0,0,0,4.21,0Zm-1.12-1.12,1.12,1.12,1.09-1.12A1.58,1.58,0,0,0,117.63,118.33Zm9.5-7.23-2.1,2.11,2.1,2.12A3,3,0,0,0,127.13,111.1Zm-3.21,1a1.57,1.57,0,0,0,0,2.23l1.1-1.12Zm-7.12-11.24L115.71,102l-2.12-2.11a3,3,0,0,0,0,4.24l2.12-2.11,1.09,1.1A1.55,1.55,0,0,0,116.8,100.86Zm7-10a2.31,2.31,0,0,0-.62-.28l-.86,2.84.63.65h0l1.45,1.46A3,3,0,0,0,123.76,90.9Zm-2.6,1.44a1.58,1.58,0,0,0,.65,2.62l.47-1.5Zm-1.44-2.79L89.12,80.1l-.86,2.84-.47,1.5.25.07,2.58.81,28.7,8.87.39.12,2.1.65.47-1.5.86-2.84Zm3.2,4.56h0l-.63-.65-1.12-1.12-1.45,1.43-.39.42-4.81,4.75-.92.9,2.12,2.11v0l1.09,1.1,1.12-1.1,1.76-1.76,4.69-4.64Zm-17.62,14,2.11,2.11,2.09-2.11A3,3,0,0,0,105.3,108.07Zm13.47-5.27-.85-.83-1.12-1.11L115.71,102l-2.12-2.11a3,3,0,0,0,0,4.24l1.22,1.2,8,7.93,1.13,1.12,1.1-1.12h0l2.1-2.11Zm-13.47,5.27,2.11,2.11,2.09-2.11A3,3,0,0,0,105.3,108.07Zm0,0,2.11,2.11,2.09-2.11A3,3,0,0,0,105.3,108.07ZM125,113.21h0l-1.1-1.11-1.13,1.11-4.06,4-1.1,1.09,1.12,1.12,2.09,2.11,6.29-6.23Zm-6.3,4-9.23-9.17-2.09,2.11-1.1,1.12,1.1,1.08,9.22,9.18,2.12-2.11,1.09-1.12Zm-11.32-7.06-2.11-2.11-5.76,5.72-1.81,1.8,1.1,1.11,2.09,2.11,6.49-6.43,1.09-1.08Zm6.18-10.34a3,3,0,0,0,0,4.24l2.12-2.11v0Zm-8.29,8.23,2.11,2.11,2.09-2.11A3,3,0,0,0,105.3,108.07Zm-5.76,5.72-2.64-8.45L95.22,100l-4.6-14.67-.88-2.84-1.48.46.86-2.84a3,3,0,0,0-3.72,3.74l5.13,16.4,1.61,5.1L96,117.6l2.85-.9,1.48-.47Zm5.76-5.72,2.11,2.11,2.09-2.11A3,3,0,0,0,105.3,108.07Zm8.29-8.23a3,3,0,0,0,0,4.24l2.12-2.11v0Zm9.33-5.73h0l1.46,1.46Z"
              ></path>
            </svg>
    
            <p class="text-large">Reach Out</p>
            ${REACT_OUT}
          </div>
    
          <div class="contact-method">
            <svg
              class="svg-illustration svg-text-us"
              viewBox="0 0 128 128"
              width="128"
              height="128"
              shape-rendering="geometricPrecision"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.06,120l-16-91.47a7.18,7.18,0,0,1,5.85-8.32L64.8,12a7.24,7.24,0,0,1,8.34,5.88l16,91.47a7.19,7.19,0,0,1-5.86,8.32L35.4,125.89A7.22,7.22,0,0,1,27.06,120Z"
                fill="#b2ded1"
              ></path>
              <path
                d="M39,120.07a11.3,11.3,0,0,1-11.1-9.34L12.56,22.81a11.23,11.23,0,0,1,9.16-13L66,2.17a11.28,11.28,0,0,1,13,9.17L94.42,99.26a11.23,11.23,0,0,1-9.16,13L40.94,119.9A11.32,11.32,0,0,1,39,120.07ZM68,6.5a7.44,7.44,0,0,0-1.15.1L22.48,14.24A6.74,6.74,0,0,0,17,22L32.36,110a6.77,6.77,0,0,0,7.82,5.5l44.31-7.63A6.74,6.74,0,0,0,90,100L74.62,12.11A6.79,6.79,0,0,0,68,6.5Z"
              ></path>
              <ellipse
                cx="47.15"
                cy="22.74"
                rx="3.6"
                ry="3.57"
                transform="translate(-0.04 0.07) rotate(-0.09)"
                fill="#fff"
              ></ellipse>
              <g class="chat">
                <path
                  d="M85.09,95.1C102.73,95.1,117,82.29,117,66.5s-14.3-28.6-31.94-28.6S53.15,50.7,53.15,66.5a26.72,26.72,0,0,0,7.13,18,.89.89,0,0,1,.16,1,30.71,30.71,0,0,1-5.29,7.08.45.45,0,0,0,.29.76,23.63,23.63,0,0,0,12.11-1.94,2,2,0,0,1,1.79,0A34.63,34.63,0,0,0,85.09,95.1Z"
                  fill="#e72323"
                ></path>
                <path
                  d="M79.44,92.18c17.64,0,31.94-12.4,31.94-27.71s-14.3-27.7-31.94-27.7S47.5,49.17,47.5,64.47a25.44,25.44,0,0,0,7.11,17.44.87.87,0,0,1,.17,1,30.32,30.32,0,0,1-5.25,6.81.45.45,0,0,0,.28.76,24.22,24.22,0,0,0,12.11-1.89,2,2,0,0,1,1.75,0A35.58,35.58,0,0,0,79.44,92.18Z"
                  fill="#e72323"
                ></path>
                <path
                  d="M79.44,94.32a38,38,0,0,1-16.72-3.83c-3.45,1.75-7.89,2.46-13,2.11A2.58,2.58,0,0,1,48,88.21a30.76,30.76,0,0,0,4.45-5.51,27.57,27.57,0,0,1-7.09-18.22c0-16.46,15.29-29.85,34.08-29.85S113.52,48,113.52,64.48,98.23,94.32,79.44,94.32ZM62.81,86.24a4.07,4.07,0,0,1,1.81.42A33.67,33.67,0,0,0,79.44,90c16.44,0,29.81-11.47,29.81-25.56S95.88,38.91,79.44,38.91s-29.8,11.47-29.8,25.57a23.14,23.14,0,0,0,6.54,16,3,3,0,0,1,.51,3.41,24.83,24.83,0,0,1-3.06,4.51A19.12,19.12,0,0,0,61,86.65,4.31,4.31,0,0,1,62.81,86.24Z"
                ></path>
                <rect
                  class="textline"
                  width="37"
                  height="5"
                  x="61"
                  y="58"
                  rx="3"
                  fill="white"
                ></rect>
                <rect
                  class="textline"
                  width="26"
                  height="5"
                  x="61"
                  y="69"
                  rx="3"
                  fill="white"
                ></rect>
                <circle cx="70" cy="66" r="3" fill="white"></circle>
                <circle cx="81" cy="66" r="3" fill="white"></circle>
                <circle cx="92" cy="66" r="3" fill="white"></circle>
              </g>
            </svg>
    
            <p class="text-large">Text Us</p>
            ${TEXT_US}
          </div>
    
          <div class="contact-method">
            <svg
              class="svg-illustration svg-call-us"
              viewBox="0 0 128 128"
              width="128"
              height="128"
              shape-rendering="geometricPrecision"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M88.5,121c-52.66-16.81-66-68.78-66.14-101.34,0-5.74,5.09-9.75,10.76-8.92l8.78,1.3a10.6,10.6,0,0,1,8.91,9.24l2,17.2a10,10,0,0,1-2.28,7.67l-2,2.36a8.3,8.3,0,0,0-1.61,8.57c3,7.22,9.09,15.3,14.24,21.31A8.25,8.25,0,0,0,73,79.21a8.61,8.61,0,0,1,9.29-1.34l14,6.29A10.6,10.6,0,0,1,102.37,95L100.28,113C99.6,118.88,94.12,122.83,88.5,121Z"
                fill="#b2ded1"
              ></path>
              <path
                d="M98.82,126a13.11,13.11,0,0,1-1.88-.14h0c-56.51-8.7-82-57.07-87.1-99.43a12.17,12.17,0,0,1,3-9.68,13.16,13.16,0,0,1,9.88-4.4h11A13.45,13.45,0,0,1,46.9,22.66L51.34,41a13.53,13.53,0,0,1-1.88,10.63l-2.08,3.13c-.94,1.42-1.58,3.57-.52,5.36,3.52,6,10.85,14.2,19.6,22a5.6,5.6,0,0,0,4.08,1.42,6.27,6.27,0,0,0,4.33-2.15,13.2,13.2,0,0,1,12.51-4.15l13.38,2.77a13.53,13.53,0,0,1,10.74,13.2v19.68A13.22,13.22,0,0,1,106.92,123,12.43,12.43,0,0,1,98.82,126Zm-.89-6.61a5.82,5.82,0,0,0,4.73-1.37,6.66,6.66,0,0,0,2.29-5.09V93.25a7,7,0,0,0-5.52-6.79L86.05,83.69a6.63,6.63,0,0,0-6.28,2.08,12.68,12.68,0,0,1-8.84,4.34A12.06,12.06,0,0,1,62.1,87c-4.43-4-15.34-14.18-20.88-23.57a11.55,11.55,0,0,1,.71-12.32L44,48a7,7,0,0,0,1-5.47L40.53,24.2a6.9,6.9,0,0,0-6.73-5.3h-11a6.68,6.68,0,0,0-5,2.19,5.82,5.82,0,0,0-1.44,4.56c1.65,13.81,13.35,83.22,81.6,93.74Z"
              ></path>
              <path
                d="M95.82,53.58a2.81,2.81,0,0,1-2.67-1.92c-3.94-11.79-13-18.76-17.28-20.8a2.81,2.81,0,1,1,2.43-5.07c5,2.4,15.65,10.52,20.18,24.09a2.79,2.79,0,0,1-2.66,3.7Zm19.62,0a2.8,2.8,0,0,1-2.73-2.18C106,22.29,86,10,76.39,7.54a2.81,2.81,0,0,1,1.38-5.45c10.76,2.73,33.05,16.29,40.41,48.05a2.81,2.81,0,0,1-2.1,3.37A2.85,2.85,0,0,1,115.44,53.58Z"
              ></path>
            </svg>
    
            <p class="text-large">Call Us</p>
            ${CALL_US}
          </div>
          <div class="contact-method">
            <svg
              class="svg-illustration svg-message-us"
              viewBox="0 0 128 128"
              width="128"
              height="128"
              shape-rendering="geometricPrecision"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="70.01" cy="63.53" r="55.99" fill="#a2b1c1"></circle>
              <path
                d="M59.08,5C27.61,5,2,29.82,2,60.38a54.67,54.67,0,0,0,20.46,42.51,3.73,3.73,0,0,0,1.35.71,3.78,3.78,0,0,0,1.5.12,3.79,3.79,0,0,0,2.58-1.48,4,4,0,0,0-.63-5.58A46.68,46.68,0,0,1,9.73,60.38C9.73,34.2,31.87,12.9,59.08,12.9s49.34,21.3,49.34,47.48-22.14,47.48-49.34,47.48a51.5,51.5,0,0,1-14-1.92,3.76,3.76,0,0,0-2.93.37l-16,9.32A3.94,3.94,0,0,0,24.37,118a4,4,0,0,0,.37,3,3.89,3.89,0,0,0,2.32,1.87,3.8,3.8,0,0,0,2.93-.36L44.64,114a58.58,58.58,0,0,0,14.44,1.79c31.47,0,57.07-24.86,57.07-55.42S90.55,5,59.08,5Z"
              ></path>
              <path
                d="M60.71,43a3.71,3.71,0,0,0-2.15-.33,3.79,3.79,0,0,0-2,.9l-29.83,26a3.78,3.78,0,0,0-1,1.21,4.06,4.06,0,0,0-.43,1.5,4.28,4.28,0,0,0,.17,1.55,3.92,3.92,0,0,0,.74,1.36,3.85,3.85,0,0,0,1.19,1,3.72,3.72,0,0,0,1.46.42,3.8,3.8,0,0,0,1.5-.18,3.89,3.89,0,0,0,1.32-.77L55.21,55.17v19a4.11,4.11,0,0,0,.61,2.13,4,4,0,0,0,1.63,1.47,3.8,3.8,0,0,0,2.15.33,3.87,3.87,0,0,0,2-.9l29.84-26a4,4,0,0,0,1.35-2.7,4.1,4.1,0,0,0-.9-2.9,3.88,3.88,0,0,0-2.63-1.39,3.82,3.82,0,0,0-2.82.93L63,65.59v-19a4.12,4.12,0,0,0-.61-2.14A4,4,0,0,0,60.71,43Z"
                fill="#fff"
              ></path>
            </svg>
    
            <p class="text-large">Message Us</p>
            ${MESSAGE_US}
          </div>
        </div>
      </div>
    </section>
    `;
  }

  function getBackupData() {
    return [];
  }

  async function getServerData() {
    const component = document.querySelector(`[data-component="${id}"]`);
    const {table} = component.dataset;
    if (!table) return;
    try {
      const response = await fetch(
        `https://us-central1-mario-luevanos.cloudfunctions.net/api/byte/components?table=${table}`
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

    console.warn(`There is a problem fetching sever data for <${id}/>`, data);
    return getBackupData();
  }
})();
