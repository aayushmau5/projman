import { deleteProjectPrompt } from "../utils/prompts";

export default async function deleteProject() {
  let projects;
  if (projectData.length > 0) {
    projects = projectData.map((obj) => `${obj.projectName} - ${obj.editor}`);
  } else {
    return console.log("No Project exist.");
  }
  try {
    let answers = await deleteProjectPrompt(projects);
    const data = answers.open.split(" - ");
    const openData = projectData.filter(
      (obj) => obj.projectName !== data[0] && obj.editor !== data[1]
    );
    const data_str = JSON.stringify(openData);
    fs.writeFile(filePath, data_str, (err) => {
      if (err) throw err;
      console.log("Project Deleted");
    });
  } catch (err) {
    console.log("Error Occured");
    console.log(err);
  }
}
