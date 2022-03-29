import React, { ReactElement } from "react";
import { NativeBaseProvider, extendTheme, Text } from "native-base";
import { NativeRouter, Routes, Route } from "react-router-native";
import { ROUTES } from "@routes";
import { HomePage } from "@pages";
import { themeConfig } from "@theme";
import { config } from "@configs";
import { i18n } from "./i18n.utils";
import { I18nextProvider } from "react-i18next";
import { useAtomDevtools } from "jotai/devtools";

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

// config.hideYellowLogs && LogBox.ignoreAllLogs();

// LogBox.ignoreLogs(["Rrequire cycle:"]);

const AppContent = () => (
  <I18nextProvider i18n={i18n}>
    <NativeBaseProvider config={themeConfig}>
      <NativeRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
        </Routes>
      </NativeRouter>
    </NativeBaseProvider>
  </I18nextProvider>
);
export default function App() {
  return process.env.NODE_ENV !== "production" ? (
    <AppContent />
  ) : (
    <AppContent />
  );
}

export const AtomsDevtoolProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  /**
   * Add here the atoms you want to track in the devtool
   */
  // useAtomDevtools(projectAtom, "project");
  return children;
};
