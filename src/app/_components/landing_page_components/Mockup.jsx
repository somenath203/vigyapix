import {
  ArrowRight,
  ChevronDown,
  Download,
  Eye,
  ImageIcon,
  Play,
  Sparkles,
  UploadCloud,
  UserRound,
} from "lucide-react";

// Illustrative, CSS-only mockups built from theme tokens.
// They do not use any image files and are not real generated output.

export function Bottle({ className = "" }) {
  return (
    <div aria-hidden="true" className={`flex flex-col items-center ${className}`}>
      <div className="h-3 w-6 rounded-t-md bg-foreground/80" />
      <div className="h-2 w-4 bg-foreground/25" />
      <div className="relative h-24 w-14 overflow-hidden rounded-2xl border border-border bg-primary shadow-md">
        <div className="absolute inset-x-2 top-9 h-8 rounded-md bg-primary-foreground/85" />
        <div className="absolute left-1.5 top-2 h-16 w-1.5 rounded-full bg-primary-foreground/30" />
      </div>
    </div>
  );
}

// "Plain product photo" look: flat, muted background.
export function PlainPhotoScene({ bottleClass = "scale-100" }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center bg-muted"
    >
      <Bottle className={bottleClass} />
    </div>
  );
}

// "Styled ad" look: soft gradient, spotlight circle, pedestal.
export function AdScene({ bottleClass = "scale-100" }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br from-primary/25 via-card to-primary/10"
    >
      <div className="absolute aspect-square w-3/5 rounded-full bg-primary/15" />
      <div className="absolute inset-x-0 bottom-0 h-1/4 rounded-t-4xl bg-foreground/5" />
      <Bottle className={`relative ${bottleClass}`} />
    </div>
  );
}

// Person-and-product composition (pure CSS silhouette).
export function AvatarScene({ scale = "scale-100" }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full items-end justify-center overflow-hidden bg-linear-to-t from-primary/20 via-muted to-muted"
    >
      <div className={`relative flex origin-bottom flex-col items-center ${scale}`}>
        <div className="size-12 rounded-full bg-foreground/25" />
        <div className="mt-1 h-24 w-32 rounded-t-[3rem] bg-foreground/15" />
        <div className="absolute -right-4 bottom-6 rotate-12">
          <Bottle className="scale-75" />
        </div>
      </div>
    </div>
  );
}

// Video-preview look: gradient frame, play badge, progress track.
export function VideoScene() {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br from-primary/30 via-muted to-card"
    >
      <Bottle className="absolute right-6 top-1/2 -translate-y-1/2 scale-75 opacity-60" />
      <div className="relative grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
        <Play className="size-6 translate-x-0.5" fill="currentColor" />
      </div>
      <div className="absolute inset-x-4 bottom-4 h-1.5 rounded-full bg-foreground/15">
        <div className="h-full w-1/3 rounded-full bg-primary" />
      </div>
    </div>
  );
}

/* ---------- Small previews used inside Feature cards ---------- */

export function BeforeAfterPreview() {
  return (
    <div aria-hidden="true" className="flex items-center gap-3">
      <div className="w-full">
        <div className="aspect-square overflow-hidden rounded-xl border border-border">
          <PlainPhotoScene bottleClass="scale-75" />
        </div>
        <p className="mt-1.5 text-center text-xs text-muted-foreground">
          Product photo
        </p>
      </div>
      <ArrowRight className="size-5 shrink-0 text-primary" />
      <div className="w-full">
        <div className="aspect-square overflow-hidden rounded-xl border border-border">
          <AdScene bottleClass="scale-75" />
        </div>
        <p className="mt-1.5 text-center text-xs text-muted-foreground">
          Ad creative
        </p>
      </div>
    </div>
  );
}

export function AvatarPreview() {
  return (
    <div
      aria-hidden="true"
      className="aspect-16/10 overflow-hidden rounded-xl border border-border"
    >
      <AvatarScene scale="scale-90" />
    </div>
  );
}

export function VideoPreview() {
  return (
    <div
      aria-hidden="true"
      className="aspect-16/10 overflow-hidden rounded-xl border border-border"
    >
      <VideoScene />
    </div>
  );
}

export function HistoryPreview() {
  const tabs = ["Images", "Avatar ads", "Videos"];
  const tiles = [ImageIcon, UserRound, Play, ImageIcon, UserRound, Play];
  return (
    <div aria-hidden="true" className="rounded-xl border border-border bg-muted/50 p-3">
      <div className="flex flex-wrap gap-1.5">
        {tabs.map((tab, index) => (
          <span
            key={tab}
            className={
              index === 0
                ? "rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
                : "rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
            }
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {tiles.map((Icon, index) => (
          <div
            key={index}
            className="grid aspect-square place-items-center rounded-lg border border-border bg-card text-muted-foreground"
          >
            <Icon className="size-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Mini visuals for the "How it works" steps ---------- */

const stepFrame =
  "rounded-xl border border-border bg-muted/50 p-3";

export function UploadStepVisual() {
  return (
    <div aria-hidden="true" className={stepFrame}>
      <div className="flex items-center gap-3 rounded-lg border border-dashed border-border bg-background p-3">
        <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-muted">
          <UploadCloud className="size-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="h-2 w-2/3 rounded-full bg-foreground/20" />
          <div className="h-2 w-1/2 rounded-full bg-foreground/10" />
        </div>
      </div>
      <div className="mt-2 space-y-1.5 rounded-lg border border-border bg-background p-3">
        <div className="h-2 w-full rounded-full bg-foreground/10" />
        <div className="h-2 w-4/5 rounded-full bg-foreground/10" />
      </div>
    </div>
  );
}

export function OptionsStepVisual() {
  return (
    <div aria-hidden="true" className={stepFrame}>
      <div className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
        Image size
        <ChevronDown className="size-4" />
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-background p-2">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className={
              item === 1
                ? "grid size-9 place-items-center rounded-full bg-muted text-muted-foreground ring-2 ring-primary"
                : "grid size-9 place-items-center rounded-full bg-muted text-muted-foreground"
            }
          >
            <UserRound className="size-4" />
          </div>
        ))}
        <span className="ml-auto text-[11px] text-muted-foreground">
          Avatar ads only
        </span>
      </div>
    </div>
  );
}

export function GenerateStepVisual() {
  return (
    <div aria-hidden="true" className={stepFrame}>
      <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
        <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-foreground">Generating</p>
          <div className="mt-2 h-1.5 rounded-full bg-foreground/10">
            <div className="h-full w-2/3 rounded-full bg-primary" />
          </div>
        </div>
      </div>
      <div className="mt-2 aspect-16/7 overflow-hidden rounded-lg border border-border">
        <AdScene bottleClass="scale-50" />
      </div>
    </div>
  );
}

export function ResultStepVisual() {
  return (
    <div aria-hidden="true" className={stepFrame}>
      <div className="aspect-16/8 overflow-hidden rounded-lg border border-border">
        <AdScene bottleClass="scale-75" />
      </div>
      <div className="mt-2 flex gap-2">
        <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-background py-1.5 text-xs font-medium text-foreground">
          <Eye className="size-3.5" /> Preview
        </span>
        <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-primary py-1.5 text-xs font-medium text-primary-foreground">
          <Download className="size-3.5" /> Download
        </span>
      </div>
    </div>
  );
}