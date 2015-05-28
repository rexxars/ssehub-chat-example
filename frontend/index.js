'use strict';

var xhr = require('xhr');
var React = require('react');
var ChatApp = require('./chat-app');

var rootElement = document.getElementById('root');
xhr({ url: '/channels', json: true }, function(err, res, channels) {
    if (err) {
        rootElement.innerHTML = 'An error occured while fetching channels :(';
        return;
    }

    React.render(
        <ChatApp
            channels={channels}
            initialChannel={channels[0]}
        />,
        rootElement
    );
});
