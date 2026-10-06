import React from 'react';

interface ReweraLogoProps {
  className?: string;
  size?: number;
}

export const ReweraLogoMark: React.FC<ReweraLogoProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="REWERA Logo Mark"
    >
      <defs>
        <linearGradient id="navRibbonGrad" x1="0%" y1="50%" x2="100%" y2="20%">
          <stop offset="0%" stopColor="#808B6B" />
          <stop offset="45%" stopColor="#707C5B" />
          <stop offset="80%" stopColor="#555E45" />
          <stop offset="100%" stopColor="#464E37" />
        </linearGradient>

        <linearGradient id="navFoldShadow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F583D" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#6B7756" />
          <stop offset="100%" stopColor="#8D9A77" />
        </linearGradient>

        <linearGradient id="navLeafGrad" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#7B8765" />
          <stop offset="50%" stopColor="#5C6649" />
          <stop offset="100%" stopColor="#414933" />
        </linearGradient>

        <linearGradient id="navTerracottaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#85533A" />
          <stop offset="40%" stopColor="#A56E51" />
          <stop offset="75%" stopColor="#BA8062" />
          <stop offset="100%" stopColor="#C88E71" />
        </linearGradient>
      </defs>

      <g transform="translate(0, -10)">
        {/* Top Ribbon Sweep */}
        <path
          d="M 160 135 C 220 130, 275 142, 305 180 C 328 208, 325 240, 298 270 C 285 284, 268 290, 250 286 C 280 270, 292 242, 280 215 C 265 180, 215 160, 175 158 C 165 158, 155 145, 160 135 Z"
          fill="url(#navRibbonGrad)"
        />

        {/* Ribbon Fold Detail */}
        <path
          d="M 285 165 C 310 195, 318 228, 298 262 C 288 278, 272 287, 252 287 C 275 272, 288 250, 285 228 C 282 205, 270 185, 250 172 C 265 166, 275 165, 285 165 Z"
          fill="url(#navFoldShadow)"
          opacity="0.85"
        />

        {/* Left Leaf Shape */}
        <path
          d="M 246 242 C 230 220, 195 185, 165 180 C 160 195, 165 240, 200 275 C 220 295, 240 325, 238 350 C 236 360, 228 368, 215 372 C 205 375, 210 380, 222 376 C 245 368, 256 345, 252 320 C 248 295, 226 270, 210 252 C 185 225, 185 198, 195 190 C 215 205, 240 230, 246 242 Z"
          fill="url(#navLeafGrad)"
        />

        {/* Leaf Spine Highlight */}
        <path
          d="M 172 188 C 192 215, 220 255, 235 315 C 238 330, 235 348, 228 362"
          stroke="#FAF8F5"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Terracotta Right Leg */}
        <path
          d="M 252 270 C 260 266, 270 270, 276 280 C 290 305, 315 345, 360 365 C 382 374, 405 376, 425 368 C 400 382, 368 382, 342 368 C 305 348, 280 305, 268 285 C 262 276, 256 272, 252 270 Z"
          fill="url(#navTerracottaGrad)"
        />
      </g>
    </svg>
  );
};
