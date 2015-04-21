/** @jsx React.DOM */
var React        = require('react');
var AppDrawer    = require('AppDrawer');
var EmailList    = require('EmailList');
var EmailViewer  = require('EmailViewer');
var classSet     = require('classnames');
var PubSub       = require('pubsub-js');

var APP = React.createClass({
  getInitialState: function() {
    return {
      menuIsOpen : false,
      activeEmail: false,
    };
  },

  _activate: function (email) {

    this.setState({
      activeEmail: email
    });
  },

  componentDidMount: function (msg, data) {
    var self = this;

    PubSub.subscribe('email.activate', function(msg, data) {

      self._activate(data);

    });
  },

  _handleClick : function() {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    });
  },

  render: function(){
    var openCloseMenuClasses = classSet({
      'menu-open': this.state.menuIsOpen
    });

    return (
      <div className="APP">
        <AppDrawer/>
        <main className={openCloseMenuClasses}>
          <button className="button menu-button" onClick={this._handleClick}>
            <span></span>
            <span className="text">Menu</span>
          </button>
          <EmailList />
          <EmailViewer activeEmail={this.state.activeEmail}/>
        </main>
      </div>
    );
  }
});
module.exports = APP;