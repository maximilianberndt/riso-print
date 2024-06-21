import gui from './gui.js'
import { camera, canvas, scene, renderer } from './scene/index.js'
import createLights from './scene/lights.js'
import { controls } from './scene/orbitControls.js'
import createPdf from './utils/createPdf.js'
import { composer, smaaPass } from './postProcessing/composer.js'
import { fitCanvasToWrapper } from './utils/fitCanvasToWrapper.js'
import { shapes } from './shapes/shapes.js'
import { save } from './utils/save.js'

createLights(scene)

const folder = gui.addFolder({ title: 'General' })
folder.addButton({ title: 'Save' }).on('click', save)
folder.addButton({ title: 'Create Pdf' }).on('click', () => {
	shapes.forEach((s) => s.disableControls())
	createPdf(canvas, composer)
})

const resize = () => {
	const { width, height } = fitCanvasToWrapper()

	camera.aspect = width / height
	camera.updateProjectionMatrix()

	renderer.setPixelRatio(3)
	renderer.setSize(width, height)
	smaaPass.setSize(width, height)
	composer.setSize(width * 4, height * 4)
}

const tick = () => {
	composer.render()
	controls.update()

	requestAnimationFrame(tick)
}

setTimeout(() => {
	resize()
	tick()
}, 0)

window.addEventListener("resize", resize, false)