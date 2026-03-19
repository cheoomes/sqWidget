import { HomeIcon, BoltIcon, SunIcon } from "@heroicons/react/24/outline";

import Progress from "./progress";

//import "../media/global.css";
import "../media/widget.css";

interface ProgressBarProps {
    step: number;
    totalSteps: number;
    msg: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps, msg }) => {
    function Message({ msg }: { msg: string }) {
        return <h3>{msg}</h3>;
    }

    return (
        <div className="progress-bar">
            <div className="progress-container">
                <Progress totalSteps={totalSteps} step={step} />

                <div className={`${step >= 1 ? "step active" : "step"}`}>
                    <HomeIcon className="logo" />
                </div>
                <div className={`${step >= 2 ? "step active" : "step"}`}>
                    <BoltIcon className="logo" />
                </div>
                <div className={`${step >= 3 ? "step active" : "step"}`}>
                    <SunIcon className="logo" />
                </div>
            </div>

            {/* <Message msg={msg} /> */}
        </div>
    );
};

export default ProgressBar;
