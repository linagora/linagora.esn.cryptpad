var logger;
const moment = require('moment');
var self = this;

var removeChannel = function() {
};

var closeChannel = function() {
};

var flushUnusedChannels = function() {
};

var createChannel = function(env, channId, user, cb) {
  var chan = env.channels[channId] = {
    channel: channId,
    author: user,
    name: 'Pad - ' + moment().format('ddd MMM DDD YYYY HH:mm'),
    messages: [],
    coAuthor: []
  };

  self.lib.pad.create(chan, cb);
};

var getChannel = function(env, chanId, user, callback) {
  /*if (env.channels[chanId]) {
      var chan = env.channels[chanId];
      chan.atime = +new Date();
      if (chan.whenLoaded) {
          chan.whenLoaded.push(callback);
      } else {
          callback(undefined, chan);
      }
      return;
  }*/

  self.lib.pad.getPadById(chanId, function(err, chan) {
    if (err) {
      logger.error('Errror while getting cryptpad channel', err);
      callback(err, null);
    }

    if (chan) {
      env.channels[chanId] = chan;
      callback(null, chan);
    }

    if (!err && !chan && user) {
      createChannel(env, chanId, user, function(err, chan) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, chan);
        }
      });
    }
  });
};

function isCoAuthor(chan, userId) {
  var isCoAuthor = false;

  chan.coAuthor.forEach(function(user) {
    if (user._id && user._id === userId) {
      isCoAuthor = true;
    } else if (user === userId) {
      isCoAuthor = true;
    }
  });

  return isCoAuthor;
}

var message = function(env, chanId, msg, cb) {
  getChannel(env, chanId, null, function(err, chan) {
    if (err) {
      return cb(err);
    }
    if (msg.validateKey && msg.channel) {
      var keys = msg.validateKey.split(';');

      msg = {validateKey: keys[0], channel: msg.channel};
      self.lib.pad.insertValidateKey(keys, msg.channel, function(err) {
        if (err) {
          cb(err);
        }
      });
    } else if (!isCoAuthor(chan, msg[1]) && (chan.author._id !== msg[1])) {
      logger.info(msg[1] + 'start coAuthor on pads : ' + chanId);
      self.lib.pad.insertCoAuthor(msg[1], chanId, function(err) {
        if (err) {
          logger.error('Can\'t insert the coAuthor ' + msg[1] + ' on pad : ' + chanId);
        }
        env.channels[chanId].coAuthor.push(msg[1]);
      });
    }
    self.lib.pad.insertMessage(chanId, msg, function(err) {
      if (err) {
        cb(err);
      }
      env.channels[chanId].messages.push(msg);
    });
  });
};

var getMessages = function(env, chanId, user, handler, cb) {
    getChannel(env, chanId, user, function(err, chan) {
        if (err) {
            return cb(err);
        }
        try {
            chan.messages
                .forEach(function(message) {
                    if (!message) { return; }
                    handler(JSON.stringify(message));
                });
        } catch (err2) {
            console.error(err2);
            return cb(err2);
        }
        chan.atime = +new Date();
        cb();
    });
};

module.exports = function(dependencies, lib) {
  self.lib = lib;
  logger = dependencies('logger');

  var create = function(conf, cb) {
      var env = {
          root: conf.filePath || './datastore',
          channels: { },
          channelExpirationMs: conf.channelExpirationMs || 30000
      };

      cb({
          message: function(channelName, content, cb) {
              message(env, channelName, JSON.parse(content), cb);
          },
          getMessages: function(channelName, user, msgHandler, cb) {
              getMessages(env, channelName, user, msgHandler, cb);
          },
          removeChannel: function(channelName, cb) {
              removeChannel(env, channelName, function(err) {
                  cb(err);
              });
          },
          closeChannel: function(channelName, cb) {
              closeChannel(env, channelName, cb);
          },
          flushUnusedChannels: function(cb) {
              flushUnusedChannels(env, cb);
          }
      });
      setInterval(function() {
          flushUnusedChannels(env, function() { });
      }, 5000);
  };

  return {
    create
  };
};
