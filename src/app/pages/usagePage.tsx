import React, { useEffect, useState } from "react";
import "../media/usagePage.css";

function usage() {
    const [usage, setUsage] = useState<number | null>(null);
    const [cost, setCost] = useState<number | null>(null);

    useEffect(() => {
        localStorage.setItem("energyData", JSON.stringify({ usage, cost }));
    }, [usage, cost]);

    return (
        <form className="energy-form">
            <div className="form-group">
                <label>
                    What is your household's annual energy consumption? (in KWH)
                </label>
                <input
                    type="number"
                    value={usage ?? ""}
                    onChange={(e) =>
                        setUsage(
                            e.target.value
                                ? parseInt(e.target.value, 10)
                                : null,
                        )
                    }
                    required
                    placeholder="e.g. 4200 kWh"
                />
            </div>

            <div className="form-group">
                <label>
                    how much does this cost you monthly? ($){" "}
                    <span className="optional">(optional)</span>
                </label>
                <input
                    type="number"
                    value={cost ?? ""}
                    onChange={(e) =>
                        setCost(
                            e.target.value
                                ? parseInt(e.target.value, 10)
                                : null,
                        )
                    }
                    placeholder="e.g. 120"
                />
            </div>
        </form>
    );
}

export default usage;
