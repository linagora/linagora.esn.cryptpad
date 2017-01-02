'use strict';

module.exports = function(dependencies) {

  const pad = require('./pad')(dependencies);

  return {
    pad
  };
};
