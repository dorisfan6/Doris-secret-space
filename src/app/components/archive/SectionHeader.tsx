import * as React from "react";

import { cn } from "../ui/utils";

type SectionHeaderProps = {
  align?: "left" | "center";
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
};

export function SectionHeader({
  align = "center",
  eyebrow,
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      <div className="section-eyebrow">{eyebrow}</div>
      <h2
        className={cn(
          "section-title mt-6 text-5xl md:text-7xl",
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "section-subtitle mt-5 text-xl md:text-3xl",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
