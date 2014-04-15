
/** @constructor */
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
    /** @type {Element} */ var head = document.getElementsByTagName('HEAD')[0];
    /** @type {Element} */ var script = document.createElement('SCRIPT');
    /** @type {string} */ var callbackName = getCallbackName_();
    /** @type {string} */ var params = toQueryString_(data, callbackName);
    if (url[url.length - 1] != '?') url += '?';
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
    /** @type {Array}*/var paramPairs_ = [];
    paramPairs_.push('jsoncallback=' + callbackName);
    for (var key in data) {
      paramPairs_.push(key + '=' + data[key]);
    }
    return paramPairs_.join(DATA_SEPARATOR);
  }

};

/** @constructor */
utils.Message = function() {

  /** @type {string}
   * @const
   */
  var MESSAGE_CONTAINER_ID = 'message-container';

  /** @type {!Object.<string,string>}
   * @const
   */
  var COLORS = {
    'error': '#FF9999',
    'info': '#99FFFF'
  };

  /** @type {!Object.<string,number>}
   * @const
   */
  var TIMEOUTS = {
    'error': 2e3,
    'info': 1e3
  };

  /**
   * Shows message in container.
   * @param {string} type Messages type.
   * @param {string} text Messages text.
   */
  this.show = function (type, text) {
    /** @type {Element} */
      var container = document.getElementById(MESSAGE_CONTAINER_ID);
    container.innerHTML = text;
    container.style.display = 'block';
    container.style.background = COLORS[type];
    setTimeout(function() {
      container.style.display = 'none';
    }, TIMEOUTS[type]);
  };

};
  