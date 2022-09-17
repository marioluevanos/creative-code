export type Setter<T = unknown> = (callback: (arg: T) => T) => T;

export function createState<T = unknown>(state: T): [T, Setter<T>] {
  function setState(callback: (arg: T) => T) {
    return callback(state);
  }
  return [state, setState];
}

export function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end;
}

export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function createRoot(attributes: { [key: string]: string }) {
  const root = document.createElement("div");
  const setAttr = ([k, v]: [string, string]) => root.setAttribute(k, v);

  Object.entries(attributes).forEach(setAttr);

  return root;
}

// Returns a random float (with decimals) number between min and max
export function getRandomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Returns a random integer between min and max
export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
