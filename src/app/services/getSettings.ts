import { getApiKey } from "./getApiKey";

export async function getSettings() {
    const apiKey = getApiKey();

    const res = await fetch(
        `http://localhost:3000/api/public/getSettings?apiKey=${apiKey}`
    );
    if (!res.ok) throw new Error("Failed to load settings");

    const data = await res.json();
    console.log(data);

    const root = document.documentElement;

    async function applyDynamicStyles() {
        const response = await fetch("https://api.example.com/theme");
        const data = await response.json();

        // Example response:
        // { primaryColor: "#FF5733", fontSize: "18px" }

        const root = document.documentElement;

        root.style.setProperty("--primary-color", data.primaryColor);
        root.style.setProperty("--font-size", data.fontSize);
        root.style.setProperty("--padding", data.padding || "12px");
    }
}
