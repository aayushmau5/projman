# projman

## What is it ?

A CLI project manager which holds all your project path and the preferred editor you want to open the project in.

No more `cd myprojects`, just run `projman -n` to add the current directory and the preferred editor to run the project on.

## Installation

```sh
npm i -g projman
```

## Usage

```sh
# Create a new project
projman -n
# OR
projman --new

# Modify a already present project
projman -m
# OR
projman --modify

# Delete a project from the project manager
projman -d
# OR
projman --delete

# Get the list of projects(enter to open the project)
projman
```

## Found a bug?

Feel free to make an issue at https://github.com/aayushmau5/node-app-cli

## TODO

- [x] show various options
  - [x] -h, --help for help
  - [x] -n, --new for new project addition
  - [x] -d, --delete for deleting the projects(list and then delete)
  - [x] -m, --modify for modifying the editor or something else
- [x] If no option is given, show the list of projects and enter to open the project in the given IDE/Editor
- [x] defaults with the current working directory
- [ ] Refactor Code
- [x] Make it a shell script
- [x] Publish on NPM
