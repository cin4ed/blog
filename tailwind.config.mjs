/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				background: "#030404",
				foreground: "#DCBA71",
				"secondary-foreground": "#54472B",
			}
		},
	},
	plugins: [],
}
