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

function formatDate(date, format) {
    const map = {
        hh: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds(),
        MM: date.getMonth() + 1,
        dd: date.getDate(),
        yyyy: date.getFullYear()
    }

    return format.replace(/hh|mm|ss|MM|dd|yyyy/gi, matched => map[matched])
}

function injectVersionNumberToSingleFile(path, regexPattern, replaceString) {
    const options = {
        //Single file
        files: path,
        from: new RegExp(regexPattern, "gm"),
        to: replaceString,
    };

    replace(options)
        .then(changedFiles => {
           
            console.log('Modified file:', changedFiles);
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
}

function injectVersionNumberToFileName(url, extension) {
    (async () => {
        for await (const f of getFiles(url)) {
            const name = path.basename(f);
            const ext = path.extname(f);
            const nameWithoutExt = path.basename(name, ext);
            const folderPath = path.dirname(f);
            if (ext == extension) {
                const newPath = folderPath + "\\" + nameWithoutExt + "." + versionNumber + ext;
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
    console.log("started");

    fs.readFile('./version.json', (err, data) => {
        if (err) throw err;

        var currentDate = new Date();
        var packageJsonObj = JSON.parse(data);
        packageJsonObj.hash = formatDate(currentDate, 'yyyyMMdd-hhmmss');
        //versionNumber = `${packageJsonObj.version}-${packageJsonObj.hash}`;
        versionNumber = `${packageJsonObj.version}`;

        fs.writeFileSync('./version.json', JSON.stringify(packageJsonObj, null, 2));
        injectVersionNumberToFileName('./public/locales/', ".json");
        injectVersionNumberToSingleFile(localizeSrc, "{translation}", "translation." + versionNumber);
        injectVersionNumberToSingleFile(indexHtmSrc, "{version}", versionNumber);
        injectVersionNumberToSingleFile(config, "{version}", versionNumber);
    });
});
