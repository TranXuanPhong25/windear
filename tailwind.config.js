/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			container: {
				center: true,
				padding: "2rem",
				screens: {
					"2xl": "1400px",
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'enterFromRight': {
					from: { opacity: "0", transform: "translateX(200px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
				'enterFromLeft': {
					from: { opacity: "0", transform: "translateX(-200px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
				'exitToRight': {
					from: { opacity: "1", transform: "translateX(0)" },
					to: { opacity: "0", transform: "translateX(200px)" },
				},
				'exitToLeft': {
					from: { opacity: "1", transform: "translateX(0)" },
					to: { opacity: "0", transform: "translateX(-200px)" },
				},
				'scaleIn': {
					from: { opacity: "0", transform: "rotateX(-10deg) scale(0.9)" },
					to: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
				},
				'scaleOut': {
					from: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
					to: { opacity: "0", transform: "rotateX(-10deg) scale(0.95)" },
				},
				'fadeIn': {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				'fadeOut': {
					from: { opacity: "1" },
					to: { opacity: "0" },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'scaleIn': "scaleIn 0.2s ease",
				'scaleOut': "scaleOut 0.2s ease",
				'fadeIn': "fadeIn 0.2s ease",
				'fadeOut': "fadeOut 0.2s ease",
				'enterFromLeft': "enterFromLeft 0.25s ease",
				'enterFromRight': "enterFromRight 0.25s ease",
				'exitToLeft': "exitToLeft 0.25s ease",
				'exitToRight': "exitToRight 0.25s ease",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}

