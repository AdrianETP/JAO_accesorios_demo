import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    daisyui: {
        theme: ["business"]
    },
    theme: {
        extend: {
            colors: {
                primary: "#232530",
                secondary: "#6F5F4C",
                secondaryBlack: "#0c0c09",
                textColor: "#e8e2d9",
                accent: "#c0ac95",
                primarydes: "#25262c",
                secondarydes: "#48423b",

            }

        },
    },
    plugins: [require("daisyui")],
} satisfies Config;
