import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { camera, canvas } from './index.js';

export const controls = new OrbitControls(camera, canvas);
