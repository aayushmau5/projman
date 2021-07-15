import path from "path";
import inquirer from "inquirer";
import { Answer, openProject, ResetConfig } from "../types";

export async function addProjectPrompt(): Promise<Answer> {
  let answers: Answer = await inquirer.prompt([
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

export async function deleteProjectPrompt(
  projects: string[]
): Promise<openProject> {
  return await inquirer.prompt([
    {
      type: "list",
      name: "open",
      message: "Delete any one Project:",
      choices: projects,
    },
  ]);
}

export async function openProjectPrompt(
  projects: string[]
): Promise<openProject> {
  return await inquirer.prompt([
    {
      type: "list",
      name: "open",
      message: "Open Project:",
      choices: projects,
    },
  ]);
}

export async function listProjectPrompt(
  projects: string[]
): Promise<openProject> {
  return await inquirer.prompt([
    {
      type: "list",
      name: "open",
      message: "Modify any one Project:",
      choices: projects,
    },
  ]);
}

export async function modifyProjectPrompt(obj: Answer): Promise<Answer> {
  let answers: Answer = await inquirer.prompt([
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
      type: "list",
      name: "editor",
      message: "What editor(command) do you want to open the project in?",
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
        default: "",
      },
    ]);
    answers = {
      ...answers,
      editor: answer.editor,
    };
  }

  return answers;
}

export async function resetConfigPrompt(): Promise<ResetConfig> {
  return await inquirer.prompt([
    {
      type: "confirm",
      name: "remove",
      message: "Are you sure you want to remove all data from config file?",
    },
  ]);
}
