import React from "react";
import Nav from "./nav";
import { useEffect } from "react";
import * as componentStyle from "./layout.module.scss";

export default function Layout({ children }) {
	useEffect((_) => console.log("mounted layout"), []);
	return (
		<div className={componentStyle.container}>
			<Nav />
			<div className={componentStyle.content}>{children}</div>
		</div>
	);
}
