const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/Products", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const productSchema = new mongoose.Schema({
  name: String,
  number: Number,
  code: Number,
  description: String,
  price: Number
})

const Product = mongoose.model("Product", productSchema);


//get requests for all the pages

app.get("/", function(req, res) {
  res.render("home");
});


app.get("/about", function(req, res) {
  res.render("about");
});


app.get("/product", function(req, res) {
  res.render("product");
});

app.get("/products", function(req, res) {
  Product.find({}, function(err, products) {
    if (err) {
      console.log(err);
    } else {

      res.render("products", {
        products: products
        // productTitle: products.name,
        // productDescription: products.description
      });
    }

  });
});

app.get("/cart", function(req, res) {
  res.render("cart");
});

app.get("/payment", function(req, res) {
  res.render("payment");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});




app.listen(3000, () => {
  console.log("Server started on 3000 port");
});
