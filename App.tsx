import React, { useCallback, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { LogBox, View, Image } from "react-native";
import { NativeRouter, Routes, Route } from "react-router-native";
import { ROUTES } from "@routes";
import { HomePage } from "@pages";
import { theme } from "@theme";
import { config } from "@configs";
import { i18n } from "./i18n.utils";
import { I18nextProvider } from "react-i18next";
import { SandboxPage } from "./src/pages/sandbox/sandbox.page";
import useAsyncEffect from "use-async-effect";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";

// config.hideYellowLogs && LogBox.ignoreAllLogs();
//LogBox.ignoreLogs(["Require cycle:"]);
LogBox.ignoreLogs(["Require cycle"]);

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useAsyncEffect(async function loadAssets() {
    try {
      const loadFontsPromise = Font.loadAsync({
        //EduSABeginner
        "EduSABeginner-SemiBold": require("./src/assets/fonts/EduSABeginner-SemiBold.ttf"),
        "EduSABeginner-Bold": require("./src/assets/fonts/EduSABeginner-Bold.ttf"),
        "EduSABeginner-Medium": require("./src/assets/fonts/EduSABeginner-Medium.ttf"),
        "EduSABeginner-Regular": require("./src/assets/fonts/EduSABeginner-Regular.ttf"),
      });
      const loadImagesPromise = cacheImages([
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        require("./src/assets/images/adaptive-icon.png"),
      ]);

      await Promise.all([loadFontsPromise, loadImagesPromise]);
      setAppIsReady(true);
    } catch (e) {
      console.warn("Failure during asset loading", e);
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

  function cacheImages(imageList: string[]) {
    return imageList.map((image) => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
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
