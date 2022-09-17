export const Cursor = {
  /**
   * Abstraction for making the combined mouse or touch position available at
   * any time.
   *
   * It picks up the "move" events as an independent component and simply makes
   * the latest x and y mouse/touch position of the user available at any time,
   * which is requested with Cursor.x and Cursor.y respectively.
   *
   * It can receive both mouse and touch events consecutively, extracting the
   * relevant meta data from each type of event.
   *
   * Cursor.refresh(e) is called to update the global x and y values, with a
   * genuine PointerEvent or a TouchEvent from an event listener, e.g.
   * mousedown/up or touchstart/end
   */
  x: 0,
  y: 0,
  xDiff: 0,
  yDiff: 0,
  refresh(e: MouseEvent | TouchEvent) {
    if (!e) {
      e = window.event;
    }
    if (e.type == "mousemove") {
      this.set(e);
    } else if (e.touches) {
      this.set(e.touches[0]);
    }
  },
  set(e: MouseEvent | TouchEvent) {
    var lastX = this.x,
      lastY = this.y;
    if (e.clientX || e.clientY) {
      this.x = e.clientX;
      this.y = e.clientY;
    } else if (e.pageX || e.pageY) {
      this.x =
        e.pageX -
        document.body.scrollLeft -
        document.documentElement.scrollLeft;
      this.y =
        e.pageY - document.body.scrollTop - document.documentElement.scrollTop;
    }
    this.xDiff = Math.abs(this.x - lastX);
    this.yDiff = Math.abs(this.y - lastY);
  },
};

export const Position = {
  /**
   * Helper for extracting position of a DOM element, relative to the viewport
   *
   * The get(obj) method accepts a DOM element as the only parameter, and
   * returns the position under a (x, y) tuple, as an array with two elements.
   */
  get(obj: HTMLDivElement): [number, number] {
    // DragLord relies on getBoundingClientRect to calculate element offsets,
    // but we want to be sure we don't throw any unhandled exceptions and break
    // other code from the page if running from in very old browser that doesn't
    // support this method
    const rect = { left: 0, top: 0 };

    if (obj.getBoundingClientRect !== undefined) {
      const { top, left } = obj.getBoundingClientRect();
      return [left, top];
    }
    return [rect.left, rect.top];
  },
};
