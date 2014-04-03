

/** @constructor */
utils.Search = function() {


  function init_() {
    var jsonp = new utils.Jsonp;
    var form = document.forms[0];
    form.onsubmit = onsubmit_;
  }

  function onsubmit_() {
    var searchArea = this.getElementsByTagName('INPUT')[0];
    var searchKey = searchArea.value;
    if (searchKey && searchKey.length) {

    }
    return false;
  }

  init_();
};

utils.search = new utils.Search;