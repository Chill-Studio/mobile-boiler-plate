import React, { useCallback, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { NativeRouter, Routes, Route } from "react-router-native";
import { ROUTES } from "@routes";
import { HomePage } from "@pages";
import { theme } from "@theme";
import { config } from "@configs";
import { i18n } from "./i18n.utils";
import { I18nextProvider } from "react-i18next";
import { LogBox, View, Text } from "react-native";
import { SandboxPage } from "./src/pages/sandbox/sandbox.page";
import useAsyncEffect from "use-async-effect";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
// config.hideYellowLogs && LogBox.ignoreAllLogs();
//LogBox.ignoreLogs(["Require cycle:"]);
LogBox.ignoreLogs(["Require cycle"]);

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  useAsyncEffect(async function loadAssets() {
    try {
      await Font.loadAsync({
        //EduSABeginner
        "EduSABeginner-SemiBold": require("./src/assets/fonts/EduSABeginner-SemiBold.ttf"),
        "EduSABeginner-Bold": require("./src/assets/fonts/EduSABeginner-Bold.ttf"),
        "EduSABeginner-Medium": require("./src/assets/fonts/EduSABeginner-Medium.ttf"),
        "EduSABeginner-Regular": require("./src/assets/fonts/EduSABeginner-Regular.ttf"),
      });
      setAppIsReady(true);
    } catch (e) {
      console.log("***ERRROR");
      console.warn(e);
    } finally {
      setAppIsReady(true);
    }
  }, []);

  const hideSplashOnAppReady = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <NativeBaseProvider config={theme}>
      {/*// @ts-ignore */}
      <View onLayout={hideSplashOnAppReady}>
        <I18nextProvider i18n={i18n}>
          <NativeRouter>
            <Routes>
              <Route
                path={ROUTES.HOME}
                element={config.sandboxMode ? <SandboxPage /> : <HomePage />}
              />
            </Routes>
          </NativeRouter>
        </I18nextProvider>
      </View>
    </NativeBaseProvider>
  );
};

export default App;
