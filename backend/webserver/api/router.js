'use strict';

module.exports = function(dependencies, lib, router) {

  const authorizationMW = dependencies('authorizationMW');
  var controller = require('./controller')(dependencies, lib);
  var middleware = require('./middleware')(dependencies, lib);

  router.get('/pad/:userId', authorizationMW.requiresAPILogin, controller.getAllPadsByUserId);

  router.get('/pads/pad/:channelId', authorizationMW.requiresAPILogin, controller.getPad);

  router.post('/pad/:channelId/key', authorizationMW.requiresAPILogin, controller.insertKeys);

  router.post('/pad/:channelId/name/:name', authorizationMW.requiresAPILogin, controller.changePadName);

  router.get('/pad/author/:userId', authorizationMW.requiresAPILogin, controller.getPadsByAuthorId);

  router.get('/pad/coAuthor/:userId', authorizationMW.requiresAPILogin, controller.getPadsByCoAuthorId);

  router.post('/pad/:chanId/coAuthor', authorizationMW.requiresAPILogin, controller.addCoAuthor);

  router.delete('/pad/:channelId', authorizationMW.requiresAPILogin, middleware.hasPermissions, controller.deletePad);

  /*router.post('/close/:channelId', authorizationMW.requiresAPILogin, middleware.passThrough, controller.sayHello);*/

  return router;
};
