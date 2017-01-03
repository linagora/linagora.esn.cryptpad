'use strict';

var express = require('express');

module.exports = function(dependencies) {

  const authorizationMW = dependencies('authorizationMW');
  var controller = require('./controller')(dependencies);
  var middleware = require('./middleware')(dependencies);

  var router = express.Router();

  router.get('/api/sayhello', authorizationMW.requiresAPILogin, middleware.passThrough, controller.sayHello);

  router.post('/api/:channelId/message', authorizationMW.requiresAPILogin, middleware.passThrough, controller.sayHello);

  router.get('/api/:channelId/message', authorizationMW.requiresAPILogin, middleware.passThrough, controller.sayHello);

  router.get('/api/:channelId',middleware.passThrough, controller.sayHello);

  router.delete('/api/:channelId', authorizationMW.requiresAPILogin, middleware.passThrough, controller.sayHello);

  router.post('/api/close/:channelId', authorizationMW.requiresAPILogin, middleware.passThrough, controller.sayHello);

  router.post('/api/flush/:channelId', authorizationMW.requiresAPILogin, middleware.passThrough, controller.sayHello);

  return router;
};
