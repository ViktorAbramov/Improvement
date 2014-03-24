

/**
* @constructor
*/
utils.Jsonp = function() {

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
    var params = toQueryString_(data);
    if (url[url.length] != '?') url += '?';
    script.src = url + params;
    head.appendChild(script);
  };

  /**
   * Generates callback's name.
   * @return {string}
   * @public
   */
  this.getCallbackName = function() {
    return 'callback' + new Date().getTime();
  };

  /**
   * Generates query string from incoming params.
   * @param {!Object} data Incoming data.
   * @return {string}
   * @private
   */
  function toQueryString_(data) {
    var paramPairs_ = [];
    for (var key in data) {
      paramPairs_.push(key + '=' + data[key]);
    }
    return paramPairs_.join(DATA_SEPARATOR);
  }

};