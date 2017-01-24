'use strict';

module.exports = function(dependencies, lib) {

  const logger = dependencies('logger');

  return {
    getAllPadsByUserId,
    getPadsByAuthorId,
    getPadsByCoAuthorId,
    deletePad
  };


  function getAllPadsByUserId(req, res) {
    lib.pad.getAllPadsByUserId(req.params.userId, (err, result) => {
      if (err) {
        logger.error('Error while getting pads for user %s', params.userId, err);

        return res.status(500).json({
          error: {
            code: 500,
            message: 'Server Error',
            details: 'Error while getting pads'
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
            details: 'Error while getting pads'
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
            details: 'Error while getting pads'
          }
        });
      }
      return res.status(200).json(result);
    });
  }

  function deletePad(req, res) {
    console.log(req.params.channelId);
    lib.pad.deletePad(req.params.channelId, (err, result) => {
      if(err) {
        logger.error('Error while deleting pads : %s', chanId);

        return res.status(500).json({
          error: {
            code: 500,
            message: 'Server Error',
            details: 'Error while deleting pad'
          }
        });
      }
      return res.status(200).json();
    })
  }
};
