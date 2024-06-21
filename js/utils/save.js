import { shapes } from "../shapes/shapes.js"
import { camera } from "../scene/scene.js"
import { saveToLocalstorage } from "./localstorage.js"

export const save = () => {
	const data = shapes.map((s) => ({
		scale: s.mesh.scale.toArray(),
		position: s.mesh.position.toArray(),
	}))

	saveToLocalstorage('data', data)
	saveToLocalstorage('camera', {
		position: camera.position.toArray(),
		rotation: camera.quaternion,
	})
}