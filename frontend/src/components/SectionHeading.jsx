import React from "react";

const SectionHeading = ({ index, eyebrow, title, description, align = "left" }) => {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignClass}`}>
      <div
        className={`flex items-center gap-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {index && (
          <span className="font-mono text-xs text-primary">{index}.</span>
        )}
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </span>
        <span className="h-px w-10 bg-border hidden sm:inline-block" />
      </div>
      <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground leading-relaxed">{description}</p>
      )}
    </div>
  );
};

export default SectionHeading;
