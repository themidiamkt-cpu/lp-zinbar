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
      <Badge tone="accent">{eyebrow}</Badge>
      <h2 className="section-title mt-5">{title}</h2>
      {description ? (
        <p className={cn("section-body mt-4 max-w-2xl", align === "center" && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
