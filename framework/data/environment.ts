import { IEnvironmentConfig } from "../interfaces/environment-config";
export const environments: IEnvironmentConfig = {
  TEST: process.env.BASE_URL as string,
  STAGING: "???",
  PROD: "???",
};
