import { PetLevel, PetMood } from "@/hooks/usePetState";
import { Progress } from "@/components/ui/progress";

interface PetDisplayProps {
  level: PetLevel;
  mood: PetMood;
  hungerPercent: number;
  growthPercent: number;
  totalJobs: number;
  hasInterview: boolean;
  hasOffer: boolean;
  isStarving: boolean;
}

const EggSprite = ({ mood }: { mood: PetMood }) => (
  <svg viewBox="0 0 64 64" className="w-32 h-32 pixel-art">
    {/* Egg body */}
    <ellipse cx="32" cy="36" rx="18" ry="22" fill="hsl(var(--foreground))" opacity="0.1" />
    <ellipse cx="32" cy="34" rx="16" ry="20" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* Crack lines */}
    <path d="M24 30 L28 26 L26 32 L30 28" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" />
    {/* Eyes (if mood is not neutral) */}
    {mood !== "neutral" && (
      <>
        <circle cx="27" cy="34" r="2" fill="hsl(var(--foreground))" />
        <circle cx="37" cy="34" r="2" fill="hsl(var(--foreground))" />
      </>
    )}
    {/* Question mark for neutral */}
    {mood === "neutral" && (
      <text x="32" y="38" textAnchor="middle" fontSize="12" fill="hsl(var(--muted-foreground))" fontFamily="'Press Start 2P'">?</text>
    )}
  </svg>
);

