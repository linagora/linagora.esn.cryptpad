'use strict';

module.exports = function(dependencies) {

  const mongoose = dependencies('db').mongo.mongoose;

  const PadSchema = new mongoose.Schema({
    cryptpadId: {type: String, required: true},
    name: {type: String, required: true},
    messages: {type: [], required: false},
    timestamps: {
      creation: {type: Date, default: Date.now}
    }
  });

  return mongoose.model('pad', PadSchema);
};
