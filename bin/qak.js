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
let table = require('table').table;
let spawner = require('child_process').spawnSync;

function spawn(cmd, cwd) {
    // call command and pass args via both args and env
    spawner('npm', ['run', cmd].concat(Object.keys(args).map(e => `--${e}=${args[e]}`)), {
        cwd: cwd,
        env: Object.assign({}, process.env, args),
        stdio: 'inherit'
    });
}

let projectMapping = projects.reduce((acc, v) => {
    acc[v.name] = v;
    return acc;
}, {});

let scriptMappings = projects.reduce((acc, v) => {

    Object.keys(v.scripts).forEach(scriptName => {
        if (!acc[scriptName]) {
            acc[scriptName] = [];
        }

        acc[scriptName].push({
            project: v.name,
            scriptName: scriptName,
            script: v.scripts[scriptName]
        });
    });
    return acc;
}, {});


let project = projectMapping[process.argv.find(e => projectMapping[e])];
let script = scriptMappings[process.argv.find(e => scriptMappings[e])];

if (project && script) {
    spawn(project.scripts[script.scriptName], project.cwd);
}
else {
    if (project && !script) {
        let table = projectTable([project]);
        console.log(table);
    }
    else if (script && script.length === 1) {
        let project = projectMapping[script[0].project];
        spawn(script[0].scriptName, project.cwd);
    }
    else if (script && script.length > 1) {
        let arrayOfArrays = [['Project', 'Command', 'Script']];
        script.forEach(e => {
            arrayOfArrays.push([e.project, e.scriptName, e.script]);
        });
        let maxEach = process.stdout.columns - arrayOfArrays.reduce((acc, v) => Math.max(acc, v[0].length + v[1].length), 0) - 12;
        console.log(table(arrayOfArrays, {
            columns: {
                0: {
                    wrapWord: true
                },
                1: {
                    wrapWord: true
                },
                2: {
                    width: maxEach,
                    wrapWord: true
                }
            }
        }));
    }
    else {

        let table = projectTable(projects);
        console.log(table);

    }
}
