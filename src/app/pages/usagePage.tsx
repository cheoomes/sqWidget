import React, { useEffect, useState } from "react";
import "../media/usagePage.css";

function usage() {
    const [usage, setUsage] = useState(4200);
    const [cost, setCost] = useState<number | null>(null);

    useEffect(() => {
        localStorage.setItem("energyData", JSON.stringify({ usage, cost }));
    }, [usage, cost]);

    return (
        <form className="energy-form">
            <h2>Energy Information</h2>

            <div className="form-group">
                <label>Anual energy consumption (kWh) </label>
                <input
                    type="number"
                    value={usage}
                    onChange={(e) =>
                        setUsage(parseInt(e.target.value, 10) || 0)
                    }
                    required
                    placeholder="e.g. 350"
                />
            </div>

            <div className="form-group">
                <label>
                    Monthly Cost ($){" "}
                    <span className="optional">(optional)</span>
                </label>
                <input
                    type="number"
                    value={cost ?? ""}
                    onChange={(e) =>
                        setCost(
                            e.target.value ? parseInt(e.target.value, 10) : null
                        )
                    }
                    placeholder="e.g. 120"
                />
            </div>
        </form>
    );
}

export default usage;
