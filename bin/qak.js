#!/usr/bin/env node

let projects = require('../lib/findProjects');

console.log('projects', projects);

if(process.argv.length === 2) {

    let table = require('../lib/projectTable')(projects);

    console.log(table);
}