'use strict';

var path          = require('path');

module.exports = function(server) {
  // server.use(function (req, res, next) {
  //   return res.sendFile(__dirname, "../../client/dist/index.html");
  // });
  // Install a `/` route that returns server status
  var router = server.loopback.Router();

  router.use(function (req, res) {
    return res.render("index.html");
  });
  
  server.use(router);
};
