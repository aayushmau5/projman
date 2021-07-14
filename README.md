# projman

## What is it ?

A CLI project manager which holds all your project path and the preferred editor you want to open the project in.

No more `cd myprojects`, just run `projman -n` to add the current directory and the preferred editor to open the project on.

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

# Modify an already present project
projman -m
# OR
projman --modify

# Delete a project from the project manager
projman -d
# OR
projman --delete

# Get the list of saved projects(enter to open the project)
projman
```

## Found a bug?

Feel free to make an issue at https://github.com/aayushmau5/projman
