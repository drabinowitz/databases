var db = require('../db');
var _ = require('underscore');

var dbConnection = function(){

  //db.connect();

  var queries = [].slice.call(arguments, 0 , arguments.length -1);

  var callback = arguments[arguments.length -1];

console.log(queries);
  _.each(queries, function(q, i){
    console.log(q);
    db.query(q, function(err, r){

      if (err){
        callback(err);
      }else if(i === queries.length -1){

        callback(null, r);

      }
      console.log(err);

    });

  });

  // db.end(function(err){

  //   callback(err, rows);

  // });
};


module.exports = {
  messages: {
    get: function (callback) {

      var queryArray = ['SELECT m.text, u.name AS username, r.name AS roomname, m.created_at',
                        'FROM messages m',
                        'INNER JOIN rooms r',
                        'ON m.id_rooms = r.id',
                        'INNER JOIN users u',
                        'ON m.id_users = u.id;'];

      dbConnection(queryArray.join(' ') , callback);
    }, // a function which produces all the messages


    post: function (message, callback) {

      for (data in message){
        if (message.hasOwnProperty(data)){

          message[data] = message[data].replace(/'/g,"\\'");

        }

      }


      var query1 = 'INSERT IGNORE INTO rooms(name) VALUES (\'' + message.roomname + '\');';
      var query2 = 'INSERT IGNORE INTO users(name) VALUES (\'' + message.username + '\');';

      var query3 = ['INSERT INTO messages(text,created_at,id_rooms,id_users)',
                    'VALUES (\'' + message.text + '\', NOW(),',
                      '(SELECT id from rooms where name = \'' + message.roomname + '\'),',
                      '(SELECT id from users where name = \'' + message.username + '\')',
                    ');'].join(' ');


      dbConnection(query1, query2, query3, callback);

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {

      dbConnection('SELECT name FROM users;', callback);

    },

    post: function (user, callback) {

      dbConnection('INSERT IGNORE INTO users(name) VALUES (\'' + user.username + '\');', callback);

    }
  }
};

