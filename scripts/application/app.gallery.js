

/** @constructor */
app.Gallery = function() {

  /** @type {string}
   * @conts
   */
  var API_URL = 'http://api.flickr.com/services/feeds/photos_public.gne';

  /** @type {string}
   * @conts
   */
  var CONTAINER_ID = 'image-container';

  var NAV_PANEL_ID = 'nav-panel';
  /** 
   * @type{!utils.Message}
   * @private
   */
  var messages_ = new utils.Message;

  /** 
   * @type{!utils.Jsonp}
   * @private
   */
  var jsonp_ = new utils.Jsonp;

  /**
   * type{!utils.Storage}
   * @private
   */
  var storage_ = new utils.Storage;

  /**
   * Initializes module gallery.
   * @private
   */
  function init_() {
    container_ = document.getElementById(CONTAINER_ID);
    form_ = document.forms['search-form'];
    form_.onsubmit = onsubmit_;
    drawNavPanel_();
    initNavPanel_();
  }

  /**
   * Performs onsubmit action.
   * @param {string} opt_keyword Keyword for sarching
   * @return {boolean}
   * @private
   */
  function onsubmit_(opt_keyword) {
    /** @type {Element} */
      var searchArea = form_.elements['searching'];
    /** @type {string} */ var searchKey;
    searchKey = !!opt_keyword.length ? opt_keyword : searchArea.value;
    /** @type {!Array} */ var tags = [];
    if (searchKey && searchKey.length) {
      if (!storage_.get('tags')) storage_.set('tags', []);
      container_.innerHTML = '';
      messages_.show('info', 'Loading...');
      tags = toCorrectTag_(searchKey);
      if (!opt_keyword.length)
        storage_.set('tags', (storage_.get('tags').split(',')).concat(tags));
      jsonp_.req(API_URL, {tags: tags, format: 'json'},
        function(response) {
          draw_(response['items']);
      });
      drawNavPanel_();
      initNavPanel_();
      searchArea.value = '';
    } else {
      messages_.show('error', 'Please enter keywords for search');
    }
    return false;
  }

  /**
   * Transform searchin keywords into keywords array.
   * @param {string} keywords Searching keywords.
   * @return {!Array}
   * @private
   */
  function toCorrectTag_(keywords) {
    return keywords.split(' ').join(',');
  }

  /**
   * Draws images from server's response.
   * @param {?Object} images Object with images.
   * @private
   */
  function draw_(images) {
    /** @type {Element} */
    if (images && images.length) {
      /** @type {number} */ var length = images.length;
      for (/** @type {number} */ var i = 0; i < length; i++) {
        /** type {!Object} */ var image = images[i];
        container_.appendChild(createImage_(image));
      }
    } else {
      messages_.show('error', 'There are no images with entered tags.');
    }
  }

  /**
   * Creates single image.
   * @param {!Object} image Image's object.
   * @return {Element}
   * @private
   */
  function createImage_(image) {
    /** @type {Element} */ var picture = document.createElement('IMG');
    picture.src = image['media']['m'];
    return picture;
  }

  function drawNavPanel_() {
    /** @type {Array} */ var tags = storage_.get('tags').split(',');
    /** @type {number} */ var length = tags.length;
    /** @type {Element} */ var navPanel = document.getElementById(NAV_PANEL_ID);
    navPanel.innerHTML = '';
    for (/** @type {number} */ var i = 0; i < length; i++) {
      navPanel.appendChild(createNavRow_(tags[i]));
    }
  }

  function createNavRow_(keyword) {
    var row = document.createElement('LI');
    row.innerHTML = '<a href="#">' + keyword + '</a>';
    return row;
  }

  function initNavPanel_() {
    var navPanel = document.getElementById(NAV_PANEL_ID);
    var rows = navPanel.getElementsByTagName('LI');
    var length = rows.length;
    for (var i = 0; i < length; i++) {
      var row = rows[i];
      row.onclick = clickRow_;
    }
  }

  function clickRow_() {
    var keyword = this.getElementsByTagName('A')[0].innerHTML;
    onsubmit_(keyword);
  }

  /**
   * @type {Element}
   * @private
   */
  var container_ = null;

  var form_ = null;

  init_();
};
