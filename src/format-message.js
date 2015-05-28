'use strict';

function stringify(str) {
    return str || '';
}

function formatSseHubMsg(msg) {
    return [
        msg.event,
        msg.retry,
        msg.id,
        msg.data
    ].map(stringify).join('\n');
}

module.exports = formatSseHubMsg;
