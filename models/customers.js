import { ObjectID } from "mongodb";
import db from "../db";

exports.all = function(cb) {
  db
    .get()
    .collection("customers")
    .find()
    .toArray(function(err, docs) {
      cb(err, docs);
    });
};

exports.findById = function(id, cb) {
  db
    .get()
    .collection("customers")
    .findOne({ _id: ObjectID(id) }, function(err, doc) {
      cb(err, doc);
    });
};
