import React, { ReactNode } from "react";

import { Box } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import { TransitionFade } from "../TransitionFade/TransitionFade.component";

export function ContainerPage(p: {
  children: any;
  bg?: ColorType;
  h?: string | number;
}) {
  return <TransitionFade>{p.children}</TransitionFade>;
}
