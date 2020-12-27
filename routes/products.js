var express = require('express');
var router = express.Router();
var Product = require("../models/product");

/* GET home page. */

router.get('/', async function (req, res, next) {
  let products = await Product.find(); 
  console.log(req.session.user)
  res.render("products/list",{title:"Products In DB", products});
}); 

router.get('/api', async function (req, res, next) {
  let products = await Product.find(); 
  res.send(products);
  
});

router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res.status(400).send("Product With given ID is not present"); //when id is not present id db
    return res.send(product); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});

router.put("/api/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  product.link = req.body.link;
  await product.save();
  return res.send(product);
  
});

router.post('/add', async function (req, res, next) {
  let product = new Product(req.body);
  await product.save();
  res.redirect("/products");
}); 

router.delete('/delete/:id', async function (req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id);
  return res.send(product);
});


module.exports = router;
