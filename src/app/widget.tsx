import SearchMap from "./pages/mapPage";
import ProgressBar from "./components/progressBar";
import ProgressBtns from "./components/progressBtns";
import { useEffect, useState } from "react";

import Usage from "./pages/usagePage";
import Results from "./pages/resultsPage";
import SolarWidgetLanding from "./pages/pitchPage";
import { getSettings } from "./services/getSettings";

import "./media/widget.css";

export default function Widget() {
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
        <div>
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
                {/* {step === 0 ? <SolarWidgetLanding /> : null} */}

                {step === 1 ? <SearchMap /> : null}

                {step === 2 ? <Usage /> : null}

                {step === 3 ? <Results /> : null}
            </div>
            {step !== 0 ? (
                <ProgressBtns step={step} stepUpdate={stepUpdate} />
            ) : null}
        </div>
    );
}
