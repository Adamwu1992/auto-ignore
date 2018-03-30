'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 追加文件内容
 * 文件不存在则新建
 */
class FileAppend {

    constructor(fileName, text) {
        // 判断是否是绝对路径
        if (fileName.match(/^\//)) {
            this.fileName = fileName;
        } else {
            this.fileName = _path2.default.resolve(process.cwd(), _path2.default.join('.', fileName));
        }
        this.text = text || '';
    }

    addLine(line) {
        if (!this.text) {
            this.text = line;
        } else {
            this.text += _os2.default.EOL + line;
        }
    }

    genreate() {
        // 判断文件是否为空
        const isFileEmpty = fd => {
            return new Promise((resolve, reject) => {
                const buffer = new Buffer(128);
                _fs2.default.read(fd, buffer, 0, 30, null, err => {
                    if (err) {
                        reject();
                    }
                    resolve(buffer[0] === 0);
                });
            });
        };
        return new Promise((resolve, reject) => {
            _fs2.default.open(this.fileName, 'a+', (err, fd) => {
                isFileEmpty(fd).then(empty => {
                    if (!empty) {
                        this.text = _os2.default.EOL + this.text;
                    }
                    _fs2.default.write(fd, this.text, err => {
                        if (err) {
                            reject();
                        }
                        this.text = '';
                        _fs2.default.close(fd, () => resolve());
                    });
                });
            });
        });
    }
}

exports.default = FileAppend;