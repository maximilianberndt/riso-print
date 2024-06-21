import * as THREE from 'three'
import gui from '../gui/gui.js'
import { OPTIONS } from '../options.js'

const ambientLight = new THREE.AmbientLight(OPTIONS.color1, 3.2)

const pointLight = new THREE.PointLight(0xff0000, 8, 10)
pointLight.position.set(1.2, 1.8, 1.5)

const helper = new THREE.PointLightHelper(pointLight, 1, 0xff0000)
helper.visible = false

const pointLightFolder = gui.addFolder({
	title: 'Color 1 (Point Light)',
	expanded: false,
})
pointLightFolder.addBinding(pointLight, 'position')
pointLightFolder.addBinding(pointLight, 'rotation')
pointLightFolder.addBinding(pointLight, 'intensity', {
	min: 0,
	max: 15,
})
pointLightFolder.addBinding(helper, 'visible', {
	label: 'Show position',
})

const ambientLightFolder = gui.addFolder({
	title: 'Color 2 (Ambient Light)',
	expanded: false,
})
ambientLightFolder.addBinding(ambientLight, 'intensity', {
	min: 0,
	max: 5,
})

const createLights = (scene) => {
	scene.add(helper)
	scene.add(pointLight)

	scene.add(ambientLight)
}

export default createLights
