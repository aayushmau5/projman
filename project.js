#!usr/bin/env node
const fs = require('fs');
const path = require('path');

const { program } = require('commander');
const inquirer = require('inquirer');

let projectData;

const fileExists = fs.existsSync(path.join(__dirname, 'projectData.json'));
if (fileExists) {
    projectData = require('./projectData.json');
}

program.option('-n --new', 'Create a new entry')
    .option('-d --delete', 'Delete an entry')
    .option('-m --modify', 'Modify an entry');

program.parse(process.argv);

if (program.new) {
    // making a new entry for a project
    if (fileExists) {
        addProject();
    } else {
        fs.writeFile("projectData.json", "[]", (err) => {
            if (err) throw err;

            console.log("Project data file created.");
        });
    }
}
else if (program.delete) console.log("Delete");
else if (program.modify) console.log("Modify");
else {
    // when `project` is ran, show list of all the saved projects
    if (fileExists) {
        console.log(projectData);
        console.log("Showing Projects");
    } else {
        console.log("Project data file doesn't exist.\nUse -n or --new to create and insert a project");
    }
}

async function addProject() {
    const answers = await inquirer.prompt([{
        type: 'input',
        name: 'path',
        message: 'What will be the path to the project? 📁',
        default: process.cwd()
    },
    {
        type: 'input',
        name: 'projectName',
        message: 'What will be the project name? 🚀',
        default: path.basename(process.cwd())
    }]);
    console.log(answers);
}