'use strict';

module.exports = function(dependencies) {

  const mongoose = dependencies('db').mongo.mongoose;
  const ObjectId = mongoose.Schema.Types.ObjectId;

  const PadSchema = new mongoose.Schema({
    channel: {type: String, required: true},
    validateKey: {type:String, required: false},
    author: {type: ObjectId, ref:'Users'},
    coAuthor: {type: [ObjectId], ref:'Users'},
    name: {type: String, required: true},
    messages: {type: [], required: false},
    timestamps: {
      creation: {type: Date, default: Date.now}
    }
  });

  return mongoose.model('pad', PadSchema);
};
