
module.exports = function (db) {
  return db.define('event', {
    id   : String,
    name : String,
    count: Number
  }, {
  
  });
};
