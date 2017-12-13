import Invoices from "../models/invoices";
import InvoiceItems from "../models/invoiceItems";
import { ObjectID } from "mongodb";

exports.all = (req, res) => {
  Invoices.all(function(err, docs) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(docs);
  });
};

exports.add = (req, res) => {
  let invoice = {
    customer_id: req.body.customer_id,
    discount: req.body.discount,
    total: req.body.total
  };
  Invoices.addNew(invoice, function(err, doc) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(doc.ops[0]);
  });
};

exports.findById = (req, res) => {
  Invoices.findById(req.params.invoice_id, function(err, docs) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(docs);
  });
};

exports.removeById = (req, res) => {
  Invoices.removeById(req.params.invoice_id, function(err, result) {
    if (err) {
      log.error(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
};

exports.updateById = (req, res) => {
  Invoices.update(req.params.invoice_id, req.body, function(err, doc) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(doc);
  });
};

exports.allItems = (req, res) => {
  InvoiceItems.all(req.params.invoice_id, function(err, docs) {
    if (err) {
      console.error(err)
      return res.sendStatus(500);
    }
    res.send(docs);
  });
};

exports.addItem = (req, res) => {
  let item = {
    invoice_id: ObjectID(req.params.invoice_id),
    product_id: "",
    quantity: req.body.quantity
  };
  InvoiceItems.addNew(item, function(err, doc) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(doc.ops[0]);
  });
};

exports.findItemById = (req, res) => {
  InvoiceItems.findById(req.params.invoice_id, req.params.id, function(
    err,
    docs
  ) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(docs);
  });
};

exports.updateItemById = (req, res) => {
  if (req.body.product_id) {
    req.body.product_id = ObjectID(req.body.product_id);
  }
  InvoiceItems.update(req.params.invoice_id, req.params.id, req.body, function(
    err,
    doc
  ) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(doc);
  });
};
exports.removeItemById = (req, res) => {
  InvoiceItems.removeById(req.params.invoice_id, req.params.id, function(
    err,
    result
  ) {
    if (err) {
      log.error(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
};
