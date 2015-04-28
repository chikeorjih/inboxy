/** @jsx React.DOM */
var React      = require('react');
var classSet   = require('classnames');
var moment     = require('moment');
var PubSub     = require('pubsub-js');
var ParseReact = require('parse-react');
var Frag       = require('svgFrag');

var EmailTmp = React.createClass({
  getInitialState: function() {
    return ({
      active: false,
      bodyTooLong: false,
      subjectTooLong: false
    });
  },

  handleClick: function() {
    PubSub.publish( 'email.activate', this.props.email );

    this.setState({
      active: true
    });

    if (this.props.email.unread) {
      this.setState({
        unread: false
      }, function (){
        ParseReact.Mutation.Set(this.props.email, {
          unread: this.state.unread
        }).dispatch();
      });
    }
  },

  componentDidMount: function() {

    if (this.props.email.subject.length > 30) {
      this.setState({
        subjectTooLong: true
      });

    }
    else if (this.props.email.body.length > 50) {
      this.setState({
        bodyTooLong: true
      });
    }
  },


  handleBlur: function() {
    this.setState({
      active: false
    });
  },

  _revealTools: function() {
    this.setState({
      hovering: true
    });
  },

  _hideTools: function() {
    this.setState({
      hovering: false
    });
  },

  _handleDelete: function () {
    PubSub.publish('deleteEmail', this.props.email.objectId );
  },

  render: function(){
    var self = this;

    var excerptClasses = classSet({
      'ellipse': this.state.bodyTooLong
    });

    var subjectClasses = classSet({
      'ellipse': this.state.subjectTooLong
    });

    var indicators = classSet({
      '-unread': this.props.email.unread,
    });

    var activeStateClass = classSet({
      '-active': this.state.active
    });

    var hoveringClass = classSet({
      ' -hovering': this.state.hovering
    });

    return (
      <li className="email"
        onMouseOver={self._revealTools}
        onMouseOut={self._hideTools}
      >
        <a href="#" className={activeStateClass + hoveringClass} onClick={this.handleClick} onBlur={this.handleBlur}>
          <div className="-header">
            <span className={'indicator ' + indicators}></span>
            <span className={'-subject ' + subjectClasses}>{this.props.email.subject.substring(0, 30)}</span>
            <span className="date">{moment(this.props.email.recieved).format('L')}</span>
          </div>
          <div className="-sender">
            From: {this.props.email.from.name}
          </div>
          <div className={'-excerpt ' + excerptClasses}>
            {this.props.email.body.substring(0, 50)}
          </div>
        </a>
        <div onClick={this._handleDelete} className="quickTools">
          <Frag  frag="delete" />
        </div>
      </li>
    );
  }
});


module.exports = EmailTmp;