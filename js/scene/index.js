import * as THREE from 'three'
import { OPTIONS } from '../options.js'
import { composer, smaaPass } from '../postProcessing/composer.js'
import { fitCanvasToWrapper } from '../utils/fitCanvasToWrapper.js'

const canvasWrapper = document.querySelector('#canvas-wrapper')
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

export const renderer = new THREE.WebGLRenderer({
  canvas,
  camera,
  preserveDrawingBuffer: true,
  antialias: true,
})

renderer.setClearColor(OPTIONS.color1)

const resize = () => {
  const { width, height } = fitCanvasToWrapper(canvasWrapper)

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  smaaPass.setSize(width, height)
  composer.setSize(width * 4, height * 4)
}

setTimeout(resize, 0)
