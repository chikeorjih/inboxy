/** @jsx React.DOM */
var React = require('react');

var EmailViewer = React.createClass({
  render: function(){
    return (
      <section className="email-viewer">
        <header classNam="email-header">
          <h1>Where is My Money?</h1>
          <span className="date">03/10/15</span>
        </header>
        <div className="email-actionbar">
          <button className="button mark-read">Mark as read</button>
        </div>
        <article className="email-body">
        </article>
      </section>
    );
  }
});


module.exports = EmailViewer;