(function () {
  document.addEventListener("DOMContentLoaded", init);
  const id = "faq-category";

  async function init() {
    const [head] = document.getElementsByTagName("head");
    [
      {
        url: "https://cdn.shopify.com/s/files/1/0075/0505/1719/files/fonts.css?v=1662656892",
        id: "byte-fonts",
      },
      {
        url: "https://cdn.shopify.com/s/files/1/0075/0505/1719/files/global.css?v=1663372204",
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
    [
      {
        url: "https://cdn.jsdelivr.net/npm/badger-accordion@1.2.4",
        id: "byte-ba-js",
        onload: faqCategory.bind(head),
      },
    ].forEach(loadScript.bind(head));
  }

  async function faqCategory() {
    const target = document.querySelector(`[data-component="${id}"]`);
    const data = await getData(target.dataset.table);
    insertComponent.call(this, data)
    createBadgerAccordion();

    function createBadgerAccordion() {
      const accordionSections = document.querySelectorAll('.js-badger-accordion');
      return Array.from(accordionSections).map(oneAccordion);
    }

    function oneAccordion(section) {
      return new BadgerAccordion(section, { openMultiplePanels: true });
    }
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

  function css() {
    return `
		<style id='${id}-css'>
    .faqs.accordion-section .faq--illustration{--size: 72px;position:relative;width:var(--size);height:var(--size);left:0;right:0;margin:0 auto;z-index:-1}.faqs.accordion-section .faq--illustration img{display:block;width:var(--size);height:var(--size)}.faqs.accordion-section .faq--illustration .svg-dots{--scale: 1.5;position:absolute;-webkit-transform:rotate(-15deg) translate(0px, 10px) scale(var(--scale));transform:rotate(-15deg) translate(0px, 10px) scale(var(--scale));z-index:-1}.js-badger-accordion-header{cursor:pointer}
		<style>
		`;
  }

  function html(data) {
    console.log(data)
    if (!Array.isArray(data) && data.length === 0) return;

    return `
      <section class="faqs accordion-section">
        <header class="faqs-header">
          <div class="faq--illustration">
            <img src="https://cdn.shopify.com/s/files/1/0075/0505/1719/files/illustration-dots.svg?v=1663368840" class="svg-illustration svg-dots"/>
            <img src="https://cdn.shopify.com/s/files/1/0075/0505/1719/files/illustration-question-mark.svg?v=1663368840" class="svg-illustration svg-question"/>
          </div>
          <h2 class="h3 faqs-title">FAQs</h2>
        </header>
        <dl
          class="js-badger-accordion badger-accordion--initialized"
          role="presentation"
        >
          ${getItems(data)}
        </dl>
      </section>
		`;
  }

  function getItems(data = []) {
    return data
      .map((faq, i) => {
        return faq.Answer && faq.Question ? `
          <dt id="faq-${i}">
            <button data-button-id="faq-${i}" class="js-badger-accordion-header">
              ${faq.Question}
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
          <dd class="badger-accordion__panel js-badger-accordion-panel faq-${i}">
            <div class="js-badger-accordion-panel-inner" tabindex="0">
              ${faq.Answer}
            </div>
          </dd>
			  ` : '';
      })
      .join("");
  }

  function getBackupData() {
    return [
      {
        Question: "After I purchase my Impression Kit, how long does it take to receive my aligners?",
        Answer: "About 5 - 7 weeks. To make it happen ASAP, send your impressions back quickly, fill out your consent form and upload your photos. This all helps us move it along.",
      }
    ];
  }

  async function getServerData(tableId) {
    if (!tableId) tableId = 'faq';
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
      "There is a problem fetching sever data for <FaqCategory/>",
      data
    );
    return getBackupData();
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
})();
