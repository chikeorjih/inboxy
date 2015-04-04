/** @jsx React.DOM */
var React   = require('react');
var FolderList = require('FolderList');

var AppDrawer = React.createClass({
  render: function(){
    return (
      <div className="app-drawer">
        <header className="app-header">
          <h1>
            <a className="logo">Inboxy</a>
          </h1>
        </header>
        <FolderList />
      </div>
    );
  }
});


module.exports = AppDrawer;