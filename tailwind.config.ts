import type { Config } from 'tailwindcss';
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ['./src/**/*.{html,js,svelte,ts, css}'],
  theme: {
    extend: {
      backgroundImage: {
        rocket: 'url("/img/rocket.png")',
        launch: 'url("/img/launch.png")'
      }
    }
  },
  plugins: [typography, daisyui]
};

export default config;
