/** @jsx React.DOM */
var React    = require('react');
var classSet = require('classnames');
var moment   = require('moment');

var EmailTmp = React.createClass({
  // This component doesn't hold any state - it simply transforms
  // whatever was passed as attributes into HTML that represents a picture.

  render: function(){
    return (
      <img src={this.props.src} />
    );
  }
});


module.exports = EmailTmp;