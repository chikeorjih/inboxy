/** @jsx React.DOM */
var React         = require('react');
var classSet      = require('classnames');
var moment        = require('moment');
var AppDispatcher = require('app-dispatcher');

var EmailTmp = React.createClass({
  getInitialState: function() {
    return ({
      unread: this.props.email.unread,
      active: this.props.email.active
    });
  },

  handleClick: function() {
    if (this.state.unread) {
      this.setState({
        unread: false
      }, function (){
        this.props.update(this.props.email.id, this.state.unread);
      });
    }
  },

  handleFocus: function() {
    this.setState({
      active: true
    }, function (){
      this.props.update(this.props.email.id, this.state.active);
    });
  },

  handleBlur: function() {
    this.setState({
      active: false
    }, function (){
      this.props.update(this.props.email.id, this.state.active);
    });
  },

  render: function(){

    var indicators = classSet({
      'indicator': true,
      '-unread': this.state.unread,
    });

    var activeStateClass = classSet({
      '-active': this.state.active
    });

    return (
      <li className="email">
        <a href="#" className={activeStateClass} onClick={this.handleClick} onFocus={this.handleFocus} onBlur={this.handleBlur}>
          <div className="-header">
            <span className={indicators}></span>
            <span className="sender">{this.props.email.from.name}</span>
            <span className="date">{moment(this.props.email.recieved).format('L')}</span>
          </div>
          <div className="excerpt">
          {this.props.email.body.substring(0, 50)}
          </div>
        </a>
      </li>
    );
  }
});


module.exports = EmailTmp;