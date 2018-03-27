const program = require('commander');
const inquirer = require('inquirer');
const FileMerge = require('../libs/file/merge');
const { log, error } = require('../libs/utils/message');

program.parse(process.argv);

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Please input your name:'
    },
    {
        type: 'list',
        name: 'gender',
        message: 'Please select your gender:',
        choices: [ 'Male', 'Female' ]
        
    },
    {
        type: 'input',
        name: 'age',
        message: 'Please input your age:',
        validate: input => {
            const age = parseInt(input);
            if (isNaN(age) || age < 1 || age > 130) {
                error(`${require('os').EOL}You should input a valid age.`);
                return false;
            }
            return true;
        }
    }
]).then(answer => {
    const fileMerge = new FileMerge('.descrc', answer);
    fileMerge.merge();
})