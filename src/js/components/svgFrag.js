/** @jsx React.DOM */
var React = require('react');

var svgFrag = React.createClass({

  render: function () {
    var viewBox = "";
    var svgElement = "";

    if (this.props.viewBox) {
      viewBox = this.props.viewBox;
    }

    else {
      viewBox = "0 0 100 100";
    }

    svgElement = '<svg viewBox="' + viewBox + '">' + '<use xlink:href=#' + this.props.frag + '></use></svg>';

    return <span dangerouslySetInnerHTML={{__html: svgElement}} />;
  }
});


module.exports = svgFrag;