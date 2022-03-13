import React, { ReactNode } from "react";
import { Box } from "native-base";
import { TransitionFade } from "@components";
import { ColorType } from "native-base/lib/typescript/components/types";
export function ContainerPage(p: { children: ReactNode; bg?: ColorType }) {
  return (
    <TransitionFade>
      <Box
        bg={
          p.bg || {
            linearGradient: {
              colors: ["teal.500", "primary.100"],
              start: [0, 0],
              end: [1, 1],
            },
          }
        }
        safeArea
        h="100%"
        p={5}
      >
        {p.children}
      </Box>
    </TransitionFade>
  );
}
