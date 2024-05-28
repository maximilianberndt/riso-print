import createPdf from './utils/create-pdf.js'
import { camera, canvas, renderer, scene } from './scene/index.js'
import createLights from './scene/lights.js';
import { createCubes } from './scene/cubes.js';
import gui from './gui.js';
import { OPTIONS } from './options.js';
import { controls } from './scene/orbitControls.js';

const folder = gui.addFolder({ title: 'General' });
folder.addButton({ title: "Create Pdf" }).on("click", () => createPdf(canvas, OPTIONS))

createCubes(scene)
createLights(scene)

const tick = () => {
	renderer.render(scene, camera)
	controls.update()
	requestAnimationFrame(tick)
}

tick()
