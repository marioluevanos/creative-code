import { ICategory } from "./category";
import { Categories } from "./categories";
import { IStore } from "./index";

export interface ISubject {
  title: string;
  desc: string;
  teachers: string[];
  categories: ICategory[];
}

export class Subject {
  public el: HTMLElement;
  public categories: Categories;

  constructor(public data: ISubject, public store: IStore) {
    this.categories = new Categories(this.data.categories, store);
    this.el = this.createSubject();
  }

  createSubject() {
    const el = document.createElement("div");

    const text = document.createElement("div");
    const title = document.createElement("h2");
    const desc = document.createElement("p");
    const cta = document.createElement("a");
    const teachers = this.createTeachers();

    title.innerHTML = this.data.title;
    desc.innerHTML = this.data.desc;
    cta.innerHTML = "Discover More";
    cta.href = "#";

    text.appendChild(title);
    text.appendChild(desc);
    text.appendChild(cta);
    text.appendChild(teachers);

    text.classList.add("text");
    desc.classList.add("desc");
    cta.classList.add("cta");

    el.classList.add("subject");
    el.appendChild(this.categories.el.root);
    el.appendChild(text);

    return el;
  }

  createTeachers() {
    const avatars = document.createElement("figure");
    avatars.classList.add("avatars");

    const { teachers } = this.data;
    const { length } = teachers;
    teachers.forEach((url, i) => {
      const img = document.createElement("img");
      img.src = url;
      img.width = 78;
      img.height = 78;
      img.style.setProperty("--i", `${i}`);
      avatars.appendChild(img);
    });

    avatars.insertAdjacentHTML(
      "beforeend",
      `<span style="--i: ${length - 1}">${length}+ Teachers</span>`
    );

    return avatars;
  }
}
