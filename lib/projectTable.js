let table = require('table').table;

module.exports = function (packages) {

    let arrayOfArrays = [];

    let maxPName = packages.reduce((acc, v) => Math.max(acc, v.name.length), 0);
    let maxScript = 0;
    let maxScriptValue = 0;

    packages.forEach(el => {

        let scripts = Object.keys(el.scripts);
        maxScript = scripts.reduce((acc, v) => Math.max(acc, v.length), 0);
        let scriptValues = scripts.map(e => el.scripts[e]);

        maxScriptValue = scriptValues.reduce((acc, v) => Math.max(acc, v.length), 0);

        scriptValues.forEach((e, i) => {
            arrayOfArrays.push([el.name, scripts[i], scriptValues[i]]);
        });

    });

    let columnWidth = (process.stdout.columns - maxPName - maxScript) - 12;
    if (columnWidth < 5) {
        columnWidth = 5;
    }
    return table(arrayOfArrays, {
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