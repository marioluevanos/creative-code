import "./DragLord.scss";
import { Cursor, Position } from "./DragLord.utils";
import type { DragLordOptions, Bounds, XY } from "./DragLord.types";

export class DragLord {
  private defaults: DragLordOptions = {
    disabled: false,
    horizontal: true,
    vertical: false,
    x: 0,
    y: 0,
    steps: 0,
    snap: false,
    speed: 0.1,
    slide: true,
    loose: false,
    handleClass: "draglord-handle",
    css3: true,
    activeClass: "active",
    tapping: true,
  };
  public options: Partial<DragLordOptions>;
  public root: HTMLDivElement;
  public handle: HTMLDivElement;
  public value: {
    prev: XY;
    current: XY;
    target: XY;
  };
  public offset: {
    wrapper: XY;
    mouse: XY;
    prev: XY;
    current: XY;
    target: XY;
  };
  public dragStartPosition: {
    x: number;
    y: number;
  };
  public change: XY;
  public stepRatios: number[];
  public activity: boolean;
  public dragging: boolean;
  public tapping: boolean;
  public bounds: Bounds;
  public valuePrecision: XY;
  public disabled: boolean;
  private intervalId: number;
  private timeOffset: number;
  private timeStamp: number;

  constructor(options?: Partial<DragLordOptions>) {
    this.options = this.applyDefaults(options || {});
    this.root = this.createWrapperElement();
    this.handle = this.createHandleElement(this.root);

    if (this.options.css3) this.triggerWebkitHardwareAcceleration();
    this.appendToDom();

    this.value = {
      prev: [-1, -1],
      current: [this.options.x || 0, this.options.y || 0],
      target: [this.options.x || 0, this.options.y || 0],
    };

    // console.log({ value: this.value });
    this.offset = {
      wrapper: [0, 0],
      mouse: [0, 0],
      prev: [-999999, -999999],
      current: [0, 0],
      target: [0, 0],
    };
    this.dragStartPosition = { x: 0, y: 0 };
    this.change = [0, 0];
    this.stepRatios = this.calculateStepRatios();
    this.activity = false;
    this.dragging = false;
    this.tapping = false;
    this.bounds = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };
    this.valuePrecision = [0, 0];
    this.disabled = false;
    this.timeOffset = 0;
    this.timeStamp = 0;

    this.reflow();

