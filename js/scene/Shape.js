import * as THREE from 'three'
import { TransformControls } from 'three/examples/jsm/controls/TransformControl'
import gui from '../gui.js'

const geometry = new THREE.SphereGeometry(1, 48, 48)
const material = new THREE.MeshPhysicalMaterial({ color: 0xffffff })

const controlModes = ['translate', 'scale']

class Shape {
  scene
  controlEnabled = false
  modeBinding
  destroyButton

  constructor({
    position = new THREE.Vector3(),
    scale = new THREE.Vector3(1, 1, 1),
    scene,
    camera,
    renderer,
    orbit,
  }) {
    this.scene = scene
    this.mesh = new THREE.Mesh(geometry, material)

    this.mesh.position.copy(position)
    this.mesh.scale.copy(scale)

    this.control = new TransformControls(camera, renderer.domElement)

    this.control.addEventListener('dragging-changed', (event) => {
      orbit.enabled = !event.value
    })

    this.scene.add(this.mesh)
    this.scene.add(this.control)
  }

  enableControls() {
    if (!this.controlEnabled) {
      this.control.attach(this.mesh)

      this.destroyButton = gui
        .addButton({ title: 'delte', index: 1 })
        .on('click', () => {
          this.destroy()
        })

      this.modeBinding = gui
        .addTab({
          pages: controlModes.map((mode) => ({ title: mode })),
          index: 2,
        })
        .on('select', (e) => {
          const mode = controlModes[e.index]
          if (mode) this.control.setMode(mode)
        })
    }

    this.controlEnabled = true
  }

  disableControls() {
    this.controlEnabled = false
    this.modeBinding.dispose()
    this.destroyButton.dispose()
    this.control.detach()
  }

  destroy() {
    this.disableControls()
    this.scene.remove(this.mesh)
    this.scene.remove(this.control)
  }
}

export default Shape
