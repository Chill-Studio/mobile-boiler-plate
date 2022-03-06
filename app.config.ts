import { ExpoConfig, ConfigContext } from "@expo/config";

export const devConfig: EnvConfiguration = {
  hideYellowLogs: true,
};

export const prodConfig: EnvConfiguration = {
  hideYellowLogs: true,
};

export interface EnvConfiguration {
  hideYellowLogs: boolean;
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
