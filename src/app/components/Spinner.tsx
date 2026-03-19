import React from "react";

const Spinner: React.FC = () => (
    <svg
        className="spinner"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g>
            <circle
                cx="20"
                cy="20"
                r="16"
                stroke="#1d72b8"
                strokeWidth="4"
                opacity="0.2"
            />
            <path
                d="M20 4a16 16 0 0 1 16 16"
                stroke="#1d72b8"
                strokeWidth="4"
                strokeLinecap="round"
            />
        </g>
    </svg>
);

export default Spinner;
