import { ObjectID } from "mongodb";
import db from "../db";

exports.all = function(cb) {
  db
    .get()
    .collection("invoices")
    .find()
    .toArray(function(err, docs) {
      cb(err, docs);
    });
};

exports.findById = function(id, cb) {
  db
    .get()
    .collection("invoices")
    .findOne({ _id: ObjectID(id) }, function(err, doc) {
      cb(err, doc);
    });
};

exports.addNew = function(customer, cb) {
  db
    .get()
    .collection("invoices")
    .insert(customer, function(err, result) {
      cb(err, result);
    });
};

exports.update = function(id, newData, cb) {
  db
    .get()
    .collection("invoices")
    .updateOne({ _id: ObjectID(id) }, { $set: newData }, function(err, result) {
      cb(err, result);
    });
};

exports.removeById = function(id, cb) {
  db
    .get()
    .collection("invoices")
    .deleteOne({ _id: ObjectID(id) }, function(err, result) {
      cb(err, result);
    });
};
