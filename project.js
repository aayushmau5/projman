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

            console.log("Project Data file created.");
            projectData = require('./projectData.json');
            addProject();
        });
    }
}
else if (program.delete) console.log("Delete");
else if (program.modify) console.log("Modify");
else {
    // when `project` is ran, show list of all the saved projects
    if (fileExists) {
        showProjects();
    } else {
        console.log("Project data file doesn't exist.\nUse -n or --new to create and insert a project");
    }
}

async function addProject() {
    try {
        let answers = await inquirer.prompt([{
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
        },
        {
            type: 'list',
            name: 'editor',
            message: 'What editor do you want to open the project in?',
            choices: ['VSCode(code)', 'Vim(vim)', 'Neovim(nvim)', 'Atom(atom)', 'Add Your Own'],
            filter: function (val) {
                return val.toLowerCase();
            }
        }]);
        if (answers.editor === 'add your own') {
            const answer = await inquirer.prompt([{
                type: 'input',
                name: 'editor',
                message: 'Enter the editor command',
                default: 'nvim'
            }]);
            answers = {
                ...answers,
                editor: answer.editor
            }
        }
        addJSON(answers);
        console.log("Project added successfully!!!");
    } catch (err) {
        console.log("Error Occured");
        console.log(err);
    }
}

function addJSON(obj) {
    const data = [...projectData];
    data.push(obj);
    const data_str = JSON.stringify(data);
    fs.writeFileSync('projectData.json', data_str)
}

async function showProjects() {
    const projects = projectData.map(obj => `${obj.projectName} - ${obj.editor}`)
    try {
        let answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'open',
                message: 'Open Project:',
                choices: projects
            }]);
        const open = projectData.find(obj => obj.projectName === answers.open)
        console.log(open);
    } catch (err) {
        console.log("Error Occured");
        console.log(err);
    }
}