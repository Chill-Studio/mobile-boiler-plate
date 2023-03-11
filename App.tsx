// Will create the store without having to make a call
import "./src/store/root/root.store";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Image, LogBox } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import React, { useCallback, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Asset } from "expo-asset";
import { HomePage } from "@pages";
import { I18nextProvider } from "react-i18next";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeBaseProvider } from "native-base";
import { PreProcessResponsiveStyle } from "@utils";
import { ROUTES } from "@routes";
import { SandboxPage } from "./src/pages/Sandbox/Sandbox.page";
import { config } from "@configs";
import { i18n } from "./i18n.utils";
import { useAsyncEffect } from "use-async-effect";
import { usePost } from "@store";

if (config.useResponsiveStylesheets) {
  LogBox.ignoreLogs(["Overwriting"]);
  PreProcessResponsiveStyle();
}

// config.hideYellowLogs && LogBox.ignoreAllLogs();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { someAsyncAction } = usePost();

  // Load in the store the data required to start the app.
  useAsyncEffect(async function loadData() {
    setTimeout(() => {
      someAsyncAction("This was set during app initialization");
    }, 4000);
  }, []);

  // Cache fonts,icons and images before the app start.
  useAsyncEffect(async function loadAssets() {
    try {
      const loadFontsPromise = Font.loadAsync({
        //Text fonts
        "EduSABeginner-SemiBold": require("./src/assets/fonts/EduSABeginner-SemiBold.ttf"),
        "EduSABeginner-Bold": require("./src/assets/fonts/EduSABeginner-Bold.ttf"),
        "EduSABeginner-Medium": require("./src/assets/fonts/EduSABeginner-Medium.ttf"),
        "EduSABeginner-Regular": require("./src/assets/fonts/EduSABeginner-Regular.ttf"),
        // Custom icons from icoMoon (require a .json and a ttf in assets)
        IcoMoon: require("./src/assets/icomoon/icomoon.ttf"),
      });
      // Vector icons
      const loadIconsPromise = [Ionicons.loadFont];
      //Images
      const loadImagesPromise = cacheImages([
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        require("./src/assets/images/adaptive-icon.png"),
      ]);

      await Promise.all([
        loadFontsPromise,
        loadImagesPromise,
        ...loadIconsPromise,
      ]);
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
    <SafeAreaProvider>
      <SafeAreaView onLayout={hideSplashOnAppReady} style={{ flex: 1 }}>
        <NativeBaseProvider>
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
        </NativeBaseProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
