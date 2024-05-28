import * as THREE from 'three'

const count = 20;

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshPhysicalMaterial({ color: 0x00ff00 })

const cubes = [...Array(count)].map(() => new THREE.Mesh(geometry, material))

export const createCubes = (scene) => {
	cubes.forEach((cube, i) => {
		scene.add(cube)
		cube.position.x = i
	})
}