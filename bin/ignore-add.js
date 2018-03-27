#! /use/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const getIgnores = require('../libs/traverse');
const FileAppend = require('../libs/file/append');
const { log } = require('../libs/utils/message');

program
    .usage('[options]')
    .parse(process.argv);


getIgnores().then(files => {
    inquirer.prompt([
        {
            type: 'checkbox',
            name: 'filesToIgnore',
            message: '请选择要忽略的文件（夹）',
            choices: files
        }
    ]).then(answer => {
        const files = answer.filesToIgnore;
        if (files.length === 0) {
            log(chalk.green('你没有选择文件（夹）🤪'));
            return;
        }
        const gen = new FileAppend('./.gitignore', `# Added by auto-ignore 😎 ${new Date().toDateString()}`);
        files.forEach(file => {
            gen.addLine(file);
        });
        gen.genreate().then(() => {
            log('添加成功: ');
            files.forEach(file => log(file));
        })
    })
});