#! /usr/bin/env node

const program = require('commander');

program
    .usage('[options]')
    .parse(process.argv);

console.log('====================================');
console.log('ignore remove', program.args);
console.log('====================================');