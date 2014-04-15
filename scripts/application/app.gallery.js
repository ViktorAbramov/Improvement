

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

  var storage_ = new utils.Storage;

  /**
   * Initializes module gallery.
   * @private
   */
  function init_() {
    container_ = document.getElementById(CONTAINER_ID);
    /** @type {Element} */ var form = document.forms['search-form'];
    storage_.set('amber', null);
    form.onsubmit = onsubmit_;
  }

  /**
   * Performs onsubmit action.
   * @return {boolean}
   * @private
   */
  function onsubmit_() {
    /** @type {Element} */
      var searchArea = this.elements['searching'];
    /** @type {string} */ var searchKey = searchArea.value;
    /** @type {!Array} */ var tags = [];
    if (searchKey && searchKey.length) {
      container_.innerHTML = '';
      messages_.show('info', 'Loading...');
      tags = toCorrectTag_(searchKey);
      jsonp_.req(API_URL, {tags: tags, format: 'json'},
        function(response) {
          draw_(response['items']);
      });
      storage_.set('tags', storage_.get('tags').push(tags));
      console.log(storage_.get('tags'));
    } else {
      messages_.show('info', 'Please enter keywords for search');
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

  /**
   * @type {Element}
   * @private
   */
  var container_ = null;

  init_();
};
