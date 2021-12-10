import React, { useState, useRef } from "react";
import Nav from "./nav";
import { useEffect } from "react";
import * as componentStyle from "./layout.module.scss";
import MainScene from "../logic/3dBackground";
import { PhysicsLoader } from "enable3d";
import { Project } from "../logic/enable3dproject";
import * as THREE from "three";
// import { AnimatePresence, motion } from "framer-motion";

// const variant = {
// 	initial: {
// 		opacity: 0,
// 		y: -200,
// 	},
// 	animate: {
// 		opacity: 1,
// 		y: 0,
// 	},
// 	exit: {
// 		opacity: 0,
// 		y: 200,
// 	},
// };

export default function Layout({ children }) {
	// const [canvasElem, setCanvasElem] = useState(null);
	const canvasElem = useRef();
	useEffect((_) => {
		console.log("mounted layout");
		// let renderer = new THREE.WebGLRenderer({ antialias: true });
		// renderer.setPixelRatio(window.devicePixelRatio);
		// renderer.setSize(window.innerWidth, window.innerHeight);
		// canvasElem.current.appendChild(renderer.domElement);
		PhysicsLoader(
			"/ammo",
			() =>
				new Project({
					scenes: [MainScene],
					antialias: true,
					parent: canvasElem.current,
				})
		);
	}, []);
	// const location = window.location;
	return (
		<div className={componentStyle.container}>
			<div className={componentStyle.backgroundCanvas} ref={canvasElem}></div>
			<Nav />
			{/* <AnimatePresence exitBeforeEnter>
				<motion.main
					key={location && location.pathname ? location.pathname : "error"}
					variants={variant}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{
						type: "inertia",
						mass: 0.01,
						stiffness: 75,
						duration: 0.25,
					}}
					sx={{
						width: "100%",
					}}
				> */}
			<div className={componentStyle.content}>{children}</div>
			{/* </motion.main>
			</AnimatePresence> */}
		</div>
	);
}
