/** @jsx React.DOM */
var React    = require('react');
var Email    = require('Email');

var EmailList = React.createClass({

  render: function(){

    return (
      <section className="email-list">
        <header className="current-folder">
          <h1>Inbox</h1>
        </header>
        <ul>
          <Email />
        </ul>
      </section>
    );
  }
});


module.exports = EmailList;