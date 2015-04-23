/** @jsx React.DOM */
var React        = require('react');
var AppDrawer    = require('AppDrawer');
var EmailList    = require('EmailList');
var EmailViewer  = require('EmailViewer');
var classSet     = require('classnames');
var Frag         = require('svgFrag');
var PubSub       = require('pubsub-js');

var APP = React.createClass({
  getInitialState: function() {
    return {
      menuIsOpen : false,
      active: false
    };
  },

  _handleClick : function() {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    });
  },

  _compose: function() {
    console.log("yup");
  },

  _activate: function () {
    console.log("yes");
    this.setState({
      active: true
    });
  },

  componentDidMount: function () {
    var self = this;
    PubSub.subscribe('email.activate', function(msg, data) {
      self._activate();
    });
  },

  render: function(){
    var openCloseMenuClasses = classSet({
      'menu-open': this.state.menuIsOpen
    });

    var activeStateClass = classSet({
      '-active': this.state.active
    });

    return (
      <div className="APP">
        <AppDrawer/>
        <main className={openCloseMenuClasses}>
          <button className="button menu-button" onClick={this._handleClick}>
            <span></span>
            <span className="text">Menu</span>
          </button>
          <button className={"button -compose " + activeStateClass} onClick={this._compose}>
            <span className="text">compose <Frag frag="edit" /></span>
          </button>
          <EmailList />
          <EmailViewer />
        </main>
      </div>
    );
  }
});
module.exports = APP;