var Dispatcher = require('dispatcher');
var _          = require('underscore');

var AppDispatcher = _.extend({}, Dispatcher.prototype, {
  handleViewAction: function(action){
    console.log('action', action);
  }
});

module.exports = AppDispatcher;