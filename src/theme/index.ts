import { LinearGradient } from "expo-linear-gradient";
import { extendTheme } from "native-base";

export const theme = extendTheme({
  // I don't know why but the font config does not work

  useSystemColorMode: false,
  initialColorMode: "dark",
  dependencies: {
    "linear-gradient": LinearGradient,
  },
  fontConfig: {
    EduSABeginner: {
      100: {
        normal: "EduSABeginner-Regular",
      },
      200: {
        normal: "EduSABeginner-Regular",
      },
      300: {
        normal: "EduSABeginner-Regular",
      },
      400: {
        normal: "EduSABeginner-Medium",
      },
      500: {
        normal: "EduSABeginner-Medium",
      },
      600: {
        normal: "EduSABeginner-Medium",
      },
      700: {
        normal: "EduSABeginner-SemiBold",
      },
      800: {
        normal: "EduSABeginner-SemiBold",
      },
      900: {
        normal: "EduSABeginner-Bold",
      },
    },
  },
  fonts: {
    heading: "EduSABeginner",
    body: "EduSABeginner",
    mono: "EduSABeginner",
  },
});

let fontKey = Object.keys(theme.fontConfig)[0];
export { fontKey };

type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}
