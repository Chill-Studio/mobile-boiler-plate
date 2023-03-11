import { Text, TextProps } from "react-native";

import { useTranslation } from "react-i18next";

export interface Props extends TextProps {
  id?: string;
  type?: "xxl" | "xl" | "l" | "m" | "sm" | "xs";
}

export function T(p: Props & TextProps) {
  const { t } = useTranslation();
  const { id, type, ...otherProps } = p;
  const text = id ? t(id) : p.children;
  return <Text {...otherProps}>{text}</Text>;
}
