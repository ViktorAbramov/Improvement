

/**
 * @namespace Defines namespace for 'utils' package.
 */
var utils = {

  init: function() {
    utils.jsonp = new utils.Jsonp;
  }

};

/** @constructor */
utils.Jsonp =  function() {

  /**
   * @type {string}
   * @const
   */
  var DATA_SEPARATOR = '&';
 
  /**
   * Creates JSONP request.
   * @param {string} url URL for request.
   * @param {Object} data Incoming data for request
   * @param {Object} callback Callback function.
   */
  this.req = function(url, data, callback) {
    var head = document.getElementsByTagName('HEAD')[0];
    var script = document.createElement('SCRIPT');
    var callbackName = getCallbackName_();
    var params = toQueryString_(data, callbackName);
    if (url[url.length] != '?') url += '?';
    script.src = url + params;
    head.appendChild(script);
    window[callbackName] = function(response) {
      callback(response);
    };
  };

  /**
   * Generates callback's name.
   * @return {string}
   * @private
   */
  function getCallbackName_() {
    return 'callback' + new Date().getTime();
  }

  /**
   * Generates query string from incoming params.
   * @param {!Object} data Incoming data.
   * @param {string} callbackName Generated
   * callback object name.
   * @return {string}
   * @private
   */
  function toQueryString_(data, callbackName) {
    var paramPairs_ = [];
    paramPairs_.push('jsoncallback=' + callbackName);
    for (var key in data) {
      paramPairs_.push(key + '=' + data[key]);
    }
    return paramPairs_.join(DATA_SEPARATOR);
  }

};
