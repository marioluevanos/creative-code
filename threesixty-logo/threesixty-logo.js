const divs = Array.from({ length: 10 }, (_, i) => {
  const d= document.createElement("div");
  d.dataset.i = i;
  return d;
});

const logos = document.createElement("div");
logos.classList.add('logos');
divs.forEach(d => logos.appendChild(d));
document.body.appendChild(logos);

const tl = gsap.timeline({
  repeat: -1,
  yoyo: true
});

divs.forEach(d => {
  const i = +d.dataset.i;
  const h = 205;
  const l = 40 - (i * 4);
  const s = 85 + (i * 10);
  tl.set(d, {
    scale: i * 0.2,
    backgroundColor: `hsl(${h}, ${s}%, ${l}%)`,
    zIndex: 10 - i,
  })
});

tl.to(divs, {
  rotate: 360,
  stagger: 0.1,
  duration: 1,
  scale: 1,
  ease: 'circ.out'
})


console.log(divs)
