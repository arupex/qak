#!/usr/bin/env node

let args = process.argv
    .filter(e => e.indexOf('=') !== -1)
    .reduce((acc, value) => {
        let kv = value.split('=');
        acc[kv[0].replace(/^-*/g, '')] = kv[1];
        return acc;
    }, {});

let projects = require('../lib/findProjects');
let projectTable = require('../lib/projectTable');

let spawner = require('child_process').spawnSync;

let qString = process.argv.slice(2).filter(e => !(/-\w+/g.test(e))).join(' ');

let DigitalSearch = require('digital-search');

function spawn(cmd, cwd) {
    // call command and pass args via both args and env
    spawner('npm', ['run', cmd].concat(Object.keys(args).map(e => `--${e}=${args[e]}`)), {
        cwd: cwd,
        env: Object.assign({}, process.env, args),
        stdio: 'inherit'
    });
}

let searchables = projects.reduce((acc, project) => {
    let scripts = Object.keys(project.scripts);
    scripts.forEach(scriptName => {
        acc.push({
            name: project.name,
            projectScript: project.name + ' ' + scriptName,
            project: project.name,
            cwd: project.cwd,
            scriptName: scriptName,
            scripts: project.scripts
        });
    });
    return acc;
}, []);


let searcher = new DigitalSearch(searchables, {
    searchable: 'projectScript',
    indexable: 'projectScript',
    partials: true,
    caseSensative: false,
    minWordLength: 1
});

const mapAttack = require('map-attack');


console.log('searching...', qString);

let search = searcher.search(qString);

let convertSearchResultsToTable = function (search) {
    let set = mapAttack(mapAttack(search, 'projectScript', false), 'projectScript', false);
    let rProjects = [];

    set.forEach(e => {
        rProjects.push({
            name: e.name,
            cwd: e.cwd,
            scripts: {
                [e.scriptName]: e.scripts[e.scriptName].replace(/\n/g, '').trim()
            }
        });
    });

    console.log('multiple results', rProjects);
    let table = projectTable(rProjects);
    console.log(table);
};

if (search.length === 0) {
    let table = projectTable(projects);
    console.log(table);
}
else if (search.length === 1) {
    convertSearchResultsToTable(search);
    spawn(search[0].scriptName, search[0].cwd);
}
else if (search.length > 1) {
    convertSearchResultsToTable(search);
}