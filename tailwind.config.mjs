/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				brand: '#ff9100'
			},
			fontFamily: {
				primary: [
					'HalisRoundedLight', ...defaultTheme.fontFamily.sans,
				],
				primaryExtraLight: [
					'HalisRoundedExtraLight',
					...defaultTheme.fontFamily.sans,
				],
				primaryLight: [
					'HalisRoundedLight',
					...defaultTheme.fontFamily.sans,
				],
				primaryBold: [
					'HalisRoundedBold',
					...defaultTheme.fontFamily.sans,
				],
				smallCaps: [
					'HalisRoundedSCLight',
					...defaultTheme.fontFamily.sans,
				],
				smallCapsExtraLight: [
					'HalisRoundedSCExtraLight',
					...defaultTheme.fontFamily.sans,
				],
				smallCapsLight: [
					'HalisRoundedSCLight',
					...defaultTheme.fontFamily.sans,
				],
				smallCapsBold: [
					'HalisRoundedSCBold',
					...defaultTheme.fontFamily.sans,
				],
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
