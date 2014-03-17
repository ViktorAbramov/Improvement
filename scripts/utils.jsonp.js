

utils.Jsonp = function() {
  
  this.req = function(url, data, callback) {
    console.log(url);
    console.log(data);
    callback;
  };

};

utils.jsonp = new utils.Jsonp;