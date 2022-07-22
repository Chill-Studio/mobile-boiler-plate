import React from "react";
import { NativeBaseProvider } from "native-base";
import { NativeRouter, Routes, Route } from "react-router-native";
import { ROUTES } from "@routes";
import { HomePage } from "@pages";
import { theme } from "@theme";
import { i18n } from "./i18n.utils";
import { I18nextProvider } from "react-i18next";
import { LogBox } from "react-native";
import Constants from "expo-constants";
import { EnvConfiguration } from "./app.config";
import { SandboxPage } from "./src/pages/sandbox/sandbox.page";

// config.hideYellowLogs && LogBox.ignoreAllLogs();
//LogBox.ignoreLogs(["Require cycle:"]);
LogBox.ignoreLogs(["Require cycle"]);

const App = () => (
  <I18nextProvider i18n={i18n}>
    <NativeBaseProvider config={theme}>
      <NativeRouter>
        <Routes>
          <Route
            path={ROUTES.HOME}
            element={config.sandboxMode ? <SandboxPage /> : <HomePage />}
          />
        </Routes>
      </NativeRouter>
    </NativeBaseProvider>
  </I18nextProvider>
);

export default App;
export const config = Constants.manifest?.extra as EnvConfiguration;
