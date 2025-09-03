import React, { useEffect, useState } from "react";

type ApiResult = {
    message: string;
    // add other fields your API returns
};

function Results() {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<ApiResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const energyData = localStorage.getItem("energyData");
        const mapCenter = localStorage.getItem("mapCenter");

        if (!energyData || !mapCenter) {
            setError("Missing data. Please fill out the previous form.");
            setLoading(false);
            return;
        }
    });
    return <div>resultsPage</div>;
}

export default Results;
