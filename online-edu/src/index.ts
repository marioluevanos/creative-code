import "./styles/index.scss";
import { data } from "./data";
import { createRoot, createState } from "./utils";
import { Subject } from "./subject";
import { Setter } from "./utils";
import { DragLord } from "./DragLord/DragLord";

export interface IState {
  currentIndex: number;
}

export type IStore = [IState, Setter<IState>];

const [art] = data;
export const store = createState<IState>({
  currentIndex: 0,
});

const subject = new Subject(art, store);

createApp();

function createApp() {
  const app = createRoot({ id: "root", class: "root" });
  app.appendChild(subject.el);
  document.body.insertAdjacentElement("beforeend", app);
}

const dragLord = new DragLord({
  loose: true,
});
window.dragLord = dragLord;
console.log(dragLord);

Array.from({ length: 12 }, (_, i) => {
  const div = document.createElement("div");
  div.classList.add("ass");
  div.innerHTML = `${i}`;
  div.dataset.index = `${i}`;
  div.addEventListener("click", (event) => {
    const target = event?.target as HTMLDivElement;
    const index = Number(target.dataset.index);

    console.log(index);
    dragLord.setValue(getX(index + 1), 0);
  });

  dragLord.addChild(div);
});

function getX(activeIndex = 0) {
  const rootW = dragLord.root.clientWidth;
  const activeEl = dragLord.handle.children[Number(activeIndex)] as HTMLElement;
  const activeWidth = activeEl.clientWidth;
  const handleW = dragLord.handle.clientWidth;
  return (activeEl.offsetLeft - (rootW - activeWidth)) / (handleW - rootW);
}

// subject.categories.setScrollLeft(subject.categories.scrollLeft);
