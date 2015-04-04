/** @jsx React.DOM */
var React = require('react');

var FolderList = React.createClass({
  render: function(){
    return (
      <nav className="folder-list">
        <ul>
          <li className="folder">
            <a href="#"><span className="folder-name">Work</span> <span className="unread-count">13</span></a>
          </li>
          <li className="folder">
            <a href="#">Play</a>
          </li>
        </ul>
      </nav>
    );
  }
});


module.exports = FolderList;