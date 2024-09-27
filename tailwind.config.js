/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        'adaptive-sm': 'clamp(0.875rem, 2vw, 1.125rem)', 
        'adaptive-md': 'clamp(1rem, 2.5vw, 1.5rem)', 
        'adaptive-lg': 'clamp(1.125rem, 3vw, 1.875rem)',
        'adaptive-xl': 'clamp(1.25rem, 3.5vw, 2.25rem)',
        'adaptive-xxl': 'clamp(1.5rem, 4vw, 2.5rem)',
      },
      padding: {
        'adaptive-sm': 'clamp(8px, 2vw, 16px)',   
        'adaptive-md': 'clamp(12px, 2.5vw, 24px)', 
        'adaptive-lg': 'clamp(16px, 3vw, 32px)',   
        'adaptive-xl': 'clamp(20px, 3.5vw, 40px)', 
        'adaptive-xxl': 'clamp(24px, 4vw, 48px)',  
      },
      margin: {
        'adaptive-sm': 'clamp(8px, 2vw, 16px)',   
        'adaptive-md': 'clamp(12px, 2.5vw, 24px)', 
        'adaptive-lg': 'clamp(16px, 3vw, 32px)',   
        'adaptive-xl': 'clamp(20px, 3.5vw, 40px)', 
        'adaptive-xxl': 'clamp(24px, 4vw, 48px)',  
      },
      width: {
        'adaptive-sm': 'clamp(200px, 50vw, 400px)',   
        'adaptive-md': 'clamp(300px, 55vw, 500px)',   
        'adaptive-lg': 'clamp(400px, 60vw, 600px)',   
        'adaptive-xl': 'clamp(500px, 65vw, 700px)',   
        'adaptive-xxl': 'clamp(600px, 70vw, 800px)',  
      },
      height: {  // Исправлено на правильное "height"
        'adaptive-sm': 'clamp(200px, 50vw, 400px)',   
        'adaptive-md': 'clamp(300px, 55vw, 500px)',   
        'adaptive-lg': 'clamp(400px, 60vw, 600px)',   
        'adaptive-xl': 'clamp(500px, 65vw, 700px)',   
        'adaptive-xxl': 'clamp(600px, 70vw, 800px)',  
      },
    },
  },
  plugins: [],
};
