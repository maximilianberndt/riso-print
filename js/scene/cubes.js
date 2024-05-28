import * as THREE from 'three'
import gui from '../gui.js'

const options = {
	count: 21,
	spacing: 1.2,
	scale: 1,
	rotation: new THREE.Vector3(),
}

// Create shape
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshPhysicalMaterial({ color: 0xffffff })

const group = new THREE.Group()
group.rotation.z = Math.PI * 0.5

const cubes = [...Array(options.count)].map(() => new THREE.Mesh(geometry, material))

const updateCubes = () => {
	cubes.forEach((cube, i) => { calcCubePosition(cube, i) })
}

// Bind to gui
const folder = gui.addFolder({ title: 'Cubes' });
folder.addBinding(group, 'rotation', { min: 0, max: Math.PI * 2, step: 0.1047197 })
folder.addBinding(options, 'scale', { min: 0, max: 2 }).on("change", (e) => group.scale.set(e.value, e.value, e.value))
folder.addBlade({ view: 'separator' });

folder.addBinding(options, 'rotation', { min: 0, max: Math.PI * 2 }).on("change", updateCubes)
folder.addBinding(options, 'spacing', { min: 0, max: 5 }).on("change", updateCubes)
folder.addBinding(options, 'count', { min: 1, max: 21, step: 1 }).on('change', (e) => {
	cubes.forEach((cube, i) => { cube.visible = i < e.value })
	updateCubes()
})

const calcCubePosition = (cube, index) => {
	const { rotation, count, spacing } = options

	cube.position.x = ((-count * 0.5 + index) + 0.5) * spacing

	cube.rotation.x = index * rotation.x
	cube.rotation.y = index * rotation.y
	cube.rotation.z = index * rotation.z
}


export const createCubes = (scene) => {
	scene.add(group)

	cubes.forEach((cube, i) => {
		group.add(cube)
		calcCubePosition(cube, i)
	})

	updateCubes()
}