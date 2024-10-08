/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xsm: "310px",
      msm: "360px",
      msmsm: "368px",
      mmsm: "385px",
      ssm: "412px",
      sm: "480px",
      smd: "553px",
      md: "768px",
      lg: "913px",
      xlg: "1015px",
      xmlg: "1140px",
      xxlg: "1200px",
      xxxlg: "1290px",
      xl: "1440px",
      xxl: "1500px",
    },
    extend: {
      colors: {
        blue1: "#0074C3",
        blue2: "#144C8C",
        blue3: "#11A5BA",
        black: "#1C242C",
        white: "#F2EFEB",
        whiteo: "#FFF",
      },
    },
  },
  plugins: [],
};
