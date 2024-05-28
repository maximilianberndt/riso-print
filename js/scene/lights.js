import * as THREE from 'three'
import gui from '../gui.js';

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(3.20, 2.80, 0.)
directionalLight.rotation.set(0, 0, -0.5)

const helper = new THREE.DirectionalLightHelper(directionalLight, 1, 0xff0000);
helper.visible = false

const light = new THREE.AmbientLight(0x404040); // soft white light

const folder = gui.addFolder({ title: 'Directional Light' });
folder.addBinding(directionalLight, 'position')
folder.addBinding(directionalLight, 'rotation')
folder.addBinding(directionalLight, 'color', {
	color: { type: 'float' }, picker: 'inline',
	expanded: true,
})
folder.addBinding(helper, 'visible', { label: "Helper" })


const createLights = (scene) => {
	scene.add(helper);
	scene.add(directionalLight);

	scene.add(light);
}

export default createLights


