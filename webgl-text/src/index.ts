import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

// --- Scene Setup ---
let scene: THREE.Scene;
let camera: THREE.OrthographicCamera;
let renderer: THREE.WebGLRenderer;
let tableWidth = window.innerWidth;
let tableHeight = window.innerHeight;
// Orthographic camera for a flat, top-down view.
camera = new THREE.OrthographicCamera(
  -tableWidth / 2,
  tableWidth / 2,
  tableHeight / 2,
  -tableHeight / 2,
  -1000,
  1000
);
camera.position.z = 10;
scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- Create the Table Background ---
const tableGeometry = new THREE.PlaneGeometry(tableWidth, tableHeight);
const tableMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 }); // wood-like color
const tableMesh = new THREE.Mesh(tableGeometry, tableMaterial);
scene.add(tableMesh);

// --- Flour Particles Arranged as "COCAINE" ---
// Use a hidden canvas to draw the text and sample its pixel data.
let positionsArray = [];
let velocitiesArray = [];

const textCanvas = document.createElement("canvas");
const textScale = 2.3;
const textWidth = 512 * textScale;
const textHeight = 128 * textScale;
textCanvas.width = textWidth;
textCanvas.height = textHeight;
const ctx = textCanvas.getContext("2d") as CanvasRenderingContext2D;

ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
ctx.fillStyle = "white";
ctx.font = `bold ${100 * textScale}px National-Black`;
ctx.textAlign = "center";
ctx.textBaseline = "middle";
// Draw the text centered in the canvas.
ctx.fillText("COCAINE", textCanvas.width / 2, textCanvas.height / 2);

const imageData = ctx.getImageData(
  0,
  0,
  textCanvas.width,
  textCanvas.height
).data;
// Sample every 2 pixels to build the flour formation.
const getRnd = () => Math.random() - 0.5;
const rnd = (i: number) => (i % 3 === 0 ? getRnd() * 10 : getRnd() * 1);
const step = 2;
for (let y = 0; y < textCanvas.height; y += step) {
  for (let x = 0; x < textCanvas.width; x += step) {
    const index = (y * textCanvas.width + x) * 4;
    if (imageData[index + 3] > 128) {
      // if pixel is opaque enough
      // Map canvas coordinates (origin top-left) to world coordinates (centered at 0,0)
      let worldX = x - textCanvas.width / 2;
      let worldY = textCanvas.height / 2 - y;
      // Add slight random offset for an organic flour look.
      worldX += rnd(index);
      worldY += rnd(index);
      positionsArray.push(worldX, worldY, 1); // z = 1, just above the table
      velocitiesArray.push(0, 0, 0);
    }
  }
}
const numParticles = positionsArray.length / 3;
const particlesPositions = new Float32Array(positionsArray);
const particlesVelocities = new Float32Array(velocitiesArray);

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(particlesPositions, 3)
);

// --- Create a Soft Sprite for Flour Grains ---
const spriteCanvas = document.createElement("canvas");
spriteCanvas.width = 32;
spriteCanvas.height = 32;
const spriteCtx = spriteCanvas.getContext("2d") as CanvasRenderingContext2D;
const grad = spriteCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
grad.addColorStop(0, "rgba(255,255,255,1)");
grad.addColorStop(1, "rgba(255,255,255,0)");
spriteCtx.fillStyle = grad;
spriteCtx.fillRect(0, 0, 32, 32);
const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

const particlesMaterial = new THREE.PointsMaterial({
  map: spriteTexture,
  size: 6,
  transparent: true,
  depthTest: false,
});

const flourParticles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(flourParticles);

// --- Credit Card (Scraper) ---
// This narrow rectangle represents a credit card that pushes the flour particles.
const cardWidth = 1; // narrow width
const cardHeight = 50; // length of the card
const cardGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight);
const cardMaterial = new THREE.MeshBasicMaterial({
  color: 0xeeeeee,
  opacity: 0.8,
  transparent: true,
});
const creditCard = new THREE.Mesh(cardGeometry, cardMaterial);
creditCard.position.set(0, 0, 0); // start position (on the table)
scene.add(creditCard);

