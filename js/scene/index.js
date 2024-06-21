import { composer, smaaPass } from '../postProcessing/composer.js'
import { fitCanvasToWrapper } from '../utils/fitCanvasToWrapper.js'
import { renderer } from './renderer.js';
import { camera } from './camera.js'
import { controls } from './controls.js';

const resize = () => {
	const { width, height } = fitCanvasToWrapper()

	camera.aspect = width / height
	camera.updateProjectionMatrix()

	renderer.setPixelRatio(3)
	renderer.setSize(width, height)
	smaaPass.setSize(width, height)
	composer.setSize(width * 2, height * 2)
}

const tick = () => {
	composer.render()
	controls.update()

	requestAnimationFrame(tick)
}

window.addEventListener("resize", resize, false)


export const initScene = () => {
	setTimeout(() => {
		resize()
		tick()
	}, 0)
}