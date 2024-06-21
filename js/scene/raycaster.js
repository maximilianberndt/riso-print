import * as THREE from 'three'
import { camera } from './scene.js'

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()

export const getMesh = (e, meshes = []) => {
	pointer.x = (e.clientX / window.innerWidth) * 2 - 1
	pointer.y = -(e.clientY / window.innerHeight) * 2 + 1

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera(pointer, camera)

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects(meshes)
	return intersects?.[0]
}
