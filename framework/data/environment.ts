import { IEnvironmentConfig } from "../interfaces/environment-config";
export const environments: IEnvironmentConfig = {
  DEV: "???",
  STAGING: "???",
  PROD: process.env.ENVIRONMENT as string,
};
