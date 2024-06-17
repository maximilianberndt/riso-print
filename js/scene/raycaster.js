import * as THREE from 'three'
import { camera } from './index.js'

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()

export const getObject = (e, shapes = []) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1

  const meshes = shapes.map((s) => s.mesh)

  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera(pointer, camera)

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(meshes)
  const intersectedMesh = intersects?.[0]

  shapes.forEach((s) => {
    if (intersectedMesh && s.mesh === intersectedMesh.object) {
      s.enableControls()
    } else {
      s.disableControls()
    }
  })
}
