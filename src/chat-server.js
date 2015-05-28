'use strict';

var Hapi = require('hapi');
var path = require('path');
var chatHandler = require('./chat-handler');

// Create an HTTP server to serve static content as well as receive messages from the
// users of the chat
var server = new Hapi.Server();
server.connection({
    port: process.env.PORT || 7000
});

// Add the route that handles receiving new messages
// (sends them on to the SSE-Hub to be broadcasted)
server.route({
    method: 'POST',
    path: '/messages',
    handler: chatHandler,
    config: {
        validate: chatHandler.validatePost
    }
});

// Send an array of channel names back
server.route({
    method: 'GET',
    path: '/channels',
    handler: function(req, reply) {
        reply(chatHandler.channels);
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: path.join(__dirname, '..', 'public')
        }
    }
});

// Start the server
server.start();
