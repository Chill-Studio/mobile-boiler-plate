import { Dimensions, StyleSheet } from "react-native";

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const h = (size: number) => {
  return (WIDTH * size) / guidelineBaseWidth;
};

const v = (size: number) => {
  return (HEIGHT * size) / guidelineBaseHeight;
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

// DOES NOT DO SHIT ... Make all stylesheet responsive by applying
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

/* 
type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

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
    const responsiveStyleSheet = StyleSheet.create(style);
    // console.log("in the utils ", (style as any).box2.margin);
    return responsiveStyleSheet;
  }
} */
export { PreProcessResponsiveStyle };
