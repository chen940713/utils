(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.utils = {}));
}(this, (function (exports) { 'use strict';

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var URLManager = function URLManager() {};

  URLManager.merge = function (route) {
    var path = route.path,
        query = route.query;
    var result = path instanceof Array ? path.join('/') : path;
    var queryArr = [];

    for (var key in query) {
      if (query[key] || query[key] === false || query[key] === 0) {
        // 过滤掉值为null,undefined,''情况
        queryArr = [].concat(_toConsumableArray(queryArr), ["".concat(key, "=").concat(encodeURIComponent(query[key]))]);
      }
    }

    if (queryArr.length > 0) {
      result += (result.indexOf('?') > -1 ? '&' : '?') + queryArr.join('&');
    }

    return result;
  };

  URLManager.parse = function (url) {
    // TODO: 使用 new window.URL(url)
    url = url || "".concat(location.pathname).concat(location.search);
    var path = [];
    var query = {}; // const urlArr = url.replace('/', '').split('?')

    var urlArr = url.split('?');
    path = urlArr[0].split('/');

    if (urlArr.length > 1) {
      urlArr[1].split('&').forEach(function (str) {
        var arr = str.split('=');
        var key = arr[0];
        var value = decodeURIComponent(arr[1]); // 009, ''

        if (isNaN(value) || value[0] === '0' || value === '' || value > Number.MAX_SAFE_INTEGER) {
          query[key] = value;
        } else {
          query[key] = Number(value);
        }
      });
    }

    return {
      path: path,
      query: query
    };
  };

  URLManager.get = function (key, url) {
    url = url ? url.substring(url.indexOf('?')) : window.location.search;
    var regExp = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
    var val = decodeURIComponent(url).substr(1).match(regExp);
    val = val != null ? unescape(val[2]) : null;

    try {
      val = JSON.parse(val); // 避免string套string, 暂时处理，可考虑while

      val = typeof val === 'string' ? JSON.parse(val) : val;
    } catch (e) {}

    return val;
  };

  var URL = URLManager;

  exports.URL = URL;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
