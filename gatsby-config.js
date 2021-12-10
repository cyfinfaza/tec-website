module.exports = {
	siteMetadata: {
		siteUrl: "https://www.yourdomain.tld",
		title: "tec-website",
	},
	plugins: [
		"gatsby-plugin-sass",
		"gatsby-plugin-react-helmet",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				icon: "src/images/icon.png",
			},
		},
		"gatsby-transformer-remark",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "pages",
				path: "./src/pages/",
			},
			__key: "pages",
		},
		{
			resolve: `gatsby-plugin-compile-es6-packages`,
			options: {
				modules: [`enable3d`, `@enable3d/three-graphics`],
			},
		},
	],
};
