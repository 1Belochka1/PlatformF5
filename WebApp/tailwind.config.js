/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(var(--color-primary) / <alpha-value>)',
				secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
				background: 'rgb(var(--color-background) / <alpha-value>)',
				textPrimary: 'rgb(var(--color-text-primary) / <alpha-value>)',
				textSecondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
			},
		},
	},
	plugins: [
		plugin(({ addComponents, theme }) => {
			addComponents({
				'.btn-primary': {
					backgroundColor: 'rgb(var(--color-primary))',
					textAlign: 'center',
					color: theme('colors.black'),
					padding: '0.75rem',
					borderRadius: '0.75rem',
					transition: 'all 0.4s ease',
					userSelect: 'none',
					cursor: 'pointer',
					'&:hover': {
						backgroundColor: 'rgb(var(--color-button-hover))',
						color: 'rgb(var(--color-primary))',
					},
				},
				'.customInput': {
					height: '2.5rem',
					borderRadius: '0.75rem',
					padding: '0.5rem',
				},
				'.wrapperPrimary': {
					display: 'flex',
					flexDirection: 'column',
					flexGrow: 1,
					backgroundColor: 'rgb(var(--color-primary))',
					borderRadius: '0.75rem',
					padding: '1.25rem',
				},
			})
		}),
	],
}
