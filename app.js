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

//Create the product Schema and model

const productSchema = new mongoose.Schema({
  name: String,
  number: Number,
  code: Number,
  description: String,
  price: Number,
  quantity: Number
})

const Product = mongoose.model("Product", productSchema);


//Create the Cart Schema and model so when a client adds a product to create his cart it will create and update a new cart
const cartSchema = new mongoose.Schema({
  product: [productSchema],
  totalAmount: Number
});

const Cart = mongoose.model("Cart", cartSchema);


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

//loop through the Products db and project the products

app.get("/products", function(req, res) {
  Product.find({}, function(err, products) {
    if (err) {
      console.log(err);
    } else {

      res.render("products", {
        products: products
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

//Insert product into the cart
app.post("/products", function(req, res) {

  Product.findOne({}, function(err, products) {

    // Cart.findById(id,function(err,carts){
    //   if(carts.name){
    //     Cart.findOneAndUpdate({
    //
    //     })
    //   }
    // })
    const newCart = new Cart({
      product: [{
        name:products.name,
        price:products.price
      }],
      totalAmount: 200
    });
    newCart.save(function(err) {
      if (!err) {
        console.log("Successfully created the cart");
      } else {
        res.send(err);
      }
    });

  });

});


app.listen(3000, () => {
  console.log("Server started on 3000 port");
});
