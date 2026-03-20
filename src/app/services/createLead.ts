import { getApiKey } from "./getApiKey";

type LeadData = {
    name: string;
    email: string;
    phone?: string;
    location: string;
    quote: number;
    energyConsumption: number;
    bill: number;
};

export async function createLead(leadData: LeadData) {
    const apiKey = getApiKey();

    try {
        const response = await fetch(
            "http://localhost:3000/api/public/putQuote",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": apiKey, // include API key for client identification
                },
                body: JSON.stringify(leadData),
            },
        );

        if (!response.ok) {
            throw new Error(`Failed to create lead: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (err: any) {
        console.error("❌ Error creating lead:", err);
        throw err;
    }
}
