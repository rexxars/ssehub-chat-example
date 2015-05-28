'use strict';

var React = require('react');
var ChannelWindow = require('./channel-window');
var ChannelSelector = require('./channel-selector');
var eventSources = {};

var ChatApp = React.createClass({
    displayName: 'ChatApp',

    propTypes: {
        channels: React.PropTypes.array.isRequired,
        initialChannel: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return {
            currentChannel: this.props.initialChannel,
            messages: []
        };
    },

    componentDidMount: function() {
        this.onChannelChange(this.props.initialChannel);
    },

    onChannelChange: function(newChannel) {
        if (this.state.currentChannel !== newChannel) {
            this.setState({ currentChannel: newChannel });
        }
    },

    render: function() {
        return (
            <div className="chat">
                <ChannelSelector
                    channels={this.props.channels}
                    current={this.state.currentChannel}
                    onChange={this.onChannelChange}
                />

                <ChannelWindow
                    messages={this.state.messages[this.state.currentChannel]}
                />
            </div>
        );
    }
});