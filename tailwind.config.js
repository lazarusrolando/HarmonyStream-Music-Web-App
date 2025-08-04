/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* Light border */
        input: "var(--color-input)", /* Elevated surface */
        ring: "var(--color-ring)", /* Spotify green */
        background: "var(--color-background)", /* Deep charcoal */
        foreground: "var(--color-foreground)", /* Pure white */
        primary: {
          DEFAULT: "var(--color-primary)", /* Spotify green */
          foreground: "var(--color-primary-foreground)", /* Pure white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* Neutral gray */
          foreground: "var(--color-secondary-foreground)", /* Pure white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* Clear red */
          foreground: "var(--color-destructive-foreground)", /* Pure white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* Neutral gray */
          foreground: "var(--color-muted-foreground)", /* Light gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* Warm coral */
          foreground: "var(--color-accent-foreground)", /* Pure white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* Elevated surface */
          foreground: "var(--color-popover-foreground)", /* Pure white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* Elevated surface */
          foreground: "var(--color-card-foreground)", /* Pure white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* Bright green */
          foreground: "var(--color-success-foreground)", /* Pure white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* Warm orange */
          foreground: "var(--color-warning-foreground)", /* Pure white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* Clear red */
          foreground: "var(--color-error-foreground)", /* Pure white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'clamp': 'clamp(14px, 2.5vw, 18px)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      height: {
        'header': '64px',
        'header-mobile': '56px',
        'player': '80px',
        'nav-tab': '48px',
      },
      zIndex: {
        'navigation': '100',
        'player': '200',
        'dropdown': '300',
        'modal': '400',
      },
      animation: {
        'pulse-playing': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'rotate-loading': 'spin 1s linear infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'smooth': 'ease-out',
        'modal': 'ease-in-out',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}