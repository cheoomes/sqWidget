import React from 'react';

// Simple SunIcon component with internal styles (kept in the same file)
type SunIconProps = {
  size?: number;
  color?: string;
};

export default function SunIcon({ size = 44, color = '#FFC107' }: SunIconProps) {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    display: 'inline-block',
    color: color,
    flexShrink: 0,
  };

  return (
    <svg
      style={style}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </g>
    </svg>
  );
}
