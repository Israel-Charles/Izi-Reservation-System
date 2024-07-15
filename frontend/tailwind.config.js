/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			width: {
				128: "32rem",
				160: "40rem",
			},
			colors: {
				// static
				light_neutral: "rgba(var(--light-neutral))",
				dark_neutral: "rgba(var(--dark-neutral))",
				dark_orange: "rgba(var(--dark-orange))",
				med_orange: "rgba(var(--med-orange))",
				light_orange: "rgba(var(--light-orange))",
				success_background: "rgba(var(--success-background))",
				success: "rgba(var(--success))",
				error_background: "rgba(var(--error-background))",
				error: "rgba(var(--error))",
				link: "rgba(var(--link))",
				link_hover: "rgba(var(--link-hover))",

				// theme dependent
				background: "rgba(var(--background))",
				background_alt: "rgba(var(--background-alt))",
				primary: "rgba(var(--primary))",
				secondary: "rgba(var(--secondary))",
				tertiary: "rgba(var(--tertiary))",
			},
		},
	},
	plugins: [],
};
