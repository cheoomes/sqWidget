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

import Spinner from "../components/Spinner";
import SunIcon from "../components/SunIcon";
import LeadForm from "../components/leadForm";

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
                    location.lng,
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

    const handleScroll = () => {
        document.querySelector(".results-form")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    };

    console.log(result.irradiance);
    // transform irradiance object into array for Recharts
    const avgData = result.irradiance.slice(12)[0].irradiance;

    const systemEfficiency = 0.8;
    // Required system size (kW) = daily energy needed (kWh/day) / (average irradiance * system efficiency)
    const quote = energy.usage / 365 / (avgData * systemEfficiency);

    const monthlyProduction = result.irradiance
        .slice(0, 12)
        .map((month: any) => {
            const production = quote * month.irradiance * systemEfficiency;

            return {
                month: month.month,
                production,
            };
        });

    // Object.entries(result.irradiance)
    //     .filter(([month]) => Number(month) <= 12) // ignore "13"
    //     .map(([month, value]) => ({
    //         month,
    //         irradiance: value,
    //     }));

    // For example 0.8 corresponds to 80% system efficiency (losses from inverter, soiling, wiring, etc.).

    const avgProduction = quote * avgData * systemEfficiency;

    return (
        <div className="resultsPage">
            <div className="results-top">
                {/* <div className="results-math"> */}
                <div className="conclusion">
                    <div className="conclusion-main">
                        <div className="conclusion-header">
                            <div>
                                <div className="conclusion-label">
                                    the system size we recommend,
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
                <div className="note">
                    this estimate is based on your average energy usage and the
                    solar potential in your area.
                    <br />
                    <br />
                    to give you the most accurate quote, we take a few
                    additional factors into account.
                    <button className="link-button" onClick={handleScroll}>
                        speak with an experts to get a personalised quote →
                    </button>
                    {/* The actual production can vary based on factors like roof
                    tilt, shading, and seasonal changes.  The tilt of the
                    roof, wether there is actually any space, shade and seasonal
                    variation are things which definitely should be considered,{" "} */}
                </div>
            </div>
            <div className="solarGraph">
                <h3>
                    estimated daily energy production for a {quote.toFixed(2)}{" "}
                    kW system, in your area:
                </h3>
                <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={monthlyProduction}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e9edf0" />
                        <XAxis
                            dataKey="month"
                            interval={0}
                            angle={-45}
                            textAnchor="end"
                        />
                        <YAxis
                            label={{
                                value: "kWh/day",
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
                                    `${num.toFixed(2)} kWh/day`,
                                    "Production",
                                ];
                            }}
                        />
                        <Area
                            dataKey="production"
                            type="monotone"
                            stroke="var(--progress-color)"
                            fill="rgba(0,168,99,0.12)"
                        />
                        <ReferenceLine
                            y={avgProduction}
                            stroke="var(--light-text-color)"
                            strokeDasharray="5 5"
                        />
                    </AreaChart>
                </ResponsiveContainer>

                <div className="chart-caption">
                    Average production: {avgProduction.toFixed(2)} kWh/day
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
