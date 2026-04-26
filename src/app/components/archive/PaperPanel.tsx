import * as React from "react";

import { cn } from "../ui/utils";

type PaperPanelProps = React.ComponentProps<"div"> & {
  variant?: "paper" | "vellum" | "dark";
  clip?: "straight" | "notched" | "soft";
};

const clipClasses = {
  straight: "rounded-[28px]",
  soft: "rounded-[32px]",
  notched: "[clip-path:polygon(0.8%_1%,99%_0%,100%_2.4%,100%_98.6%,98.5%_100%,2.1%_100%,0%_97%)]",
};

export function PaperPanel({
  className,
  variant = "paper",
  clip = "soft",
  ...props
}: PaperPanelProps) {
  return (
    <div
      className={cn(
        "paper-panel",
        variant === "vellum" && "paper-panel-vellum",
        variant === "dark" && "paper-panel-dark text-stone-100",
        clipClasses[clip],
        className,
      )}
      {...props}
    />
  );
}
