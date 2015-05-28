'use strict';

var Joi = require('joi');
var zmq = require('zmq');
var formatMsg = require('./format-message');

var port = process.env.ZMQ_PORT || 4000;
var sock = zmq.socket('push');

sock.bindSync('tcp://127.0.0.1:' + port);

// Holds the history of the chat channels, up to a max size
var historySize = 250;
var history = {
    '#ssehub': [],
    '#chatdemo': [],
    '#stats': []
};

function chatHandler(request, reply) {
    // Reply to the client instantly
    reply('OK');

    var data = request.payload;

    // Add the message to local history
    var msg = history[data.channel].unshift({
        id: Date.now(),
        data: '[' + data.nick + '] ' + data.message
    });

    // Ensure we're within the history size limit
    if (history[data.channel].length > historySize) {
        history[data.channel].pop();
    }

    // Send the message to the SSE-Hub
    sock.send(formatMsg(msg));
}

chatHandler.channels = Object.keys(history);

chatHandler.validatePost = {
    payload: {
        nick: Joi.string().min(3).max(25).required(),
        message: Joi.string().min(1).max(255).required(),
        channel: Joi.string().allow(chatHandler.channels)
    }
};

module.exports = chatHandler;
