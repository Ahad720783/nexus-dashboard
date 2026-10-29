import React from 'react';

/**
 * User avatar component reproducing the "RK" circular badge from PDF page 3
 */
export const UserAvatar = ({
  initials = "IR",
  isGuest = false,
  size = "w-7 h-7",
  className = "",
  title
}) => {
  const isGuestMode = isGuest || initials === "Guest";
  const displayTitle =
    title ||
    (isGuestMode
      ? "Guest Reviewer (Guest Session)"
      : `Reviewer ${initials} (Institutional Account)`);

  if (isGuestMode) {
    return (
      <div
        className={`relative inline-flex items-center justify-center rounded-full bg-blue-100 border-2 border-blue-200 text-blue-700 font-semibold select-none shadow-xs shrink-0 h-7 px-2.5 text-xs ${className}`}
        title={displayTitle}
      >
        <span className="tracking-tight text-[11px] font-semibold">Guest</span>
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-blue-100 border-2 border-blue-200 text-blue-700 font-bold text-xs select-none shadow-xs shrink-0 ${size} ${className}`}
      title={displayTitle}
    >
      <span className="tracking-tight">{initials}</span>
    </div>
  );
};

export default UserAvatar;
