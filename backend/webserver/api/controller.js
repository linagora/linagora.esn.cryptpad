'use strict';

module.exports = function(dependencies, lib) {

  const logger = dependencies('logger');

  return {
    getAllPadsByUserId,
    getPadsByAuthorId,
    getPadsByCoAuthorId
  };


  function getAllPadsByUserId(req, res) {
    lib.pad.getAllPadsByUserId(req.params.userId, (err, result) => {
      if (err) {
        logger.error('Error while getting pads for user %s', params.userId, err);

        return res.status(500).json({
          error: {
            code: 500,
            message: 'Server Error',
            details: 'Error while deleting conversation'
          }
        });
      }
      return res.status(200).json(result);
    });
  }

  function getPadsByAuthorId(req, res) {
    lib.pad.getPadsByAuthor(req.params.userId, (err, result) => {
      if (err) {
        logger.error('Error while getting pads for user %s', params.userId, err);

        return res.status(500).json({
          error: {
            code: 500,
            message: 'Server Error',
            details: 'Error while deleting conversation'
          }
        });
      }
      return res.status(200).json(result);
    });
  }

  function getPadsByCoAuthorId(req, res) {
    lib.pad.getPadsByCoAuthor(req.params.userId, (err, result) => {
      if (err) {
        logger.error('Error while getting pads for user %s', params.userId, err);

        return res.status(500).json({
          error: {
            code: 500,
            message: 'Server Error',
            details: 'Error while deleting conversation'
          }
        });
      }
      return res.status(200).json(result);
    });
  }
};
