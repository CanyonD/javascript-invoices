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
  res.send("add customers");
};

exports.findById = (req, res) => {
  Customers.findById(req.params.customer_id, function(err, docs) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(docs);
  });
};

exports.changeById = (req, res) => {
  res.send("changeById customers");
};

exports.removeById = (req, res) => {
  res.send("removeById customers");
};
