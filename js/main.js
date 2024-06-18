import gui from './gui.js'
import { composer } from './postProcessing/composer.js'
import Shape from './scene/Shape.js'
import { camera, canvas, renderer, scene } from './scene/index.js'
import createLights from './scene/lights.js'
import { controls } from './scene/orbitControls.js'
import { getObject } from './scene/raycaster.js'
import createPdf from './utils/createPdf.js'
import {
  loadFromLocalstorage,
  saveToLocalstorage,
} from './utils/localstorage.js'

createLights(scene)

const data = loadFromLocalstorage('data') || [
  { position: [0, 0, 0], scale: [1, 1, 1] },
]
const shapes = data.map(({ position, scale }) => {
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
folder.addButton({ title: 'Save' }).on('click', () => {
  const data = shapes.map((s) => ({
    scale: s.mesh.scale.toArray(),
    position: s.mesh.position.toArray(),
  }))

  saveToLocalstorage('data', data)
  saveToLocalstorage('camera', {
    position: camera.position.toArray(),
    rotation: camera.quaternion,
  })
})
folder.addButton({ title: 'Create Pdf' }).on('click', () => {
  shapes.forEach((s) => s.disableControls())
  createPdf(canvas, composer)
})

canvas.addEventListener('click', (e) => getObject(e, shapes))

const tick = () => {
  composer.render()
  controls.update()

  requestAnimationFrame(tick)
}

tick()
