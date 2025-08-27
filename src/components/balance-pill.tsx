// components/InfoPill.tsx
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

type BalancePillProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function BalancePill({ title, subtitle, className }: BalancePillProps) {
  return (
    <div
      className={cn(
        "flex",
        "w-full",
        "items-end",
        "justify-between",
        "rounded-2xl border bg-muted/40 px-4 py-4",
        "text-muted-foreground",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Info className="h-5 w-5 shrink-0" />
        <h4 className="text-base font-semibold tracking-tight text-foreground">
          {title}
        </h4>
      </div>

      {subtitle ? (
        <p className="mt-1 text-sm leading-6 text-left">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
