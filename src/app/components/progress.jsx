import React from "react";
import "../media/widget.css";

function Progress({ step, totalSteps }) {
    const progress = ((step - 1) / (totalSteps - 1)) * 100;

    return (
        <div
            className="progress"
            style={{
                width: `${progress}%`,
            }}
        ></div>
    );
}

export default Progress;
