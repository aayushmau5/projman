import { addProjectPrompt } from "../utils/prompts";
import {
  getProjectFromConfig,
  addProjectToConfig,
} from "../utils/manageConfig";

export default async function addProject() {
  try {
    const answers = await addProjectPrompt();
    const escapedProjectName = answers.projectName.replace(/\./g, "");
    const key = escapedProjectName + answers.editor;
    if (getProjectFromConfig(key)) {
      console.log(
        "Project name and editor already exists. Please change any one of the field"
      );
      return;
    }
    addProjectToConfig(key, answers);
    console.log("Project added successfully!!!");
  } catch (err) {
    console.log("Error Occured");
    console.log(err);
  }
}
