#! /usr/bin/env node
const fs = require("fs");
const path = require("path");
const { program } = require("commander");

// https://github.com/pascalgn/npm-publish-action

let projectData;

program
  .option("-n --new", "Create a new entry")
  .option("-d --delete", "Delete an entry")
  .option("-m --modify", "Modify an entry");

program.parse(process.argv);

if (program.new) {
  // making a new entry for a project
  if (fileExists) {
    addProject();
  } else {
    fs.writeFile(filePath, "[]", (err) => {
      if (err) throw err;

      console.log("Project Data file created.");
      projectData = require(filePath);
      addProject();
    });
  }
} else if (program.delete) {
  // delete a project
  if (fileExists) {
    deleteProject();
  } else {
    console.log(
      "Project data file doesn't exist.\nUse -n or --new to create and insert a project"
    );
  }
} else if (program.modify) {
  // modify a project
  if (fileExists) {
    modifyProject();
  } else {
    console.log(
      "Project data file doesn't exist.\nUse -n or --new to create and insert a project"
    );
  }
} else {
  // when `project` is ran, show list of all the saved projects
  if (fileExists) {
    showProjects();
  } else {
    console.log(
      "Project data file doesn't exist.\nUse -n or --new to create and insert a project"
    );
  }
}
