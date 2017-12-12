import Products from "../models/products";

exports.all = (req, res) => {
  Products.all(function(err, docs) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(docs);
  });
};

exports.add = (req, res) => {
  res.send("add products");
};

exports.findById = (req, res) => {
  Products.findById(req.params.product_id, function(err, docs) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(docs);
  });
};

exports.changeById = (req, res) => {
  res.send("changeById products");
};

exports.removeById = (req, res) => {
  res.send("removeById products");
};
