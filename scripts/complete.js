const fs = require('fs');
const path = require('path');
const { resolve } = require('path');
const { readdir } = require('fs').promises;
const { rename } = require('fs');
const replace = require('replace-in-file');

const localizeSrc = './src/localization/i18n.js'
const indexHtmSrc = './public/index.html'
const config = './config-overrides.js'

async function* getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getFiles(res);
        } else {
            yield res;
        }
    }
}

function removeVersionNumberFromSingleFile(path, regexPattern, replaceString) {
    console.log(regexPattern);
    console.log(replaceString);
    const options = {
        //Single file
        files: path,
        //Replacement to make (string or regex) 
        from: new RegExp(regexPattern, "gm"),
        to: replaceString,
    };

    replace(options)
        .then(changedFiles => {
            console.log('The version was removed!')
            console.log('Modified file:', changedFiles);
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
}

function removeVersionNumberFromFileName(url, extension, versionNumber) {
    (async () => {
        for await (const f of getFiles(url)) {
            const name = path.basename(f);
            const ext = path.extname(f);
            const nameWithoutExt = path.basename(name, ext);
            const folderPath = path.dirname(f);
            if (ext == extension) {
                const newPath = folderPath + "\\" + nameWithoutExt.replace(versionNumber, "") + ext;
                rename(
                    f,
                    newPath,
                    err => console.log(err)
                );
            }
        }
    })();
}

var versionNumber;
new Promise((resolve) => {
    console.log("complete started");

    fs.readFile('./version.json', (err, data) => {
        if (err) throw err;

        var packageJsonObj = JSON.parse(data);
        //versionNumber = `${packageJsonObj.version}-${packageJsonObj.hash}`;
        versionNumber = `${packageJsonObj.version}`;

        removeVersionNumberFromFileName('./public/locales/', ".json", "." + versionNumber);
        removeVersionNumberFromSingleFile(localizeSrc, "translation." + versionNumber, "{translation}");
        removeVersionNumberFromSingleFile(config, versionNumber, "{version}");
        removeVersionNumberFromSingleFile(indexHtmSrc, versionNumber, "{version}");
    });
});
