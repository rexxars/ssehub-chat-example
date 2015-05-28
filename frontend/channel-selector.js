'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'ChannelSelector',

    propTypes: {
        channels: React.PropTypes.array.isRequired,
        current: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired
    },

    onChannelClick: function(e) {
        if (e.target.value !== this.props.current) {
            this.props.onChange(e.target.value);
        }
    },

    render: function() {
        return (
            <ul className="channel-selector">
                {this.props.channels.map(function(channel) {
                    var cn = channel === this.props.current ? 'selected' : null;
                    return (
                        <li key={channel} className={cn}>
                            <button value={channel} onClick={this.onChannelClick}>
                                {channel}
                            </button>
                        </li>
                    );
                }.bind(this))}
            </ul>
        );
    }
});
