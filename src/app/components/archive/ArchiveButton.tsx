import { motion } from "motion/react";
import * as React from "react";

import { cn } from "../ui/utils";

type ArchiveButtonProps = React.ComponentProps<typeof motion.button> & {
  variant?: "primary" | "secondary";
};

export function ArchiveButton({
  className,
  variant = "primary",
  ...props
}: ArchiveButtonProps) {
  return (
    <motion.button
      className={cn(
        "archive-button-base rounded-[18px] px-5 py-3 text-[11px]",
        variant === "primary" ? "archive-button-primary" : "archive-button-secondary",
        className,
      )}
      {...props}
    />
  );
}
