import { addProjectPrompt } from "../utils/prompts";

export default async function addProject() {
  try {
    const answers = await addProjectPrompt();
    if (
      projectData.find(
        (obj) =>
          obj.projectName === answers.projectName &&
          obj.editor === answers.editor
      )
    ) {
      return console.log(
        "Project name and editor already exists. Please change any one of the field"
      );
    }
    // answers.projectName
    // answers.path
    // answers.editor
    const key = answers.projectName + answers.editor;
    const value = answers;
    console.log("Project added successfully!!!");
  } catch (err) {
    console.log("Error Occured");
    console.log(err);
  }
}
