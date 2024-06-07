import * as THREE from 'three'
import { TransformControls } from 'three/examples/jsm/controls/TransformControl'

const geometry = new THREE.SphereGeometry()
const material = new THREE.MeshPhysicalMaterial({ color: 0xffffff })

class Shape {
  scene

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
    this.enableControls()
  }

  enableControls() {
    this.control.attach(this.mesh)
    this.scene.add(this.control)
  }

  disableControls() {
    this.control.destroy()
    this.scale.remove(this.control)
  }

  update() {}

  destroy() {
    this.scene.remove(this.mesh)
  }
}

export default Shape
