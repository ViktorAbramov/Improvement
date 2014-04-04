

/** @constructor */
utils.Gallery = function() {

  var API_URL = 'http://api.flickr.com/services/feeds/photos_public.gne';

  var CONTAINER_ID = 'image-container';

  function init_() {
    var form = document.forms[0];
    form.onsubmit = onsubmit_;
  }

  function onsubmit_() {
    var jsonp = new utils.Jsonp;
    /** @type {Element} */
      var searchArea = this.getElementsByTagName('INPUT')[0];
    var searchKey = searchArea.value;
    /** @type {!Array.<string>} */var tags = [];
    if (searchKey && searchKey.length) {
      tags = toCorrectTag_(searchKey);
      jsonp.req(API_URL, {tags: tags, format: 'json'}, function(response) {
        draw_(response['items']);
      });
    }
    return false;
  }

  function toCorrectTag_(keywords) {
    return keywords.split(' ').join(',');
  }

  function draw_(opt_images) {
    var container = document.getElementById(CONTAINER_ID);
    container.innerHTML = '';
    if (opt_images) {
      var length = opt_images.length;
      for (var i = 0; i < length; i++) {
        var image = opt_images[i];
        container.appendChild(drawImage_(image));
      }
    }
  }

  function drawImage_(image) {
    /** @type {Element} */ var picture = document.createElement('IMG');
    picture.src = image['media']['m'];
    return picture;
  }
  init_();
};

utils.gallery = new utils.Gallery;