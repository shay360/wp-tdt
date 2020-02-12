#! /usr/bin/env node
const commander = require('commander');
const program = new commander.Command();
const colors = require('colors');
const prompt = require('prompt');


program.version('0.0.1')
    .description('Wordpress Theme Developer Tools CLI');

program.command('init')
    .description('Create new config file')
    .action(() => {
        console.log('Hello');
    });

program.parse(process.argv);