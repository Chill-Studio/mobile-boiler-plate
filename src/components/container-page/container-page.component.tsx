import React, { ReactNode } from "react";

import { Box } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import { TransitionFade } from "../transition-fade/transition-fade.component";

export function ContainerPage(p: {
  children: JSX.Element;
  bg?: ColorType;
  h?: string | number;
}) {
  return <TransitionFade>{p.children}</TransitionFade>;
}
