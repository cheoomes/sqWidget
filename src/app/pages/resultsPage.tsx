import { error } from "console";
import React, { useEffect, useState } from "react";
import { getEstimate } from "../services/estimate";
import {
    BarChart,
    Bar,
    AreaChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Area,
    ReferenceLine,
} from "recharts";

import LeadForm from "../components/leadForm";

import "../media/results.css";

function Results() {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<any>(null);

    const energyData = localStorage.getItem("energyData");
    if (!energyData) throw new Error();

    const energy = JSON.parse(energyData);

    useEffect(() => {
        const fetchDate = async () => {
            try {
                const estimate = await getEstimate();
                console.log(estimate);
                setResult(estimate);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        fetchDate();
    }, []);

    if (loading) {
        return (
            <div className="waiting">
                <div className="cog"></div>
                <p>just fetching the solar irradiance of your area ...</p>
            </div>
        );
    }

    // transform irradiance object into array for Recharts
    const monthlyData = result.irradiance.slice(0, 12);
    const avgData = result.irradiance.slice(12)[0].irradiance;

    // Object.entries(result.irradiance)
    //     .filter(([month]) => Number(month) <= 12) // ignore "13"
    //     .map(([month, value]) => ({
    //         month,
    //         irradiance: value,
    //     }));

    return (
        <div className="resultsPage">
            <div className="solarGraph">
                <h3>
                    Here is the average daily solar irradiance for your area,
                </h3>
                {/* <span className="comment">(kWh/m²/day)</span> */}
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            interval={0}
                            angle={-45}
                            textAnchor="end"
                        />
                        <YAxis
                            label={{
                                value: "kWh/m²/day",
                                angle: -90,
                                position: "insideLeft",
                                style: { textAnchor: "middle" },
                            }}
                        />
                        <Tooltip
                            formatter={(value: number | string) => {
                                const num =
                                    typeof value === "number"
                                        ? value
                                        : parseFloat(value);
                                return [
                                    `${num.toFixed(2)} kWh/m²/day`,
                                    "Irradiance",
                                ];
                            }}
                        />
                        <Area
                            data={monthlyData}
                            type="monotone"
                            dataKey="irradiance"
                            stroke="#1d72b8"
                            fill="#1d72b8"
                        />
                        <ReferenceLine
                            y={avgData}
                            stroke="red"
                            strokeDasharray="5 5"
                            label={{
                                value: "Avg",
                                position: "insideTopRight",
                                fill: "red",
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="sum">
                using the yearly average system size:
                <span className="numerator">
                    {(energy.usage / 365).toFixed(2)}
                    <span className="comment"> (daily usage, kWh)</span>
                </span>
                /
                <span className="denominator">
                    {avgData.toFixed(2)}
                    <span className="comment">
                        {" "}
                        (solar irradiance) {/*  kWh/m²/day */}
                    </span>
                </span>
                <span className="equals">
                    = {(energy.usage / 365 / avgData).toFixed(2)} kw size system
                </span>
            </div>
            we should be able to do this for 16.000 - 18.000 $
            <div className="pitch">
                this calculation has assumed a system loss of 80% and has not
                taken the angle of the roof, seasons and shadding into account
                (important things), you should deffinetly speak to one of our
                experts for more help:
                <LeadForm />
            </div>
        </div>
    );
}
function setError(arg0: any) {
    throw new Error("Function not implemented.");
}

export default Results;
