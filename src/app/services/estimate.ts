export async function getEstimate() {
    const energyData = localStorage.getItem("energyData");
    const mapCenter = localStorage.getItem("mapCenter");

    if (!energyData || !mapCenter) {
        throw new Error();
    }

    const energy = JSON.parse(energyData);
    const location = JSON.parse(mapCenter);
    console.log(energy.usage);
    try {
        const response = await fetch("http://localhost:3000/api/getEstimate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                usage: energy.usage,
                lat: location.lat,
                lng: location.lng,
            }),
        });

        const data = await response.json();

        console.log(data);
        return data;
    } catch (err: any) {
        throw new Error(err.message || "Something went wrong");
    }
}
