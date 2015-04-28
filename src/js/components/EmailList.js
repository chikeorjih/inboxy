/** @jsx React.DOM */
var Parse           = require('parse').Parse;
var React           = require('react');
var ParseReact      = require('parse-react');
var EmailTmp        = require('EmailTmp');
var PubSub          = require('pubsub-js');
var GeminiScrollbar = require('react-gemini-scrollbar');

var EmailList = React.createClass({
  mixins: [ParseReact.Mixin],

  observe: function () {
    return {
      Emails: (new Parse.Query('Email')).ascending('recieved')
    };
  },

  _deleteEmail: function(msg, id) {
    console.log(msg, id);
    var trash = {
      className: 'Email',
      objectId: id
    };

    ParseReact.Mutation.Destroy(trash).dispatch();
  },

  componentDidMount: function() {
    var self = this;
    PubSub.subscribe('deleteEmail', function(msg, id) {
      self._deleteEmail(msg, id);
    });
  },

  render: function(){
    var self = this;

    return (
      <section className="email-list">
        <header className="current-folder">
          <h1>Inbox</h1>
        </header>
        <ul>
          {this.data.Emails.map(function(i) {
            return (
              <EmailTmp key={i.id} email={i} />
            );
          })}
        </ul>
      </section>
    );
  }

});


module.exports = EmailList;