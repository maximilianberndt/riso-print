import gui from "../gui/gui.js"
import Shape from './Shape.js'
import { controls } from "../scene/controls.js"
import { getMesh } from "../scene/raycaster.js"
import { scene } from '../scene/scene.js'
import { canvas } from "../scene/canvas.js"
import { camera } from "../scene/camera.js"
import { renderer } from "../scene/renderer.js"
import { loadFromLocalstorage } from '../utils/localstorage.js'

const data = loadFromLocalstorage('data') || [
	{ position: [0, 0, 0], scale: [1, 1, 1] },
]

const selectShape = (e) => {
	const meshes = shapes.map((s) => s.mesh)
	const intersectedMesh = getMesh(e, meshes)

	shapes.forEach((s) => {
		if (intersectedMesh && s.mesh === intersectedMesh.object) {
			s.enableControls()
		} else {
			s.disableControls()
		}
	})
}

canvas.addEventListener('click', selectShape)

gui.addButton({ title: 'Add Sphere', index: 0 }).on('click', () => {
	shapes.forEach((s) => s.disableControls())

	const shape = new Shape({
		scene,
		camera,
		renderer,
		orbit: controls,
	})

	shapes.push(shape)
	shape.enableControls()
})


export const shapes = data.map(({ position, scale }) => {
	const shape = new Shape({
		scene,
		camera,
		renderer,
		orbit: controls,
	})
	shape.mesh.position.fromArray(position)
	shape.mesh.scale.fromArray(scale)

	return shape
})