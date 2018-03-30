'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return new Promise((resolve, reject) => {
        (0, _child_process.exec)('git config -l', function (err, stdout, stderr) {
            if (err) {
                reject();
                return;
            }
            const lines = stdout.split(_os2.default.EOL);
            let repo;
            let username;
            let useremail;
            lines.forEach(line => {
                // 仓库地址
                const matchRepo = line.match(/^remote\.origin\.url=(.*)/);
                if (matchRepo) {
                    repo = matchRepo[1];
                }
                // 用户名
                const matchName = line.match(/^user\.name=(.*)/);
                if (matchName) {
                    username = matchName[1];
                }
                // 邮箱
                const matchEMail = line.match(/^user\.email=(.*)/);
                if (matchEMail) {
                    useremail = matchEMail[1];
                }
            });
            resolve({ repo, username, useremail });
        });
    });
};

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }