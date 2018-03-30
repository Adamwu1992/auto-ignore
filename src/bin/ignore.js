#! /usr/bin/env node

import program from 'commander';

const version = require('../package.json').version;
program
    .version(version)
    .usage('<command> [options]')
    .command('desc', 'generate the describes of the project')
    .command('add', 'add ignore folder')
    .command('gen', 'generate the ignore file with a sign')
    .command('launch', 'launch a server for testing without npm installing')
    .command('test', '666');

program.parse(process.argv);