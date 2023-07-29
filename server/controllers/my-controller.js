'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('custom-field-keywords')
      .service('myService')
      .getWelcomeMessage();
  },
});