    if (this.options.disabled) {
      this.disable();
    }
    this.bindEventListeners();
    this.drag(false, true);
    this.intervalId = requestAnimationFrame(this.animate.bind(this));
  }

  appendToDom() {
    document.body.appendChild(this.root);
  }

  addChild(child: HTMLDivElement) {
    console.log("addChild");
    this.handle.appendChild(child);
    this.reflow();
  }

  createWrapperElement() {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("draglord", "");
    wrapper.classList.add("draglord");
    return wrapper;
  }

  createHandleElement(wrapper: HTMLElement): HTMLDivElement {
    const handle = document.createElement("div");
    handle.setAttribute("draglord-handle", "");
    handle.classList.add("draglord-handle");
    wrapper.appendChild(handle);

    return handle;
  }

  bindEventListeners() {
    // Start dragging
    this.handle.addEventListener(
      "mousedown",
      this.onHandleMouseDown.bind(this)
    );
    this.handle.addEventListener(
      "touchstart",
      this.onHandleTouchStart.bind(this)
    );
    // While dragging
    document.addEventListener("mousemove", this.onDocumentMouseMove.bind(this));
    this.root.addEventListener("touchmove", this.onWrapperTouchMove.bind(this));
    // Start tapping
    this.root.addEventListener("mousedown", this.onWrapperMouseDown.bind(this));
    this.root.addEventListener(
      "touchstart",
      this.onWrapperTouchStart.bind(this)
    );
    // Stop dragging/tapping
    document.addEventListener("mouseup", this.onDocumentMouseUp.bind(this));
    document.addEventListener("touchend", this.onDocumentTouchEnd.bind(this));

    this.handle.addEventListener("click", this.onHandleClick.bind(this));
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }
  applyDefaults(options: Partial<DragLordOptions> = {}) {
    for (const k in this.defaults) {
      if (!options.hasOwnProperty(k)) {
        options[k] = this.defaults[k];
      }
    }
    return options;
  }
  triggerWebkitHardwareAcceleration() {
    this.handle.style.perspective = "1000px";
    this.handle.style.backfaceVisibility = "hidden";
  }
  calculateStepRatios() {
    const stepRatios = [];

    if (!this.options.steps) return [1, 1];

    if (this.options.steps >= 1) {
      for (let i = 0; i <= this.options.steps - 1; i++) {
        if (this.options.steps > 1) {
          stepRatios[i] = i / (this.options.steps - 1);
        } else {
          // A single step will always have a 0 value
          stepRatios[i] = 0;
        }
      }
    }
    return stepRatios;
  }
  reflow() {
    this.setWrapperOffset();
    this.bounds = this.calculateBounds();
    this.valuePrecision = this.calculateValuePrecision();
    this.updateOffsetFromValue();
  }
  setWrapperOffset() {
    this.offset.wrapper = Position.get(this.root);
  }
  calculateBounds() {
    // Apply top/bottom/left and right padding options to wrapper extremities
    // when calculating its bounds
    const bounds: Bounds = {
      top: this.options.top || 0,
      bottom: -(this.options.bottom || 0) + this.root.offsetHeight,
      left: this.options.left || 0,
      right: -(this.options.right || 0) + this.root.offsetWidth,
    };
    // The available width and height represents the horizontal and vertical
    // space the handle has for moving. It is determined by the width and
    // height of the wrapper, minus the width and height of the handle
    bounds.availWidth = bounds.right - bounds.left - this.handle.offsetWidth;
    bounds.availHeight = bounds.bottom - bounds.top - this.handle.offsetHeight;
    return bounds;
  }
  calculateValuePrecision(): XY {
    // The sliding transition works by dividing itself until it reaches a min
    // value step; because DragLord works with [0-1] values, we need this
    // "min value step" to represent a pixel when applied to the real handle
    // position within the DOM. The xPrecision/yPrecision options can be
    // specified to increase the granularity when we're controlling larger
    // objects from one of the callbacks
    const xPrecision =
      this.options.x || Math.abs(Number(this.bounds.availWidth));
    const yPrecision =
      this.options.y || Math.abs(Number(this.bounds.availHeight));

    return [xPrecision ? 1 / xPrecision : 0, yPrecision ? 1 / yPrecision : 0];
  }
  disable() {
    this.disabled = true;
    this.handle.classList.add("disabled");
  }
  onHandleMouseDown(event: MouseEvent) {
    Cursor.refresh(event);
    preventEventDefaults(event);
    stopEventPropagation(event);
    this.activity = false;
    this.startDrag();
    console.log("mousedown");
  }
  startDrag() {
    if (this.disabled) return;

    this.dragging = true;
    this.setWrapperOffset();

    this.dragStartPosition = { x: Cursor.x, y: Cursor.y };
    this.offset.mouse = [
      Cursor.x - Position.get(this.handle)[0],
      Cursor.y - Position.get(this.handle)[1],
    ];

    const { activeClass } = this.options;
    this.root.classList.add(String(activeClass));
    this.callDragStartCallback();
  }
  onHandleTouchStart(event: TouchEvent) {
    Cursor.refresh(event);
    // Unlike in the `mousedown` event handler, we don't prevent defaults here,
    // because this would disable the dragging altogether. Instead, we prevent
    // it in the `touchmove` handler. Read more about touch events
    // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Touch_events#Handling_clicks
    stopEventPropagation(event);
    this.activity = false;
    this.startDrag();
  }
  onDocumentMouseMove(e: MouseEvent) {
    if (
      e.clientX - this.dragStartPosition.x === 0 &&
      e.clientY - this.dragStartPosition.y === 0
    ) {
      // This is required on some Windows8 machines that get mouse move events without actual mouse movement
      return;
    }

    Cursor.refresh(e);
    if (this.dragging) {
      this.activity = true;
      preventEventDefaults(e);
    }
  }
  onWrapperTouchMove(e: TouchEvent) {
    Cursor.refresh(e);
    // Dragging on a disabled axis (horizontal or vertical) shouldn't prevent
    // defaults on touch devices. !this.activity denotes this is the first move
    // inside a drag action; you can drag in any direction after this point if
    // the dragging wasn't stopped
    if (!this.activity && this.draggingOnDisabledAxis()) {
      if (this.dragging) {
        this.stopDrag();
      }
      return;
    }
    // Read comment in `onHandleTouchStart` above, to understand why we're
    // preventing defaults here and not there
    preventEventDefaults(e);
    this.activity = true;
  }
  onWrapperMouseDown(e: MouseEvent) {
    Cursor.refresh(e);
    preventEventDefaults(e);
    this.startTap();
  }
  onWrapperTouchStart(e: TouchEvent) {
    Cursor.refresh(e);
    preventEventDefaults(e);
    this.startTap();
  }
  onDocumentMouseUp(_e: MouseEvent) {
    this.stopDrag();
    this.stopTap();
  }
  onDocumentTouchEnd(_e: TouchEvent) {
    this.stopDrag();
    this.stopTap();
  }
  onHandleClick(e: MouseEvent) {
    // We keep track if any dragging activity has been made between the
    // mouse/touch down and up events; based on this we allow or cancel a click
    // event from inside the handle. i.e. Click events shouldn't be triggered
    // when dragging, but should be allowed when clicking still
    if (this.activity) {
      preventEventDefaults(e);
      stopEventPropagation(e);
    }
  }
  onWindowResize(_e: Event) {
    this.reflow();
  }
  enable() {
    this.disabled = false;
    this.handle.className = this.handle.className.replace(/\s?disabled/g, "");
  }
  getStep() {
    return [
      this.getStepNumber(this.value.target[0]),
      this.getStepNumber(this.value.target[1]),
    ];
  }
  getStepWidth() {
    return Math.abs(
      Number(this.bounds.availWidth) / Number(this.options.steps)
    );
  }
  getValue() {
    return this.value.target;
  }
  setStep(x: number, y: number, snap: boolean) {
    const steps = Number(this.options.steps);
    this.setValue(
      steps && x > 1 ? (x - 1) / (steps - 1) : 0,
      steps && y > 1 ? (y - 1) / (steps - 1) : 0,
      snap
    );
  }
  setValue(x: number, y: number, snap?: boolean) {
    this.setTargetValue([x, y || 0]);
    if (snap) {
      this.groupCopy(this.value.current, this.value.target);
      // Since the current value will be equal to the target one instantly, the
      // drag function won't get to run so we need to update the positions
      // and call the callbacks manually
      this.updateOffsetFromValue();
      this.callAnimationCallback();
    }
  }
  startTap() {
    if (this.disabled || !this.options.tapping) {
      return;
    }

    this.tapping = true;
    this.setWrapperOffset();

    //Check if the slider is a stepped snap slider:
    if (this.options.snap && this.options.steps) {
      //If we have a snap slider, it makes more sense that when a user click on the wrapper
      //the handle will snap to the closest step, instead of moving with a ratio until it
      //reaches the step.
      //Check for the closest step and set it as the current value
      var cursorXRatio =
        (Cursor.x - this.offset.wrapper[0]) / Number(this.bounds.availWidth);
      var cursorYRatio =
        (Cursor.y - this.offset.wrapper[1]) / Number(this.bounds.availHeight);
      this.setValue(
        this.getClosestStep(cursorXRatio),
        this.getClosestStep(cursorYRatio),
        true
      );
    } else {
      this.setTargetValueByOffset([
        Cursor.x - this.offset.wrapper[0] - this.handle.offsetWidth / 2,
        Cursor.y - this.offset.wrapper[1] - this.handle.offsetHeight / 2,
      ]);
    }
  }
  stopTap() {
    if (this.disabled || !this.tapping) {
      return;
    }
    this.tapping = false;

    this.setTargetValue(this.value.current);
  }
  stopDrag() {
    if (this.disabled || !this.dragging) {
      return;
    }
    this.dragging = false;
    const deltaX =
      this.bounds.availWidth === 0
        ? 0
        : (Cursor.x - this.dragStartPosition.x) /
          Number(this.bounds.availWidth);
    const deltaY =
      this.bounds.availHeight === 0
        ? 0
        : (Cursor.y - this.dragStartPosition.y) /
          Number(this.bounds.availHeight);
    const delta: XY = [deltaX, deltaY];

    var target = this.groupClone(this.value.current);
    if (this.options.slide) {
      var ratioChange = this.change;
      target[0] += ratioChange[0] * 4;
      target[1] += ratioChange[1] * 4;
    }
    this.setTargetValue(target);
    this.root.className = this.root.className.replace(
      " " + this.options.activeClass,
      ""
    );
    this.callDragStopCallback(delta);
  }
  callAnimationCallback() {
    var value = this.value.current;

    if (this.options.snap && Number(this.options.steps) > 1) {
      value = this.getClosestSteps(value);
    }
    if (!this.groupCompare(value, this.value.prev)) {
      if (typeof this.options.animationCallback == "function") {
        this.options.animationCallback.call(this, value[0], value[1]);
      }
      this.groupCopy(this.value.prev, value);
    }
  }
  callTargetCallback() {
    if (typeof this.options.callback == "function") {
      this.options.callback.call(
        this,
        this.value.target[0],
        this.value.target[1]
      );
    }
  }
  callDragStartCallback() {
    if (typeof this.options.dragStartCallback == "function") {
      this.options.dragStartCallback.call(
        this,
        this.value.target[0],
        this.value.target[1]
      );
    }
  }
  callDragStopCallback(delta: XY) {
    if (typeof this.options.dragStopCallback == "function") {
      this.options.dragStopCallback.call(
        this,
        this.value.target[0],
        this.value.target[1],
        delta
      );
    }
  }
  animate(time: number) {
    if (time) {
      // using requestAnimationFrame
      this.timeOffset = this.timeStamp ? time - this.timeStamp : 0;
      this.timeStamp = time;
    } else {
      // using setTimeout(callback, 25) polyfill
      this.timeOffset = 25;
    }
    this.drag();
    this.intervalId = requestAnimationFrame(this.animate.bind(this));
  }
  drag(direct?: boolean, first?: boolean) {
    if (direct && !this.dragging) {
      return;
    }
    if (this.dragging) {
      const prevTarget = this.groupClone(this.value.target);
      const offset: XY = [
        Cursor.x - this.offset.wrapper[0] - this.offset.mouse[0],
        Cursor.y - this.offset.wrapper[1] - this.offset.mouse[1],
      ];
      this.setTargetValueByOffset(offset, this.options.loose);

      this.change = [
        this.value.target[0] - prevTarget[0],
        this.value.target[1] - prevTarget[1],
      ];
    }
    if (this.dragging || first) {
      this.groupCopy(this.value.current, this.value.target);
    }
    if (this.dragging || this.glide() || first) {
      this.updateOffsetFromValue();
      this.callAnimationCallback();
    }
  }
  glide() {
    var diff = [
      this.value.target[0] - this.value.current[0],
      this.value.target[1] - this.value.current[1],
    ];
    if (!diff[0] && !diff[1]) {
      return false;
    }
    if (
      Math.abs(diff[0]) > this.valuePrecision[0] ||
      Math.abs(diff[1]) > this.valuePrecision[1]
    ) {
      this.value.current[0] +=
        diff[0] *
        Math.min((Number(this.options.speed) * this.timeOffset) / 25, 1);
      this.value.current[1] +=
        diff[1] *
        Math.min((Number(this.options.speed) * this.timeOffset) / 25, 1);
    } else {
      this.groupCopy(this.value.current, this.value.target);
    }
    return true;
  }
  updateOffsetFromValue() {
    if (!this.options.snap) {
      this.offset.current = this.getOffsetsByRatios(this.value.current);
    } else {
      this.offset.current = this.getOffsetsByRatios(
        this.getClosestSteps(this.value.current)
      );
    }
    // console.log(this.offset.current);
    if (!this.groupCompare(this.offset.current, this.offset.prev)) {
      this.renderHandlePosition();
      this.groupCopy(this.offset.prev, this.offset.current);
    }
  }
  renderHandlePosition() {
    var transform = "";
    if (this.options.css3) {
      if (this.options.horizontal) {
        transform += "translateX(" + this.offset.current[0] + "px)";
      }
      if (this.options.vertical) {
        transform += " translateY(" + this.offset.current[1] + "px)";
      }
      this.handle.style.transform = transform;
      return;
    }

    if (this.options.horizontal) {
      this.handle.style.left = this.offset.current[0] + "px";
    }
    if (this.options.vertical) {
      this.handle.style.top = this.offset.current[1] + "px";
    }
  }
  setTargetValue(value: XY, loose?: boolean) {
    const target: XY = loose
      ? this.getLooseValue(value)
      : this.getProperValue(value);

    this.groupCopy(this.value.target, target);
    this.offset.target = this.getOffsetsByRatios(target);

    this.callTargetCallback();
  }
  setTargetValueByOffset(offset: XY, loose?: boolean) {
    var value = this.getRatiosByOffsets(offset);
    var target = loose ? this.getLooseValue(value) : this.getProperValue(value);

    this.groupCopy(this.value.target, target);
    this.offset.target = this.getOffsetsByRatios(target);
  }
  getLooseValue(value: XY): XY {
    var proper = this.getProperValue(value);
    return [
      proper[0] + (value[0] - proper[0]) / 4,
      proper[1] + (value[1] - proper[1]) / 4,
    ];
  }
  getProperValue(value: XY) {
    var proper = this.groupClone(value);

    proper[0] = Math.max(proper[0], 0);
    proper[1] = Math.max(proper[1], 0);
    proper[0] = Math.min(proper[0], 1);
    proper[1] = Math.min(proper[1], 1);

    if ((!this.dragging && !this.tapping) || this.options.snap) {
      if (Number(this.options.steps) > 1) {
        proper = this.getClosestSteps(proper);
      }
    }
    return proper;
  }
  getRatiosByOffsets(group: XY): XY {
    return [
      this.getRatioByOffset(
        group[0],
        Number(this.bounds.availWidth),
        this.bounds.left
      ),
      this.getRatioByOffset(
        group[1],
        Number(this.bounds.availHeight),
        this.bounds.top
      ),
    ];
  }
  getRatioByOffset(offset: number, range: number, padding: number) {
    return range ? (offset - padding) / range : 0;
  }
  getOffsetsByRatios(group: XY): XY {
    return [
      this.getOffsetByRatio(
        group[0],
        Number(this.bounds.availWidth),
        this.bounds.left
      ),
      this.getOffsetByRatio(
        group[1],
        Number(this.bounds.availHeight),
        this.bounds.top
      ),
    ];
  }
  getOffsetByRatio(ratio: number, range: number, padding: number) {
    return Math.round(ratio * range) + padding;
  }
  getStepNumber(value: number) {
    // Translate a [0-1] value into a number from 1 to N steps (set using the
    // "steps" option)
    return this.getClosestStep(value) * (Number(this.options.steps) - 1) + 1;
  }
  getClosestSteps(group: XY): XY {
    return [this.getClosestStep(group[0]), this.getClosestStep(group[1])];
  }
  getClosestStep(value: number) {
    var k = 0;
    var min = 1;
    for (var i = 0; i <= Number(this.options.steps) - 1; i++) {
      if (Math.abs(this.stepRatios[i] - value) < min) {
        min = Math.abs(this.stepRatios[i] - value);
        k = i;
      }
    }
    return this.stepRatios[k];
  }
  groupCompare(a: XY, b: XY) {
    return a[0] == b[0] && a[1] == b[1];
  }
  groupCopy(a: XY, b: XY) {
    a[0] = b[0];
    a[1] = b[1];
  }
  groupClone(a: XY): XY {
    return [a[0], a[1]];
  }
  draggingOnDisabledAxis() {
    return (
      (!this.options.horizontal && Cursor.xDiff > Cursor.yDiff) ||
      (!this.options.vertical && Cursor.yDiff > Cursor.xDiff)
    );
  }
}

function preventEventDefaults(e: MouseEvent | TouchEvent) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  return false;
}

function stopEventPropagation(e: MouseEvent | TouchEvent) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  return false;
}
