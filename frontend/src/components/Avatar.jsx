import React from "react";
import { profile } from "../data/portfolioData";

// Reusable avatar block. If avatarImage is provided in portfolioData, it shows;
// otherwise it renders a stylized placeholder with the user's initials and a clear
// label so it's obvious where to drop the real image.
const Avatar = ({ size = "lg", showHint = true }) => {
  const sizes = {
    sm: "h-16 w-16 text-lg",
    md: "h-28 w-28 text-3xl",
    lg: "h-48 w-48 sm:h-56 sm:w-56 text-5xl",
    xl: "h-72 w-72 text-7xl",
  };
  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="relative inline-block">
      <div
        className={`${sizes[size]} rounded-full overflow-hidden relative border border-border bg-secondary flex items-center justify-center`}
      >
        {profile.avatarImage ? (
          <img
            src={profile.avatarImage}
            alt={profile.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-grid opacity-60" />
            <span className="font-display font-bold text-foreground/90 relative z-10">
              {initials}
            </span>
          </>
        )}
      </div>
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 inline-flex h-7 items-center gap-1 rounded-full bg-primary px-3 text-[10px] font-mono font-semibold text-primary-foreground border-2 border-card whitespace-nowrap">
        <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground animate-pulse" />
        OPEN TO WORK
      </span>
      {showHint && !profile.avatarImage && (
        <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-[9px] font-mono text-muted-foreground/70 whitespace-nowrap">
          {"// avatarImage in portfolioData.js"}
        </span>
      )}
    </div>
  );
};

export default Avatar;
