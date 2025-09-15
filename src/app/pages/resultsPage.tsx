import { error } from "console";
import React, { useEffect, useState } from "react";
import { getEstimate } from "../services/estimate";

import "../media/cogwheel.css";

// type ApiResult = {
//     message: string;
//     // add other fields your API returns
// };

function Results() {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        const fetchDate = async () => {
            try {
                const estimate = await getEstimate();
                setResult(estimate);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        fetchDate();
    }, []);

    console.log(result);
    return (
        <div>
            {loading ? (
                <div className="waiting">
                    <div className="cog"></div>
                    <p>calculating ...</p>
                </div>
            ) : (
                <>
                    <h5>kWh/m²/day</h5>
                    jan {result.irradiance["01"]}
                </>
            )}
        </div>
    );
}
function setError(arg0: any) {
    throw new Error("Function not implemented.");
}

export default Results;
