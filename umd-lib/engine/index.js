"use strict";

var _config = require("./config");

var _start = require("../plugins/filebatch/start");

// import {mkdirSync} from getSignPath('@src/plugins/fb')
// Make dir output folder: dist, if it does not exists
(0, _start.start)(); // Read files from origin source folder