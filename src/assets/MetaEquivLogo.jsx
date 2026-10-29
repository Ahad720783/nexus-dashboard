import React from 'react';

/**
 * MetaEquiv official logo mark based on reference PDF pages 4, 5, 6, 7
 * Dual-network mesh joined by a central lens containing '='
 */
export const MetaEquivIcon = ({ className = "w-10 h-6", light = false }) => {
  const strokeColor = light ? "#ffffff" : "#1d4ed8";
  const nodeLeftColor = light ? "#ffffff" : "#1e293b";
  const nodeRightColor = light ? "#93c5fd" : "#3b82f6";
  const centerColor = light ? "#60a5fa" : "#2563eb";

  return (
    <svg
      viewBox="0 0 160 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Central lens / eye outline */}
      <path
        d="M 50 40 C 62 26, 98 26, 110 40 C 98 54, 62 54, 50 40 Z"
        stroke={centerColor}
        strokeWidth="2.5"
        fill="none"
      />
      {/* Inner lens boundary accent */}
      <path
        d="M 57 40 C 66 32, 94 32, 103 40 C 94 48, 66 48, 57 40 Z"
        stroke={centerColor}
        strokeWidth="1.2"
        strokeOpacity="0.6"
        fill="none"
      />
      {/* Equal sign in center */}
      <line x1="72" y1="36" x2="88" y2="36" stroke={centerColor} strokeWidth="3" strokeLinecap="round" />
      <line x1="72" y1="44" x2="88" y2="44" stroke={centerColor} strokeWidth="3" strokeLinecap="round" />

      {/* Left network connections */}
      <line x1="20" y1="24" x2="38" y2="16" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="20" y1="24" x2="20" y2="56" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="20" y1="24" x2="38" y2="38" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="20" y1="56" x2="38" y2="64" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="20" y1="56" x2="38" y2="38" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="38" y1="16" x2="38" y2="38" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="38" y1="38" x2="38" y2="64" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 2" />
      
      {/* Left to center lens connectors */}
      <path d="M 38 16 C 45 22, 52 30, 62 33" stroke={strokeColor} strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
      <path d="M 38 64 C 45 58, 52 50, 62 47" stroke={strokeColor} strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
      <line x1="38" y1="38" x2="52" y2="40" stroke={strokeColor} strokeWidth="1.5" />

      {/* Left nodes */}
      <circle cx="20" cy="24" r="3.5" fill={nodeLeftColor} />
      <circle cx="20" cy="56" r="3.5" fill={nodeLeftColor} />
      <circle cx="38" cy="16" r="4" fill={nodeLeftColor} />
      <circle cx="38" cy="38" r="4.5" fill={nodeLeftColor} />
      <circle cx="38" cy="64" r="4" fill={nodeLeftColor} />
      <circle cx="38" cy="27" r="2" fill={nodeLeftColor} />

      {/* Right network connections */}
      <line x1="140" y1="24" x2="122" y2="16" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="140" y1="24" x2="140" y2="56" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="140" y1="24" x2="122" y2="38" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="140" y1="56" x2="122" y2="64" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="140" y1="56" x2="122" y2="38" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="122" y1="16" x2="122" y2="38" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="122" y1="38" x2="122" y2="64" stroke={strokeColor} strokeWidth="1.5" />

      {/* Right to center lens connectors */}
      <path d="M 122 16 C 115 22, 108 30, 98 33" stroke={strokeColor} strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
      <path d="M 122 64 C 115 58, 108 50, 98 47" stroke={strokeColor} strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
      <line x1="122" y1="38" x2="108" y2="40" stroke={strokeColor} strokeWidth="1.5" />

      {/* Right nodes */}
      <circle cx="140" cy="24" r="3.5" fill={nodeRightColor} />
      <circle cx="140" cy="56" r="3.5" fill={nodeRightColor} />
      <circle cx="122" cy="16" r="4" fill={nodeRightColor} />
      <circle cx="122" cy="38" r="4.5" fill={nodeRightColor} />
      <circle cx="122" cy="64" r="4" fill={nodeRightColor} />
    </svg>
  );
};

export const MetaEquivLogo = ({ light = false, className = "" }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <MetaEquivIcon className="w-8 h-8 shrink-0" light={light} />
      <div className="leading-tight">
        <div className="flex items-center">
          <span className={`font-bold tracking-tight text-base ${light ? 'text-white' : 'text-slate-900'}`}>
            Meta
          </span>
          <span className="font-bold tracking-tight text-base text-blue-600">
            Equiv
          </span>
        </div>
        <div className={`text-[10px] tracking-tight font-medium ${light ? 'text-slate-400' : 'text-slate-500'}`}>
          Equivalence & Novelty Analyser
        </div>
      </div>
    </div>
  );
};

export default MetaEquivLogo;
