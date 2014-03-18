var utils = {
	
  REQUEST_URL: "http://api.flickr.com/services/feeds/photos_public.gne?",


  init: function() {
    utils.jsonp = new utils.Jsonp;
    utils.jsonp.req(this.REQUEST_URL,
      {jsoncallback:"mycallback", format:"json"},
      window["mycallback"] = function(response) {
      console.log(response);
    });
  }

};