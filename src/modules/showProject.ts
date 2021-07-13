import { spawn } from "child_process";
import { openProjectPrompt } from "../utils/prompts";
import getEditor from "../utils/getEditor";

async function showProjects() {
  if (projectData.length > 0) {
    projects = projectData.map((obj) => `${obj.projectName} - ${obj.editor}`);
  } else {
    return console.log("No Project exist.");
  }
  try {
    let answers = await openProjectPrompt(projects);
    const data = answers.open.split(" - ");
    const openData = projectData.find(
      (obj) => obj.projectName === data[0] && obj.editor === data[1]
    );
    const editor = getEditor(openData.editor);
    const run = spawn(
      editor,
      [openData.path],
      { stdio: "inherit" },
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
    run.on("error", (err) => {
      console.log(`Command ${editor} not found`);
    });
  } catch (err) {
    console.log("Error Occured");
    console.log(err);
  }
}
