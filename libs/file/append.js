const fs = require('fs');
const path = require('path');
const os = require('os');

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
            this.fileName = path.resolve(process.cwd(), path.join('.', fileName));
        }
        this.text = text || '';
    }

    addLine(line) {
        if (!this.text) {
            this.text = line;
        } else {
            this.text += (os.EOL + line);
        }
    }

    genreate() {
        // 判断文件是否为空
        const isFileEmpty = fd => {
            return new Promise((resolve, reject) => {
                const buffer = new Buffer(128);
                fs.read(fd, buffer, 0, 30, null, (err) => {
                    if (err) {
                        reject();
                    }
                    resolve(buffer[0] === 0);
                });
            });
        };
        return new Promise((resolve, reject) => {
            fs.open(this.fileName, 'a+', (err, fd) => {
                isFileEmpty(fd).then(empty => {
                    if (!empty) {
                        this.text = os.EOL + this.text;
                    }
                    fs.write(fd, this.text, (err) => {
                        if (err) {
                            reject();
                        }
                        this.text = '';
                        fs.close(fd, () => resolve());
                    })
                })
            })
        })
    }
}

module.exports = FileAppend;