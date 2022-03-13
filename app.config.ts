import { ExpoConfig, ConfigContext } from "@expo/config";

export const config: EnvConfiguration = {
  supportedLanguages: ["en", "fr"]
}

export const devConfig: EnvConfiguration = {
  ...config,
  hideYellowLogs: true,
};

export const prodConfig: EnvConfiguration = {
  ...config,
  hideYellowLogs: true,
};


export interface EnvConfiguration {
  hideYellowLogs?: boolean;
  supportedLanguages: string[]
}

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    slug: config.slug!,
    name: config.name!,
    extra: getConfigByEnv(),
  };
};

const getConfigByEnv = () => {
  switch (process.env.MY_ENVIRONMENT) {
    case "production":
      return prodConfig;
    case "development":
      return devConfig;
    default:
      return devConfig;
  }
};
