import { type CSSProperties, type ReactNode } from "react";

export function DeskSurface({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return <div className={`desk-surface ${className}`}>{children}</div>;
}

export function ArchiveFolder({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`archive-folder ${className}`}>{children}</div>;
}

export function FolderTab({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return <div aria-hidden="true" className={`archive-folder-tab ${className}`} style={style} />;
}

export function BinderSleeve({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return <div aria-hidden="true" className={`binder-sleeve ${className}`} style={style} />;
}

export function PaperInsert({
  className = "",
  children,
  style,
}: {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className={`paper-insert ${className}`} style={style}>
      {children}
    </div>
  );
}

export function PrintedPhoto({
  className = "",
  children,
  style,
}: {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className={`printed-photo ${className}`} style={style}>
      {children}
    </div>
  );
}

export function MetadataLabel({
  className = "",
  children,
  style,
}: {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className={`metadata-label ${className}`} style={style}>
      {children}
    </div>
  );
}

export function TapeTab({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return <div aria-hidden="true" className={`tape-tab ${className}`} style={style} />;
}

export function VellumOverlay({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return <div aria-hidden="true" className={`vellum-overlay ${className}`} style={style} />;
}

export function ClipDetail({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return <div aria-hidden="true" className={`clip-detail ${className}`} style={style} />;
}
