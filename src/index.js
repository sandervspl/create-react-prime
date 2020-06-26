#!/usr/bin/env node
/* eslint-disable no-console */

const { TEXT } = require('./constants');
const { name } = require('./installConfig');
const install = require('./install');

/*
  Start install process
*/
install()
  .then(() => {
    console.log(`⚡️ ${TEXT.BOLD} Succesfully installed ${name}! ${TEXT.DEFAULT}`);

    process.exit();
  });

/* eslint-enable no-console */
