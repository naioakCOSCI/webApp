var express = require("express");
// var bodyParser = require("body-parser");
var app = express();

//mockup data
var products = [
  {
    id: "1001",
    name: "Node.js",
    category: "Node",
    price: 990
  },
  {
    id: "1002",
    name: "React.js",
    category: "React",
    price: 3990
  },
  {
    id: "1003",
    name: "Mongo DB...",
    category: "MongoDB",
    price: 1990
  },
  {
    id: "1004",
    name: "My SQL DB",
    category: "MySQL",
    price: 1000
  }
];

app.get('/products', function (req,res) {
   res.json(products); 
});

app.get("/products/:id", function(req, res) {
  const {id} = req.params;
  const result = products.find(product => product.id === id)
  res.json(result);
});

app.post('/products',(req,res) => {
    var payload = req.body;
    res.json(payload);
});

app.put("/products/:id", (req, res) => {
  var { id } = req.params;
  res.json({ id });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id });
});

app.listen(9000, () => {
  console.log("Application is running on port 9000");
});

// https://morioh.com/p/77b34ddcd183