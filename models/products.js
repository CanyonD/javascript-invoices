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

exports.addNew = function(product, cb) {
  db
    .get()
    .collection("products")
    .insert(product, function(err, result) {
      cb(err, result);
    });
};

exports.removeById = function(id, cb) {
  db
    .get()
    .collection("products")
    .deleteOne({ _id: ObjectID(id) }, function(err, result) {
      cb(err, result);
    });
};

exports.update = function(id, newData, cb) {
  db
    .get()
    .collection("products")
    .updateOne({ _id: ObjectID(id) }, { $set: newData }, function(err, result) {
      cb(err, result);
    });
};
