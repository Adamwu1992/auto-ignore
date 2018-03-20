#! /usr/bin/env node

const program = require('commander');

const version = require('../package.json').version;
program
    .version(version)
    .usage('<command> [options]');

program
    .command('init', 'generate a git ignore file')
    .alias('i')
    ;

program
    .command('remove', 'remove the git ignore file')
    .alias('r')
    ;


program.parse(process.argv);