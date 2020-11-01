#!usr/bin/env node

const { program } = require('commander');

program.option('-g --hello', 'Say Hello World');

program.parse(process.argv);

if (program.hello) console.log("Hello World");