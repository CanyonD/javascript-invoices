exports.all = (req, res) => {
  res.send("all invoices");
};
exports.add = (req, res) => {
  res.send("add invoices");
};
exports.readById = (req, res) => {
  res.send("readById invoices");
};
exports.changeById = (req, res) => {
  res.send("changeById invoices");
};
exports.removeById = (req, res) => {
  res.send("removeById invoices");
};

exports.allItems = (req, res) => {
  res.send("allItems invoices");
};
exports.addItem = (req, res) => {
  res.send("addItem invoices");
};
exports.readItemById = (req, res) => {
  res.send("readItemById invoices");
};
exports.changeItemById = (req, res) => {
  res.send("changeItemById invoices");
};
exports.removeItemById = (req, res) => {
  res.send("removeItemById invoices");
};