const BlobSprite = ({ mood }: { mood: PetMood }) => (
  <svg viewBox="0 0 64 64" className="w-32 h-32 pixel-art">
    {/* Shadow */}
    <ellipse cx="32" cy="56" rx="16" ry="4" fill="hsl(var(--foreground))" opacity="0.1" />
    {/* Body */}
    <ellipse cx="32" cy="38" rx="18" ry="16" fill="hsl(var(--foreground))" opacity="0.85" />
    {/* Ears */}
    <polygon points="16,28 20,16 26,26" fill="hsl(var(--foreground))" opacity="0.85" />
    <polygon points="48,28 44,16 38,26" fill="hsl(var(--foreground))" opacity="0.85" />
    <polygon points="18,26 22,18 25,26" fill="hsl(var(--secondary))" opacity="0.4" />
    <polygon points="46,26 42,18 39,26" fill="hsl(var(--secondary))" opacity="0.4" />
    {/* Eyes */}
    <ellipse cx="26" cy="36" rx="3" ry={mood === "happy" ? 2 : 3} fill="hsl(var(--primary-foreground))" />
    <ellipse cx="38" cy="36" rx="3" ry={mood === "happy" ? 2 : 3} fill="hsl(var(--primary-foreground))" />
    <circle cx="26" cy="36" r="1.5" fill="hsl(var(--primary))" />
    <circle cx="38" cy="36" r="1.5" fill="hsl(var(--primary))" />
    {/* Mouth */}
    {mood === "happy" && <path d="M28 42 Q32 46 36 42" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" fill="none" />}
    {mood === "sad" && <path d="M28 44 Q32 40 36 44" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" fill="none" />}
    {mood === "starving" && (
      <>
        <path d="M28 44 Q32 40 36 44" stroke="hsl(var(--destructive))" strokeWidth="1.5" fill="none" />
        {/* Sweat drop */}
        <ellipse cx="44" cy="32" rx="2" ry="3" fill="hsl(var(--growth))" opacity="0.6" />
      </>
    )}
    {mood === "neutral" && <line x1="28" y1="42" x2="36" y2="42" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" />}
    {/* Whiskers */}
    <line x1="14" y1="38" x2="22" y2="40" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
    <line x1="14" y1="42" x2="22" y2="42" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
    <line x1="50" y1="38" x2="42" y2="40" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
    <line x1="50" y1="42" x2="42" y2="42" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
  </svg>
);

const AssociateSprite = ({ mood }: { mood: PetMood }) => (
  <svg viewBox="0 0 64 64" className="w-32 h-32 pixel-art">
    {/* Shadow */}
    <ellipse cx="32" cy="58" rx="14" ry="3" fill="hsl(var(--foreground))" opacity="0.1" />
    {/* Body */}
    <ellipse cx="32" cy="42" rx="16" ry="14" fill="hsl(var(--foreground))" opacity="0.85" />
    {/* Head */}
    <circle cx="32" cy="26" r="14" fill="hsl(var(--foreground))" opacity="0.85" />
    {/* Ears */}
    <polygon points="20,18 18,4 28,14" fill="hsl(var(--foreground))" opacity="0.85" />
    <polygon points="44,18 46,4 36,14" fill="hsl(var(--foreground))" opacity="0.85" />
    <polygon points="21,16 20,7 27,14" fill="hsl(var(--secondary))" opacity="0.4" />
    <polygon points="43,16 44,7 37,14" fill="hsl(var(--secondary))" opacity="0.4" />
    {/* Eyes */}
    <ellipse cx="26" cy="24" rx="3.5" ry={mood === "happy" ? 2.5 : 3.5} fill="hsl(var(--primary-foreground))" />
    <ellipse cx="38" cy="24" rx="3.5" ry={mood === "happy" ? 2.5 : 3.5} fill="hsl(var(--primary-foreground))" />
    <circle cx="26" cy="24" r="2" fill="hsl(var(--primary))" />
    <circle cx="38" cy="24" r="2" fill="hsl(var(--primary))" />
    {/* Eye sparkles */}
    <circle cx="27.5" cy="22.5" r="0.8" fill="hsl(var(--primary-foreground))" />
    <circle cx="39.5" cy="22.5" r="0.8" fill="hsl(var(--primary-foreground))" />
    {/* Nose */}
    <ellipse cx="32" cy="28" rx="2" ry="1.5" fill="hsl(var(--secondary))" />
    {/* Mouth */}
    {mood === "happy" && <path d="M27 30 Q32 35 37 30" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" fill="none" />}
    {mood === "sad" && <path d="M28 33 Q32 29 36 33" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" fill="none" />}
    {mood === "starving" && <path d="M28 33 Q32 29 36 33" stroke="hsl(var(--destructive))" strokeWidth="2" fill="none" />}
    {mood === "neutral" && <line x1="28" y1="31" x2="36" y2="31" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" />}
    {/* Whiskers */}
    <line x1="12" y1="26" x2="22" y2="28" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
    <line x1="12" y1="30" x2="22" y2="30" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
    <line x1="52" y1="26" x2="42" y2="28" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
    <line x1="52" y1="30" x2="42" y2="30" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
    {/* Tie / collar */}
    <rect x="29" y="34" width="6" height="4" rx="1" fill="hsl(var(--accent))" />
    <polygon points="30,38 34,38 32,44" fill="hsl(var(--accent))" />
    {/* Sparkles for happy associate */}
    {mood === "happy" && (
      <>
        <text x="8" y="12" fontSize="6" className="animate-pulse">✨</text>
        <text x="50" y="10" fontSize="6" className="animate-pulse" style={{ animationDelay: "0.5s" }}>✨</text>
        <text x="52" y="48" fontSize="5" className="animate-pulse" style={{ animationDelay: "1s" }}>⭐</text>
      </>
    )}
  </svg>
);

const LEVEL_LABELS: Record<PetLevel, string> = {
  egg: "🥚 Egg",
  blob: "🐱 Intern Blob",
  associate: "💼 Junior Associate",
};

const MOOD_LABELS: Record<PetMood, string> = {
  happy: "Happy & Fed!",
  neutral: "Waiting...",
  sad: "Getting hungry...",
  starving: "STARVING! Add a job!",
};

const PetDisplay = ({ level, mood, hungerPercent, growthPercent, totalJobs, hasInterview, hasOffer, isStarving }: PetDisplayProps) => {
  const animationClass = mood === "starving" || mood === "sad" ? "animate-pet-sad" : mood === "happy" ? "animate-pet-bounce" : "";

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Retro frame */}
      <div className={`relative rounded-2xl border-4 border-pet-frame bg-card p-6 shadow-lg scanlines overflow-hidden ${isStarving ? "grayscale-filter" : ""}`}>
        <div className="absolute top-2 left-3 font-pixel text-[8px] text-muted-foreground">JOB-A-GOTCHI</div>
        <div className="flex flex-col items-center gap-3 pt-4">
          <div className={animationClass}>
            {level === "egg" && <EggSprite mood={mood} />}
            {level === "blob" && <BlobSprite mood={mood} />}
            {level === "associate" && <AssociateSprite mood={mood} />}
          </div>
          {/* Accessories */}
          {hasOffer && (
            <svg viewBox="0 0 40 20" className="w-16 h-8 absolute top-8 gold-crown">
              <polygon points="4,18 8,6 14,14 20,2 26,14 32,6 36,18" fill="currentColor" />
              <circle cx="14" cy="12" r="2" fill="hsl(var(--destructive))" />
              <circle cx="20" cy="6" r="2" fill="hsl(var(--primary))" />
              <circle cx="26" cy="12" r="2" fill="hsl(var(--destructive))" />
            </svg>
          )}
          {hasInterview && !hasOffer && level !== "egg" && (
            <svg viewBox="0 0 20 30" className="w-6 h-10 interview-tie" style={{ marginTop: "-12px" }}>
              <rect x="7" y="0" width="6" height="6" rx="1" fill="currentColor" />
              <polygon points="5,6 15,6 12,28 8,28" fill="currentColor" />
            </svg>
          )}
          <p className="font-pixel text-[10px] text-muted-foreground">{LEVEL_LABELS[level]}</p>
          <p className={`font-pixel text-[8px] ${mood === "starving" ? "text-destructive" : "text-muted-foreground"}`}>
            {MOOD_LABELS[mood]}
          </p>
        </div>
      </div>

      {/* Stats bars */}
      <div className="w-full max-w-xs space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between font-pixel text-[8px]">
            <span>🍖 Hunger</span>
            <span>{Math.round(hungerPercent)}%</span>
          </div>
          <Progress
            value={hungerPercent}
            className="h-3"
            style={{
              // @ts-ignore
              "--progress-color": hungerPercent < 30 ? "hsl(var(--hunger-low))" : "hsl(var(--hunger))",
            } as React.CSSProperties}
          />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between font-pixel text-[8px]">
            <span>📈 Career Growth</span>
            <span>{Math.round(growthPercent)}%</span>
          </div>
          <Progress value={growthPercent} className="h-3" />
        </div>
        <p className="text-center font-pixel text-[8px] text-muted-foreground">
          {totalJobs} job{totalJobs !== 1 ? "s" : ""} tracked
        </p>
      </div>
    </div>
  );
};

export default PetDisplay;
