import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import gui from '../gui.js'
import { camera, renderer, scene } from '../scene/index.js'
import { bluePass } from './bluePass.js'
import { redPass } from './redPass.js'

export const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))

composer.addPass(redPass)
composer.addPass(bluePass)

redPass.enabled = false
bluePass.enabled = false

const outputPass = new OutputPass()
composer.addPass(outputPass)

const postProcessingFolder = gui.addFolder({
  title: 'post processing',
})
postProcessingFolder.addBinding(redPass, 'enabled', {
  label: 'show red intensity',
})
postProcessingFolder.addBinding(bluePass, 'enabled', {
  label: 'show blue intensity',
})
