var models = require('../models');
var bluebird = require('bluebird');
var express = require('express');

bluebird.promisifyAll(models.messages);
bluebird.promisifyAll(models.users);

module.exports = {
  messages: {
    get: function (req, res) {

      console.log(res);

      models.messages.getAsync().then(console.log);

    }, // a function which handles a get request for all messages
    post: function (req, res) {} // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

