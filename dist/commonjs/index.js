'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aureliaStorage = require('./aurelia-storage');

Object.keys(_aureliaStorage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaStorage[key];
    }
  });
});