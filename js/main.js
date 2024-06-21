import gui from './gui/gui.js'
import { initScene } from './scene/index.js'
import { scene } from './scene/scene.js'
import { canvas } from './scene/canvas.js'
import createLights from './scene/lights.js'
import createPdf from './utils/createPdf.js'
import { composer } from './postProcessing/composer.js'
import { shapes } from './shapes/shapes.js'
import { save } from './utils/save.js'

const folder = gui.addFolder({ title: 'General' })
folder.addButton({ title: 'Save' }).on('click', save)
folder.addButton({ title: 'Create Pdf' }).on('click', () => {
	shapes.forEach((s) => s.disableControls())
	createPdf(canvas, composer)
})

createLights(scene)
initScene()