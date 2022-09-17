export interface DragLordOptions {
  /**
   * Init DragLord in a disabled state. The handle will have a disabledclass.
   */
  disabled: boolean;
  /**
   * Enable horizontal dragging.
   */
  horizontal: boolean;
  /**
   * Enable vertical dragging.
   */
  vertical: boolean;
  /**
   * Initial horizontal (left) position. Value between 0 and 1
   */
  x: number;
  /**
   * Initial vertical (top) position. Value between 0 and 1
   */
  y: number;
  /**
   * Definie a virtual grid made out of a number of equally-spaced steps.
   */
  steps: number;
  /**
   * Snap to position is "steps" is set
   */
  snap: boolean;
  /**
   * Between 0 and 1, with 1 being the fastest.
   */
  speed: number;
  /**
   * Slide after release.
   */
  slide: boolean;
  /**
   * Loosen-up wrapper boudaries to allow handle to be slightly dragged outside.
   */
  loose: boolean;
  /**
   * Top padding between wrapper and handle.
   */
  top?: number;
  /**
   * Bottom padding between wrapper and handle.
   */
  bottom?: number;
  /**
   * Left padding between wrapper and handle.
   */
  left?: number;
  /**
   * Right padding between wrapper and handle.
   */
  right?: number;
  /**
   * Called when handle is released.
   */
  callback?: (x: number, y: number) => void;
  /**
   * Called after a drag motion.
   */
  dragStopCallback?: (x: number, y: number, delta?: [number, number]) => void;
  /**
   * Called at the beginning of a drag motion.
   */
  dragStartCallback?: (x: number, y: number) => void;
  /**
   * Called every animation loop.
   */
  animationCallback?: (x: number, y: number) => void;
  /**
   * Custom class of handle element.
   */
  handleClass?: string;
  /**
   * Active class of handle element.
   */
  activeClass?: string;
  /**
   * Use css3 transform in modern browsers instead of absolute positioning.
   */
  css3?: boolean;
  /**
   * Start tapping indicator.
   */
  tapping: boolean;
  [k: string]: unknown;
}

export interface Bounds {
  top: number;
  bottom: number;
  left: number;
  right: number;
  availWidth?: number;
  availHeight?: number;
}

export type XY = [number, number];
