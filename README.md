## Global dependencies

* node

  `https://nodejs.org/en/download/`
* npm
  
  `https://docs.npmjs.com/getting-started/installing-node`
* webpack
```sh
$ npm install webpack -g
```

* nodemon

```sh
$ npm install nodemon -g
```

* mongoDB

`https://www.mongodb.com/download-center?jmp=homepage#community`

then open terminal and type:
```sh
$ mongod
```
# Getting Started

## Install npm dependencies

```sh
$ npm install
```
## Added default values to MongoDB

```sh
$ npm run default
```

## Run the NodeJS server

```sh
$ npm start
```

## Viewing the application in your browser

`http://localhost:8000`

# API

## Schema

### Customers

* id (ObjectID)
* name (string)
* address (string)
* phone (string)

### Products

* id (ObjectID)
* name (string)
* price (decimal)

### Invoices

* id (ObjectID)
* customer_id (ObjectID)
* discount (decimal)
* total (decimal)

### InvoiceItems

* id (ObjectID)
* invoice_id (ObjectID)
* product_id (ObjectID)
* quantity (decimal)

## Resources

### Customers

```
GET|POST          /api/customers
GET|PUT|DELETE    /api/customers/{id}
```

### Products

```
GET|POST          /api/products
GET|PUT|DELETE    /api/products/{id}
```

### Invoices

```
GET|POST          /api/invoices
GET|PUT|DELETE    /api/invoices/{id}
```

### InvoiceItems

```
GET|POST          /api/invoices/{id}/items
GET|PUT|DELETE    /api/invoices/{invoice_id}/items/{id}
```
