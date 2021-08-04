const fs = require('fs-extra');
const path = require('path');
const configJsonPath = './build/package.json'



async function init(){
    let config = fs.readJsonSync(configJsonPath)
    arr = config.version.split('.');
    arr[2]++;
    if(arr[2]>=100){
        arr[2]=0;
        arr[1]++;
    }

    if(arr[1]>=10) {
        arr[1]=0;
        arr[0]++
    }
    config.version = arr.join('.')
    fs.writeFileSync(configJsonPath, JSON.stringify(config, null, 4));

    await fs.remove(path.join(__dirname, '../source'));
    await fs.mkdirs(path.join(__dirname, '../source'))
    await fs.copy(path.join(__dirname, './package.json'), path.join(__dirname, '../source/package.json') )
    await fs.copy(path.join(__dirname, '../README.md'), path.join(__dirname, '../source/README.md') )
    await fs.copy(path.join(__dirname, '../src/index.js'), path.join(__dirname, '../source/index.js'))
    await fs.copy(path.join(__dirname, '../src/itv-components'), path.join(__dirname, '../source/itv-components'))
    await fs.copy(path.join(__dirname, '../src/assets'), path.join(__dirname, '../source/assets'))
    await fs.copy(path.join(__dirname, '../src/libs'), path.join(__dirname, '../source/libs'))
    await fs.copy(path.join(__dirname, '../src/plugins'), path.join(__dirname, '../source/plugins'))
}


init();