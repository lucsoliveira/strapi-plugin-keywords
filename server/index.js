"use strict";

const register = require("./register");
const bootstrap = require("./bootstrap");
const destroy = require("./destroy");
const config = require("./config");
const controllers = require("./controllers");
const routes = require("./routes");
const policies = require("./policies");
const services = require("./services");

module.exports = {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  policies,
};
