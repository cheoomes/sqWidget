export async function getEstimate(
    usage: undefined,
    lat: undefined,
    lng: undefined,
) {
    try {
        const response = await fetch(
            "https://solariq.app/api/public/getEstimate",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    usage: usage,
                    lat: lat,
                    lng: lng,
                }),
            },
        );

        const data = await response.json();

        console.log(data);
        return data;
    } catch (err: any) {
        throw new Error(err.message || "Something went wrong");
    }
}
