import {
	Project,
	Scene3D,
	PhysicsLoader,
	THREE,
	ExtendedObject3D,
} from "enable3d";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";

async function requestDeviceOrientation() {
	if (
		typeof DeviceOrientationEvent !== "undefined" &&
		typeof DeviceOrientationEvent.requestPermission === "function"
	) {
		try {
			let permissionState = await DeviceOrientationEvent.requestPermission();
			if (permissionState === "granted") {
				return true;
			} else return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	} else {
		console.log("not ios");
		return true;
	}
}

class MainScene extends Scene3D {
	// box!: ExtendedObject3D

	constructor() {
		super({ key: "MainScene" });
	}

	async init() {
		console.log("init");
		console.log("Orientation: ", await requestDeviceOrientation());
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		// document.body.appendChild(VRButton.createButton(this.renderer));
		// this.renderer.xr.enabled = true;
	}

	preload() {
		console.log("preload");
	}

	async create() {
		console.log("create");

		// set up scene (light, ground, grid, sky, orbitControls)
		// this.warpSpeed();
		// add hemisphere light to scene
		this.scene.add(new THREE.HemisphereLight(0xffffff, 0x444444));

		// enable physics debug
		// this.physics.debug?.enable();

		// position camera
		this.camera.position.set(0, 40, 0);
		this.camera.lookAt(0, 0);
		// this.physics.add.existing(this.camera, {mass:1})

		// blue box
		// this.box = this.add.box({ y: 2 }, { lambert: { color: "deepskyblue" } });

		// pink box
		let pinkBox = this.physics.add.box(
			{ y: 10, name: "pink box" },
			{ lambert: { color: "hotpink" } }
		);

		// green sphere
		const geometry = new THREE.SphereGeometry(0.8, 16, 16);
		const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
		let sphere = new THREE.Mesh(geometry, material);
		sphere.position.set(0.2, 3, 0);
		sphere.name = "sphere";
		this.scene.add(sphere);
		// add physics to an existing object
		this.physics.add.existing(sphere);
		// sphere.body.setBounciness(1)
		// debugger

		pinkBox.body.setBounciness(1);

		let object = await new GLTFLoader().loadAsync("/3dbuilder actually.glb");
		console.log(object);
		object = object.scene.children[0];
		object.scale.multiplyScalar(100);
		this.scene.add(object);
		this.physics.add.existing(object, { shape: "concave", mass: 0 });
		// object.body.on.collision((otherObject, event) => otherObject.name !== "ground" && console.log("Collided with ", otherObject));
		window.addEventListener("deviceorientation", (event) => {
			// log rounded values
			console.log(
				Math.round(event.alpha),
				Math.round(event.beta),
				Math.round(event.gamma)
			);
			let b = event.beta * (Math.PI / 180) * -1;
			let g = event.gamma * (Math.PI / 180) * -1;
			// let m = Math.sqrt(Math.pow(Math.sin(b), 2) + Math.pow(Math.sin(g), 2)) / Math.SQRT2
			// const grav = 40
			// let x = m * Math.sin(g) * grav
			// let y = m * Math.sin(b) * grav
			// let z = -1 * Math.sqrt(1-Math.pow(m, 2)) * grav
			// // console.table({x, y, z, m, b, g})
			// console.log(m, x, y, z)
			// this.physics.setGravity(x, z, y);
			// convert alpha beta gamma to gravity vector

			// let vecB = new THREE.Vector3(0, Math.cos(b), Math.sin(b))
			// let vecG = new THREE.Vector3(Math.sin(g), Math.cos(g), 0)
			// let vec = vecB.clone().add(vecG).negate()
			// vec.multiplyScalar(40)
			// this.physics.setGravity(vec.x, vec.y, vec.z);
			let originalGravity = new THREE.Vector3(0, -1, 0);
			let xVec = new THREE.Vector3(1, 0, 0);
			let yVec = new THREE.Vector3(0, 1, 0);
			let zVec = new THREE.Vector3(0, 0, 1);
			yVec.applyAxisAngle(xVec, -b);
			zVec.applyAxisAngle(xVec, -b);
			yVec.applyAxisAngle(zVec, g);
			xVec.applyAxisAngle(zVec, g);
			let vec = new THREE.Vector3(
				xVec.dot(originalGravity),
				yVec.dot(originalGravity),
				zVec.dot(originalGravity)
			);
			vec.multiplyScalar(40);
			this.physics.setGravity(vec.x, vec.y, vec.z);
		});
	}

	update() {
		// this.box.rotation.x += 0.01;
		// this.box.rotation.y += 0.01;
	}
}

window.MainScene = MainScene;

export default MainScene;

// export default {
// 	call: (...args) => new MainScene(...args),
// 	constructor: MainScene,
// };
