import React from "react";
import { Box } from "native-base";
import { TransitionFade } from "../../components/transition-fade";
import { ColorType } from "native-base/lib/typescript/components/types";
export function ContainerPage(p: {
  children: React.ReactNode;
  bg?: ColorType;
}) {
  return (
    <TransitionFade>
      <Box
        bg={
          p.bg || {
            linearGradient: {
              colors: ["teal.500", "primary.100"] as ColorType[],
              start: [0, 0],
              end: [1, 1],
            },
          }
        }
        safeArea
        h="100%"
      >
        {p.children}
      </Box>
    </TransitionFade>
  );
}
