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

program.command('desc', 'add a describe file').alias('d');

program
    .command('gen', 'generate the ignore file with a sign')
    .alias('g')
    ;

program
    .command('add', 'add ignore folder')
    .alias('a')
    ;

program
    .command('remove', 'remove the git ignore file')
    .alias('r')
    ;


program.parse(process.argv);