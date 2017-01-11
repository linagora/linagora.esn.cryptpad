var
logger;
const Nacl = require('tweetnacl');
var self = this;

var removeChannel = function (channelName, cb) {
    //fetch close channel
};

var closeChannel = function (channelName, cb) {

};

var flushUnusedChannels = function (cb, frame) {

};

var createChannel = function(env, channId, user, cb) {
  var chan = env.channels[channId] = {
    channel: channId,
    author: user,
    name: 'test',
    messages: [],
    coAuthor: []
  };

  self.lib.pad.create(chan, cb);
}

var getChannel = function (env, chanId, user, callback) {
  if (env.channels[chanId]) {
      var chan = env.channels[chanId];
      chan.atime = +new Date();
      if (chan.whenLoaded) {
          chan.whenLoaded.push(callback);
      } else {
          callback(undefined, chan);
      }
      return;
  }

  self.lib.pad.getPadById(chanId, function(err, chan) {
    if (err) {
      logger.error('Errror while getting cryptpad channel', err);
      callback(err, null)
    }

    if (chan) {
      env.channels[chanId] = chan;
      callback(null, chan)
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

var message = function (env, chanId, msg, cb) {
  getChannel(env, chanId, null, function(err, chan) {
    if (err) {
      return cb(err);
    } else {
      if (msg.validateKey && msg.channel) {
        self.lib.pad.insertValidateKey(msg.validateKey, msg.channel, function(err, chan) {
          if (err) {
            cb(err);
          } else {
            cb(null);
          }
        })
      } else {
        if ((!chan.coAuthor.includes(msg[1])) && (chan.author !=  msg[1])) {
          logger.info(msg[1] + " start coAuthor on pads : " + chanId);
          self.lib.insertCoAuthor(msg[1], chanId, function(err, doc) {
            if (err) {
              logger.error('Can\'t insert the coAuthor ' + msg[1] + ' on pad : ' + chanId)
            }
            env.channels[chanId].coAuthor.push(msg[1]);
          })
        }
      }

      self.lib.pad.insertMessage(chanId, msg, function(err, doc) {
        if (err) {
          cb(err);
        }
        env.channels[chanId].messages.push(msg);
      });
    }
  });
};

var getMessages = function (env, chanId, user, handler, cb) {
    getChannel(env, chanId, user, function (err, chan) {
        if (err) {
            cb(err);
            return;
        }
        try {
            chan.messages
                .forEach(function (message) {
                    if (!message) { return; }
                    handler(JSON.stringify(message));
                });
        } catch (err2) {
            console.error(err2);
            cb(err2);
            return;
        }
        chan.atime = +new Date();
        cb();
    });
};

module.exports = function(dependencies, lib) {
  self.lib = lib;
  logger = dependencies('logger');

  var create = function (conf, cb) {
      var env = {
          root: conf.filePath || './datastore',
          channels: { },
          channelExpirationMs: conf.channelExpirationMs || 30000
      };
      cb({
          message: function (channelName, content, cb) {
              message(env, channelName, JSON.parse(content), cb);
          },
          getMessages: function (channelName, user, msgHandler, cb) {
              getMessages(env, channelName, user, msgHandler, cb);
          },
          removeChannel: function (channelName, cb) {
              removeChannel(env, channelName, function (err) {
                  cb(err);
              });
          },
          closeChannel: function (channelName, cb) {
              closeChannel(env, channelName, cb);
          },
          flushUnusedChannels: function (cb) {
              flushUnusedChannels(env, cb);
          },
      });
      setInterval(function () {
          flushUnusedChannels(env, function () { });
      }, 5000);
  };

  return {
    create
  };
}
