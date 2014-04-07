
/** @constructor */
utils.Gallery = function() {

  /** @type {string}
   * @conts
   */
  var API_URL = 'http://api.flickr.com/services/feeds/photos_public.gne';

  /** @type {string}
   * @conts
   */
  var CONTAINER_ID = 'image-container';

  /**
   * Initializes module gallery.
   * @private
   */
  function init_() {
    var form = document.forms[0];
    form.onsubmit = onsubmit_;
  }

  /**
   * Performs onsubmit action.
   * @return {boolean}
   * @private
   */
  function onsubmit_() {
    var jsonp = new utils.Jsonp;
      var searchArea = this.getElementsByTagName('INPUT')[0];
    var searchKey = searchArea.value;
    var tags = [];
    if (searchKey && searchKey.length) {
      tags = toCorrectTag_(searchKey);
      jsonp.req(API_URL, {tags: tags, format: 'json'}, function(response) {
        draw_(response['items']);
      });
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
   * @param {?Object} opt_images Object with images.
   * @private
   */
  function draw_(opt_images) {
    var container = document.getElementById(CONTAINER_ID);
    container.innerHTML = '';
    if (opt_images && opt_images.length) {
      var length = opt_images.length;
      for (var i = 0; i < length; i++) {
        var image = opt_images[i];
        container.appendChild(drawImage_(image));
      }
    }
  }

  /**
   * Draws single image.
   * @param {!Object} image Image's object.
   * @return {Element}
   * @private
   */
  function drawImage_(image) {
    var picture = document.createElement('IMG');
    picture.src = image['media']['m'];
    return picture;
  }

  init_();
};

/**
 * Register single module instance.
 * @type {!utils.Gallery}
 */
utils.gallery = new utils.Gallery;
