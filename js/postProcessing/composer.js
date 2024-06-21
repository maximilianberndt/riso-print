import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js'
import gui from '../gui/gui.js'
import { camera, canvas, renderer, scene } from '../scene/index.js'
import { bluePass } from './bluePass.js'
import { redPass } from './redPass.js'

export const composer = new EffectComposer(renderer)

export const smaaPass = new SMAAPass(
	canvas.offsetWidth * renderer.getPixelRatio(),
	canvas.offsetHeight * renderer.getPixelRatio()
)
const outputPass = new OutputPass()

composer.addPass(new RenderPass(scene, camera))

composer.addPass(redPass)
composer.addPass(bluePass)
composer.addPass(smaaPass)
composer.addPass(outputPass)

redPass.enabled = false
bluePass.enabled = false

const postProcessingFolder = gui.addFolder({
	title: 'Preview',
	expanded: false,
})
postProcessingFolder.addBinding(redPass, 'enabled', {
	label: 'show red intensity',
})
postProcessingFolder.addBinding(redPass.uniforms.uAlpha, 'value', {
	label: 'red opacity',
	min: 0,
	max: 1,
	step: 0.0001,
})
postProcessingFolder.addBinding(bluePass, 'enabled', {
	label: 'show blue intensity',
})
postProcessingFolder.addBinding(bluePass.uniforms.uAlpha, 'value', {
	label: 'blue opacity',
	min: 0,
	max: 1,
	step: 0.0001,
})
