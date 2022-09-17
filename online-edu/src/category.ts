export interface ICategory {
  title: string;
  desc: string;
  image: string;
}

export class Category {
  public el: HTMLElement;

  constructor(public data: ICategory, public index: number) {
    this.el = this.createCategory();
  }

  createCategory() {
    const figure = document.createElement("figure");
    figure.classList.add("category");
    figure.setAttribute("data-index", String(this.index));

    const img = document.createElement("img");
    img.src = this.data.image;
    figure.appendChild(img);

    const caption = document.createElement("figcaption");
    figure.appendChild(caption);

    const title = document.createElement("span");
    title.innerHTML = this.data.title;
    title.classList.add("title");
    caption.appendChild(title);

    const desc = document.createElement("span");
    desc.innerHTML = this.data.desc;
    desc.classList.add("desc");
    caption.appendChild(desc);

    return figure;
  }
}
