import * as THREE from 'three'
import { OPTIONS } from '../options.js'
import { canvas } from './canvas.js'
import { camera } from './camera.js'

export const renderer = new THREE.WebGLRenderer({
	canvas,
	camera,
	preserveDrawingBuffer: true,
	antialias: true,
})

renderer.setClearColor(OPTIONS.color1)