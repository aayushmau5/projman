import { Answer, getKeyFunctionType } from "../types";

export const getKey: getKeyFunctionType = (
  projects,
  projectKeys,
  { selectedProjectName, selectedEditor }
) => {
  return projectKeys.filter(
    (k) =>
      (projects[k] as Answer).projectName === selectedProjectName &&
      (projects[k] as Answer).editor === selectedEditor
  );
};
