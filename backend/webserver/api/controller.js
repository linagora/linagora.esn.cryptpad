'use strict';

module.exports = function(dependencies, lib) {

  const logger = dependencies('logger');
  const emailSender = require('./emailSender').sharedPad(dependencies, lib);
  const utils = require('./utils')();
  const url = require('url');
  const _ = require('lodash');

  return {
    getPad,
    getAllPadsByUserId,
    getPadsByAuthorId,
    getPadsByCoAuthorId,
    deletePad,
    insertKeys,
    changePadName,
    addCoAuthor
  };

  function getAllPadsByUserId(req, res) {
    lib.pad.getAllPadsByUserId(req.params.userId, (err, result) => {
      if (err) {
        logger.error('Error while getting pads for user %s', req.params.userId, err);

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
        logger.error('Error while getting pads for user %s', req.params.userId, err);

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
        logger.error('Error while getting pads for user %s', req.params.userId, err);

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
    lib.pad.deletePad(req.params.channelId, err => {
      if (err) {
        logger.error('Error while deleting pads : %s', req.params.channelId);

        return res.status(500).json({
          error: {
            code: 500,
            message: 'Server Error',
            details: 'Error while deleting pad'
          }
        });
      }

      return res.status(200).json();
    });
  }

  function insertKeys(req, res) {
    lib.pad.insertKey(req.body.key, req.params.channelId, err => {
      if (err) {
        logger.console.error('Error while updating the pad : %s', req.params.channelId);

        return res.status(500).json({
          error: {
            code: 500,
            message: 'Server Error',
            details: 'Error while updating pad'
          }
        });
      }

      return res.status(200).json();
    });
  }

  function changePadName(req, res) {
    lib.pad.changeName(req.params.channelId, req.params.name, err => {
      if (err) {
        logger.console.error('Error while updating the pad : %s', req.params.channelId);

        return res.status(500).json({
          error: {
            code: 500,
            message: 'Server Error',
            details: 'Error while updating pad'
          }
        });
      }

      return res.status(200).json();
    });
  }

  function addCoAuthor(req, res) {
    lib.pad.setCoAuthors(req.body, req.params.chanId, (err, result) => {
      if (err) {
        logger.console.error('Error while updating the pad : %s', req.params.channelId);

        return res.status(500).json({
          error: {
            code: 500,
            message: 'Server Error',
            details: 'Error while updating pad'
          }
        });
      }

      var coAuthorEmails = _.map(result.coAuthor, function(coAuthor) {
        return coAuthor.accounts[0].emails[0];
      });

      var emailData = {
        data: {
          userSender: result.author,
          email: coAuthorEmails,
          fileShared: {
            filename: result.name
          },
          fileUrl: url.format({
                    protocol: req.protocol,
                    host: req.get('host'),
                    hash: '#/cryptpad/1/edit/' + utils.hexToBase64(result.channel) + '/' + result.key.replace(/\//g, '-')
                  })
        }
      };

      emailSender.sendEmail(emailData, err => {
        if (err) {
          return res.status(500).json({
            error: {
              code: 500,
              message: 'Error when sending mail',
              detail: err
            }
          });
        }

        return res.status(200).json(result);
      });
    });
  }

  function getPad(req, res) {
    lib.pad.getPadById(req.params.channelId, (err, result) => {
      if (err) {
        logger.error('Error while getting pads %s', req.params.channelId, err);

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

};
