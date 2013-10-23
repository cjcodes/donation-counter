
module.exports = function (db) {
  return db.define('event', {
    id   : String,
    name : String,
    count: Number,
    background:  String,
    fontFamily: String,
    fontColor:  String,
    flipColor:  String
  }, {
  
  });
};
