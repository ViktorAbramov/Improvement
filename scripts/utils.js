var utils = {
	
  REQUEST_URL: "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=mycallback&format=json",

  init: function() {
  	utils.jsonp = new utils.Jsonp;
  	utils.jsonp.req('aaa/bbb', {a:1, b:2}, this.REQUEST_URL);
  }

};