import { spawn } from "child_process";

import { openProjectPrompt } from "../utils/prompts";
import getEditor from "../utils/getEditor";
import { getAllProjectsFromConfig } from "../utils/manageConfig";
import { Answer } from "../types";
import { getKey } from "../utils/getKey";

export default async function showProjects() {
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
    const answer = await openProjectPrompt(projectNames);
    const [selectedProjectName, selectedEditor] = answer.open.split(" - ");
    const [key] = getKey(projects, projectKeys, {
      selectedProjectName,
      selectedEditor,
    });
    const openData = projects[key] as Answer;
    const editor = getEditor(openData.editor);
    const run = spawn(editor, [openData.path], { stdio: "inherit" });
    run.on("error", (_err: any) => {
      console.log(`Editor ${editor} not found`);
    });
  } catch (err) {
    console.log("Error Occured");
    console.log(err);
  }
}
