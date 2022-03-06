import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { NativeRouter, Routes, Route } from "react-router-native";
import { ROUTES } from "./src/routes/index";
import {
  CameraPage,
  PicturePreviewPage,
  HomePage,
  GalleryUploadPage,
  BillFormPage,
  SummaryPage,
} from "./src/pages";
import { RecoilRoot } from "recoil";
// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

type MyThemeType = typeof theme;

declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}
import { LogBox } from "react-native";
import { themeConfig } from "./src/theme/index";
// LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
// LogBox.ignoreAllLogs();

export default function App() {
  return (
    <RecoilRoot>
      <NativeBaseProvider config={themeConfig}>
        <NativeRouter>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.CAMERA} element={<CameraPage />} />
            <Route
              path={ROUTES.GALLERY_UPLOAD}
              element={<GalleryUploadPage />}
            />
            <Route
              path={ROUTES.PICTURE_PREVIEW}
              element={<PicturePreviewPage />}
            />
            <Route path={ROUTES.BILL_FORM} element={<BillFormPage />} />
            <Route path={ROUTES.SUMMARY} element={<SummaryPage />} />
          </Routes>
        </NativeRouter>
      </NativeBaseProvider>
    </RecoilRoot>
  );
}

/*
 */
