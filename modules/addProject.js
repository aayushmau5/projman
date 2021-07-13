const { addProjectPrompt } = require("../utils/prompts");

module.exports = async function addProject() {
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
    addJSON(answers);
    console.log("Project added successfully!!!");
  } catch (err) {
    console.log("Error Occured");
    console.log(err);
  }
};
