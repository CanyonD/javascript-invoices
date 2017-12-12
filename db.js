var MongoClient = require("mongodb").MongoClient;

var state = {
  db: null
};

exports.connect = function(url, done) {
  console.log("Connect to DB...");
  console.log("URL to DB: ", url);
  if (state.db) {
    return done();
  }
  MongoClient.connect(url, function(err, db) {
    if (err) {
      return done(err);
    }
    state.db = db;
    done();
  });
};

exports.get = function() {
  return state.db.db('invoices');
};
