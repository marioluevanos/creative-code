import './styles/index.scss'

import {createRoot} from './utils';
import Scene from './scene';
import controls from './controls';
// controls(scene);

const target = document.querySelector('[data-cube]');
const app = createRoot({id: 'scene'}, target as HTMLElement);
const scene = new Scene(app);

scene.el.classList.add('spin')
scene.play();
