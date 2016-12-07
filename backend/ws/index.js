'use strict';

let initialized = false;
let cryptpadNamespace;

function init(dependencies, lib) {
  const logger = dependencies('logger');
  const io = dependencies('wsserver').io;
  const helper = dependencies('wsserver').ioHelper;
  const pubsub = dependencies('pubsub');
  const localPubsub = pubsub.local;
  const globalPubsub = pubsub.global;

  if (initialized) {
    return logger.warn('The chat notification service is already initialized');
  }

  cryptpadNamespace = io.of('/cryptpad');
  cryptpadNamespace.on('connection', socket => {
    const userId = helper.getUserId(socket);

    logger.info('New connection on /cryptpad by user %s', userId);
    initialized = true;
  });
}

module.exports.init = init;
