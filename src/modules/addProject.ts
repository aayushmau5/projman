import { addProjectPrompt } from "../utils/prompts";
import {
  getProject,
  addProject as addProjectConfig,
} from "../utils/manageConfig";

export default async function addProject() {
  try {
    const answers = await addProjectPrompt();
    const key = answers.projectName + answers.editor;
    if (getProject(key)) {
      console.log(
        "Project name and editor already exists. Please change any one of the field"
      );
      return;
    }
    addProjectConfig(key, answers);
    console.log("Project added successfully!!!");
  } catch (err) {
    console.log("Error Occured");
    console.log(err);
  }
}
