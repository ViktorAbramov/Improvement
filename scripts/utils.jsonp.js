

utils.Jsonp = function() {
  
  this.req = function(url, data, callbackUrl) {
    var head = document.getElementsByTagName('HEAD')[0];
    var script = document.createElement('SCRIPT');
    var params = serializeData_(data);
    script.src = url + params;
    head.appendChild(script);
  };


  function serializeData_(data) {
    var params = '';
    var params_ = [];
    for (var key in data) {
      var tempParams = [];
      tempParams.push(key);
      tempParams.push(data[key]);
      params_.push(tempParams);
    }
    for (var i = 0; i < params_.length; i++) {
      var separator = '&';
      var param = params_[i];
      key = param[0];
      var value = param[1];
      if (i == params_.length - 1) separator = '';
      params += key + '=' + value + separator;
      }
    return params;
  }

};

utils.jsonp = new utils.Jsonp;