import { onedriveAccounts } from "~/data/constants";

export const getAccount = () => {
  const num = onedriveAccounts.length;
  const idx = Math.floor(Math.random() * num);
  return onedriveAccounts[idx];
};
