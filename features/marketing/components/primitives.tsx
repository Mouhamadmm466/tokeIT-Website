import type { ReactNode } from "react";

/**
 * The rail that opens every section: a comment marker, a rule, a live square,
 * and the section number.
 */
export function SectionRail({ marker, index }: { marker: string; index: string }) {
  return (
    <div className="flex items-center gap-4 mb-8" aria-hidden="true">
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
        {marker}
      </span>
      <div className="flex-1 border-t border-border" />
      <span className="inline-block h-2 w-2 bg-signal animate-blink" aria-hidden="true" />
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
        {index}
      </span>
    </div>
  );
}

/** Titled bar that tops every panel. The right slot always carries liveness. */
export function PanelChrome({
  title,
  right,
  inverted = false,
}: {
  title: string;
  right?: ReactNode;
  inverted?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 border-b-2 ${
        inverted ? "border-background/20" : "border-foreground"
      }`}
    >
      <span
        className={`text-[10px] tracking-widest uppercase font-mono ${
          inverted ? "text-background/60" : "text-muted-foreground"
        }`}
      >
        {title}
      </span>
      {right}
    </div>
  );
}

/** Three-square window controls. Marks a panel as terminal-flavoured. */
export function WindowDots() {
  return (
    <span className="flex items-center gap-2" aria-hidden="true">
      <span className="h-2 w-2 bg-signal" />
      <span className="h-2 w-2 bg-foreground" />
      <span className="h-2 w-2 border border-foreground" />
    </span>
  );
}

export function SectionHeading({ lead, accent }: { lead: string; accent?: string }) {
  return (
    <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-balance">
      {lead}
      {accent ? (
        <>
          {/* Explicit space so the accessible name reads "lead accent", not "leadaccent". */}
          {" "}
          <br />
          <span className="text-signal">{accent}</span>
        </>
      ) : null}
    </h2>
  );
}
