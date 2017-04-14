'use strict';

var email;

function sendEmail(sharedPad, done) {
  if (!sharedPad) {
    return done(new Error('pad can not be null'));
  }

  if (!sharedPad.data) {
    return done(new Error('pad\'s data can not be null'));
  }

  var properties = {
    subject: 'A pad has been shared by ' + sharedPad.data.userSender.lastname + ' ' + sharedPad.data.userSender.firstname,
    template: 'document.shared'
  };

  var message = {
    to: sharedPad.data.email,
    subject: properties.subject
  };

  email.getMailer().sendHTML(message, properties.template, sharedPad, done);
}

module.exports = function(dependencies, lib) {
  email = dependencies('email');

  return {
    sendEmail: sendEmail
  };
};
