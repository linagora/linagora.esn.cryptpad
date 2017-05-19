'use strict';

var logger, libPad;

function passThrough(req, res, next) {
  logger.info('It works! Passing through');
  next();
}

function hasPermissions(req, res, next) {
  libPad.pad.isCreator(req.params.channelId, req.user._id, (err, res) => {
    if (err) {
      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Error',
          details: `Can not fetch pad ${req.params.channelId}`
        }
      });
    }

    if (!res) {
      return res.status(403).json({
        error: {
          code: 403,
          message: 'Forbidden',
          details: 'User does not have enough rights to delete this pad'
        }
      });
    }

    next();
  });
}

module.exports = function(dependencies, lib) {
  logger = dependencies('logger');
  libPad = lib;

  return {
    passThrough: passThrough,
    hasPermissions: hasPermissions
  };
};
