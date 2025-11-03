export function getApiKey(): string {
    const params = new URLSearchParams(window.location.search);
    const apiKey = params.get("apiKey");

    if (!apiKey) throw new Error("Missing API key in widget URL");

    return apiKey;
}
