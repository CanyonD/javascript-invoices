var db = require("./db");

var configFile = require("./config.json");
const mongoUrl = configFile.mongo.url + ":" + configFile.mongo.port + configFile.mongo.default;

db.connect(mongoUrl, function(err) {
  if (err) {
    return console.error("Error during connect to DB", err);
  }
  console.log("Starting added default values...");
  let count = 0;
  let customers = [
    {
      name: "Mark Benson",
      address: "353 Rochester St, Rialto FL 43250",
      phone: "555-534-2342"
    },
    {
      name: "Bob Smith",
      address: "215 Market St, Dansville CA 94325",
      phone: "555-534-2342"
    },
    {
      name: "John Draper",
      address: "890 Main St, Fontana IL 31450",
      phone: "555-534-2342"
    }
  ];
  let products = [
    {
      name: "Parachute Pants",
      price: 29.99
    },
    {
      name: "Phone Holder",
      price: 9.99
    },
    {
      name: "Pet Rock",
      price: 5.99
    },
    {
      name: "Egg Timer",
      price: 15.99
    },
    {
      name: "Neon Green Hat",
      price: 21.99
    }
  ];
  customers.forEach(customer => {
    db.get().collection("customers").insert(customer, function(err, result) {
      if (err) {
        return console.error(err);
      }
      count++;
      console.log("added:", result.ops[0]);
    });
  });
  products.forEach(product => {
    db.get().collection("products").insert(product, function(err, result) {
      if (err) {
        return console.error(err);
      }
      count++;
      console.log("added:", result.ops[0]);
    });
  });

  setTimeout(function() {
    db.close();
    process.exit(0);
  }, 2000);
});
