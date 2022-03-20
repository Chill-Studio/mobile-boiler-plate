import React, { ReactNode } from "react";
import { Box } from "native-base";
import { TransitionFade } from "@components";
import { ColorType } from "native-base/lib/typescript/components/types";
export function ContainerPage(p: {
  children: ReactNode;
  bg?: ColorType;
  h?: string | number;
}) {
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
        p={5}
        h={p.h}
      >
        {p.children}
      </Box>
    </TransitionFade>
  );
}
