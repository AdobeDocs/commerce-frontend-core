const frontend = require("./frontend");
const ui_components = require("./ui_components");
const javascript = require("./javascript");
const admin = require("./admin");
const page_builder = require("./page_builder");

module.exports = [...frontend, ...ui_components, ...javascript, ...admin, ...page_builder];
