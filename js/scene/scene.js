import * as THREE from 'three'
import { OPTIONS } from '../options.js'
import { loadFromLocalstorage } from '../utils/localstorage.js'

export const canvas = document.querySelector('canvas')

export const scene = new THREE.Scene()
export const camera = new THREE.PerspectiveCamera(
	75,
	OPTIONS.width / OPTIONS.height
)
camera.position.z = 5
camera.position.y = 1
camera.position.x = 1
camera.lookAt(new THREE.Vector3())

const cameraData = loadFromLocalstorage('camera')

if (cameraData) {
	camera.position.fromArray(cameraData.position)

	const lookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(
		cameraData.rotation
	)
	camera.lookAt(lookAt)
}

export const renderer = new THREE.WebGLRenderer({
	canvas,
	camera,
	preserveDrawingBuffer: true,
	antialias: true,
})

renderer.setClearColor(OPTIONS.color1)
