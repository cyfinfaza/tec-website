// modified from enable3d\dist\project.js
import { ThreeGraphics } from "@enable3d/three-graphics/jsm";
import { logger } from "@enable3d/common/dist/logger";
export class Project extends ThreeGraphics {
	constructor(projectConfig) {
		super(projectConfig);
		// function resize(elem) {
		// 	this.renderer.setSize(elem.clientWidth, elem.clientHeight);
		// }
		var _a;
		this.projectConfig = projectConfig;
		this.scenes = new Map();
		if (this.projectConfig.parent) this.parent = this.projectConfig.parent;
		else this.parent = document.body;
		if (!this.parent) {
			logger(
				`Parent "${this.projectConfig.parent}" not found! Will add it to the body.`
			);
			this.parent = document.body;
		}
		this.renderer.setSize(this.parent.clientWidth, this.parent.clientHeight);
		// resize with resizeobserver
		new ResizeObserver((entries) => {
			this.renderer.setSize(
				entries[0].contentRect.width,
				entries[0].contentRect.height
			);
			this.camera.aspect =
				entries[0].contentRect.width / entries[0].contentRect.height;
			this.camera.updateProjectionMatrix();
		}).observe(this.parent);
		this.parent.appendChild(this.renderer.domElement);
		this.canvas = this.renderer.domElement;
		let firstSceneKey = "";
		this.projectConfig.scenes.forEach((scene, i) => {
			const s = new scene();
			if (i === 0) firstSceneKey = s.sceneKey;
			const plug = {
				// scene configuration
				sceneConfig: {
					textureAnisotropy: this.textureAnisotropy,
					autoStart: false,
				},
				// add core features from three-graphicsconfig: {
				renderer: this.renderer,
				parent: this.parent,
				canvas: this.canvas,
				scene: this.scene,
				scenes: this.scenes,
				camera: this.camera,
				cache: this.cache,
				physics: this.physics,
			};
			s.initializeScene(plug);
			if (i === 0) {
				s.setSize(this.parent.clientWidth, this.parent.clientHeight);
				s.setPixelRatio(Math.max(1, window.devicePixelRatio / 2));
			}
			this.scenes.set(s.sceneKey, s);
		});
		// start the first scene
		(_a = this.scenes.get(firstSceneKey)) === null || _a === void 0
			? void 0
			: _a.start(firstSceneKey);
	}
}
//# sourceMappingURL=project.js.map
