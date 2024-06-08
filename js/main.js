import gui from './gui.js'
import { OPTIONS } from './options.js'
import Shape from './scene/Shape.js'
import { camera, canvas, renderer, scene } from './scene/index.js'
import createLights from './scene/lights.js'
import { controls } from './scene/orbitControls.js'
import { getObject } from './scene/raycaster.js'
import createPdf from './utils/create-pdf.js'

const shapes = [...Array(1)].map(
  () => new Shape({ scene, camera, renderer, orbit: controls })
)

const folder = gui.addFolder({ title: 'General' })
folder
  .addButton({ title: 'Create Pdf' })
  .on('click', () => createPdf(canvas, OPTIONS))
folder.addButton({ title: 'Add Sphere' }).on('click', () => {
  const shape = new Shape({
    scene,
    camera,
    renderer,
    orbit: controls,
  })
  shapes.push(shape)
  shape.enableControls()
})

createLights(scene)

canvas.addEventListener('click', () => getObject(shapes))

const tick = () => {
  renderer.render(scene, camera)
  controls.update()

  shapes.forEach((shape) => shape.update())

  requestAnimationFrame(tick)
}

tick()
