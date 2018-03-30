import chalk from 'chalk';

export const log = (...reet) => console.log(chalk.green(...reset));

export const error = (...reset) => console.log(chalk.red(...reset));
