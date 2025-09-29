export async function getEstimate(
    usage: undefined,
    lat: undefined,
    lng: undefined
) {
    try {
        const response = await fetch("http://localhost:3000/api/getEstimate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                usage: usage,
                lat: lat,
                lng: lng,
            }),
        });

        const data = await response.json();

        console.log(data);
        return data;
    } catch (err: any) {
        throw new Error(err.message || "Something went wrong");
    }
}
