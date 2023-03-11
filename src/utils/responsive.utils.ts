import { Dimensions, StyleSheet, ViewStyle } from "react-native";
import { ImageStyle, TextStyle } from "react-native";

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export const h = (size: number) => {
  return (WIDTH * size) / guidelineBaseWidth;
};

export const v = (size: number) => {
  return (HEIGHT * size) / guidelineBaseHeight;
};

export const marginPaddingResponsive = (size: number) => {
  return (HEIGHT * size) / guidelineBaseHeight;
};
const r = {
  v,
  h,
};

const MATRIX_CSS_RULES: any = {
  top: v,
  bottom: v,
  height: v,
  margin: v,
  padding: v,
  marginTop: v,
  marginBottom: v,
  marginVertical: v,
  paddingTop: v,
  paddingBottom: v,
  paddingVertical: v,
  lineHeight: v,
  width: h,
  left: h,
  right: h,
  marginLeft: h,
  marginRight: h,
  marginHorizontal: h,
  paddingLeft: h,
  paddingRight: h,
  paddingHorizontal: h,
  fontSize: h,
  borderRadius: h,
  borderWidth: h,
};
type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };
/* 
class ResponsiveStyleSheet {
  static create<T extends NamedStyles<T> | NamedStyles<any>>(
    style: T | NamedStyles<T>
  ) {
    for (const className in style) {
      for (const cssRuleName in style[className]) {
        if (
          typeof style[className][cssRuleName] === "number" &&
          MATRIX_CSS_RULES[cssRuleName] !== undefined
        ) {
          style[className][cssRuleName] = MATRIX_CSS_RULES[cssRuleName](
            style[className][cssRuleName]
          );
        }
      }
    }
    return StyleSheet.create(style);
  }
} */

// Make all stylesheet responsive by applying
function PreProcessResponsiveStyle() {
  console.info(
    "Responsive stylesheets enabled, to disable set useResponsiveStylesheets to false in config."
  );
  for (const cssRuleName in MATRIX_CSS_RULES) {
    StyleSheet.setStyleAttributePreprocessor(cssRuleName, (value) => {
      if (
        typeof value === "number" &&
        MATRIX_CSS_RULES[cssRuleName] !== undefined
      ) {
        return MATRIX_CSS_RULES[cssRuleName](value);
      } else {
        return value;
      }
    });
  }
}
export { r, PreProcessResponsiveStyle };
