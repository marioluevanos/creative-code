import Scene from "./scene";
import { createState } from "./utils";

interface SceneState {
  animation: boolean;
  debug: boolean;
  spin: boolean;
  rotx: number;
  roty: number;
  rotz: number;
  transx: number;
  transy: number;
  transz: number;
  frame: string;
  [key: string]: string | number | boolean;
}

type ITargetIds = "animation" | "debug" | "spin";

type IInputCheckPayload = {
  target: HTMLInputElement;
  id: ITargetIds;
};

const [state, setState] = createState<SceneState>({
  animation: false,
  debug: true,
  spin: false,
  rotx: -35,
  roty: 45,
  rotz: 0,
  transx: 0,
  transy: 0,
  transz: 0,
  frame: "0",
});

const SETTINGS = "rubiks-settings";
const [ANIMATION, DEBUG, SPIN] = Object.keys(state);
const getInput = (id: string) =>
  document.getElementById(id) as HTMLInputElement;

export default function controls(scene: Scene) {
  const inputs = Object.keys(state).map(getInput);
  const [animationInput, debugInput, spinInput] = inputs;

  restoreState();
  initializeTranslate();
  initializeInputs(state);
  setSceneTransform(state);
  initializeStateClasses(state);

  function initializeStateClasses(state: SceneState) {
    scene.el.classList.toggle(ANIMATION, state.animation);
    scene.el.classList.toggle(DEBUG, state.debug);
    scene.el.classList.toggle(SPIN, state.spin);
  }

  function onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const id = target.id as ITargetIds;

    if (target && target.parentElement) {
      udpateCheckedState({
        target,
        id,
      });
    }
  }

  function udpateCheckedState(options: IInputCheckPayload) {
    const { target, id } = options;
    const { checked, parentElement: label } = target;

    const checkedAnimation = checked && target.id === ANIMATION;
    if (checkedAnimation) {
      scene.play();
    } else {
      scene.pause();
    }

    scene.el.classList.toggle(id, checked);

    toggleCheckboxLabel(label as HTMLLabelElement);

    const updated = setState((state) => {
      state[id] = checked;
      return state;
    });

    sessionStorage.setItem(SETTINGS, JSON.stringify(updated));
  }

  function restoreState() {
    const settings = JSON.parse(String(sessionStorage.getItem(SETTINGS)));
    if (settings) {
      Object.entries(settings).forEach(
        ([key, value]: [keyof SceneState, any]) => {
          setState((state) => (state[key] = value));
        }
      );
    }
  }

  function toggleCheckboxLabel(label: HTMLLabelElement) {
    const text = JSON.parse(String(label?.dataset.text));
    const [a, b] = text;
    const input = label.firstElementChild as HTMLInputElement;
    if (label && input) label.dataset.label = input.checked ? a : b;
  }

  function initializeTranslate() {
    inputs.forEach((input) => {
      if (input) {
        const inputValue = state[input.id] as string;
        const label = input.previousElementSibling as HTMLLabelElement;

        input.addEventListener("input", onInput);
        input.value = inputValue;

        if (input.type === "range" && label) {
          updateRangeLabel(label, inputValue);
        }

        if (input.id === "frame") {
          scene.setFrame(+inputValue);
        }
      }
    });
  }

  function initializeInputs(state: SceneState) {
    const form = document.querySelector<HTMLFormElement>("[data-form]");
    if (form) form.style.display = "block";

    const checkboxes = [
      spinInput,
      debugInput,
      animationInput,
    ] as HTMLInputElement[];

    checkboxes.forEach((input) => {
      if (input) {
        const checked = Boolean(state[input.id]);
        input.checked = checked;
        input.addEventListener("change", onCheckboxChange);

        if (checked && input.id === ANIMATION) scene.play();

        toggleCheckboxLabel(input.parentElement as HTMLLabelElement);
      }
    });
  }

  function onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const state = updateState(input);

    if (input.type === "range") {
      const label = input.previousElementSibling as HTMLLabelElement;
      updateRangeLabel(label, input.value);
      setSceneTransform(state);
      scene.setFrame(Math.max(0, Number(input.value)));
    }

    sessionStorage.setItem(SETTINGS, JSON.stringify(state));

    function updateState(input: HTMLInputElement) {
      const { id, value } = input;
      function updateById(state: SceneState) {
        state[id] = value;
        return state;
      }
      return setState(updateById);
    }
  }

  function updateRangeLabel(label: HTMLLabelElement, value: string) {
    label.innerText = value;
  }

  function setSceneTransform({
    rotx,
    roty,
    rotz,
    transx,
    transy,
    transz,
  }: SceneState) {
    scene.el.style.transform = `
      rotateX(${+rotx}deg)
      rotateY(${+roty}deg)
      rotateZ(${+rotz}deg)
      translateX(${+transx}px)
      translateY(${+transy}px)
      translateZ(${+transz}px)
    `;
  }
}
