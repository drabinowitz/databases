var models = require('../models');
var bluebird = require('bluebird');
var express = require('express');

bluebird.promisifyAll(models.messages);
bluebird.promisifyAll(models.users);

module.exports = {
  messages: {
    get: function (req, res) {

      models.messages.getAsync().then(function(result){

        res.end(JSON.stringify(result));
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {

      models.messages.postAsync(req.body).then(function(){

        console.log('finished posting message');

        res.end('posted');

      });

      // var result = "";

      // req.on("data", function(chunk){

      //   result += chunk;

      // });

      // req.on("end", function(){

      //   models.messages.postAsync(JSON.parse(result)).then(function(){

      //     res.end('posted');

      //   });
      // });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {

      models.users.getAsync().then(function(result){

        res.end(JSON.stringify(result));
      });

    },
    post: function (req, res) {


      // req.on("data", function(chunk){

      //   console.log('collecting data');

      //   result += chunk;

      // });

      // req.on("end", function(){

      //   console.log('finished collecting data');

        models.users.postAsync(req.body).then(function(){

          res.end('posted');

        });
      // });
    }
  }
};

