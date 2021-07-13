const Conf = require("conf");

const config = new Conf();

exports.addProject = (key, value) => {
  config.set(key, value);
};

exports.deleteProject = (key) => {
  config.delete(key);
};

exports.getProject = (key) => {
  return config.get(key);
};
