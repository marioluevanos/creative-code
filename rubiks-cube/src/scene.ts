import Cube, { CubePosition } from "./cube";
import keyframes from "./keyframes";

export default class Scene {
  public initialPosition: CubePosition[];
  public keyframes: CubePosition[][];
  public cubes: Cube[];
  readonly rows = 3;
  readonly cols = 3;

  constructor(public el: HTMLDivElement) {
    this.initialPosition = Array.from({ length: this.total }, (_, i) =>
      this.getInitialPosition(i)
    );
    this.keyframes = this.#setKeyframes(keyframes.slice(0, this.total));
    this.cubes = Array.from({ length: this.total }, this.createCube.bind(this));
  }

  get total() {
    return Math.pow(this.rows, this.cols);
  }

  play() {
    this.cubes.forEach((cube) => cube.play());
  }

  pause() {
    this.cubes.forEach((cube) => cube.pause());
  }

  setFrame(index: number) {
    this.cubes.forEach((cube) => cube.setFrameIndex(index));
  }

  #setKeyframes(keyframes: Partial<CubePosition>[][]): CubePosition[][] {
    const { initialPosition } = this;
    const fill = (f: Partial<CubePosition>, i: number): CubePosition =>
      Object.assign({}, initialPosition[i], f);

    return keyframes.map((cubeFrames, cubeIndex) => {
      const scene = cubeFrames.map((f) => fill(f, cubeIndex));
      const [first] = scene;
      const last = scene[cubeFrames.length - 1];
      const scaled = fill({ ...last, s: 0 }, cubeIndex);

      return scene.concat(scaled).concat(fill({ ...first, s: 0 }, cubeIndex));
    });
  }

  getInitialPosition(index: number): CubePosition {
    const t = Math.floor(index / this.rows) % this.rows;
    const l = index % this.cols;
    const tz = Math.floor(index / (this.cols * this.rows)) * -1;
    return {
      t,
      l,
      tx: 0,
      ty: 0,
      tz,
      rx: 0,
      ry: 0,
      rz: 0,
      s: 1,
    };
  }

  createCube(_: undefined, index: number) {
    const cube = new Cube(this, this.keyframes[index]);
    const children = Array.from(cube.el.children) as HTMLDivElement[];
    const eachFace = (index: number, el: HTMLDivElement) =>
      (el.dataset.index = String(index));

    children.forEach(eachFace.bind(this, index));
    cube.el.setAttribute("data-index", String(index));
    cube.setPosition(this.getInitialPosition(index));
    this.el.insertAdjacentElement("beforeend", cube.el);

    return cube;
  }
}
