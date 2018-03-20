const fs = require('fs');
const path = require('path');
const os = require('os');

class FileGenerotor {

    constructor(fileName, text) {
        this.fileName = fileName;
        this.text = text || '';
    }

    addLine(line) {
        if (!this.text) {
            this.text = line;
        } else {
            this.text += (os.EOL + line);
        }
    }

    preview() {
        console.log('The file is looked like this:')
        console.log('====================================');
        console.log(this.text);
        console.log('====================================');
    }

    genreate() {
        const fileName = path.resolve(process.cwd(), path.join('.', this.fileName));
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
                        resolve();
                    })
                })
            })
        })
    }
}

module.exports = FileGenerotor;