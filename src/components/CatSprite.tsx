import { PetLevel, PetMood } from "@/hooks/usePetState";
import { useEffect, useState } from "react";

interface CatSpriteProps {
  mood: PetMood;
  level: PetLevel;
  justFed?: boolean;
}

const SPRITE_SHEETS: Record<PetLevel, string> = {
  kitten: "/images/cat-kitten.png",
  blob: "/images/cat-teen.png",
  associate: "/images/cat-adult.png",
};

const CatSprite = ({ mood, level, justFed }: CatSpriteProps) => {
  const [isTriggeredHappy, setIsTriggeredHappy] = useState(false);
  const [currentMood, setCurrentMood] = useState<0 | 1 | 2>(0);

  // Trigger happy animation for 3 seconds when justFed changes
  useEffect(() => {
    if (justFed) {
      setIsTriggeredHappy(true);
    }
  }, [justFed]);

  useEffect(() => {
    if (isTriggeredHappy) {
      const victoryTimer = setTimeout(() => setIsTriggeredHappy(false), 3000);
      return () => clearTimeout(victoryTimer);
    }
  }, [isTriggeredHappy]);

  // Determine mood row
  useEffect(() => {
    if (mood === "starving" || mood === "sad") {
      setCurrentMood(2);
    } else if (isTriggeredHappy || mood === "happy") {
      setCurrentMood(1);
    } else {
      setCurrentMood(0);
    }
  }, [mood, isTriggeredHappy]);

  // Map mood to CSS row class
  const moodClass =
    currentMood === 1
      ? "cat-row-happy"
      : currentMood === 2
        ? "cat-row-sad"
        : "cat-row-idle";

  return (
    <div
      className={`cat-sprite-container ${moodClass}`}
      style={{
        backgroundImage: `url('${SPRITE_SHEETS[level]}')`,
      }}
      aria-label={`Pet cat feeling ${mood}, stage ${level}`}
    />
  );
};

export default CatSprite;
