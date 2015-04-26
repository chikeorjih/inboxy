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
      activeEmail: true,
      activeEmailID: email.objectId
    });
  },

  _clearViewer: function () {
    this.setState({
      subject:     '',
      date:        '',
      senderName:  '',
      senderEmail: '',
      body:        '',
      activeEmail: false
    });
  },

  _handleDelete: function () {
    PubSub.publish('deleteEmail', this.state.activeEmailID );
    self._clearViewer();
  },

  _composeHandler: function () {
    React.findDOMNode(this.refs.subject).focus();

  },

  componentDidMount: function () {
    var self = this;

    PubSub.subscribe('email.activate', function(msg, data) {
      self._activate(data);
    });

    PubSub.subscribe('composing', function(msg, data) {
      self._clearViewer();
      self._composeHandler();
    });
  },

  _fadingElements: function () {
    var self = this;
    classnames = {};
    if (self.state.activeEmail || self.props.composing) {
      classnames.fadeOut = true
    };

    return classnames;
  },

  _slideDownElements: function () {
    var self = this;
    classnames = {};
    if (self.state.activeEmail || self.props.composing) {
      classnames.slideDown = true
    };

    return classnames;
  },

  render: function(){
    var self = this;

    var fadeCompose = classSet(self._fadingElements());
    var slideDown = classSet(self._slideDownElements());

    var composing = classSet({
      'composing': self.props.composing
    });


    return (
      <section className={"email-viewer " + composing}>
        <header classNam="email-header">
          <h1>{self.state.subject}<input ref="subject" placeholder="Subject..." /></h1>
          <span className="date">{self.state.date}</span>
        </header>
        <div className={"-actionbar "  + slideDown}>
          <div className="sender"><input placeholder="To: " />{self.state.senderName} <span className="sender-email">{self.state.senderEmail}</span></div>
          <button className="button -mark-unread">Mark as unread <Frag frag="unread" /></button>
          <button className="button -delete" onClick={this._handleDelete}>
            Delete <Frag frag="delete" />
          </button>

        </div>
        <article className="-body">
          <div className={"noactive " + fadeCompose}>Compose a new email</div>
          {self.state.body}
          <textarea placeholder="Begin Typing..." />
        </article>
      </section>
    );
  }
});


module.exports = EmailViewer;