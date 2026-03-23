import { getApiKey } from "./getApiKey";

export async function getSettings() {
    const apiKey = getApiKey();

    const res = await fetch(
        `https://solariq.app/api/public/getSettings?apiKey=${apiKey}`,
    );
    if (!res.ok) throw new Error("Failed to load settings");

    const data = await res.json();
    //console.log(data);

    const root = document.documentElement;

    async function applyDynamicStyles() {
        const response = await fetch("https://api.example.com/theme");
        const data = await response.json();

        // Example response:
        // { primaryColor: "#FF5733", fontSize: "18px" }

        const root = document.documentElement;

        root.style.setProperty("--background-color", data.backgroundColor);
        root.style.setProperty("--progress-color", data.progresColor);
        root.style.setProperty(
            "--progress-shadow-color",
            data.progresShadowColor,
        );
        root.style.setProperty("--text-color", data.textColor);
        root.style.setProperty("--light-text-color", data.LightTextColor);
        root.style.setProperty(
            "--show-avg-line",
            data.showAvgLine ? "true" : "false",
        );
        if (data.logo) {
            root.style.setProperty(
                "--logo",
                `url(data:image/png;base64,${data.logo})`,
            );
        }
    }
}
