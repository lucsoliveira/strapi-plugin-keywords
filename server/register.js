"use strict";
const pluginPkg = require("../package.json");
const pluginId = pluginPkg.name.replace(
  /^(@[^-,.][\w,-]+\/|strapi-)plugin-/i,
  ""
);
const name = pluginPkg.strapi.name;

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: name,
    plugin: pluginId,
    type: "json",
  });
};
