import { listProjectPrompt, modifyProjectPrompt } from "../utils/prompts";
import {
  addProjectToConfig,
  getAllProjectsFromConfig,
} from "../utils/manageConfig";
import { Answer } from "../types";
import { getKey } from "../utils/getKey";
import getEditor from "../utils/getEditor";

export default async function modifyProject() {
  const projects = getAllProjectsFromConfig();
  const projectKeys = Object.keys(projects);
  if (projectKeys.length < 1) {
    console.log("No Project exist.");
    return;
  }
  try {
    const projectNames: string[] = projectKeys.map(
      (key) =>
        `${(projects[key] as Answer).projectName} - ${
          (projects[key] as Answer).editor
        }`
    );
    const answer = await listProjectPrompt(projectNames);
    const [selectedProjectName, selectedEditor] = answer.open.split(" - ");
    const [key] = getKey(projects, projectKeys, {
      selectedProjectName,
      selectedEditor,
    });
    const modifiedProject = await modifyProjectPrompt(projects[key] as Answer);
    modifiedProject.editor = getEditor(modifiedProject.editor);
    addProjectToConfig(key, modifiedProject);
    console.log("Project modified.");
  } catch (err) {
    console.log("Error Occured");
    console.log(err);
  }
}
