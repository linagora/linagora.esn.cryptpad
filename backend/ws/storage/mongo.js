module.exports.create = function(config, cb) {

  cb(cb({
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
}
