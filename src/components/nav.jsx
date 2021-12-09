import React from "react";
import * as componentStyle from "./nav.module.scss";
import { Link } from "gatsby";
import { useState, useEffect } from "react";
import LogoImg from "../images/logo.jpg";

export default function Nav() {
	useEffect((_) => console.log("mounted nav"), []);
	useEffect((_) => console.log("something changed"));
	const NavLink = ({ children, to }) => {
		const [active, setActive] = useState(false);
		useEffect((_) => console.log("mounted button"), []);
		function isActive(e) {
			setActive(e.isCurrent);
		}
		return (
			<Link
				to={to}
				getProps={isActive}
				// style={{ background: active ? "lightgray" : "white" }}
				className={
					componentStyle.navLink +
					" " +
					(active ? componentStyle.navLinkActive : "")
				}
			>
				{children}
			</Link>
		);
	};
	return (
		<div className={componentStyle.container}>
			<div className={componentStyle.websiteName}>
				<img
					src={LogoImg}
					alt="Ridge TEC"
					className={componentStyle.logoImage}
				/>
				<h1 style={{ fontSize: "1.5em" }}>Ridge TEC</h1>
			</div>
			<div className={componentStyle.linksContainer}>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/about">About</NavLink>
				<NavLink to="/contact">Contact</NavLink>
			</div>
		</div>
	);
}
