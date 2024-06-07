import * as THREE from 'three'
import gui from '../gui.js'

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
directionalLight.position.set(3.2, 2.8, 0)
directionalLight.rotation.set(0, 0, -0.5)

const pointLight = new THREE.PointLight(0xff0000, 1, 100)
pointLight.position.set(3.2, 2.8, 0)

const helper = new THREE.PointLightHelper(pointLight, 1, 0xff0000)
helper.visible = false

const ambientLight = new THREE.AmbientLight(0x404040) // soft white light

const folder = gui.addFolder({ title: 'Directional Light' })
folder.addBinding(pointLight, 'position')
folder.addBinding(pointLight, 'rotation')
folder.addBinding(pointLight, 'color', {
  color: { type: 'float' },
  picker: 'inline',
  expanded: true,
})
folder.addBinding(helper, 'visible', { label: 'Helper' })

const createLights = (scene) => {
  scene.add(helper)
  scene.add(pointLight)
  //   scene.add(directionalLight)

  scene.add(ambientLight)
}

export default createLights
