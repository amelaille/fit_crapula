type InfoCalloutProps = {
  title?: string;
  children: React.ReactNode;
  tone?: "info" | "warning" | "accent";
};

const toneStyles: Record<NonNullable<InfoCalloutProps["tone"]>, string> = {
  info: "bg-nude/60 border-nude-foreground/15 text-foreground",
  warning: "bg-accent-soft border-accent/25 text-foreground",
  accent: "bg-accent-soft border-accent/30 text-foreground",
};

export default function InfoCallout({
  title,
  children,
  tone = "info",
}: InfoCalloutProps) {
  return (
    <div className={`rounded-2xl border px-4 py-3.5 text-sm leading-relaxed sm:px-5 sm:py-4 ${toneStyles[tone]}`}>
      {title && <p className="mb-1.5 font-semibold">{title}</p>}
      <div className="text-[0.925rem] text-foreground/85 [&>p+p]:mt-2">{children}</div>
    </div>
  );
}
