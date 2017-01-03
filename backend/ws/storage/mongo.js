var lib, logger;
const Nacl = require('tweetnacl');

var removeChannel = function (channelName, cb) {
    //fetch close channel
};

var closeChannel = function (channelName, cb) {

};

var flushUnusedChannels = function (cb, frame) {

};

var createChannel = function(env, channelId, cb) {
  var chan = env.channels[channelId] = {
    cryptpadId: channelId,
    name: 'test',
    messages: []
  }

  lib.create(chan, cb);
}

var getChannel = function (env, id, callback) {
  if (env.channels[id]) {
      var chan = env.channels[id];
      chan.atime = +new Date();
      if (chan.whenLoaded) {
          chan.whenLoaded.push(callback);
      } else {
          callback(undefined, chan);
      }
      return;
  }

  lib.get(id, function(err, chan) {
    if(err) {
      logger.error('Errror while getting cryptpad channel', err);
      callback(err, null)
    }

    if (chan) {
      env.channels[id] = chan;
      callback(null, chan)
    }

    if (!err && !chan) {
      createChannel(env, id, function(err, chan) {
        if(err) {
          callback(err, null);
        } else {
          callback(null, chan);
        }
      });
    }
  });
};

var message = function (env, chanName, msg, cb) {
  getChannel(env, chanName, function(err, chan) {
    if(err) {
      return cb(err);
    } else {
      lib.insertMessage(chanName, msg, function(err, doc) {
        if(err) {
          cb(err);
        }
        env.channels[chanName].messages.push(msg);
      });
    }
  });
};

var getMessages = function (env, chanName, handler, cb) {
    getChannel(env, chanName, function (err, chan) {
        if (err) {
            cb(err);
            return;
        }
        try {
            chan.messages
                .forEach(function (message) {
                    if (!message) { return; }
                    handler(message);
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




module.exports = function(dependencies) {
  lib = require('../../lib/pad')(dependencies);
  logger = dependencies('logger');

  var create = function (conf, cb) {
      var env = {
          root: conf.filePath || './datastore',
          channels: { },
          channelExpirationMs: conf.channelExpirationMs || 30000
      };
      cb({
          message: function (channelName, content, cb) {
              message(env, channelName, content, cb);
          },
          getMessages: function (channelName, msgHandler, cb) {
              getMessages(env, channelName, msgHandler, cb);
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
