

utils.Jsonp = function() {
  
  this.req = function(url, data, callbackUrl) {
  	var head = document.getElementsByTagName('HEAD')[0];
  	var script = document.createElement('SCRIPT');
  	script.src = url;
  	head.appendChild(script);
  	callbackUrl = function(reposnse) {
  		console.log(reponse);
  	}
  };

};

utils.jsonp = new utils.Jsonp;