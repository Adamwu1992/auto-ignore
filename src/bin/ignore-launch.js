#! /usr/bin/env node

import program from 'commander';
import chalk from 'chalk';
import { log } from '../libs/utils/message';
import launch from '../libs/launch/boilerplate';

program
    .usage('<template> [options]')
    .option('-d, --debug', 'refer dependencies in development mode')
    .on('--help', function() {
        log();
        log('  Available tmeplate:');
        log();
        log(`    ✨ ${chalk.cyan('Vue')} - A vue project with hot-reloading.`);
        log();
    })
    .parse(process.argv);


log('in launch:');

function _run() {
    const args = program.args;
    if (args.length < 1) {
        program.outputHelp();
        return;
    }
    launch();
}
_run();