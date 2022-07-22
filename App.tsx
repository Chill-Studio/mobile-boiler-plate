import React, { ReactElement } from "react";
import { NativeBaseProvider } from "native-base";
import { NativeRouter, Routes, Route } from "react-router-native";
import { ROUTES } from "@routes";
import { HomePage } from "@pages";
import { theme } from "@theme";
import { config } from "@configs";
import { i18n } from "./i18n.utils";
import { I18nextProvider } from "react-i18next";
import { useAtomDevtools } from "jotai/devtools";
import { LogBox } from "react-native";
import { projectAtom } from "@store";

// config.hideYellowLogs && LogBox.ignoreAllLogs();
//LogBox.ignoreLogs(["Require cycle:"]);
LogBox.ignoreLogs(["Require cycle:"]);

const AppContent = () => (
  <I18nextProvider i18n={i18n}>
    <NativeBaseProvider config={theme}>
      <NativeRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
        </Routes>
      </NativeRouter>
    </NativeBaseProvider>
  </I18nextProvider>
);
export default function App() {
  return (
    <AtomsDevtoolProvider>
      <AppContent />
    </AtomsDevtoolProvider>
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
  process.env.NODE_ENV !== "production" &&
    useAtomDevtools(projectAtom, "project");

  return children;
};
