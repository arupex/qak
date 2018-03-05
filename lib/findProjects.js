let cwd = process.cwd();

let fs = require('fs');

let dirs = fs.readdirSync(cwd).map( dir => { return { cwd: cwd, dir : dir } });

let isLikelyFile = /\.\w{3,4}$/;
let isPackageJson = /package.json$/;

let thingsToIgnore = [
    'node_modules'
];

let packages = [];

while (dirs.length > 0) {

    let dirObj = dirs.shift();

    let dir = dirObj.dir;
    let cwd = dirObj.cwd;

    let nextDir = `${cwd}/${dir}`;

    if(!thingsToIgnore.some(thing => (dir.indexOf(thing) !== -1)) && !isLikelyFile.test(dir)) {

        try {
            fs.readdirSync(nextDir).map(dir => {
                return {
                    cwd: nextDir,
                    dir: dir
                }
            })
        }
        catch(e){}

    }
    else if(isPackageJson.test(dir)) {
        let packageName = require(nextDir);
        if(packageName.scripts) {
            packages.push({
                cwd: cwd,
                dir: dir,
                scripts: packageName.scripts
            });
        }

    }

}

module.exports = packages;