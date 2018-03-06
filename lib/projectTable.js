'use strict';

let table = require('table').table;

module.exports = function (packages) {

    let arrayOfArrays = [['Project','Command','Script']];

    let maxPName = packages.reduce((acc, v) => Math.max(acc, v.name.length), 0);
    let maxScript = 0;
    let maxScriptValue = 0;

    packages.forEach(el => {

        let scripts = Object.keys(el.scripts);
        maxScript = scripts.reduce((acc, v) => Math.max(acc, v.length), maxScript);
        let scriptValues = scripts.map(e => el.scripts[e]);

        maxScriptValue = scriptValues.reduce((acc, v) => Math.max(acc, v.length), maxScriptValue);

        scriptValues.forEach((e, i) => {
            arrayOfArrays.push([el.name, scripts[i], scriptValues[i]]);
        });

    });

    let maxColumnWidth = (process.stdout.columns - (maxPName+3) - (maxScript+3)) - 15;
    let columnWidth = maxColumnWidth;
    if(maxColumnWidth > maxScriptValue) {
        columnWidth = maxScriptValue;
    }
    if (columnWidth < 5) {
        columnWidth = 5;
    }

    // remove control characters
    return table(arrayOfArrays.map(e=> e.map(a=> a.replace(/[\n\r\t]/g,''))), {
        columns: {
            0: {
                wrapWord: true
            },
            1: {
                wrapWord: true
            },
            2: {
                width: columnWidth,
                wrapWord: true
            }
        }
    });

};