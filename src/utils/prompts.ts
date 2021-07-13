import inquirer from "inquirer";

export async function addProjectPrompt() {
  let answers = await inquirer.prompt([
    {
      type: "input",
      name: "path",
      message: "What will be the path to the project? 📁",
      default: process.cwd(),
    },
    {
      type: "input",
      name: "projectName",
      message: "What will be the project name? 🚀",
      default: path.basename(process.cwd()),
    },
    {
      type: "list",
      name: "editor",
      message: "What editor do you want to open the project in?",
      choices: [
        "VSCode(code)",
        "Vim(vim)",
        "Neovim(nvim)",
        "Atom(atom)",
        "Add Your Own",
      ],
      filter: function (val) {
        return val.toLowerCase();
      },
    },
  ]);
  if (answers.editor === "add your own") {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "editor",
        message: "Enter the editor command",
        default: "nvim",
      },
    ]);
    answers = {
      ...answers,
      editor: answer.editor,
    };
  }

  return answers;
}

export async function deleteProjectPrompt(projects) {
  return await inquirer.prompt([
    {
      type: "list",
      name: "open",
      message: "Delete any one Project:",
      choices: projects,
    },
  ]);
}

export async function openProjectPrompt(projects) {
  return await inquirer.prompt([
    {
      type: "list",
      name: "open",
      message: "Open Project:",
      choices: projects,
    },
  ]);
}

export async function listProjectPrompt(projects) {
  return await inquirer.prompt([
    {
      type: "list",
      name: "open",
      message: "Modify any one Project:",
      choices: projects,
    },
  ]);
}

export async function modifyProjectPrompt(obj) {
  return await inquirer.prompt([
    {
      type: "input",
      name: "path",
      message: "What will be the path to the project? 📁",
      default: obj.path,
    },
    {
      type: "input",
      name: "projectName",
      message: "What will be the project name? 🚀",
      default: obj.projectName,
    },
    {
      type: "input",
      name: "editor",
      message: "What editor(command) do you want to open the project in?",
      choices: obj.editor,
    },
  ]);
}