// --- Input & Simulation Variables ---
// Global pointer state.
const mouse = new THREE.Vector2();
let mouseDown = false;
// For computing credit card movement delta.
const cardDelta = new THREE.Vector2();
const creditCardPrevPos = new THREE.Vector2();
creditCardPrevPos.set(creditCard.position.x, creditCard.position.y);

// --- Event Listeners for Mouse ---
window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("mousedown", (event) => {
  mouseDown = true;
  onMouseMove(event);
});
window.addEventListener("mouseup", () => {
  mouseDown = false;
});

// --- Event Listeners for Touch ---
window.addEventListener(
  "touchstart",
  (event) => {
    event.preventDefault();
    mouseDown = true;
    onTouch(event);
  },
  { passive: false }
);
window.addEventListener(
  "touchmove",
  (event) => {
    event.preventDefault();
    onTouch(event);
  },
  { passive: false }
);
window.addEventListener(
  "touchend",
  (event) => {
    event.preventDefault();
    mouseDown = false;
  },
  { passive: false }
);

function onMouseMove(event: MouseEvent) {
  const x = event.clientX - window.innerWidth / 2;
  const y = -(event.clientY - window.innerHeight / 2);
  mouse.set(x, y);
}
function onTouch(event: TouchEvent) {
  const touch = event.touches[0];
  const x = touch.clientX - window.innerWidth / 2;
  const y = -(touch.clientY - window.innerHeight / 2);
  mouse.set(x, y);
}

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  tableWidth = window.innerWidth;
  tableHeight = window.innerHeight;
  camera.left = -tableWidth / 2;
  camera.right = tableWidth / 2;
  camera.top = tableHeight / 2;
  camera.bottom = -tableHeight / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// --- Animation Loop ---
function animate() {
  requestAnimationFrame(animate);

  // When the pointer is down, have the credit card follow the pointer.
  if (mouseDown) {
    creditCard.position.set(mouse.x, mouse.y, 0);
  }
  // Compute the credit card's movement delta.
  cardDelta.set(
    creditCard.position.x - creditCardPrevPos.x,
    creditCard.position.y - creditCardPrevPos.y
  );
  // Rotate the card to align with its movement if there is sufficient movement.
  if (cardDelta.length() > 1) {
    creditCard.rotation.z = Math.atan2(cardDelta.y, cardDelta.x);
  }
  creditCardPrevPos.set(creditCard.position.x, creditCard.position.y);

  // Update flour particle positions.
  const positions = particlesGeometry.attributes.position.array;
  for (let i = 0; i < numParticles; i++) {
    const idx = i * 3;
    const px = positions[idx];
    const py = positions[idx + 1];

    // Check if the particle lies within the credit card's area.
    const dx = px - creditCard.position.x;
    const dy = py - creditCard.position.y;
    // Transform particle into the credit card's local space.
    const cosTheta = Math.cos(-creditCard.rotation.z);
    const sinTheta = Math.sin(-creditCard.rotation.z);
    const localX = dx * cosTheta - dy * sinTheta;
    const localY = dx * sinTheta + dy * cosTheta;

    if (Math.abs(localX) < cardWidth / 2 && Math.abs(localY) < cardHeight / 2) {
      // Apply a small impulse to push the particle based on the card's movement.
      const impulseFactor = 0.09; // tweak this for stronger/weaker push
      particlesVelocities[idx] += cardDelta.x * impulseFactor;
      particlesVelocities[idx + 1] += cardDelta.y * impulseFactor;
    }

    // Update particle positions based on their velocities.
    positions[idx] += particlesVelocities[idx];
    positions[idx + 1] += particlesVelocities[idx + 1];

    // Apply damping to simulate friction.
    const friction = 0.66;
    particlesVelocities[idx] *= friction;
    particlesVelocities[idx + 1] *= friction;
  }

  particlesGeometry.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
}

animate();
