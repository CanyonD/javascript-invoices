import customersController from "../controllers/customers";
import productsController from "../controllers/products";

module.exports = app => {
    app.get('/api/customers', customersController.all);
    app.get('/api/products', productsController.all);
}