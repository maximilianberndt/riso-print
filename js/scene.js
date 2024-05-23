import * as THREE from 'three'
import { OPTIONS } from './options.js'

export const canvas = document.querySelector('canvas')

export const scene = new THREE.Scene({ devicePixelRatio: 2 })
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

renderer.setSize(OPTIONS.width, OPTIONS.height)
renderer.setClearColor(OPTIONS.color2)
