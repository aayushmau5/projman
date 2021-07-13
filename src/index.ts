#! /usr/bin/env node
import { Command } from "commander";

import addProject from "./modules/addProject";
import showProjects from "./modules/showProjects";
import deleteProject from "./modules/deleteProject";
import modifyProject from "./modules/modifyProject";

const program = new Command();

program
  .option("-n --new", "Create a new entry")
  .option("-d --delete", "Delete an entry")
  .option("-m --modify", "Modify an entry");

program.parse(process.argv);

const options = program.opts();

if (options.new) {
  // add a new project
  addProject();
} else if (options.delete) {
  // delete a project
  deleteProject();
} else if (options.modify) {
  // modify a project
  modifyProject();
} else {
  // list of all the saved projects
  showProjects();
}
