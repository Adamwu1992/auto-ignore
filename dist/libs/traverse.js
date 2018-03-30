'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getFileList = () => {
    return new Promise((resolve, reject) => {
        (0, _glob2.default)('*', (err, list) => {
            if (err) {
                console.error(err);
                reject();
            }
            resolve(list);
        });
    });
};

const getIgnores = () => {
    return new Promise((resolve, reject) => {
        _fs2.default.open('.gitignore', 'r', (err, fd) => {
            if (err) {
                console.log('open file error', err);
                // reject(err);
                // 文件不存在
                resolve();
                return;
            }
            _fs2.default.readFile(fd, (err, buffer) => {
                if (err) {
                    console.log('read file error', err);
                    reject(err);
                }
                resolve(buffer.toString().split(_os2.default.EOL));
            });
        });
    });
};

const isMatch = (source, target) => {
    // TODO: 
    const reg = new RegExp(`${target}`);
    return source.match(reg);
};

exports.default = () => {
    return Promise.all([getFileList(), getIgnores()]).then(([files, ignores]) => {
        if (!ignores) {
            return files;
        }
        return files.filter(file => !ignores.some(item => isMatch(item, file)));
    }).catch();
};