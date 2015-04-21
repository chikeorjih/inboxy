/** @jsx React.DOM */
var Parse      = require('parse').Parse;
var React      = require('react');
var ParseReact = require('parse-react');
var moment     = require('moment');
var Frag       = require('svgFrag');
var PubSub     = require('pubsub-js');
var classSet   = require('classnames');

var EmailViewer = React.createClass({

  getInitialState: function() {
    return ({
      subject:     '',
      date:        '',
      senderName:  '',
      senderEmail: '',
      body:        '',
      activeEmail: false
    });
  },

  _activate: function (email) {
    this.setState({
      subject:     email.subject,
      date:        moment(email.date).format('L'),
      senderName:  email.from.name,
      senderEmail: email.from.email,
      body:        email.body,
      activeEmail: true
    });
  },

  componentDidMount: function () {
    var self = this;

    PubSub.subscribe('email.activate', function(msg, data) {
      self._activate(data);
    });
  },

  render: function(){
    var self = this;

    var activeEmail = classSet({
      'active': self.state.activeEmail
    });

    return (
      <section className={"email-viewer " + activeEmail}>
        <header classNam="email-header">
          <h1>{self.state.subject} &nbsp;</h1>
          <span className="date">{self.state.date}</span>
        </header>
        <div className="-actionbar">
          <div className="sender">{self.state.senderName} <span className="sender-email">{self.state.senderEmail}</span></div>
          <button className="button -mark-read">Mark as unread</button>
          <button className="button -delete">
            Delete
          </button>
          <Frag frag="settings" />
        </div>
        <article className="-body">
        <div className="noactive">Click to compose a new email</div>
          {self.state.body}
        </article>
      </section>
    );
  }
});


module.exports = EmailViewer;