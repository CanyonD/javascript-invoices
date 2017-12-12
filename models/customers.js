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

exports.addNew = function(customer, cb) {
  db
    .get()
    .collection("customers")
    .insert(customer, function(err, result) {
      cb(err, result);
    });
};

exports.removeById = function(id, cb) {
  db
    .get()
    .collection("customers")
    .deleteOne({ _id: ObjectID(id) }, function(err, result) {
      cb(err, result);
    });
};

exports.update = function(id, newData, cb) {
  db
    .get()
    .collection("customers")
    .updateOne({ _id: ObjectID(id) }, { $set: newData }, function(err, result) {
      cb(err, result);
    });
};
