'use strict';


const CONSTANTS = require('../lib/constants');

const SKIP_FIELDS = CONSTANTS.SKIP_FIELDS;


module.exports = function(dependencies) {

  const mongoose = dependencies('db').mongo.mongoose;
  const padModel = mongoose.model('pad');

  function create(pad, callback) {
    return padModel.create(pad, callback);
  }

  function getPadById(chanId, callback) {
    return padModel.findOne({'channel': chanId}).populate('author coAuthor', SKIP_FIELDS.USER).exec(callback);
  }

  function getAllPadsByUserId(userId, callback) {
    return padModel.find({$or: [{'author': userId}, {'coAuthor': userId}] }).populate('author coAuthor', SKIP_FIELDS.USER).exec(callback);
  }

  function getPadsByAuthor(userId, callback) {
    return padModel.find({'author': userId}).exec(callback);
  }

  function getPadsByCoAuthor(userId, callback) {
    return padModel.find({'coAuthor': userId}).exec(callback);
  }

  function insertMessage(chanId , msg, callback) {
    return padModel.findOneAndUpdate({'channel': chanId},
      {$push: {'messages': msg}},
      {new: true, safe: true, upsert: true},
      callback
    );
  }

  function insertValidateKey(validateKey, chanId, callback) {
    return padModel.findOneAndUpdate({'channel': chanId},
      {$set: {'validateKey': validateKey[0], 'key': validateKey[1]}},
      {new: true, safe: true, upsert: true},
      callback
    );
  }

  function insertKey(key, chanId, callback) {
    return padModel.findOneAndUpdate({'channel': chanId},
      {$set: {'key': key}},
      {new: true, safe:true, upsert: true},
      callback
    );
  }

  function insertCoAuthor(coAuthorId, chanId, callback) {
    return padModel.findOneAndUpdate({'channel': chanId},
      {$push: {'coAuthor': coAuthorId}},
      callback
    );
  }

  function setCoAuthors(coAuthors, chanId, callback) {
    return padModel.findOneAndUpdate({'channel': chanId},
      {$set: {'coAuthor': coAuthors}},
      callback
    );
  }

  function deletePad(chanId, callback) {
    return padModel.findOneAndRemove({"channel": chanId}, callback);
  }

  function isCreator(chanId, userId, callback) {
    return padModel.findOne({'channel': chanId, 'author': userId}).exec(callback);
  }

  function changeName(chanId, padName, callback) {
    return padModel.findOneAndUpdate({'channel': chanId},
      {$set: {'name': padName}},
      callback
    );
  }

  return {
    create,
    getPadById,
    insertMessage,
    insertValidateKey,
    insertKey,
    insertCoAuthor,
    setCoAuthors,
    getAllPadsByUserId,
    getPadsByAuthor,
    getPadsByCoAuthor,
    deletePad,
    isCreator,
    changeName
  };
};
