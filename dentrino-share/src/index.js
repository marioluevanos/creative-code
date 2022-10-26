import "./styles/index.scss";

function SocialShare(blogUrl, target) {
  createIcons();
  function createData() {
    return [{
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`,
      icon: 'M6.02293,16L6,9H3V6h3V4c0-2.6992,1.67151-4,4.07938-4c1.15339,0,2.14468,0.08587,2.43356,0.12425v2.82082 l-1.66998,0.00076c-1.30953,0-1.56309,0.62227-1.56309,1.53541V6H13l-1,3H9.27986v7H6.02293z'
    }, {
      name: 'Twitter',
      url: `https://twitter.com/share?&url=${blogUrl}`,
      icon: 'M16,3c-0.6,0.3-1.2,0.4-1.9,0.5c0.7-0.4,1.2-1,1.4-1.8c-0.6,0.4-1.3,0.6-2.1,0.8c-0.6-0.6-1.5-1-2.4-1 C9.3,1.5,7.8,3,7.8,4.8c0,0.3,0,0.5,0.1,0.7C5.2,5.4,2.7,4.1,1.1,2.1c-0.3,0.5-0.4,1-0.4,1.7c0,1.1,0.6,2.1,1.5,2.7 c-0.5,0-1-0.2-1.5-0.4c0,0,0,0,0,0c0,1.6,1.1,2.9,2.6,3.2C3,9.4,2.7,9.4,2.4,9.4c-0.2,0-0.4,0-0.6-0.1c0.4,1.3,1.6,2.3,3.1,2.3 c-1.1,0.9-2.5,1.4-4.1,1.4c-0.3,0-0.5,0-0.8,0c1.5,0.9,3.2,1.5,5,1.5c6,0,9.3-5,9.3-9.3c0-0.1,0-0.3,0-0.4C15,4.3,15.6,3.7,16,3z'
    }, {
      name: 'LinkedIn',
      url: `http://www.linkedin.com/shareArticle?mini=true&url=${blogUrl}&source=byteme.com`,
      icon: 'M0.3,5.3h3.3V16H0.3L0.3,5.3L0.3,5.3L0.3,5.3z M1.9,0L1.9,0C3,0,3.8,0.9,3.8,1.9S3,3.9,1.9,3.9 C0.9,3.9,0,3,0,1.9c0,0,0,0,0,0C0,0.9,0.8,0,1.9,0L1.9,0L1.9,0z M5.7,16H9v-5.3C9,9.3,9.2,8,11,8c1.7,0,1.7,1.6,1.7,2.8V16H16v-5.9 C16,7.3,15.4,5,12,5c-1.3,0-2.5,0.6-3.1,1.7h0V5.3H5.7L5.7,16L5.7,16z'
    }];
  }
  function createOneIcon(social = {}) {
    return `
      <a class="${social.name.toLowerCase()}" target="_blank" rel="noopener" onclick="window.open('${social.url}', '${social.name}', 'width=500,height=500')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="white">
          <path d="${social.icon}"></path>
        </svg>
      </a>`;
  }
  function createIcons() {
    const root = document.createElement('div');
    root.classList.add('social-icons');
    createData().map(createOneIcon).forEach(icon => root.innerHTML += icon);

    const el = document.querySelector(target);
    if (el) el.insertAdjacentElement('beforeend', root);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SocialShare(window.location.href, '#share');
  const demo = document.querySelector('[data-demo]')
  const screen1 = document.querySelector('[data-screen="1"]');
  const button = document.querySelector('.button');
  const queryParams = window.location.search.replace('?', '').split('&');
  const kvs = queryParams.map(s => s.split('='));
  const isScreen2 = kvs.some(s => s[0] === 'screen' && s[1] === '2');

  demo.classList.toggle('is-screen-2', isScreen2);
  screen1.addEventListener('click', () => demo.classList.add('is-screen-2'));
});
