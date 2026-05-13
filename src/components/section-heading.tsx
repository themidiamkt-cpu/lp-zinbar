import { Badge } from "@/components/badge";
import { cn } from "@/utils/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)}>
      <div className={cn("flex", align === "center" && "justify-center")}>
        <Badge tone="accent">{eyebrow}</Badge>
      </div>
      <h2 className="section-title mt-5">{title}</h2>
      <div
        className={cn(
          "ornament-line mt-5 max-w-[120px]",
          align === "center" && "mx-auto",
        )}
        aria-hidden
      />
      {description ? (
        <p className={cn("section-body mt-5 max-w-2xl", align === "center" && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
