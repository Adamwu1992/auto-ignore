'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports.log = undefined;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = exports.log = (...reet) => console.log(_chalk2.default.green.apply(_chalk2.default, reset));

const error = exports.error = (...reset) => console.log(_chalk2.default.red.apply(_chalk2.default, reset));