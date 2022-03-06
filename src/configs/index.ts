import Constants from "expo-constants";
import { EnvConfiguration } from "../../app.config";
export const config = Constants.manifest?.extra as EnvConfiguration;
