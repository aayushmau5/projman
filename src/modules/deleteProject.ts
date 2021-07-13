import { deleteProjectPrompt } from "../utils/prompts";
import { getAllProjects } from "../utils/manageConfig";

export default async function deleteProject() {
  const projects = getAllProjects();
  const projectKeys = Object.keys(projects);
  if (projectKeys.length < 1) {
    console.log("No Project exist.");
    return;
  }
  try {
    const projectNames: string[] = projectKeys.map(
      (key) => `${projects[key].projectName} - ${projects[key].editor}`
    );
    const answers = await deleteProjectPrompt(projectNames);
    console.log(answers);
    console.log("Project Deleted");
  } catch (err) {
    console.log("Error Occured");
    console.log(err);
  }
}
