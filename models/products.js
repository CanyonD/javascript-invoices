import { ObjectID } from "mongodb";
import db from "../db";

exports.all = function(cb) {
  db
    .get()
    .collection("products")
    .find()
    .toArray(function(err, docs) {
      cb(err, docs);
    });
};

exports.findById = function(id, cb) {
  db
    .get()
    .collection("products")
    .findOne({ _id: ObjectID(id) }, function(err, doc) {
      cb(err, doc);
    });
};
