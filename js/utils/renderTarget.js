import * as THREE from 'three'
import { OPTIONS } from '../options.js'
import { canvas } from '../scene/index.js'

const renderTarget = new THREE.WebGLRenderTarget(
  canvas.width,
  canvas.height
)

const vertexShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`

const fragmentShader = /* glsl */ `
    varying vec2 vUv;
    uniform sampler2D tMap;
    void main() {
        vec3 color = texture2D(tMap, vUv).rgb;

        float red = color.r;
        float blue = color.b - red;

        gl_FragColor = vec4(red, red, red, 1.0);
    }
`

const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: { tMap: { value: renderTarget.texture } },
  vertexShader,
  fragmentShader,
})

export const renderSceneToRenderTarget = (renderer, scene, camera) =>
  new Promise((accept) => {
    renderTarget.setSize(OPTIONS.width * 4, OPTIONS.height * 4)

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(OPTIONS.width * 4, OPTIONS.height * 4),
      shaderMaterial
    )

    renderer.setRenderTarget(renderTarget)
    renderer.render(scene, camera)
    renderer.setRenderTarget(null)
    scene.add(plane)

    camera.position.z = 1000

    setTimeout(() => {
      const image = canvas.toDataURL('image/jpeg', 1.0)

      accept(image)
    }, 100)
  })
