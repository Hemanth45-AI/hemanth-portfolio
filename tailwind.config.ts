import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-blue': 'hsl(210, 95%, 60%)',
        'accent-purple': 'hsl(270, 80%, 70%)',
      },
    },
  },
  plugins: [],
}

export default config