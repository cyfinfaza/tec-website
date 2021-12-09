import React from "react";
import Layout from "./src/components/layout";
import './src/styles/global.scss'

export const wrapPageElement = ({ element, props }) => {
	console.log("props", props);
	return <Layout {...props}>{element}</Layout>;
}