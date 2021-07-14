import Conf from "conf";

import { Answer } from "../types";

const config = new Conf();

export const addProjectToConfig = (key: string, value: Answer) => {
  config.set(key, value);
};

export const deleteProjectFromConfig = (key: string) => {
  config.delete(key);
};

export const getProjectFromConfig = (key: string) => {
  return config.get(key);
};

export const getAllProjectsFromConfig = () => {
  return config.store;
};
