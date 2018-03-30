#! /usr/bin/env node
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _merge = require('../libs/file/merge');

var _merge2 = _interopRequireDefault(_merge);

var _message = require('../libs/utils/message');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.usage('[options]').option('-y, --yes', 'without pormpts').parse(process.argv);

/**
 * 生成默认的答案
 */
async function genDefaultAnwser() {
    const name = getDirName();
    const describe = `A project named ${name}`;
    const version = getVersion();
    const scripts = {
        'test': 'echo \"Error: no test specified\" && exit 1'
    };

    var _ref = await require('../libs/git-info')();

    const repo = _ref.repo,
          username = _ref.username,
          useremail = _ref.useremail;

    const repository = {
        type: 'git',
        url: `git+${repo}`
    };
    const keywords = [];
    const author = `${username}<${useremail}>`;
    const bugs = {
        url: repo.replace(/\.git$/, '/issue')
    };
    const homepage = repo.replace(/\.git$/, '#readme');
    return {
        name,
        describe,
        version,
        scripts,
        repository,
        keywords,
        author,
        bugs,
        homepage
    };
}

/**
 * 获取项目默认名称/目录名称
 */
function getDirName() {
    const path = process.cwd();
    const matches = path.match(/(?<=\/)(.*?)(?=(\/|$))/g);
    if (matches) {
        return matches.slice(-1)[0];
    }
    return '';
}

/**
 * 获取项目版本号
 */
function getVersion() {
    const pkg = require('../package.json');
    return pkg ? pkg.version : 'v1.0.0';
}

async function _run() {
    const defaultAnswer = await genDefaultAnwser();
    const scriptKeys = ['dev', 'build', 'release'];
    if (_commander2.default.yes) {
        const fileMerge = new _merge2.default('.descrc', defaultAnswer);
        fileMerge.merge().then(() => (0, _message.log)('    🎉🎉🎉 描述文件已经生成'));
    } else {
        _inquirer2.default.prompt([{
            type: 'input',
            name: 'name',
            message: 'The project name:',
            prefix: '🚀',
            default: defaultAnswer.name
        }, {
            type: 'input',
            name: 'describe',
            message: 'How to describe?',
            prefix: '🚀',
            default: defaultAnswer.describe
        }, {
            type: 'input',
            name: 'version',
            message: 'The version?',
            prefix: '🚀',
            default: defaultAnswer.version
        }, {
            type: 'checkbox',
            name: 'add_script',
            message: 'Add some script?',
            prefix: '🚀',
            choices: scriptKeys
        }, {
            type: 'input',
            name: 'script_dev',
            message: 'Input the dev script',
            prefix: '🚀',
            when: answer => {
                return answer.add_script.includes('dev');
            }
        }, {
            type: 'input',
            name: 'script_build',
            message: 'Input the build script',
            prefix: '🚀',
            when: answer => {
                return answer.add_script.includes('build');
            }
        }, {
            type: 'input',
            name: 'script_release',
            message: 'Input the release script',
            prefix: '🚀',
            when: answer => {
                return answer.add_script.includes('release');
            }
        }, {
            type: 'input',
            name: 'keywords',
            message: 'Input keywords, sperate world with , ',
            prefix: '🚀',
            default: defaultAnswer.keywords && defaultAnswer.keywords.length > 0 ? defaultAnswer.keywords.join(',') : ''
        }, {
            type: 'input',
            name: 'author',
            message: 'The author of the project:',
            prefix: '🚀',
            default: defaultAnswer.author
        }, {
            type: 'input',
            name: 'homepage',
            message: 'The homepage of the project',
            prefix: '🚀',
            default: defaultAnswer.homepage
        }]).then(answer => {
            (0, _message.log)(JSON.stringify(answer, null, '    '));
            const scripts = _extends({}, defaultAnswer.scripts);
            if (answer.add_script.includes('dev')) {
                scripts.dev = answer.script_dev;
            }
            if (answer.add_script.includes('build')) {
                scripts.build = answer.script_build;
            }
            if (answer.add_script.includes('release')) {
                scripts.release = answer.script_release;
            }

            const keywords = defaultAnswer.keywords.concat(answer.keywords.split(','));

            const fileMerge = new _merge2.default('.descrc', _extends({}, defaultAnswer, { scripts, keywords }, {
                name: answer.name,
                describe: answer.describe,
                version: answer.version,
                author: answer.author,
                homepage: answer.homepage
            }));
            fileMerge.merge().then(() => (0, _message.log)('    🎉🎉🎉 描述文件已经生成'));
        });
    }
}

_run();