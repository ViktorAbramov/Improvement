

utils.Jsonp = function() {
  
  this.req = function(url, data, callbackUrl) {
    var head = document.getElementsByTagName('HEAD')[0];
    var script = document.createElement('SCRIPT');
    setURL_(url, data);
    script.src = callbackUrl;
    head.appendChild(script);
    window['mycallback'] = function(response) {
      console.log(response);
    };
  };

  function setURL_(url, data) {
    window.location.hash = '';
    window.location.hash += url;
    setData_(data);
  }

  function setData_(data) {
    window.location.hash += '?';
    for (var key in data) {
      window.location.hash += key + '=' + data[key] + '&';
    }
  }

};

utils.jsonp = new utils.Jsonp;