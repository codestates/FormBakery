module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: ["Graphik", "sans-serif"],
            serif: ["Merriweather", "serif"],
        },
        extend: {
            spacing: {
                "8xl": "96rem",
                "9xl": "128rem",
                0.75: "3px",
                14.5: "58px",
                15: "60px",
                18: "72px",
                19: "76px",
                222: "888px",
                17.5: "70px",
                21.5: "86px",
                50: "200px",
                60: "240px",
                120: "480px",
                192: "768px",
                "102%": "102%",
                "100vh": "100vh",
            },
            borderWidth: {
                1: "1px",
            },
            borderRadius: {
                "4xl": "2rem",
            },
            colors: {
                main: "#ffdb5f",
                subMain: "#ffffef",
            },
            minHeight: {
                login: "calc(100vh - 72px)",
                forms: "calc(100vh - 10px)",
                myforms: "calc(100vh - 110px)",
            },
            height: {
                11.5: "46px",
            },
            width: {
                11.5: "46px",
            },
        },
    },
    plugins: [],
};
