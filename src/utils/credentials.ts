import bcrypt from "bcrypt";
import { isUndefined } from "./asserts";
import { appendFileSync, readFileSync, existsSync, writeFileSync } from "fs";
import { CREDENTIALS_FILE_PATH, CREDENTIALS_SALT_ROUNDS } from "../constants";

export const addHash = (username: string, plainTextPassword: string) => {
  const hash = bcrypt.hashSync(plainTextPassword, CREDENTIALS_SALT_ROUNDS);
  const line = `${username}\t${hash}\n`;
  if (!existsSync(CREDENTIALS_FILE_PATH)) {
    writeFileSync(CREDENTIALS_FILE_PATH, line);
  } else {
    appendFileSync(CREDENTIALS_FILE_PATH, line);
  }
};

export const verifyPassword = (username: string, plainTextPassword: string) => {
  if (!existsSync(CREDENTIALS_FILE_PATH)) return false;
  const credentials = readFileSync(CREDENTIALS_FILE_PATH).toString();
  const line = credentials
    .split("\n")
    .find((line) => line.startsWith(`${username}\t`));
  if (isUndefined(line)) return false;
  const hash = line.split("\t")[1] ?? "";
  return bcrypt.compareSync(plainTextPassword, hash);
};

export const getIsFirstUser = () => {
  if (!existsSync(CREDENTIALS_FILE_PATH)) return true;
  const credentials = readFileSync(CREDENTIALS_FILE_PATH).toString();
  return credentials.split("\n").length === 0;
};
