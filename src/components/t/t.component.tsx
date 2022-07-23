import { useTranslation } from "react-i18next";
import { IHeadingProps, Text, ITextProps } from "native-base";
import { fontKey, theme } from "./../../theme/index";
export interface Props extends ITextProps {
  id?: string;
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}

export function T(p: Props & IHeadingProps) {
  const { t } = useTranslation();
  const { id, fontWeight, ...otherProps } = p;
  const text = id ? t(id) : p.children;
  const fontFamily =
    theme.fontConfig[fontKey][(p.fontWeight as number) || 300].normal;
  return (
    <Text fontFamily={fontFamily} {...otherProps}>
      {text}
    </Text>
  );
}
