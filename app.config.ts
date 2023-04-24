import { ConfigContext, ExpoConfig } from "@expo/config";

/////////////////////////////////////////////////////
export const allEnvConfig: EnvConfiguration = {
  supportedLanguages: ["en", "fr"],
  useResponsiveStylesheets: true,
  sandboxMode:true
};
/////////////////////////////////////////////////////
export const devConfig: EnvConfiguration = {
  ...allEnvConfig,
  hideYellowLogs: false,
  sandboxMode: true,
};

export const prodConfig: EnvConfiguration = {
  ...allEnvConfig,
  hideYellowLogs: true,
};

export interface EnvConfiguration {
  hideYellowLogs?: boolean;
  supportedLanguages: string[];
  sandboxMode: boolean;
  useResponsiveStylesheets: boolean;
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
