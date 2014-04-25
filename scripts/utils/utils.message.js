
/** @constructor */
utils.Message = function() {

  /** @type {string}
   * @const
   */
  var MESSAGE_CONTAINER_ID = 'message-container';

  /** @type {!Object.<string,string>} */
  var COLORS = {
    'error': '#FF9999',
    'info': '#99FFFF'
  };

  /** @type {!Object.<string,number>} */
  var TIMEOUTS = {
    'error': 3e3,
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
  