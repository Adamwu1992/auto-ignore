#! /usr/bin/env node

const program = require('commander');

const version = require('../package.json').version;
program
    .version(version)
    .usage('<command> [options]')
    .command('desc', 'generate a describe file')
    .command('add', 'add ignore folder')
    .command('gen', 'generate the ignore file with a sign')
    .command('test', '666');

program.parse(process.argv);