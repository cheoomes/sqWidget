"use client";

import SearchMap from "./pages/mapPage";
import ProgressBar from "./components/progressBar";
import ProgressBtns from "./components/progressBtns";
import { useEffect, useState } from "react";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Usage from "./pages/usagePage";
import Results from "./pages/resultsPage";

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
        console.log(`Count has been updated to: ${step}`);
    }, []);

    const stepUpdate = (newValue: number) => {
        setStep(newValue);
    };

    return (
        <div className="widget">
            <p>
                get an online solar quotation (estimate) within 30sec (no email
                or phonenumber requird)
            </p>
            {/* <div className="progress-content"> */}
            <ProgressBar
                step={step}
                totalSteps={totalSteps}
                msg={mesages[step - 1]}
            />

            {/* page */}
            <div className="pages">
                <LoadScript
                    // only load it once
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
            <ProgressBtns step={step} stepUpdate={stepUpdate} />
            {/* </div> */}
        </div>
    );
};

export default Home;
