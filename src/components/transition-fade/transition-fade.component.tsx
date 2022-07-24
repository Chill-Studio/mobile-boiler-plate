import React, { useEffect, useState } from "react";
import { PresenceTransition } from "native-base";

const ANIM_DURATION = 1000;

export function TransitionFade(p: {
  children: JSX.Element;
  animDuration?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <PresenceTransition
      visible={isVisible}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: p.animDuration || ANIM_DURATION,
        },
      }}
    >
      {p.children}
    </PresenceTransition>
  );
}
