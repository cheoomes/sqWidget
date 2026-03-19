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
import Spinner from "../components/Spinner";
import SunIcon from "../components/SunIcon";

import "../media/resultsPage.css";

function Results() {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<any>(null);

    //loading lead data
    const energyData = localStorage.getItem("energyData");
    const mapCenter = localStorage.getItem("mapCenter");

    if (!energyData || !mapCenter) {
        throw new Error();
    }
    const energy = JSON.parse(energyData);
    const location = JSON.parse(mapCenter);

    useEffect(() => {
        const fetchDate = async () => {
            try {
                const estimate = await getEstimate(
                    energy.usage,
                    location.lat,
                    location.lng
                );
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
                <Spinner />
                <p>collecting data from NASA</p>
            </div>
        );
    }

    console.log(result.irradiance);
    // transform irradiance object into array for Recharts
    const monthlyData = result.irradiance.slice(0, 12);
    const avgData = result.irradiance.slice(12)[0].irradiance;

    // Object.entries(result.irradiance)
    //     .filter(([month]) => Number(month) <= 12) // ignore "13"
    //     .map(([month, value]) => ({
    //         month,
    //         irradiance: value,
    //     }));

    // Assume system efficiency (fraction of ideal production realized).
    // For example 0.8 corresponds to 80% system efficiency (losses from inverter, soiling, wiring, etc.).
    const systemEfficiency = 0.8;

    // Required system size (kW) = daily energy needed (kWh/day) / (average irradiance * system efficiency)
    const quote = energy.usage / 365 / (avgData * systemEfficiency);

    return (
        <div className="resultsPage">
            <div className="results-top">
                <div className="solarGraph">
                    <h3>The average daily solar irradiance for your area,</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={monthlyData}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e9edf0"
                            />
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
                                dataKey="irradiance"
                                type="monotone"
                                stroke="var(--progress-color)"
                                fill="rgba(0,168,99,0.12)"
                            />
                            <ReferenceLine
                                y={avgData}
                                stroke="var(--light-text-color)"
                                strokeDasharray="5 5"
                            />
                        </AreaChart>
                    </ResponsiveContainer>

                    <div className="chart-caption">
                        Average: {avgData.toFixed(2)} kWh/day
                    </div>
                </div>

                <div className="results-math">
                    <div className="conclusion">
                        <div className="conclusion-main">
                            <div className="conclusion-header">
                                <div>
                                    <div className="conclusion-label">
                                        Estimated system size,
                                    </div>

                                    <div className="conclusion-value-wrap">
                                        <SunIcon size={44} color="#FFC107" />
                                        <div className="conclusion-value">
                                            {quote.toFixed(2)} kW
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="conclusion-footer">
                <div className="conclusion-note">
                    This calculation is based on your average daily energy
                    consumption, the average amount of sunshine (solar
                    irradiance) and an ~80% system efficiency. The tilt of the
                    roof, wether there is actually any space, shade and seasonal
                    variation are things which definitely should be considered,{" "}
                    <button
                        className="link-button"
                        onClick={() => {
                            document
                                .querySelector(".results-form")
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                });
                        }}
                    >
                        talk to one of our experts →
                    </button>
                </div>
            </div>

            <div className="results-form">
                <LeadForm
                    lng={location.lng}
                    lat={location.lat}
                    quote={quote}
                    energyConsumption={energy.usage}
                    bill={energy.cost}
                />
            </div>
        </div>
    );
}
function setError(arg0: any) {
    throw new Error("Function not implemented.");
}

export default Results;
