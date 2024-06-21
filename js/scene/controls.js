import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { camera } from './camera.js'
import { canvas } from './canvas.js';

export const controls = new OrbitControls(camera, canvas);
