/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 绿色主题（农业碳汇）
        'green-primary': '#4ade80',
        'green-secondary': '#22c55e',
        'green-dark': '#16a34a',
        // 蓝色主题（ESG平台）
        'blue-primary': '#60a5fa',
        'blue-secondary': '#3b82f6',
        'blue-dark': '#2563eb',
        // 橙色主题（管理平台）
        'orange-primary': '#fb923c',
        'orange-secondary': '#f97316',
        'orange-dark': '#ea580c',
      },
      fontFamily: {
        sans: ['PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
