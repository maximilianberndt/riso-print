import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { camera, scene } from '../scene/index.js'
import { bluePass } from './bluePass.js'
import { redPass } from './redPass.js'

export const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))

composer.addPass(redPass)
composer.addPass(bluePass)

const outputPass = new OutputPass()
composer.addPass(outputPass)
