var AppConstants  = require('app-constants');
var AppDispatcher = require('app-dispatcher');

var AppActions = {
  addBill: function(bill) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_BILL,
      bill: bill
    });
  },

  removeBill: function(index) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REMOVE_BILL,
      index: index
    });
  },

  decreasePmt: function(index) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.DECREASE_PMT,
      bill: bill
    });
  },

  increasePmt: function(index) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.INCREASE_PMT,
      index: index
    });
  }
};

module.exports = AppActions;