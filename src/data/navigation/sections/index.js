const frontend = require("./frontend");
const ui_components = require("./ui_components");
const javascript = require("./javascript");
const admin = require("./admin");


module.exports = [...frontend, ...ui_components, ...javascript, ...admin];
