'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 向文件中添加json内容
 * 文件不存在则新建
 */
class FileMerge {
    constructor(fileName, json) {
        // 判断是否是绝对路径
        if (fileName.match(/^\//)) {
            this.fileName = fileName;
        } else {
            this.fileName = _path2.default.resolve(process.cwd(), _path2.default.join('.', fileName));
        }
        this.json = json;
    }

    /**
     * @param {number} fd
     * @returns {Promise<Buffer>}
     */
    read(fd) {
        return new Promise((resolve, reject) => {
            _fs2.default.readFile(fd || this.fileName, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    /**
     * @param {number} fd
     * @returns {Promise<Object>}
     */
    preview(fd) {
        return new Promise((resolve, reject) => {
            this.read(fd).then(data => data.length ? JSON.parse(data) : {}).then(json => resolve(Object.assign(json, this.json))).catch(err => reject(err));
        });
    }

    merge() {
        return new Promise((resolve, reject) => {
            _fs2.default.open(this.fileName, 'a+', (err, fd) => {
                if (err) {
                    reject(err);
                    return;
                }
                this.preview(fd).then(json => {
                    const file = JSON.stringify(json, null, '    ');
                    console.log(file);
                    _fs2.default.writeFile(fd, file, err => {
                        if (err) {
                            reject(err);
                        }
                        resolve();
                    });
                });
            });
        });
    }
}

exports.default = FileMerge;