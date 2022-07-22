import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { locale } from "expo-localization";
import i18nextHttpBackend from "i18next-http-backend";
import { config } from "@configs";
const localesRessources = require(`./src/locales/index.ts`);

function getRessourcesFromLocalFolder() {
  const ressources: any = {};
  const nameSpaceWithExtension = Object.keys(localesRessources);
  config.supportedLanguages.forEach((lng, index) => {
    const currentNameSpaces = nameSpaceWithExtension.filter(
      (nsWithExt) => nsWithExt.indexOf("_" + lng) > -1
    );
    currentNameSpaces.forEach((nsWithLngExt) => {
      const ns = nsWithLngExt.split("_")[0];
      ressources[lng] = {
        ...ressources[lng],
        [ns]: localesRessources[nsWithLngExt],
      };
    });
  });
  return ressources;
}

i18n
  .use(i18nextHttpBackend)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    fallbackLng: "en",
    fallbackNS: "common",
    lng: locale,
    ns: ["common"],
    defaultNS: "common",
    resources: getRessourcesFromLocalFolder(),

    react: {
      useSuspense: false,
    },
    // backend: {
    //     loadPath: "https://faketranslation.free.beeceptor.com/locales/{{lng}}/{{ns}}.json",
    // },
  });
export { i18n };
