import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { NativeRouter, Routes, Route } from "react-router-native";
import { ROUTES } from "routes";
import { HomePage } from "pages";
import { RecoilRoot } from "recoil";

// extend the theme
export const theme = extendTheme({
  useSystemColorMode: false,
  initialColorMode: "dark",
});

type MyThemeType = typeof theme;

declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}
import { LogBox } from "react-native";
import { themeConfig } from "theme";
import { config } from "config";
config.hideYellowLogs && LogBox.ignoreAllLogs();

export default function App() {
  return (
    <RecoilRoot>
      <NativeBaseProvider config={themeConfig}>
        <NativeRouter>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
          </Routes>
        </NativeRouter>
      </NativeBaseProvider>
    </RecoilRoot>
  );
}
