const program = require('commander');
const getRepo = require('../libs/git-info');

const log = console.log;

program.option('-p --plus', 'plus').parse(process.argv);

log('in test:')

getRepo().then(console.log);
