import Conf from "conf";

import { Answer } from "../types";

const config = new Conf();

export const addProject = (key: string, value: Answer) => {
  config.set(key, value);
};

export const deleteProject = (key: string) => {
  config.delete(key);
};

export const getProject = (key: string) => {
  return config.get(key);
};

export const getAllProjects = () => {
  return config.store;
};
