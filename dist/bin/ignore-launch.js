#! /usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _message = require('../libs/utils/message');

var _boilerplate = require('../libs/launch/boilerplate');

var _boilerplate2 = _interopRequireDefault(_boilerplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.usage('<template> [options]').option('-d, --debug', 'refer dependencies in development mode').on('--help', function () {
    (0, _message.log)();
    (0, _message.log)('  Available tmeplate:');
    (0, _message.log)();
    (0, _message.log)(`    ✨ ${_chalk2.default.cyan('Vue')} - A vue project with hot-reloading.`);
    (0, _message.log)();
}).parse(process.argv);

(0, _message.log)('in launch:');

function _run() {
    const args = _commander2.default.args;
    if (args.length < 1) {
        _commander2.default.outputHelp();
        return;
    }
    (0, _boilerplate2.default)();
}
_run();