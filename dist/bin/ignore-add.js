#! /use/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _traverse = require('../libs/traverse');

var _traverse2 = _interopRequireDefault(_traverse);

var _append = require('../libs/file/append');

var _append2 = _interopRequireDefault(_append);

var _message = require('../libs/utils/message');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.usage('[options]').parse(process.argv);

(0, _traverse2.default)().then(files => {
    _inquirer2.default.prompt([{
        type: 'checkbox',
        name: 'filesToIgnore',
        message: '请选择要忽略的文件（夹）',
        choices: files
    }]).then(answer => {
        const files = answer.filesToIgnore;
        if (files.length === 0) {
            (0, _message.log)(_chalk2.default.green('你没有选择文件（夹）🤪'));
            return;
        }
        const gen = new _append2.default('./.gitignore', `# Added by auto-ignore 😎 ${new Date().toDateString()}`);
        files.forEach(file => {
            gen.addLine(file);
        });
        gen.genreate().then(() => {
            (0, _message.log)('添加成功: ');
            files.forEach(file => (0, _message.log)(file));
        });
    });
});