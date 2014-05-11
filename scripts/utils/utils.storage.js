utils.Storage = function() {

  var storage_ = window['localStorage'];

  /**
   * Gets item from the storage.
   * @param {string} key item name.
   * @return {(string|number)} Returns item value.
   * @override
   */
  this.get = function(key) {
    return storage_.getItem(key);
  }
	
  /**
   * Sets  item to the storage.
   * @param {string} key item name.
   * @param {(string|number)} value Inserted item value.
   * @override
   */
  this.set = function(key, value) {
    storage_.setItem(key, value);
  }
	
  /**
   * Remove item from the storage.
   * @param {string} key item name.
   * @override
   */
  this.drop = function(key) {
    storage_.removeItem(key);
    }

  /**
   * Remove all items from the storage.
   * @override
   */
  this.clear = function() {
    storage_.clear();
  }
  
}
