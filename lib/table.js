
function padEnd ( string, pad = ' ', length) {
    if(string.length >= length || typeof pad !== 'string' || (length - string.length) < 1 )  {
        return string;
    }
    return string + pad.repeat(length - string.length);
}

module.exports = function(packages) {

    let str = ``;

    let longestProject = 0;
    let longestScriptName = 0;
    let longestScriptValue = 0;

    packages.forEach( el => {

        longestProject = Math.max(longestProject, el.name.length);

        let scripts = Object.keys(el.scripts);
        let scriptValues = scripts.map(e => el.scripts[e]);

        scripts.forEach(e => longestScriptName = Math.max(longestScriptName, e.length));
        scriptValues.forEach(e => longestScriptValue = Math.max(longestScriptValue, e.length));

    });


    // Second pass to actually make the table
    let longest = longestProject + longestScriptName + longestScriptValue + 10;

    str += `-`.repeat(longest+2) + '\n' +
        `|${padEnd(' Project', ' ', longestProject + 2)} | ${padEnd(` Command`, ' ', longestScriptName)} | ${padEnd(`Script`, ' ', longestScriptValue+2)}|\n` +
        `-`.repeat(longest+2) + '\n';

    packages.forEach(el => {


        let scripts = Object.keys(el.scripts);
        let scriptValues = scripts.map(e => el.scripts[e]);

        scripts.forEach(e => longestScriptName = Math.max(longestScriptName, e.length));

        str += `|${padEnd(` ${el.name}`, ` `, longestProject + 2)} | ${padEnd('', ' ', longestScriptName)} | ${padEnd('', ' ', longestScriptValue+2)}|\n`;
            // `-`.repeat(longest) + '\n';

        scripts.forEach((e, i) => {
            str +=
                `|${padEnd('', ' ', longestProject + 2)} | ${padEnd(`${e}`, ' ', longestScriptName)} | ${padEnd(`${scriptValues[i]}`, ' ', longestScriptValue+2)}|\n` +
                `|${padEnd('', ' ', longestProject + 2)} | ${padEnd('', ' ', longestScriptName)} | ${padEnd(``, ' ', longestScriptValue+2)}|\n` +
                `|${padEnd('', ' ', longestProject + 2)} | ${padEnd(``, ' ', longestScriptName)} | ${padEnd(``, ' ', longestScriptValue+2)}|\n`;


        });
        str += `-`.repeat(longest) + '\n';



    });

    return str;

};