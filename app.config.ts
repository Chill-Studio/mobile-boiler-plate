import { ExpoConfig, ConfigContext } from "@expo/config";

export const allEnvConfig: EnvConfiguration = {
  supportedLanguages: ["en", "fr"],
};

export const devConfig: EnvConfiguration = {
  ...allEnvConfig,
  hideYellowLogs: true,
  debugStore: {
    post: true,
  },
};

export const prodConfig: EnvConfiguration = {
  ...allEnvConfig,
  hideYellowLogs: true,
};

export interface EnvConfiguration {
  hideYellowLogs?: boolean;
  supportedLanguages: string[];
  debugStore?: {
    post: boolean;
  };
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
