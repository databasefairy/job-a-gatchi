import { PetMood } from "@/hooks/usePetState";
import { useEffect, useState } from "react";

interface CatSpriteProps {
  mood: PetMood;
  justFed?: boolean;
}

const CatSprite = ({ mood, justFed }: CatSpriteProps) => {
  const [playHappy, setPlayHappy] = useState(false);

  useEffect(() => {
    if (justFed) {
      setPlayHappy(true);
      const timer = setTimeout(() => setPlayHappy(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [justFed]);

  const animClass =
    playHappy || mood === "happy"
      ? "cat-sprite-happy"
      : mood === "sad" || mood === "starving"
        ? "cat-sprite-sad"
        : "cat-sprite-idle";

  return (
    <div
      className={`cat-sprite ${animClass}`}
      aria-label={`Pet cat feeling ${mood}`}
    />
  );
};

export default CatSprite;
