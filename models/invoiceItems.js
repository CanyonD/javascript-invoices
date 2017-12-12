import { ObjectID } from "mongodb";
import db from "../db";

exports.all = function(id, cb) {
  db
    .get()
    .collection("invoiceItems")
    .find({ invoice_id: ObjectID(id) })
    .toArray(function(err, docs) {
      cb(err, docs);
    });
};

exports.findById = function(invoice_id, id, cb) {
  db
    .get()
    .collection("invoiceItems")
    .findOne({ invoice_id: ObjectID(invoice_id), _id: ObjectID(id) }, function(
      err,
      doc
    ) {
      cb(err, doc);
    });
};

exports.addNew = function(item, cb) {
  db
    .get()
    .collection("invoiceItems")
    .insert(item, function(err, result) {
      cb(err, result);
    });
};

exports.removeById = function(invoice_id, id, cb) {
  db
    .get()
    .collection("invoiceItems")
    .deleteOne(
      { invoice_id: ObjectID(invoice_id), _id: ObjectID(id) },
      function(err, result) {
        cb(err, result);
      }
    );
};

exports.update = function(invoice_id, id, newData, cb) {
  db
    .get()
    .collection("invoiceItems")
    .updateOne(
      { invoice_id: ObjectID(invoice_id), _id: ObjectID(id) },
      { $set: newData },
      function(err, result) {
        cb(err, result);
      }
    );
};
