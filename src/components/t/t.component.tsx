import { Text, TextProps } from "react-native";

import { TYPOGRAPHY } from "@theme";
import { useTranslation } from "react-i18next";

export interface Props extends TextProps {
  id?: string;
  type?: "xl" | "lg" | "m" | "sm" | "xs";
}

export function T(p: Props & TextProps) {
  const { t } = useTranslation();
  const { id, style, type, ...otherProps } = p;
  const text = id ? t(id) : p.children;
  return <Text {...otherProps} style={[style, {fontSize:  TYPOGRAPHY[type ||"m"].fontSize }]}  >{text}</Text>;
}
