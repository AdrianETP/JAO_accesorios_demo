import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    daisyui:{
        theme:["business"]
    },
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
} satisfies Config;
