import Conf from "conf";

const config = new Conf();

exports.addProject = (key: string, value: any) => {
  config.set(key, value);
};

exports.deleteProject = (key: string) => {
  config.delete(key);
};

exports.getProject = (key: string) => {
  return config.get(key);
};
