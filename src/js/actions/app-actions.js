var AppConstants  = require('app-constants');
var AppDispatcher = require('app-dispatcher');

var AppActions = {
  readEmail: function () {
    AppDispatcher.handleAction({
      actionType: AppConstants.READ_EMAIL
    });
  }
};

module.exports = AppActions;