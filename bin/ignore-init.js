#! /use/bin/env node

const program = require('commander');
const FileGenerotor = require('../libs/file');

program
    .usage('[options]')
    .parse(process.argv);

const name = program.args[0];
const text = program.args[1] || 'hello world';
const fileGenerator = new FileGenerotor(name, text);

fileGenerator.genreate().then(() => console.log('write success'));