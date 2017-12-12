import customersController from "../controllers/customers";
import productsController from "../controllers/products";
import invoicesController from "../controllers/invoices";

module.exports = app => {
  // CUSTOMERS API
  app.get("/api/customers", customersController.all);
  app.post("/api/customers", customersController.add);
  app.get("/api/customers/:customer_id", customersController.findById);
  app.put("/api/customers/:customer_id", customersController.updateById);
  app.delete("/api/customers/:customer_id", customersController.removeById);

  // PRODUCTS API
  app.get("/api/products", productsController.all);
  app.post("/api/products", productsController.add);
  app.get("/api/products/:product_id", productsController.findById);
  app.put("/api/products/:product_id", productsController.updateById);
  app.delete("/api/products/:product_id", productsController.removeById);

  // INVOICES API
  app.get("/api/invoices", invoicesController.all);
  app.post("/api/invoices", invoicesController.add);
  app.get("/api/invoices/:invoice_id", invoicesController.findById);
  app.put("/api/invoices/:invoice_id", invoicesController.updateById);
  app.delete("/api/invoices/:invoice_id", invoicesController.removeById);

  // INVOICE ITEMS API
  app.get("/api/invoices/:invoice_id/items", invoicesController.allItems);
  app.post("/api/invoices/:invoice_id/items", invoicesController.addItem);
  app.get(
    "/api/invoices/:invoice_id/items/:id",
    invoicesController.findItemById
  );
  app.put(
    "/api/invoices/:invoice_id/items/:id",
    invoicesController.updateItemById
  );
  app.delete(
    "/api/invoices/:invoice_id/items/:id",
    invoicesController.removeItemById
  );
};
