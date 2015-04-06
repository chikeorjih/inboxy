/** @jsx React.DOM */
var Parse       = require('parse').Parse;
var React       = require('react');
var ParseReact  = require('parse-react');
var EmailTmp    = require('EmailTmp');

var EmailList = React.createClass({
  mixins: [ParseReact.Mixin],

  observe: function (props, state) {
    return {
      Emails: (new Parse.Query('Email')).ascending('recieved')
    };
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
              <EmailTmp key={i.id} email={i} update={self._updateItem} />
            );
          })}
        </ul>
      </section>
    );
  },

  _updateItem: function(id, unreadIndication) {
    ParseReact.Mutation.Set(id, {
      unread: unreadIndication
    }).dispatch();
  }
});


module.exports = EmailList;