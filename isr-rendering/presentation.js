const iframes = document.querySelectorAll("iframe");

iframes.forEach((iframe) => (iframe.onload = () => resizeIframe(iframe)));

Reveal.initialize({
  hash: true,
  minScale: 0.2,
  maxScale: 2.0,
  plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
  disableLayout: false,
  backgroundTransition: "fade",
  transition: "slide",
  navigationMode: "linear",
});

Reveal.on("slidetransitionend", (event) => {
  setSlideIndex(event.currentSlide);
});

Reveal.on("ready", (event) => {
  addIndex();
  setSlideIndex(event.currentSlide);
});

Reveal.on("slidechanged", (event) => {
  iframes.forEach((iframe) => resizeIframe(iframe));
  const childName = event.currentSlide.dataset.name;
  const parentName = event.currentSlide.parentElement.dataset.name;
  const name = !childName ? parentName : childName;

  const controls = document.querySelector("aside.controls");
  controls.dataset.name = !name ? "" : name;
});

Reveal.on("fragmentshown", ({ fragment }) => {
  toggleVideoPlayback(fragment);

  const video = document.querySelector('.slide-background.present video');
  if (video) {
    video.classList.add('fade-out');
  }

  const lastIndex = getComputedStyle(fragment.parentElement).getPropertyValue('--cols').replace(/\D+/g, '');
  const lastWasShown = Number(fragment.dataset.fragmentIndex) === Number(lastIndex) - 1;
  if (lastWasShown) {
    video.classList.add('fade-out');
  }
});

Reveal.on("fragmenthidden", ({fragment}) => {
  const video = document.querySelector('.slide-background.present video');
  const firstWasHidden = fragment.dataset.fragmentIndex === '0';
  if (firstWasHidden) {
    video.classList.remove('fade-out');
  }
});

function toggleVideoPlayback(fragment) {
  const video = fragment.querySelector("video");
  if (video) video.play();

  const prev = fragment.previousElementSibling;
  if (prev) {
    const video = prev.querySelector("video");
    if (video) video.pause();
  }
}

function setSlideIndex(slide) {
  console.log(slide)
  document.body.dataset.slide = slide.dataset.index;
}

function addIndex() {
  const slides = document.querySelector(".reveal .slides");
  Array.from(slides.children).forEach((slide, index) => {
    slide.dataset.index = index;
  });
}

function resizeIframe(iframe) {
  // iframe.style.height = iframe.contentWindow.document.body?.scrollHeight + "px";
  // iframe.style.width = iframe.parentElement.clientWidth + "px";
}
