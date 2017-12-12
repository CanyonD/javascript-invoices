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
  let product = {
    name: req.body.name,
    price: req.body.price
  };
  Products.addNew(product, function(err, doc) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(doc.ops[0]);
  });
};

exports.findById = (req, res) => {
  Products.findById(req.params.product_id, function(err, docs) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(docs);
  });
};

exports.updateById = (req, res) => {
  Products.update(req.params.product_id, req.body, function(err, doc) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(doc);
  });
};

exports.removeById = (req, res) => {
  Products.removeById(req.params.product_id, function(err, result) {
    if (err) {
      log.error(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
};
