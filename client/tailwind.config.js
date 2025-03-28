module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
  ],
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
        blueNeon: "#00A8E8",
        darkBg: "#001F3F",
        neonPink: "#FF007F",
        darkCard: "#002A5E",
        background: "#003366",
        foreground: "#E2E8F0",
        primary: "#0096FF",
        "primary-foreground": "#FFFFFF",
        secondary: "#004488",
        "secondary-foreground": "#A3BFFA",
        accent: "#0055AA",
        "accent-foreground": "#60A5FA",
        card: "#003F7F",
        "card-foreground": "#CBD5E1",
        muted: "#004F9E",
        "muted-foreground": "#94A3B8",
        border: "#3366CC",
        ring: "#2563EB",
        neonBlue: "#00A8E8",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
        glow: {
          "0%": { textShadow: "0 0 5px #00A8E8, 0 0 10px #00A8E8" },
          "100%": { textShadow: "0 0 10px #00A8E8, 0 0 20px #00A8E8" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "neon-glow": "glow 1.5s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;