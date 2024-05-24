import * as THREE from 'three'
import { OPTIONS } from './options.js'

export const canvas = document.querySelector('canvas')

export const scene = new THREE.Scene({ devicePixelRatio: 300 })
export const camera = new THREE.PerspectiveCamera(
	75,
	OPTIONS.width / OPTIONS.height
)
camera.position.z = 5

export const renderer = new THREE.WebGLRenderer({
	canvas,
	camera,
	preserveDrawingBuffer: true,
	antialias: true,
})

renderer.setClearColor(OPTIONS.color2)

const resize = () => {
	const wrapper = document.querySelector("#canvas-wrapper")
	const { width, height } = wrapper.getBoundingClientRect();

	const paperAspectRatio = OPTIONS.width / OPTIONS.height
	const scaledWidth = width * paperAspectRatio

	camera.aspect = scaledWidth / height
	camera.updateProjectionMatrix();

	renderer.setSize(scaledWidth, height)
}

resize()