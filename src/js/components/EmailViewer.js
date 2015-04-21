/** @jsx React.DOM */
var Parse      = require('parse').Parse;
var React      = require('react');
var ParseReact = require('parse-react');
var moment     = require('moment');

var EmailViewer = React.createClass({

  render: function(){
    var self = this;

    console.log(this.props.activeEmail);

    if (this.props.activeEmail) {
      return (
        <section className="email-viewer">
          <header classNam="email-header">
            <h1>{this.props.activeEmail.subject}</h1>
            <span className="date">{moment(this.props.activeEmail.recieved).format('L')}</span>
          </header>
          <div className="-actionbar">
            <div className="sender">from: {this.props.activeEmail.from.name} <span className="sender-email">{"<" + this.props.activeEmail.from.email + ">"}</span></div>
            <button className="button mark-read">Mark as unread</button>
          </div>
          <article className="-body">
          {this.props.activeEmail.body}
          </article>
        </section>
      );

    }

    else {
      return (
        <section className="email-viewer">
          <header classNam="email-header">
            <h1>Select an email</h1>
            <span className="date">--/--/--</span>
          </header>
          <article className="-body">
          You have nothing open!
          </article>
        </section>
      );
    }

  }
});


module.exports = EmailViewer;