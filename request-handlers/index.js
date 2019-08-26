'use strict';

const fs = require('fs');
const path = require('path');
const baseName = path.basename(__filename);

const handlers = {};

fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && (file !== baseName) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const ctor = require(path.join(__dirname, file));
        if (typeof ctor !== 'function') throw TypeError(`${file} should export a function, ${typeof ctor}`);
        handlers[ctor.name] = ctor;
    });

module.exports = handlers;
