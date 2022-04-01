import { LinearGradient } from "expo-linear-gradient";
import { extendTheme } from "native-base";

// extend the theme
export const theme = extendTheme({
  useSystemColorMode: false,
  initialColorMode: "dark",
  dependencies: {
    "linear-gradient": LinearGradient,
  },
});

type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType { }
}

