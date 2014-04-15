utils.Storage = function() {

  var storage_ = window['localStorage'];

  this.get = function(key) {
    return storage_.getItem(key);
  }
	
  this.set = function(key, value) {
    storage_.setItem(key, value);
  }
	
  this.drop = function(key) {
    storage_.removeItem(key);
    }

  this.clear = function() {
    storage_.clear();
  }
  
}
