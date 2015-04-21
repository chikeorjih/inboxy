/** @jsx React.DOM */
var APP      = require('app');
var React    = require('react');
var Parse    = require('parse').Parse;
var PubSub   = require('pubsub-js');

Parse.initialize("BeKKuQFBvHmke4ZmAKb0nvSHHOVcWMVbSXdYhnvX", "qPJpLQmerZhUddTnPQ9VSIpOWZHN2L0fBrXbJqeo");


React.render(
  <APP />,
  document.getElementById('main'));