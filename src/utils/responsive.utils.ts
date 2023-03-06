import { Dimensions, StyleSheet, ViewStyle } from "react-native";
import { ImageStyle, TextStyle } from "react-native";

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const h = (size: number) => {
  return (Dimensions.get("window").width * size) / guidelineBaseWidth;
};

export const v = (size: number) => {
  return (Dimensions.get("window").height * size) / guidelineBaseHeight;
};
const r = {
  v,
  h,
};

const MATRIX: any = {
  top: v,
  bottom: v,
  height: v,
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

class ResponsiveStyleSheet {
  static create<T extends NamedStyles<T> | NamedStyles<any>>(
    style: T | NamedStyles<T>
  ) {
    for (const className in style) {
      for (const cssRuleName in style[className]) {
        if (
          typeof style[className][cssRuleName] === "number" &&
          MATRIX[cssRuleName] !== undefined
        ) {
          style[className][cssRuleName] = MATRIX[cssRuleName](
            style[className][cssRuleName]
          );
        }
      }
    }
    return StyleSheet.create(style);
  }
}
export { r, ResponsiveStyleSheet };
