import { deleteProjectPrompt } from "../utils/prompts";
import {
  getAllProjectsFromConfig,
  deleteProjectFromConfig,
} from "../utils/manageConfig";
import { getKey } from "../utils/getKey";
import { Answer } from "../types";

export default async function deleteProject() {
  const projects = getAllProjectsFromConfig();
  const projectKeys = Object.keys(projects);
  if (projectKeys.length < 1) {
    console.log("No Project exists.");
    return;
  }
  try {
    const projectNames: string[] = projectKeys.map(
      (key) =>
        `${(projects[key] as Answer).projectName} - ${
          (projects[key] as Answer).editor
        }`
    );
    const answer = await deleteProjectPrompt(projectNames);
    const [selectedProjectName, selectedEditor] = answer.open.split(" - ");
    const [key] = getKey(projects, projectKeys, {
      selectedProjectName,
      selectedEditor,
    });
    deleteProjectFromConfig(key);
    console.log("Project Deleted");
  } catch (err) {
    console.log("Error Occured");
    console.log(err);
  }
}
