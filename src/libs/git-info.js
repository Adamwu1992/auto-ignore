import os from 'os';
import { exec } from 'child_process';

export default function() {
    return new Promise((resolve, reject) => {
        exec('git config -l', function(err, stdout, stderr) {
            if (err) {
                reject();
                return;
            }
            const lines = stdout.split(os.EOL);
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
        })
    })
}