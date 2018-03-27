const chalk = require('chalk');

module.exports = {
    log: (...reset) => {
        console.log(chalk.green(...reset));
    },

    error: (...reset) => {
        console.log(chalk.red(...reset));
    }
}