'use strict';

const fs = require('fs');
const util = require('util');
const path = require('path');

const DEFAULT_ENV = 'development';

const configFile = util.format('./%s.json', process.env.NODE_ENV || DEFAULT_ENV);
const configPath = path.join(path.resolve('.'), 'config', configFile);
module.exports = JSON.parse(fs.readFileSync(configPath));
