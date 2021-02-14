const fs = require('fs-extra');
const path = require('path');
const { inherits } = require('util');



async function init(){
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