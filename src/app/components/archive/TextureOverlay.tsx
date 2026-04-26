import { cn } from "../ui/utils";

type TextureOverlayProps = {
  className?: string;
  opacityClassName?: string;
  variant?: "paper" | "grain";
};

export function TextureOverlay({
  className,
  opacityClassName,
  variant = "grain",
}: TextureOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        variant === "grain" ? "texture-grain" : "texture-paper",
        opacityClassName ?? (variant === "grain" ? "opacity-[0.05]" : "opacity-[0.07]"),
        className,
      )}
    />
  );
}
