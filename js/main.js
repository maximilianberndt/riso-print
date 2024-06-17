import gui from './gui.js'
import { composer } from './postProcessing/composer.js'
import Shape from './scene/Shape.js'
import { camera, canvas, renderer, scene } from './scene/index.js'
import createLights from './scene/lights.js'
import { controls } from './scene/orbitControls.js'
import { getObject } from './scene/raycaster.js'
import createPdf from './utils/createPdf.js'

createLights(scene)

const shapes = [
  new Shape({ scene, camera, renderer, orbit: controls }),
]

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

const folder = gui.addFolder({ title: 'General' })
folder.addButton({ title: 'Create Pdf' }).on('click', () => {
  createPdf(canvas, composer)
})

canvas.addEventListener('click', (e) => getObject(e, shapes))

const tick = () => {
  composer.render()
  controls.update()

  requestAnimationFrame(tick)
}

tick()
