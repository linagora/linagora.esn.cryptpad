'use strict';



module.exports = function(dependencies) {

  const mongoose = dependencies('db').mongo.mongoose;
  const padModel = mongoose.model('pad');

  function create(pad, callback) {
    return padModel.create(pad, callback);
  }

  function get(id, callback) {
    return padModel.findOne({'cryptpadId': id}).exec(callback);
  }

  function insertMessage(id , msg, callback) {
    return padModel.findOneAndUpdate({'cryptpadId': id},
      {$push: {"messages": msg}},
      {new: true, safe: true, upsert: true},
      callback
    );
  }

  return {
    create,
    get,
    insertMessage
  };
};
