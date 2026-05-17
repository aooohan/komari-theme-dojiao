import { cn } from "@/utils";

interface SegmentedProgressProps {
  value: number;
  segments?: number;
  className?: string;
  stacked?: { up: number; down: number };
}

const overallColor = (value: number) => {
  if (value > 80) return "bg-rose-500";
  if (value > 50) return "bg-amber-400";
  return "bg-emerald-500";
};

export const SegmentedProgress = ({
  value,
  segments,
  className,
  stacked,
}: SegmentedProgressProps) => {
  const clamped = Math.max(0, Math.min(100, value));
  const segCount = segments ?? (stacked ? 20 : 14);

  let upSegs = 0;
  let downSegs = 0;
  let activeClass = overallColor(clamped);

  if (stacked) {
    let totalSegs = Math.round((clamped / 100) * segCount);
    const up = Math.max(0, stacked.up);
    const down = Math.max(0, stacked.down);
    const sum = up + down;
    if (sum > 0) {
      // When both sides are non-zero, guarantee at least 2 lit segments so each
      // side gets at least 1 — slightly inflates very-low percentages, but makes
      // the split actually visible.
      if (up > 0 && down > 0 && totalSegs < 2) totalSegs = 2;
      if (totalSegs > 0) {
        upSegs = Math.round((up / sum) * totalSegs);
        if (up > 0 && upSegs === 0) upSegs = 1;
        else if (down > 0 && upSegs === totalSegs) upSegs = totalSegs - 1;
        downSegs = totalSegs - upSegs;
      }
    } else {
      upSegs = totalSegs;
    }
  }

  const lit = stacked ? upSegs + downSegs : Math.round((clamped / 100) * segCount);

  return (
    <div
      className={cn(
        stacked
          ? "flex w-full justify-between items-center min-w-0"
          : "flex w-full gap-[2px] items-center min-w-0",
        className
      )}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}>
      {Array.from({ length: segCount }, (_, i) => {
        const active = i < lit;
        let segClass: string;
        if (!active) {
          segClass = "bg-(--accent-a3) scale-75";
        } else if (stacked) {
          segClass = i < upSegs
            ? "bg-blue-500 shadow-[0_0_4px_-1px_currentColor]"
            : "bg-emerald-500 shadow-[0_0_4px_-1px_currentColor]";
        } else {
          segClass = `${activeClass} shadow-[0_0_4px_-1px_currentColor]`;
        }
        return (
          <div
            key={i}
            className={cn(
              stacked
                ? "size-1.5 rounded-full transition-all duration-300 origin-center"
                : "flex-1 h-2.5 rounded-[1.5px] transition-all duration-300 origin-center",
              segClass
            )}
          />
        );
      })}
    </div>
  );
};
