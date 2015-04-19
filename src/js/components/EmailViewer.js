/** @jsx React.DOM */
var Parse      = require('parse').Parse;
var React      = require('react');
var ParseReact = require('parse-react');
var moment     = require('moment');

var EmailViewer = React.createClass({
  mixins: [ParseReact.Mixin],

  observe: function (props, state) {
    return {
      ActiveEmail: (
        new Parse.Query('Email')
          .equalTo('active', true)
      )
    };
  },

  // getInitialState: function() {
  //   return ({
  //     activeEmail: this.data.ActiveEmail
  //   });
  // },

  render: function(){
    return (
      <section className="email-viewer">
        <header classNam="email-header">
          <h1>Where is My Money?</h1>
          <span className="date">03/10/15</span>
        </header>
        <div className="-actionbar">
          <div className="sender"></div>
          <button className="button mark-read">Mark as read</button>
        </div>
        <article className="email-body">
        </article>
      </section>
    );
  }
});


module.exports = EmailViewer;