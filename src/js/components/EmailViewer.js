/** @jsx React.DOM */
var Parse      = require('parse').Parse;
var React      = require('react');
var ParseReact = require('parse-react');
var moment     = require('moment');
var Frag       = require('svgFrag');
var PubSub     = require('pubsub-js');
var classSet   = require('classnames');
var Textarea   = require('react-textarea-autosize');

var EmailViewer = React.createClass({

  getInitialState: function() {
    return ({
      subject:         '',
      date:            '',
      senderName:      '',
      senderEmail:     '',
      body:            '',
      activeEmail:     false,
      sendable:        false,
      composedSubject: '',
      composedBody:    '',
      recipient:       ''
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

  _checkSendable: function () {
    if (this.state.composedSubject != '' && this.state.composedBody != '' && this.state.recipient != '') {
      this.setState({
        sendable: true
      });
    };
  },

  _handleChangeSubject: function (e) {
    var self = this;
    self.setState({
      composedSubject: e.target.value
    });

    self._checkSendable();
  },

  _handleChangeRecipient: function (e) {
    var self = this;
    self.setState({
      recipient: e.target.value
    });

    self._checkSendable();
  },

  _handleChangeBody: function (e) {
    var self = this;
    self.setState({
      composedBody: e.target.value
    });

    self._checkSendable();
  },

  _handleDelete: function () {
    PubSub.publish('deleteEmail', this.state.activeEmailID );
    self._clearViewer();
  },

  _composeHandler: function () {
    React.findDOMNode(this.refs.subject).focus();

  },

  _sendEmail: function () {
    var self = this;

    PubSub.publish('sendEmail', {
      subject: self.state.composedSubject,
      body:    self.state.composedBody,
      to:      {
        "email": self.state.recipient,
        "name": "Dum dum"
      },
      from:     {
        "email": "you@thismail.com",
        "name": "Scott McScotterson"
      }
    });
    self._clearViewer();
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

    var sendable = classSet({
      ' -sendable': self.state.sendable
    });


    return (
      <section className={"email-viewer " + composing}>
        <header classNam="email-header">
          <h1>{self.state.subject}<input ref="subject" placeholder="Subject..." onChange={this._handleChangeSubject} /></h1>
          <span className="date">{self.state.date}</span>
        </header>
        <div className={"-actionbar "  + slideDown}>
          <div className="sender">
            <label htmlFor="sendto">To: </label>
            <input onChange={this._handleChangeRecipient} ref="recipient" type="text" name="sendto"/>{self.state.senderName} <span className="sender-email">{self.state.senderEmail}</span></div>
          <button tabIndex="-1" className="button -mark-unread">Mark as unread <Frag frag="unread" /></button>
          <button tabIndex="-1" className="button -delete" onClick={this._handleDelete}>
            Delete <Frag frag="delete" />
          </button>
          <button tabIndex="-1" className="button -attach">
            Attach <Frag frag="attach" />
          </button>

        </div>
        <article className="-body">
          <div className={"noactive " + fadeCompose}>Compose a new email</div>
          {self.state.body}
          <Textarea onChange={this._handleChangeBody} ref="body" placeholder="Begin Typing..." />
          <div className="sendEmail">
            <button onClick={self._sendEmail} className={"button -send" + sendable} disabled={!this.state.sendable}>
              Send <Frag frag="send" />
            </button>
          </div>
        </article>
      </section>
    );
  }
});


module.exports = EmailViewer;