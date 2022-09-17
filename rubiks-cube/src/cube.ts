import Scene from "./scene";

export interface CubePosition {
  t: number;
  l: number;
  tx: number;
  ty: number;
  tz: number;
  rx: number;
  ry: number;
  rz: number;
  s: number;
}

export default class Cube {
  public frameIndex: number;
  public el: HTMLDivElement;
  public playing: boolean;
  readonly faces = ["front", "back", "right", "left", "top", "bottom"];
  readonly order = [
    9, 1, 11, 4, 3, 8, 7, 6, 5, 0, 19, 2, 15, 14, 17, 16, 12, 13, 24, 10, 23,
    18, 22, 20, 21, 26, 25,
  ];

  constructor(private scene: Scene, public keyframes: CubePosition[]) {
    this.frameIndex = 0;
    this.playing = false;
    this.el = this.create();
  }

  get duration() {
    const dur = parseFloat(getComputedStyle(this.el).getPropertyValue("--duration")) * 1000 || 0;
    const staggerDelay = ((this.scene.total / 100) + 1) * 1.15;
    return this.isLastFrame ? dur * staggerDelay : dur;
  }

  get stagger() {
    return this.cubeIndex * 0.01;
  }

  get cubeIndex() {
    const index = Number(this.el.dataset.index || 0);
    return this.isLastFrame ? this.order[index] : index;
  }

  get totalFrames() {
    return this.keyframes.length - 1;
  }

  get initialPosition() {
    const index = Number(this.el.dataset.index);
    return this.scene.initialPosition[index];
  }

  get currentFrame() {
    const { keyframes } = this;
    const frame = keyframes && keyframes[this.frameIndex];
    return !frame ? this.scene.getInitialPosition(0) : frame;
  }

  get isLastFrame() {
    return this.frameIndex === this.totalFrames - 1;
  }

  setDelay() {
    const delay = this.isLastFrame ? this.stagger : 0;
    this.el.style.setProperty("--delay", `${delay}`);
  }

  create() {
    const cube = document.createElement("div");
    cube.classList.add("cube");

    this.faces
      .map((f) => {
        const face = document.createElement("div");
        face.classList.add(f);
        face.classList.add("cube-face");
        face.innerHTML = f;
        return face;
      })
      .forEach((f) => cube.appendChild(f));

    return cube;
  }

  setPosition(position: CubePosition) {
    Object.entries(position).forEach(([prop, value]) => {
      this.el.style.setProperty(`--${prop}`, value);
    });
  }

  async play() {
    this.playing = true;
    await this.autoMove();
  }

  pause() {
    this.playing = false;
  }

  reset() {
    this.setFrameIndex(0);
  }

  setFrameIndex(index: number) {
    this.frameIndex = index;
    this.update();
  }

  update() {
    this.setPosition(this.currentFrame);
    this.setDelay();
  }

  setNextIndex() {
    const i = this.frameIndex;
    this.frameIndex = i < this.totalFrames ? i + 1 : 0;
    this.update();
  }

  async autoMove(): Promise<{ done: boolean }> {
    if (!this.playing) return Promise.resolve({ done: true });

    this.update();

    return new Promise((resolve) => {
      setTimeout(async () => {
        this.setNextIndex();
        await this.autoMove();
        return resolve({ done: true });
      }, this.duration);
    });
  }
}
