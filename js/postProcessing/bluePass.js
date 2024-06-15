import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'

const BlueShader = {
  name: 'BlueShader',
  uniforms: { tDiffuse: { value: null } },
  vertexShader: /* glsl */ `
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,
  fragmentShader: /* glsl */ `
		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {
      vec3 color = texture2D(tDiffuse, vUv).rgb;

      float red = color.r;
      float blue = color.b - red;

      gl_FragColor = vec4(blue, blue, blue, 1.0);   
		}`,
}

export const bluePass = new ShaderPass(BlueShader)
