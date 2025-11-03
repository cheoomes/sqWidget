"use client";

import SearchMap from "./pages/mapPage";
import ProgressBar from "./components/progressBar";
import ProgressBtns from "./components/progressBtns";
import { useEffect, useState } from "react";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Usage from "./pages/usagePage";
import Results from "./pages/resultsPage";
import SolarWidgetLanding from "./pages/pitchPage";
import { getSettings } from "./services/getSettings";

import styles from "./media/widget.module.css";

const Home = () => {
    //the paging var's
    const [step, setStep] = useState<number>(1);
    const mesages: string[] = [
        "search house",
        "information",
        "solar potential",
    ];
    const totalSteps = mesages.length;

    useEffect(() => {
        getSettings();
    }, []);

    const stepUpdate = (newValue: number) => {
        setStep(newValue);
    };

    return (
        <div className={styles.widget}>
            {/* <p>
                get an online solar quotation (estimate) within 30sec (no email
                or phonenumber requird)
            </p> */}
            {/* <div className="progress-content"> */}
            <ProgressBar
                step={step}
                totalSteps={totalSteps}
                msg={mesages[step - 1]}
            />

            {/* page */}
            <div className="pages">
                {step === 0 ? <SolarWidgetLanding /> : null}

                <LoadScript
                    // only load it once - only in if.
                    googleMapsApiKey={
                        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
                    }
                    libraries={["places"]}
                >
                    {step === 1 ? <SearchMap /> : null}
                </LoadScript>

                {step === 2 ? <Usage /> : null}

                {step === 3 ? <Results /> : null}
            </div>
            {step !== 0 ? (
                <ProgressBtns step={step} stepUpdate={stepUpdate} />
            ) : null}
        </div>
    );
};

export default Home;
