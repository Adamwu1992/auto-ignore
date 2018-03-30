import fs from 'fs';
import glob from 'glob';
import os from 'os';

const getFileList = () => {
    return new Promise((resolve, reject) => {
        glob('*', (err, list) => {
            if (err) {
                console.error(err);
                reject();
            }
            resolve(list);
        });
    });
}

const getIgnores = () => {
    return new Promise((resolve, reject) => {
        fs.open('.gitignore', 'r', (err, fd) => {
            if (err) {
                console.log('open file error', err);
                // reject(err);
                // 文件不存在
                resolve();
                return;
            }
            fs.readFile(fd, (err, buffer) => {
                if (err) {
                    console.log('read file error', err);
                    reject(err);
                }
                resolve(buffer.toString().split(os.EOL));
            })
        });
    })
}

const isMatch = (source, target) => {
    // TODO: 
    const reg = new RegExp(`${target}`);
    return source.match(reg);
}

export default () => {
    return Promise.all([
        getFileList(),
        getIgnores()
    ])
    .then(([files, ignores]) => {
        if (!ignores) {
            return files;
        }
        return files.filter(file => !ignores.some(item => isMatch(item, file)));
    })
    .catch()
}