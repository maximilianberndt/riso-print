import * as THREE from 'three'
import { TransformControls } from 'three/examples/jsm/controls/TransformControl'

const geometry = new THREE.SphereGeometry()
const material = new THREE.MeshPhysicalMaterial({ color: 0xffffff })

class Shape {
  scene
  controlEnabled = false

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

    this.control.addEventListener(
      'dragging-changed',
      function (event) {
        orbit.enabled = !event.value
      }
    )

    this.scene.add(this.mesh)
    this.scene.add(this.control)
  }

  enableControls() {
    this.controlEnabled = true
    this.control.attach(this.mesh)
  }

  disableControls() {
    this.controlEnabled = false
    this.control.detach()
  }

  destroy() {
    this.scene.remove(this.mesh)
    this.scene.remove(this.control)
    this.control.destroy()
  }
}

export default Shape
