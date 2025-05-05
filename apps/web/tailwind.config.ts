// import type { Config } from "tailwindcss";

// export default {
// 	content: [
// 		"./pages/**/*.{ts,tsx}",
// 		"./components/**/*.{ts,tsx}",
// 		"./app/**/*.{ts,tsx}",
// 		"./src/**/*.{ts,tsx}",
// 	],
// 	prefix: "",
// 	theme: {
// 		container: {
// 			center: true,
// 			padding: '2rem',
// 			screens: {
// 				'2xl': '1400px'
// 			}
// 		},
// 		extend: {
// 			colors: {
// 				border: 'hsl(var(--border))',
// 				input: 'hsl(var(--input))',
// 				ring: 'hsl(var(--ring))',
// 				background: 'hsl(var(--background))',
// 				foreground: 'hsl(var(--foreground))',
// 				primary: {
// 					DEFAULT: 'hsl(var(--primary))',
// 					foreground: 'hsl(var(--primary-foreground))'
// 				},
// 				secondary: {
// 					DEFAULT: 'hsl(var(--secondary))',
// 					foreground: 'hsl(var(--secondary-foreground))'
// 				},
// 				destructive: {
// 					DEFAULT: 'hsl(var(--destructive))',
// 					foreground: 'hsl(var(--destructive-foreground))'
// 				},
// 				muted: {
// 					DEFAULT: 'hsl(var(--muted))',
// 					foreground: 'hsl(var(--muted-foreground))'
// 				},
// 				accent: {
// 					DEFAULT: 'hsl(var(--accent))',
// 					foreground: 'hsl(var(--accent-foreground))'
// 				},
// 				popover: {
// 					DEFAULT: 'hsl(var(--popover))',
// 					foreground: 'hsl(var(--popover-foreground))'
// 				},
// 				card: {
// 					DEFAULT: 'hsl(var(--card))',
// 					foreground: 'hsl(var(--card-foreground))'
// 				},
// 				sidebar: {
// 					DEFAULT: 'hsl(var(--sidebar-background))',
// 					foreground: 'hsl(var(--sidebar-foreground))',
// 					primary: 'hsl(var(--sidebar-primary))',
// 					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
// 					accent: 'hsl(var(--sidebar-accent))',
// 					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
// 					border: 'hsl(var(--sidebar-border))',
// 					ring: 'hsl(var(--sidebar-ring))'
// 				},
// 				// Custom game UI colors - updated for town theme
// 				"game": {
// 					"purple": "#6E44FF",
// 					"teal": "#2CCCD3",
// 					"orange": "#FF8F40",
// 					"dark": "#1A1F2C",
// 					"light": "#F5F7FA",
// 				},
// 				// New town-themed colors
// 				"town": {
// 					"green": "#4CAF50",
// 					"light": "#F2FCE2",
// 					"accent": "#8BC34A",
// 					"wood": "#795548",
// 					"stone": "#9E9E9E",
// 				},
// 			},
// 			fontFamily: {
// 				pixel: ['"Press Start 2P"', 'cursive'],
// 				sans: ['"Inter"', 'sans-serif'],
// 			},
// 			borderRadius: {
// 				lg: 'var(--radius)',
// 				md: 'calc(var(--radius) - 2px)',
// 				sm: 'calc(var(--radius) - 4px)'
// 			},
// 			keyframes: {
// 				"accordion-down": {
// 					from: { height: "0" },
// 					to: { height: "var(--radix-accordion-content-height)" },
// 				},
// 				"accordion-up": {
// 					from: { height: "var(--radix-accordion-content-height)" },
// 					to: { height: "0" },
// 				},
// 				"float": {
// 					"0%, 100%": { transform: "translateY(0)" },
// 					"50%": { transform: "translateY(-10px)" },
// 				},
// 				"pulse-glow": {
// 					"0%, 100%": { 
// 						opacity: "1",
// 						boxShadow: "0 0 10px 2px rgba(76, 175, 80, 0.7)"
// 					},
// 					"50%": { 
// 						opacity: "0.7",
// 						boxShadow: "0 0 20px 5px rgba(76, 175, 80, 0.9)"
// 					},
// 				},
// 				"pixel-slide": {
// 					"0%": { transform: "translateX(100%)" },
// 					"100%": { transform: "translateX(-100%)" }
// 				}
// 			},
// 			animation: {
// 				"accordion-down": "accordion-down 0.2s ease-out",
// 				"accordion-up": "accordion-up 0.2s ease-out",
// 				"float": "float 3s ease-in-out infinite",
// 				"pulse-glow": "pulse-glow 2s ease-in-out infinite",
// 				"pixel-slide": "pixel-slide 20s linear infinite",
// 			},
// 			backgroundImage: {
// 				"grid-pattern": "url('/grid-pattern.png')",
// 				"hero-pattern": "linear-gradient(to bottom, rgba(242, 252, 226, 0.8), rgba(242, 252, 226, 0.99)), url('/hero-bg.png')",
// 			}
// 		}
// 	},
// 	plugins: [require("tailwindcss-animate")],
// } satisfies Config;