'use strict';

var zmq = require('zmq');
var port = process.env.ZMQ_PORT || 4000;

// This simulates an SSE Hub server
module.exports = function() {
    var sock = zmq.socket('pull');

    sock.connect('tcp://127.0.0.1:' + port);

    sock.on('message', function(msg) {
        console.log('work: %s', msg.toString());
    });

    return sock;
};