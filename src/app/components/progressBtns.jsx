"use client";
import React from "react";
import "../media/widget.css";

function ProgressBtns({ step, stepUpdate }) {
    function prevStep() {
        // (step)=> fancy shit to get latest step
        if (step > 1) stepUpdate((step) => step - 1);
    }

    function nextStep() {
        // print(step);
        if (step < 3) stepUpdate((step) => step + 1);
        console.log(step + " ");
    }
    return (
        <div className="btns">
            <button
                className={`${step == 1 ? "btn disabled" : "btn"}`}
                onClick={prevStep}
            >
                back
            </button>
            <button
                className={`${step == 3 ? "btn disabled" : "btn"}`}
                onClick={nextStep}
            >
                next
            </button>
        </div>
    );
}

export default ProgressBtns;
