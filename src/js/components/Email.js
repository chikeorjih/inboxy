/** @jsx React.DOM */
var React    = require('react');
var classSet = require('classnames');

var Email = React.createClass({
  getInitialState: function() {
    return {
      emailUnread: true
    };
  },

  handleClick : function() {
    if (this.state.emailUnread) {
      this.setState({
        emailUnread: !this.state.emailUnread
      });
    }
  },

  render: function(){

    var indicators = classSet({
      'indicator': true,
      '-unread': this.state.emailUnread
    });

    return (
      <li className="email">
        <a href="#" onClick={this.handleClick}>
          <div className="-header">
            <span className={indicators}></span>
            <span className="sender">John Smith</span>
            <span className="date">03/10/15</span>
          </div>
          <div className="excerpt">
          lorem Ipsum dolor sit amet lorem Ipsum dolor sit amet
          </div>
        </a>
      </li>
    );
  }
});


module.exports = Email;