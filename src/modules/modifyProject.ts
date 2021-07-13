import { listProjectPrompt, modifyProjectPrompt } from "../utils/prompts";

async function modify(obj) {
  try {
    let answers = await modifyProjectPrompt(obj);
    const prevData = projectData.filter(
      (data) =>
        data.projectName !== obj.projectName || data.editor !== obj.editor
    );
    const modifiedData = {
      path: answers.path,
      projectName: answers.projectName,
      editor: answers.editor,
    };
    const changeData = [...prevData, modifiedData];
    const data_str = JSON.stringify(changeData);
    fs.writeFile(filePath, data_str, (err) => {
      if (err) throw err;
      console.log("Project Modified");
    });
  } catch (err) {
    console.log("Error Occured");
    console.log(err);
  }
}

export default async function modifyProject() {
  let projects;
  if (projectData.length > 0) {
    projects = projectData.map((obj) => `${obj.projectName} - ${obj.editor}`);
  } else {
    return console.log("No Project exist.");
  }
  try {
    let answers = await listProjectPrompt(projects);
    const data = answers.open.split(" - ");
    const openData = projectData.filter(
      (obj) => obj.projectName === data[0] && obj.editor === data[1]
    );
    modify(...openData);
  } catch (err) {
    console.log("Error Occured");
    console.log(err);
  }
}
