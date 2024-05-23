import * as THREE from 'three'
import createPdf from './create-pdf.js'
import { camera, canvas, renderer, scene } from './scene.js'

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

function animate() {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}
animate()

document.body.addEventListener('click', () => createPdf(canvas))
