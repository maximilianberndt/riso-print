import * as THREE from 'three'

const createLights = (scene) => {
	const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
	scene.add(directionalLight);

	const light = new THREE.AmbientLight(0x404040); // soft white light
	scene.add(light);
}

export default createLights


