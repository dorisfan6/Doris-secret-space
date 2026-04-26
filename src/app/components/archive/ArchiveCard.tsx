import * as React from "react";

import { cn } from "../ui/utils";

type ArchiveCardProps = React.ComponentProps<"div"> & {
  tilt?: "left" | "right" | "none";
};

export function ArchiveCard({
  className,
  tilt = "none",
  ...props
}: ArchiveCardProps) {
  return (
    <div
      className={cn(
        "archive-card rounded-[24px]",
        tilt === "left" && "-rotate-[1.4deg]",
        tilt === "right" && "rotate-[1.4deg]",
        className,
      )}
      {...props}
    />
  );
}
