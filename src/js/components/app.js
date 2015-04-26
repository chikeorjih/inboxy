/** @jsx React.DOM */
var React        = require('react');
var AppDrawer    = require('AppDrawer');
var EmailList    = require('EmailList');
var EmailViewer  = require('EmailViewer');
var classSet     = require('classnames');
var Frag         = require('svgFrag');
var PubSub       = require('pubsub-js');
var ParseReact  = require('parse-react');

var APP = React.createClass({
  // mixins: [ParseReact.Mixin],

  getInitialState: function() {
    return {
      menuIsOpen: false,
      active:     false,
      composing:  false
    };
  },

  _handleClick : function() {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    });
  },

  _compose: function() {
    PubSub.publish('composing');
    this.setState({
      composing: true,
      active: false
    });

    // ParseReact.Mutation.Create('TodoItem', {
    //   text: text
    // }).dispatch();
  },

  _activate: function () {
    this.setState({
      active: true,
      composing: false
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

    var composingToggle = classSet({
      'fadeOut': this.state.composing
    });

    return (
      <div className="APP">
        <AppDrawer/>
        <main className={openCloseMenuClasses}>
          <button className="button menu-button" onClick={this._handleClick}>
            <span></span>
            <span className="text">Menu</span>
          </button>
          <button className={"button -compose " + composingToggle} onClick={this._compose}>
            <span className="text">compose <Frag frag="edit" /></span>
          </button>
          <EmailList />
          <EmailViewer composing={this.state.composing} />
        </main>
      </div>
    );
  }
});
module.exports = APP;