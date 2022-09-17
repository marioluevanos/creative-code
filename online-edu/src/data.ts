import { getRandomInt } from "./utils";
import { ISubject } from "./subject";

const maxAvatars = 60;
const randomAvatar = () => Math.ceil(Math.random() * maxAvatars);
const getRandomAvatars = () => `/avatars/image-${randomAvatar()}.png`;
const getRandomDesc = () =>
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit integer nec odio.";

export const data: ISubject[] = [
  {
    title: "The Language of Art.",
    desc: getRandomDesc(),
    teachers: Array.from({ length: getRandomInt(5, 7) }, getRandomAvatars),
    categories: [
      {
        title: "Watercolor",
        desc: getRandomDesc(),
        image: "/topics/watercolor.jpg",
      },
      {
        title: "Oil Paiting",
        desc: getRandomDesc(),
        image: "/topics/oil-painting.jpg",
      },
      {
        title: "Ceramics",
        desc: getRandomDesc(),
        image: "/topics/ceramics.jpg",
      },
      {
        title: "Street Art",
        desc: getRandomDesc(),
        image: "/topics/street-art.jpg",
      },
      {
        title: "Surreal",
        desc: getRandomDesc(),
        image: "/topics/surreal.jpg",
      },
    ],
  },
];
