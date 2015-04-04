var AppDispatcher = require('app-dispatcher');
var AppConstants = require('app-constants');
var merge = require('merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

var _bills = [];

module.exports = AppStore;