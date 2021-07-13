import { spawn } from "child_process";

import { openProjectPrompt } from "../utils/prompts";
import getEditor from "../utils/getEditor";
import { getAllProjects } from "../utils/manageConfig";

export default async function showProjects() {
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
    const answers = await openProjectPrompt(projectNames);
    console.log(answers);
    // const openData = projectData.find(
    //   (obj) => obj.projectName === data[0] && obj.editor === data[1]
    // );
    // const editor = getEditor(openData.editor);
    // const run = spawn(
    //   editor,
    //   [openData.path],
    //   { stdio: "inherit" }
    //   // (error, stdout, stderr) => {
    //   //   if (error) {
    //   //     console.log(`error: ${error.message}`);
    //   //     return;
    //   //   }
    //   //   if (stderr) {
    //   //     console.log(`stderr: ${stderr}`);
    //   //     return;
    //   //   }
    //   //   console.log(`stdout: ${stdout}`);
    //   // }
    // );
    // run.on("error", (err: any) => {
    //   console.error(err);
    //   console.log(`Command ${editor} not found`);
    // });
  } catch (err) {
    console.log("Error Occured");
    console.log(err);
  }
}
