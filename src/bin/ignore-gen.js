#! /usr/bin/env node

import program from 'commander';
import FileGenerotor from '../libs/file';

program
    .usage('[options]')
    .parse(process.argv);

const note = program.args[0] || '# The file is generated by auto-ignre 🎉🎉🎉';
const fileGenerator = new FileGenerotor('.gitignore', note);

fileGenerator.genreate().then(() => console.log('write success'));