import Customers from "../models/customers";

exports.all = (req, res) => {
  Customers.all(function(err, docs) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(docs);
  });
};

exports.add = (req, res) => {
  let customer = {
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone
  };
  Customers.addNew(customer, function(err, doc) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(doc.ops[0]);
  });
};

exports.findById = (req, res) => {
  Customers.findById(req.params.customer_id, function(err, docs) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(docs);
  });
};

exports.removeById = (req, res) => {
  Customers.removeById(req.params.customer_id, function(err, result) {
    if (err) {
      log.error(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
};

exports.updateById = (req, res) => {
  Customers.update(req.params.customer_id, req.body, function(err, doc) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(doc);
  });
};
