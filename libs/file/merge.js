const fs = require('fs');

/**
 * 向文件中添加json内容
 * 文件不存在则新建
 */
class FileMerge {
    constructor(fileName, json) {
        this.fileName = fileName;
        this.json = json;
    }

    /**
     * @param {number} fd
     * @returns {Promise<Buffer>}
     */
    read(fd) {
        return new Promise((resolve, reject) => {
            fs.readFile(fd || this.fileName, (err, data) => {
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
            this.read(fd)
                .then(data => data.length ? JSON.parse(data) : {})
                .then(json => resolve(Object.assign(json, this.json)))
                .catch(err => reject(err));
        });
    }

    merge() {
        return new Promise((resolve, reject) => {
            fs.open(this.fileName, 'a+', (err, fd) => {
                if (err) {
                    reject(err);
                    return;
                }
                this.preview(fd).then(json => {
                    console.log(JSON.stringify(json));
                    fs.writeFile(fd, JSON.stringify(json), err => {
                        if (err) {
                            reject(err);
                        }
                        resolve(err);
                    });
                });
            });
        });
    }
}

module.exports = FileMerge;