#! /usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const version = require('../package.json').version;
_commander2.default.version(version).usage('<command> [options]').command('desc', 'generate the describes of the project').command('add', 'add ignore folder').command('gen', 'generate the ignore file with a sign').command('launch', 'launch a server for testing without npm installing').command('test', '666');

_commander2.default.parse(process.argv);