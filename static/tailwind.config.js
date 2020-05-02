module.exports = {
	theme: {
		darkSelector: '.mode-dark',
		fontFamily: {
			body: ["Inter", "sans-serif"],
		},
		container: {
			default: "1rem",
			sm: "2rem",
			lg: "4rem",
			xl: "5rem",
		},
		fontSize: {
			xs: ".75rem",
			sm: ".875rem",
			tiny: ".875rem",
			base: "1rem",
			lg: "1.125rem",
			xl: "1.25rem",
			"2xl": "1.5rem",
			"3xl": "1.875rem",
			"4xl": "2.25rem",
			"5xl": "3rem",
			"6xl": "4rem",
			"7xl": "5rem",
			"8xl": "8rem",
		},
	},
	variants: {
		backgroundColor: [
			"dark",
			"dark-hover",
			"dark-group-hover",
			"dark-even",
			"dark-odd",
		],
		borderColor: ["dark", "dark-focus", "dark-focus-within"],
		textColor: ["dark", "dark-hover", "dark-active", "dark-placeholder"],
	},
	plugins: [require("tailwindcss-dark-mode")()],
};
