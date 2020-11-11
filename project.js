#!usr/bin/env node
const fs = require('fs');
const path = require('path');

const { program } = require('commander');
const inquirer = require('inquirer');
const { spawn } = require('child_process');

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
else if (program.delete) {
    if (fileExists) {
        deleteProject();
    } else {
        console.log("Project data file doesn't exist.\nUse -n or --new to create and insert a project");
    }
}
else if (program.modify) {
    if (fileExists) {
        modifyProject();
    } else {
        console.log("Project data file doesn't exist.\nUse -n or --new to create and insert a project");
    }
}
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
        if (projectData.find(obj => obj.projectName === answers.projectName && obj.editor === answers.editor)) {
            return console.log("Project name and editor already exists. Please change any one of the field");
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
    let projects;
    if (projectData.length > 0) {
        projects = projectData.map(obj => `${obj.projectName} - ${obj.editor}`)
    } else {
        return console.log("No Project exist.");
    }
    try {
        let answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'open',
                message: 'Open Project:',
                choices: projects
            }]);
        const data = answers.open.split(' - ');
        const openData = projectData.find(obj => obj.projectName === data[0] && obj.editor === data[1]);
        const editor = getEditor(openData.editor);
        const run = spawn(editor, [openData.path], { stdio: 'inherit' }, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
        run.on('error', (err) => {
            console.log(`Command ${editor} not found`);
        })

    } catch (err) {
        console.log("Error Occured");
        console.log(err);
    }
}

function getEditor(editor) {
    let correctEditor;
    switch (editor) {
        case 'vscode(code)': correctEditor = 'code';
            break;
        case 'vim(vim)': correctEditor = 'vim';
            break;
        case 'neovim(nvim)': correctEditor = 'nvim';
            break;
        case 'atom(atom)': correctEditor = 'atom';
            break;
        default:
            correctEditor = editor;
    }
    return correctEditor;
}

async function deleteProject() {
    let projects;
    if (projectData.length > 0) {
        projects = projectData.map(obj => `${obj.projectName} - ${obj.editor}`)
    } else {
        return console.log("No Project exist.");
    }
    try {
        let answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'open',
                message: 'Delete any one Project:',
                choices: projects
            }]);
        const data = answers.open.split(' - ');
        const openData = projectData.filter(obj => obj.projectName !== data[0] || obj.editor !== data[1]);
        const data_str = JSON.stringify(openData);
        fs.writeFile('projectData.json', data_str, (err) => {
            if (err) throw err;
            console.log("Project Deleted");
        })
    } catch (err) {
        console.log("Error Occured");
        console.log(err);
    }
}

async function modifyProject() {
    let projects;
    if (projectData.length > 0) {
        projects = projectData.map(obj => `${obj.projectName} - ${obj.editor}`)
    } else {
        return console.log("No Project exist.");
    }
    try {
        let answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'open',
                message: 'Modify any one Project:',
                choices: projects
            }]);
        const data = answers.open.split(' - ');
        const openData = projectData.filter(obj => obj.projectName === data[0] || obj.editor === data[1]);
        modify(...openData);
    } catch (err) {
        console.log("Error Occured");
        console.log(err);
    }
}

async function modify(obj) {
    console.log(obj);
    try {
        let answers = await inquirer.prompt([{
            type: 'input',
            name: 'path',
            message: 'What will be the path to the project? 📁',
            default: obj.path
        },
        {
            type: 'input',
            name: 'projectName',
            message: 'What will be the project name? 🚀',
            default: obj.projectName
        },
        {
            type: 'input',
            name: 'editor',
            message: 'What editor(command) do you want to open the project in?',
            choices: obj.editor
        }]);
        const prevData = projectData.filter(data => data.projectName !== obj.projectName || data.editor !== obj.editor);
        const modifiedData = {
            "path": answers.path,
            "projectName": answers.projectName,
            "editor": answers.editor
        }
        const changeData = [
            ...prevData,
            modifiedData
        ]
        const data_str = JSON.stringify(changeData);
        fs.writeFile('projectData.json', data_str, (err) => {
            if (err) throw err;
            console.log("Project Modified");
        })
    } catch (err) {
        console.log("Error Occured");
        console.log(err);
    }
}